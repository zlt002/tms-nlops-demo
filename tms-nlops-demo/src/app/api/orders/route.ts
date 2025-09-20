import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { OrderService } from '@/services/orderService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createOrderSchema, orderQuerySchema } from '@/lib/validators/order'
import { OrderStatus, Priority, PaymentStatus } from '@prisma/client'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const query = {
    customerId: searchParams.get('customerId') || undefined,
    status: searchParams.get('status') || undefined,
    priority: searchParams.get('priority') || undefined,
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = orderQuerySchema.parse(query)

  const where: any = {}
  if (validatedQuery.customerId) where.customerId = validatedQuery.customerId
  if (validatedQuery.status) where.status = validatedQuery.status
  if (validatedQuery.priority) where.priority = validatedQuery.priority
  if (validatedQuery.startDate || validatedQuery.endDate) {
    where.createdAt = {}
    if (validatedQuery.startDate) where.createdAt.gte = validatedQuery.startDate
    if (validatedQuery.endDate) where.createdAt.lte = validatedQuery.endDate
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true
          }
        },
        documents: true,
        shipments: {
          include: {
            vehicle: true,
            driver: true
          }
        }
      },
      skip: (validatedQuery.page - 1) * validatedQuery.limit,
      take: validatedQuery.limit,
      orderBy: {
        [validatedQuery.sortBy]: validatedQuery.sortOrder
      }
    }),
    prisma.order.count({ where })
  ])

  return NextResponse.json({
    success: true,
    data: orders,
    pagination: {
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      total,
      pages: Math.ceil(total / validatedQuery.limit)
    }
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = createOrderSchema.parse(body)

  // 生成订单号
  const orderNumber = `ORD${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`

  // 计算订单总金额
  const totalAmount = await OrderService.calculateOrderTotal({
    originAddress: validatedData.addresses.origin,
    destinationAddress: validatedData.addresses.destination,
    cargoWeight: validatedData.cargo.weight,
    cargoVolume: validatedData.cargo.volume,
    priority: validatedData.priority
  })

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerId: validatedData.customerId,
      cargoName: validatedData.cargo.name,
      cargoWeight: validatedData.cargo.weight,
      cargoVolume: validatedData.cargo.volume,
      cargoValue: validatedData.cargo.value,
      originAddress: validatedData.addresses.origin,
      destinationAddress: validatedData.addresses.destination,
      originContact: validatedData.addresses.originContact,
      destinationContact: validatedData.addresses.destinationContact,
      pickupTime: validatedData.pickupTime,
      expectedTime: validatedData.expectedTime,
      priority: validatedData.priority || Priority.MEDIUM,
      status: OrderStatus.PENDING,
      totalAmount,
      paymentStatus: PaymentStatus.UNPAID,
      notes: validatedData.notes,
      createdBy: 'system', // TODO: 从认证用户获取
      updatedBy: 'system'
    },
    include: {
      customer: true
    }
  })

  return ApiResponseBuilder.success(order, '订单创建成功', 201)
})
