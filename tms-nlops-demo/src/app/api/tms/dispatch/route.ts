import { NextRequest, NextResponse } from 'next/server'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder } from '@/lib/api/response'
import { createDispatchSchema, optimizeRouteSchema } from '@/lib/validators/dispatch'
import { DispatchStatus, Priority } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // 构建查询参数
    const query = {
      status: searchParams.get('status') || undefined,
      driverId: searchParams.get('driverId') || undefined,
      vehicleId: searchParams.get('vehicleId') || undefined,
      customerId: searchParams.get('customerId') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      origin: searchParams.get('origin') || undefined,
      destination: searchParams.get('destination') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const result = await DispatchService.getDispatches(query)

    return ApiResponseBuilder.success({
      dispatches: result.dispatches,
      pagination: result.pagination
    }, '获取发车单列表成功')
  } catch (error) {
    console.error('获取发车单列表失败:', error)
    return ApiResponseBuilder.error(
      '获取发车单列表失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 智能调度优化
    if (body.action === 'optimize') {
      const validatedData = optimizeRouteSchema.parse(body)

      const optimizedRoute = await DispatchService.optimizeRoute(validatedData)

      return ApiResponseBuilder.success(optimizedRoute, '路线优化成功')
    }

    // 自动调度
    if (body.action === 'auto-dispatch') {
      const { date } = body
      const targetDate = date ? new Date(date) : new Date()

      const results = await DispatchService.optimizeDispatch(targetDate)

      return ApiResponseBuilder.success(results, '智能调度完成')
    }

    // 获取统计信息
    if (body.action === 'statistics') {
      const { startDate, endDate } = body
      const dateRange = startDate && endDate ? {
        start: new Date(startDate),
        end: new Date(endDate)
      } : undefined

      const statistics = await DispatchService.getDispatchStatistics(dateRange)

      return ApiResponseBuilder.success(statistics, '获取统计信息成功')
    }

    // 创建发车单
    const validatedData = createDispatchSchema.parse(body)

    const dispatch = await DispatchService.createDispatch(validatedData)

    return ApiResponseBuilder.success(dispatch, '发车单创建成功', 201)
  } catch (error) {
    console.error('处理发车单请求失败:', error)

    if (error.name === 'ZodError') {
      return ApiResponseBuilder.error(
        '数据验证失败',
        error.errors,
        400
      )
    }

    return ApiResponseBuilder.error(
      '处理发车单请求失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}