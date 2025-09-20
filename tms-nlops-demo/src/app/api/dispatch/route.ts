import { NextRequest, NextResponse } from 'next/server'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createDispatchSchema, dispatchQuerySchema, optimizeRouteSchema } from '@/lib/validators/dispatch'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  // 获取可用订单和车辆
  if (searchParams.get('action') === 'available') {
    const [orders, vehicles] = await Promise.all([
      DispatchService.getAvailableOrders(),
      DispatchService.getAvailableVehicles()
    ])

    return NextResponse.json({
      success: true,
      data: {
        orders,
        vehicles
      }
    })
  }

  // 获取调度列表
  const query = {
    status: searchParams.get('status') || undefined,
    driverId: searchParams.get('driverId') || undefined,
    vehicleId: searchParams.get('vehicleId') || undefined,
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = dispatchQuerySchema.parse(query)

  const result = await DispatchService.getDispatches(validatedQuery)

  return NextResponse.json({
    success: true,
    data: result.dispatches,
    pagination: result.pagination
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()

  // 路线优化
  if (body.action === 'optimize') {
    const { orderIds, vehicleId, preferences } = body
    const validatedData = optimizeRouteSchema.parse({ orderIds, vehicleId, preferences })

    // 获取订单和车辆信息
    const orders = await Promise.all(
      validatedData.orderIds.map(id =>
        prisma.order.findUnique({ where: { id } })
      )
    )

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: validatedData.vehicleId },
      include: { driver: true }
    })

    if (!orders.every(o => o) || !vehicle) {
      throw new Error('订单或车辆不存在')
    }

    const optimizedRoute = await DispatchService.optimizeRoute(orders, vehicle)

    return ApiResponseBuilder.success(optimizedRoute, '路线优化成功')
  }

  // 创建发车单
  const validatedData = createDispatchSchema.parse(body)

  const dispatch = await DispatchService.createDispatch(validatedData)

  return ApiResponseBuilder.success(dispatch, '发车单创建成功', 201)
})