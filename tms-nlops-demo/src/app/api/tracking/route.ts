import { NextRequest, NextResponse } from 'next/server'
import { TrackingService } from '@/services/trackingService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { locationReportSchema, trackingQuerySchema, realTimeTrackingSchema } from '@/lib/validators/tracking'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  // 获取当前位置
  if (searchParams.get('action') === 'current') {
    const type = searchParams.get('type')
    const typeId = searchParams.get('typeId')

    if (!type || !typeId) {
      return ApiResponseBuilder.error('缺少必要参数', 400)
    }

    const location = await TrackingService.getCurrentLocation(type, typeId)

    return ApiResponseBuilder.success(location)
  }

  // 获取轨迹
  if (searchParams.get('action') === 'route') {
    const query = {
      type: searchParams.get('type'),
      typeId: searchParams.get('typeId'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      simplify: searchParams.get('simplify') === 'true',
      tolerance: parseFloat(searchParams.get('tolerance') || '0.0001')
    }

    const validatedQuery = trackingQuerySchema.parse(query)

    const route = await TrackingService.getTrackingRoute(
      validatedQuery.type,
      validatedQuery.typeId,
      {
        startDate: validatedQuery.startDate,
        endDate: validatedQuery.endDate,
        simplify: validatedQuery.simplify,
        tolerance: validatedQuery.tolerance
      }
    )

    return ApiResponseBuilder.success(route)
  }

  // 获取统计数据
  if (searchParams.get('action') === 'stats') {
    const type = searchParams.get('type')
    const typeId = searchParams.get('typeId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!type || !typeId) {
      return ApiResponseBuilder.error('缺少必要参数', 400)
    }

    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate)
    } : undefined

    const stats = await TrackingService.getTrackingStats(type, typeId, dateRange)

    return ApiResponseBuilder.success(stats)
  }

  // 默认返回跟踪历史
  const query = {
    type: searchParams.get('type'),
    typeId: searchParams.get('typeId'),
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '100')
  }

  const validatedQuery = trackingQuerySchema.parse(query)

  const result = await TrackingService.getTrackingHistory(validatedQuery)

  return NextResponse.json({
    success: true,
    data: result.logs,
    pagination: result.pagination
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()

  // 位置上报
  if (body.action === 'report') {
    const validatedData = locationReportSchema.parse(body)

    const trackingLog = await TrackingService.reportLocation(validatedData)

    return ApiResponseBuilder.success(trackingLog, '位置上报成功')
  }

  // 批量位置上报
  if (body.action === 'batchReport') {
    const { locations } = body

    if (!Array.isArray(locations) || locations.length === 0) {
      return ApiResponseBuilder.error('位置数据不能为空', 400)
    }

    const results = await Promise.all(
      locations.map((location: any) => {
        const validated = locationReportSchema.parse(location)
        return TrackingService.reportLocation(validated)
      })
    )

    return ApiResponseBuilder.success({
      count: results.length,
      results
    }, '批量位置上报成功')
  }

  // 创建地理围栏
  if (body.action === 'createGeofence') {
    const { geofenceData } = body
    // TODO: 实现地理围栏验证
    const geofence = await TrackingService.createGeofence(geofenceData)

    return ApiResponseBuilder.success(geofence, '地理围栏创建成功')
  }

  // 实时跟踪订阅
  if (body.action === 'subscribe') {
    const validatedData = realTimeTrackingSchema.parse(body)

    // 简化版，实际应该使用WebSocket或Server-Sent Events
    const subscriptions = validatedData.typeIds.map(typeId => ({
      type: validatedData.type,
      typeId,
      interval: validatedData.interval
    }))

    return ApiResponseBuilder.success({
      subscriptions,
      message: '实时跟踪已启用'
    })
  }

  return ApiResponseBuilder.error('不支持的操作', 400)
})
