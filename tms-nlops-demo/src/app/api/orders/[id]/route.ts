import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { OrderService } from '@/services/orderService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updateOrderSchema } from '@/lib/validators/order'
import { OrderStatus } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true
          }
        },
        shipments: {
          include: {
            vehicle: true,
            driver: true
          }
        },
        trackings: {
          orderBy: { createdAt: 'desc' }
        },
        documents: true
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order
    })
  } catch (error) {
    console.error('获取订单详情失败:', error)
    return NextResponse.json(
      { error: '获取订单详情失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateOrderSchema.parse(body)

    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id }
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      )
    }

    const updateData: any = {
      updatedBy: 'system', // TODO: 从认证用户获取
      updatedAt: new Date()
    }

    if (validatedData.cargo) {
      updateData.cargoName = validatedData.cargo.name
      updateData.cargoWeight = validatedData.cargo.weight
      updateData.cargoVolume = validatedData.cargo.volume
      updateData.cargoValue = validatedData.cargo.value
    }

    if (validatedData.addresses) {
      if (validatedData.addresses.origin) updateData.originAddress = validatedData.addresses.origin
      if (validatedData.addresses.destination) updateData.destinationAddress = validatedData.addresses.destination
      if (validatedData.addresses.originContact) updateData.originContact = validatedData.addresses.originContact
      if (validatedData.addresses.destinationContact) updateData.destinationContact = validatedData.addresses.destinationContact
    }

    if (validatedData.pickupTime !== undefined) updateData.pickupTime = validatedData.pickupTime
    if (validatedData.deliveryTime !== undefined) updateData.deliveryTime = validatedData.deliveryTime
    if (validatedData.expectedTime !== undefined) updateData.expectedTime = validatedData.expectedTime
    if (validatedData.status !== undefined) {
      // 状态变更检查
      if (validatedData.status !== existingOrder.status) {
        await OrderService.updateOrderStatus(params.id, validatedData.status, 'system')
      }
      updateData.status = validatedData.status
    }
    if (validatedData.priority !== undefined) updateData.priority = validatedData.priority
    if (validatedData.totalAmount !== undefined) updateData.totalAmount = validatedData.totalAmount
    if (validatedData.paymentStatus !== undefined) updateData.paymentStatus = validatedData.paymentStatus
    if (validatedData.notes !== undefined) updateData.notes = validatedData.notes

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true
          }
        },
        shipments: {
          include: {
            vehicle: true,
            driver: true
          }
        },
        documents: true
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: '订单更新成功'
    })
  } catch (error) {
    console.error('更新订单失败:', error)
    return NextResponse.json(
      { error: '更新订单失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id }
    })

    if (!order) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      )
    }

    if (order.status !== OrderStatus.PENDING) {
      return NextResponse.json(
        { error: '只有待处理的订单才能删除' },
        { status: 400 }
      )
    }

    await prisma.order.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: '订单删除成功'
    })
  } catch (error) {
    console.error('删除订单失败:', error)
    return NextResponse.json(
      { error: '删除订单失败', details: error.message },
      { status: 500 }
    )
  }
}
