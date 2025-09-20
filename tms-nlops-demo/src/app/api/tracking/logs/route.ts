import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createTrackingLogSchema, trackingQuerySchema } from '@/lib/validators/tracking'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      shipmentId: searchParams.get('shipmentId') || undefined,
      status: searchParams.get('status') || undefined,
      event: searchParams.get('event') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      deviceId: searchParams.get('deviceId') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '100'),
      sortBy: searchParams.get('sortBy') || 'timestamp',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = trackingQuerySchema.parse(query)

    const where: any = {}
    if (validatedQuery.shipmentId) where.shipmentId = validatedQuery.shipmentId
    if (validatedQuery.status) where.status = validatedQuery.status
    if (validatedQuery.event) where.event = validatedQuery.event
    if (validatedQuery.deviceId) where.deviceId = validatedQuery.deviceId
    if (validatedQuery.startDate || validatedQuery.endDate) {
      where.timestamp = {}
      if (validatedQuery.startDate) where.timestamp.gte = validatedQuery.startDate
      if (validatedQuery.endDate) where.timestamp.lte = validatedQuery.endDate
    }

    const [logs, total] = await Promise.all([
      prisma.trackingLog.findMany({
        where,
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
        },
        skip: (validatedQuery.page - 1) * validatedQuery.limit,
        take: validatedQuery.limit,
        orderBy: {
          [validatedQuery.sortBy]: validatedQuery.sortOrder
        }
      }),
      prisma.trackingLog.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        total,
        pages: Math.ceil(total / validatedQuery.limit)
      }
    })
  } catch (error) {
    console.error('获取跟踪日志失败:', error)
    return NextResponse.json(
      { error: '获取跟踪日志失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createTrackingLogSchema.parse(body)

    // 检查运单是否存在
    const shipment = await prisma.shipment.findUnique({
      where: { id: validatedData.shipmentId },
      include: {
        vehicle: true,
        driver: true
      }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    // 验证运单状态
    if (shipment.status !== 'IN_TRANSIT' && shipment.status !== 'LOADING' && shipment.status !== 'UNLOADING') {
      return NextResponse.json(
        { error: '运单不在运输状态' },
        { status: 400 }
      )
    }

    // 使用提供的timestamp或当前时间
    const timestamp = validatedData.timestamp || new Date()

    // 创建跟踪日志
    const trackingLog = await prisma.trackingLog.create({
      data: {
        shipmentId: validatedData.shipmentId,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        address: validatedData.address,
        altitude: validatedData.altitude,
        accuracy: validatedData.accuracy,
        speed: validatedData.speed || 0,
        heading: validatedData.heading || 0,
        status: validatedData.status || 'NORMAL',
        event: validatedData.event,
        description: validatedData.description,
        deviceId: validatedData.deviceId,
        signalStrength: validatedData.signalStrength,
        batteryLevel: validatedData.batteryLevel,
        temperature: validatedData.temperature,
        humidity: validatedData.humidity,
        timestamp,
        receivedAt: new Date(),
        notes: validatedData.notes,
        createdBy: 'system' // 实际应用中应该是设备或用户ID
      }
    })

    // 更新运单的当前位置和进度
    await updateShipmentLocation(validatedData.shipmentId, {
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      address: validatedData.address,
      speed: validatedData.speed || 0,
      timestamp
    })

    // 检查异常情况并生成警报
    await checkAndCreateAlerts(shipment, trackingLog)

    // 更新车辆位置
    if (shipment.vehicleId) {
      await prisma.vehicle.update({
        where: { id: shipment.vehicleId },
        data: {
          currentLocation: validatedData.address,
          lastMaintenance: new Date() // 更新最后维护时间
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: trackingLog,
      message: '位置上报成功'
    }, { status: 201 })
  } catch (error) {
    console.error('位置上报失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '位置上报失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：更新运单位置
async function updateShipmentLocation(shipmentId: string, location: any) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId }
    })

    if (!shipment) return

    // 计算运输进度
    const progress = await calculateProgress(shipment, location)

    // 更新运单信息
    await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        currentLocation: location.address,
        currentCoordinates: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude
        }),
        progress
      }
    })

    // 检查检查点
    await checkCheckpoints(shipment, location)
  } catch (error) {
    console.error('更新运单位置失败:', error)
  }
}

