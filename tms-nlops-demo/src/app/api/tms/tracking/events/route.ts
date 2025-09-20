import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { trackingEventSchema } from '@/lib/validators/tracking'
import { TrackingService } from '@/services/trackingService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = trackingEventSchema.parse(body)

    // 检查运单是否存在
    const shipment = await prisma.shipment.findUnique({
      where: { id: validatedData.shipmentId },
      include: {
        vehicle: true,
        driver: true,
        order: true
      }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    // 验证运单状态
    if (shipment.status === 'CANCELLED' || shipment.status === 'COMPLETED') {
      return NextResponse.json(
        { error: '运单已取消或完成，无法上报事件' },
        { status: 400 }
      )
    }

    // 使用提供的timestamp或当前时间
    const timestamp = validatedData.timestamp || new Date()

    // 根据事件类型处理特殊逻辑
    await processEventByType(shipment, validatedData)

    // 创建跟踪日志记录
    let trackingLog: any
    if (validatedData.location) {
      trackingLog = await prisma.trackingLog.create({
        data: {
          shipmentId: validatedData.shipmentId,
          latitude: validatedData.location.latitude,
          longitude: validatedData.location.longitude,
          address: validatedData.location.address,
          event: validatedData.event,
          description: validatedData.description,
          deviceId: validatedData.deviceId,
          timestamp,
          receivedAt: new Date(),
          notes: validatedData.notes,
          createdBy: 'system',
          verified: false
        }
      })

      // 更新运单位置
      await TrackingService.updateShipmentLocation(validatedData.shipmentId, {
        latitude: validatedData.location.latitude,
        longitude: validatedData.location.longitude,
        address: validatedData.location.address,
        timestamp
      })
    }

    // 创建事件记录
    const trackingEvent = await prisma.trackingLog.findFirst({
      where: {
        shipmentId: validatedData.shipmentId,
        event: validatedData.event,
        timestamp: {
          gte: new Date(timestamp.getTime() - 1000), // 1秒误差范围
          lte: new Date(timestamp.getTime() + 1000)
        }
      },
      include: {
        shipment: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true,
            originAddress: true,
            destinationAddress: true
          }
        }
      }
    })

    // 触发相关警报
    if (trackingLog) {
      await TrackingService.checkAndCreateAlerts(shipment, trackingLog)
    }

    // 发送事件通知
    await sendEventNotification({
      event: validatedData.event,
      shipment,
      location: validatedData.location,
      description: validatedData.description,
      timestamp
    })

    return NextResponse.json({
      success: true,
      data: {
        eventId: trackingEvent?.id,
        event: validatedData.event,
        shipmentId: validatedData.shipmentId,
        shipmentNumber: shipment.shipmentNumber,
        timestamp,
        status: 'success'
      },
      message: '事件上报成功'
    }, { status: 201 })

  } catch (error) {
    console.error('跟踪事件上报失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '跟踪事件上报失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：根据事件类型处理特殊逻辑
async function processEventByType(shipment: any, eventData: any) {
  const updateData: any = {}
  const now = new Date()

  switch (eventData.event) {
    case 'DEPARTURE':
      if (shipment.status === 'PENDING' || shipment.status === 'SCHEDULED') {
        updateData.status = 'IN_TRANSIT'
        updateData.actualDeparture = eventData.timestamp || now
      }
      break

    case 'ARRIVAL':
      if (shipment.status === 'IN_TRANSIT') {
        updateData.status = 'UNLOADING'
        updateData.actualArrival = eventData.timestamp || now
        updateData.progress = 100
      }
      break

    case 'LOADING_START':
      if (shipment.status === 'PENDING' || shipment.status === 'SCHEDULED') {
        updateData.status = 'LOADING'
      }
      break

    case 'LOADING_COMPLETE':
      if (shipment.status === 'LOADING') {
        updateData.status = 'IN_TRANSIT'
        updateData.actualDeparture = eventData.timestamp || now
      }
      break

    case 'UNLOADING_START':
      if (shipment.status === 'IN_TRANSIT') {
        updateData.status = 'UNLOADING'
      }
      break

    case 'UNLOADING_COMPLETE':
      if (shipment.status === 'UNLOADING') {
        updateData.status = 'DELIVERED'
        updateData.actualArrival = eventData.timestamp || now
        updateData.progress = 100
      }
      break

    case 'DELAY':
      // 延迟事件，可以触发警报
      if (shipment.estimatedArrival) {
        const newEstimatedArrival = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 延迟24小时
        updateData.estimatedArrival = newEstimatedArrival
      }
      break

    case 'ROUTE_CHANGE':
      // 路线变更事件
      if (eventData.description) {
        updateData.notes = `路线变更: ${eventData.description}`
      }
      break

    case 'EMERGENCY':
      // 紧急事件，创建高优先级警报
      await prisma.trackingAlert.create({
        data: {
          shipmentId: shipment.id,
          alertType: 'EMERGENCY',
          severity: 'CRITICAL',
          title: '紧急事件',
          description: eventData.description || '发生紧急事件',
          location: eventData.location ? JSON.stringify(eventData.location) : null,
          status: 'ACTIVE'
        }
      })
      break

    case 'CHECKPOINT_PASS':
      // 检查点通过事件，更新检查点状态
      if (shipment.routeId) {
        const checkpoint = await prisma.trackingCheckpoint.findFirst({
          where: {
            routeId: shipment.routeId,
            status: 'PENDING'
          },
          orderBy: { order: 'asc' }
        })

        if (checkpoint && eventData.location) {
          const checkpointCoords = JSON.parse(checkpoint.coordinates)
          const distance = await TrackingService['calculateDistance'](
            eventData.location.latitude,
            eventData.location.longitude,
            checkpointCoords.lat,
            checkpointCoords.lng
          )

          if (distance <= checkpoint.radius / 1000) {
            await prisma.trackingCheckpoint.update({
              where: { id: checkpoint.id },
              data: {
                status: 'ARRIVED',
                actualTime: eventData.timestamp || now,
                visitCount: { increment: 1 }
              }
            })
          }
        }
      }
      break
  }

  // 更新运单状态
  if (Object.keys(updateData).length > 0) {
    await prisma.shipment.update({
      where: { id: shipment.id },
      data: updateData
    })
  }
}

// 辅助函数：发送事件通知
async function sendEventNotification(eventData: any) {
  try {
    // 这里可以集成各种通知服务
    console.log('发送事件通知:', {
      event: eventData.event,
      shipmentId: eventData.shipment.id,
      shipmentNumber: eventData.shipment.shipmentNumber,
      location: eventData.location,
      description: eventData.description,
      timestamp: eventData.timestamp
    })

    // 示例：调用Webhook
    if (process.env.EVENT_WEBHOOK_URL) {
      await fetch(process.env.EVENT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventData.event,
          shipment: {
            id: eventData.shipment.id,
            shipmentNumber: eventData.shipment.shipmentNumber,
            status: eventData.shipment.status
          },
          location: eventData.location,
          description: eventData.description,
          timestamp: eventData.timestamp
        })
      })
    }
  } catch (error) {
    console.error('发送事件通知失败:', error)
    // 不抛出错误，避免影响主要业务流程
  }
}