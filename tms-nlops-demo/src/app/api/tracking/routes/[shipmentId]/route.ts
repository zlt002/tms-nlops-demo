import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createTrackingRouteSchema } from '@/lib/validators/tracking'

export async function GET(
  request: NextRequest,
  { params }: { params: { shipmentId: string } }
) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: params.shipmentId }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    // 获取完整的轨迹信息
    const trackingData = await getTrackingRoute(params.shipmentId)

    return NextResponse.json({
      success: true,
      data: trackingData
    })
  } catch (error) {
    console.error('获取轨迹信息失败:', error)
    return NextResponse.json(
      { error: '获取轨迹信息失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { shipmentId: string } }
) {
  try {
    const body = await request.json()
    const { plannedRoute, checkpoints } = body

    const validatedData = createTrackingRouteSchema.parse({
      shipmentId: params.shipmentId,
      plannedRoute,
      distance: body.distance || 0,
      duration: body.duration || 0,
      checkpoints
    })

    const shipment = await prisma.shipment.findUnique({
      where: { id: params.shipmentId }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    // 计算路线信息
    const routeInfo = await calculateRouteInfo(validatedData.plannedRoute)

    // 创建或更新路线
    const route = await prisma.trackingRoute.upsert({
      where: { shipmentId: params.shipmentId },
      update: {
        plannedRoute: validatedData.plannedRoute,
        distance: routeInfo.distance,
        duration: routeInfo.duration,
        status: 'PLANNED'
      },
      create: {
        shipmentId: params.shipmentId,
        plannedRoute: validatedData.plannedRoute,
        distance: routeInfo.distance,
        duration: routeInfo.duration,
        status: 'PLANNED'
      }
    })

    // 创建检查点
    if (validatedData.checkpoints && validatedData.checkpoints.length > 0) {
      await prisma.trackingCheckpoint.deleteMany({
        where: { routeId: route.id }
      })

      const checkpointData = validatedData.checkpoints.map((checkpoint: any, index: number) => ({
        routeId: route.id,
        name: checkpoint.name,
        type: checkpoint.type,
        address: checkpoint.address,
        coordinates: checkpoint.coordinates,
        radius: checkpoint.radius || 100,
        estimatedTime: checkpoint.estimatedTime,
        isRequired: checkpoint.isRequired ?? true,
        notes: checkpoint.notes,
        order: index
      }))

      await prisma.trackingCheckpoint.createMany({
        data: checkpointData
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        route,
        checkpoints: validatedData.checkpoints || []
      },
      message: '路线创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建路线失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '创建路线失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：获取轨迹信息
async function getTrackingRoute(shipmentId: string) {
  const shipment = await prisma.shipment.findUnique({
    where: { id: shipmentId },
    include: {
      route: {
        include: {
          checkpoints: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  })

  if (!shipment) {
    throw new Error('运单不存在')
  }

  // 获取最近的跟踪点
  const recentLogs = await prisma.trackingLog.findMany({
    where: { shipmentId },
    orderBy: { timestamp: 'desc' },
    take: 1000
  })

  const routeData = {
    shipment: {
      id: shipment.id,
      shipmentNumber: shipment.shipmentNumber,
      originAddress: shipment.originAddress,
      destinationAddress: shipment.destinationAddress,
      status: shipment.status,
      progress: shipment.progress || 0
    },
    plannedRoute: shipment.route,
    actualRoute: recentLogs.reverse().map(log => ({
      latitude: log.latitude,
      longitude: log.longitude,
      address: log.address,
      timestamp: log.timestamp,
      speed: log.speed,
      status: log.status
    })),
    statistics: await calculateRouteStatistics(shipmentId)
  }

  return routeData
}

// 辅助函数：计算路线统计
async function calculateRouteStatistics(shipmentId: string) {
  const logs = await prisma.trackingLog.findMany({
    where: { shipmentId },
    orderBy: { timestamp: 'asc' }
  })

  if (logs.length < 2) {
    return {
      totalDistance: 0,
      totalDuration: 0,
      avgSpeed: 0,
      maxSpeed: 0,
      stops: 0,
      idleTime: 0
    }
  }

  let totalDistance = 0
  let totalDuration = 0
  let maxSpeed = 0
  let speedSum = 0
  let stops = 0
  let idleTime = 0

  for (let i = 1; i < logs.length; i++) {
    const prevLog = logs[i - 1]
    const currentLog = logs[i]

    // 计算距离
    const distance = await calculateDistance(
      prevLog.latitude, prevLog.longitude,
      currentLog.latitude, currentLog.longitude
    )
    totalDistance += distance

    // 计算时间
    const timeDiff = currentLog.timestamp.getTime() - prevLog.timestamp.getTime()
    totalDuration += timeDiff

    // 速度统计
    if (currentLog.speed > maxSpeed) {
      maxSpeed = currentLog.speed
    }
    speedSum += currentLog.speed

    // 检查停车
    if (currentLog.speed === 0 && prevLog.speed === 0) {
      stops++
      idleTime += timeDiff / (1000 * 60) // 转换为分钟
    }
  }

  return {
    totalDistance: Math.round(totalDistance * 100) / 100,
    totalDuration: Math.round(totalDuration / (1000 * 60)), // 转换为分钟
    avgSpeed: Math.round((speedSum / logs.length) * 100) / 100,
    maxSpeed: Math.round(maxSpeed * 100) / 100,
    stops,
    idleTime: Math.round(idleTime * 100) / 100
  }
}

// 辅助函数：计算路线信息
async function calculateRouteInfo(route: string): Promise<{ distance: number; duration: number }> {
  // 简化版路线信息计算
  try {
    const points = JSON.parse(route)
    let totalDistance = 0

    for (let i = 1; i < points.length; i++) {
      const distance = await calculateDistance(
        points[i-1].lat, points[i-1].lng,
        points[i].lat, points[i].lng
      )
      totalDistance += distance
    }

    const avgSpeed = 60 // 假设平均时速60公里
    const duration = Math.ceil((totalDistance / avgSpeed) * 60) // 转换为分钟

    return {
      distance: Math.round(totalDistance * 100) / 100,
      duration
    }
  } catch (error) {
    console.error('计算路线信息失败:', error)
    return { distance: 0, duration: 0 }
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