import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { OrderQueries } from '@/lib/db/queries'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createOrderSchema } from '@/lib/validators'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const filters = {
    status: searchParams.get('status') as any,
    customerId: searchParams.get('customerId') || undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20')
  }

  const result = await OrderQueries.findAll(filters)

  return ApiResponseBuilder.paginated(
    result.orders,
    result.pagination,
    '获取订单列表成功'
  )
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()

  // 验证输入
  const validatedData = createOrderSchema.parse(body)

  // 生成订单号
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

  // 创建订单
  const order = await prisma.order.create({
    data: {
      ...validatedData,
      orderNumber,
      volume: validatedData.volume || 0,
      value: validatedData.value || 0
    },
    include: {
      customer: true,
      assignedVehicle: {
        include: {
          driver: true
        }
      }
    }
  })

  return ApiResponseBuilder.success(order, '订单创建成功', 201)
})