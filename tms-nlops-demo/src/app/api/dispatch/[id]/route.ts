import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updateDispatchSchema } from '@/lib/validators/dispatch'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const dispatch = await prisma.dispatch.findUnique({
      where: { id: params.id },
      include: {
        vehicle: {
          include: {
            driver: true,
            location: true
          }
        },
        driver: true,
        shipments: {
          include: {
            order: {
              include: {
                customer: true
              }
            }
          },
          orderBy: { sequence: 'asc' }
        }
      }
    })

    if (!dispatch) {
      return ApiResponseBuilder.error('发车单不存在', 404)
    }

    return ApiResponseBuilder.success(dispatch)
  })()
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const validatedData = updateDispatchSchema.parse(body)

    const dispatch = await DispatchService.updateDispatchStatus(
      params.id,
      validatedData.status || '',
      {
        actualDistance: validatedData.actualDistance,
        actualDuration: validatedData.actualDuration,
        reason: validatedData.cancelReason
      }
    )

    return ApiResponseBuilder.success(dispatch, '发车单更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const dispatch = await prisma.dispatch.findUnique({
      where: { id: params.id }
    })

    if (!dispatch) {
      return ApiResponseBuilder.error('发车单不存在', 404)
    }

    if (dispatch.status === 'IN_TRANSIT') {
      return ApiResponseBuilder.error('运输中的发车单不能删除', 400)
    }

    // 取消发车单
    await DispatchService.updateDispatchStatus(params.id, 'CANCELLED', {
      reason: '用户取消'
    })

    return ApiResponseBuilder.success(null, '发车单已取消')
  })()
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()

    // 更新位置信息
    if (body.action === 'updateLocation') {
      const { latitude, longitude, address, speed } = body.location

      // 更新发车单位置
      await prisma.dispatch.update({
        where: { id: params.id },
        data: {
          currentLocation: {
            latitude,
            longitude,
            address,
            timestamp: new Date()
          }
        }
      })

      // 同时更新车辆位置
      const dispatch = await prisma.dispatch.findUnique({
        where: { id: params.id },
        select: { vehicleId: true }
      })

      if (dispatch?.vehicleId) {
        await VehicleService.updateVehicleLocation(dispatch.vehicleId, {
          latitude,
          longitude,
          address,
          speed: speed || 0,
          heading: 0
        })
      }

      return ApiResponseBuilder.success({ latitude, longitude, address }, '位置更新成功')
    }

    // 添加跟踪事件
    if (body.action === 'addTrackingEvent') {
      const { event, notes } = body

      await prisma.trackingLog.create({
        data: {
          dispatchId: params.id,
          event,
          notes,
          location: body.location,
          timestamp: new Date()
        }
      })

      return ApiResponseBuilder.success(null, '跟踪事件已添加')
    }

    // 更新运单状态
    if (body.action === 'updateShipmentStatus') {
      const { shipmentId, status } = body

      await prisma.shipment.update({
        where: { id: shipmentId },
        data: {
          status,
          updatedAt: new Date()
        }
      })

      return ApiResponseBuilder.success(null, '运单状态已更新')
    }

    return ApiResponseBuilder.error('不支持的操作', 400)
  })()
}