// 辅助函数：计算进度
async function calculateProgress(shipment: any, currentLocation: any): Promise<number> {
  try {
    const origin = JSON.parse(shipment.originCoordinates || '{}')
    const destination = JSON.parse(shipment.destinationCoordinates || '{}')

    const totalDistance = await calculateDistance(
      origin.lat, origin.lng,
      destination.lat, destination.lng
    )

    const remainingDistance = await calculateDistance(
      currentLocation.latitude, currentLocation.longitude,
      destination.lat, destination.lng
    )

    const progress = Math.max(0, Math.min(100, ((totalDistance - remainingDistance) / totalDistance) * 100))
    return Math.round(progress * 100) / 100
  } catch (error) {
    console.error('计算进度失败:', error)
    return 0
  }
}

// 辅助函数：检查并创建警报
async function checkAndCreateAlerts(shipment: any, trackingLog: any) {
  try {
    const alerts = []

    // 检查超速
    if (trackingLog.speed > 120) {
      alerts.push({
        shipmentId: shipment.id,
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        description: `车辆速度达到 ${trackingLog.speed} km/h，超过限速`,
        location: JSON.stringify({
          lat: trackingLog.latitude,
          lng: trackingLog.longitude,
          address: trackingLog.address
        }),
        trackingLogId: trackingLog.id
      })
    }

    // 检查低电量
    if (trackingLog.batteryLevel && trackingLog.batteryLevel < 20) {
      alerts.push({
        shipmentId: shipment.id,
        alertType: 'LOW_FUEL',
        severity: 'MEDIUM',
        title: '低电量警报',
        description: `设备电量仅剩 ${trackingLog.batteryLevel}%`,
        location: JSON.stringify({
          lat: trackingLog.latitude,
          lng: trackingLog.longitude,
          address: trackingLog.address
        }),
        trackingLogId: trackingLog.id
      })
    }

    // 检查延迟
    if (shipment.estimatedArrival && new Date() > new Date(shipment.estimatedArrival)) {
      alerts.push({
        shipmentId: shipment.id,
        alertType: 'DELAY',
        severity: 'MEDIUM',
        title: '运输延迟警报',
        description: '预计到达时间已过，运输可能延迟',
        location: JSON.stringify({
          lat: trackingLog.latitude,
          lng: trackingLog.longitude,
          address: trackingLog.address
        }),
        trackingLogId: trackingLog.id
      })
    }

    // 创建警报
    for (const alert of alerts) {
      try {
        await prisma.trackingAlert.create({
          data: alert
        })
      } catch (error) {
        console.error('创建警报失败:', error)
      }
    }
  } catch (error) {
    console.error('检查警报失败:', error)
  }
}

// 辅助函数：检查检查点
async function checkCheckpoints(shipment: any, location: any) {
  try {
    const checkpoints = await prisma.trackingCheckpoint.findMany({
      where: {
        route: {
          shipmentId: shipment.id
        },
        status: 'PENDING'
      }
    })

    for (const checkpoint of checkpoints) {
      try {
        const checkpointCoords = JSON.parse(checkpoint.coordinates)
        const distance = await calculateDistance(
          location.latitude, location.longitude,
          checkpointCoords.lat, checkpointCoords.lng
        )

        if (distance <= checkpoint.radius / 1000) { // 转换为公里
          await prisma.trackingCheckpoint.update({
            where: { id: checkpoint.id },
            data: {
              status: 'ARRIVED',
              actualTime: new Date(),
              visitCount: { increment: 1 }
            }
          })
        }
      } catch (error) {
        console.error('检查检查点失败:', error)
      }
    }
  } catch (error) {
    console.error('获取检查点失败:', error)
  }
}

// 辅助函数：计算距离
async function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): Promise<number> {
  // 使用Haversine公式计算两点间距离
  const R = 6371 // 地球半径(公里)
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}