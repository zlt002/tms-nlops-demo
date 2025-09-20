import { NextRequest, NextResponse } from 'next/server'
import { TrackingService } from '@/services/trackingService'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 检查车辆是否存在
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            licenseNumber: true
          }
        },
        shipments: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true,
            originAddress: true,
            destinationAddress: true,
            scheduledDeparture: true,
            scheduledArrival: true,
            actualDeparture: true,
            actualArrival: true,
            progress: true,
            currentLocation: true,
            currentCoordinates: true
          }
        }
      }
    })

    if (!vehicle) {
      return NextResponse.json(
        { error: '车辆不存在' },
        { status: 404 }
      )
    }

    // 获取车辆当前位置
    const currentLocation = await TrackingService.getVehicleCurrentLocation(params.id)

    // 获取车辆最近的跟踪历史
    const recentTracking = await prisma.trackingLog.findMany({
      where: {
        shipment: {
          vehicleId: params.id
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
      },
      orderBy: { timestamp: 'desc' },
      take: 50
    })

    // 获取车辆相关的警报
    const recentAlerts = await prisma.trackingAlert.findMany({
      where: {
        shipment: {
          vehicleId: params.id
        },
        triggeredAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 最近7天
        }
      },
      include: {
        shipment: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true
          }
        },
        trackingLog: {
          select: {
            id: true,
            timestamp: true,
            latitude: true,
            longitude: true,
            speed: true
          }
        }
      },
      orderBy: { triggeredAt: 'desc' },
      take: 20
    })

    // 计算车辆统计信息
    const vehicleStats = await calculateVehicleStats(params.id)

    // 获取车辆当前执行的运单
    const currentShipment = await prisma.shipment.findFirst({
      where: {
        vehicleId: params.id,
        status: {
          in: ['IN_TRANSIT', 'LOADING', 'UNLOADING']
        }
      },
      include: {
        route: {
          include: {
            checkpoints: {
              where: { status: 'PENDING' },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    })

    // 计算车辆状态
    const vehicleStatus = determineVehicleStatus(currentLocation, vehicle.lastMaintenance)

    return NextResponse.json({
      success: true,
      data: {
        vehicle: {
          id: vehicle.id,
          licensePlate: vehicle.licensePlate,
          type: vehicle.type,
          model: vehicle.model,
          year: vehicle.year,
          capacity: vehicle.capacity,
          status: vehicle.status,
          fuelLevel: vehicle.fuelLevel,
          mileage: vehicle.mileage,
          lastMaintenance: vehicle.lastMaintenance,
          nextMaintenance: vehicle.nextMaintenance,
          driver: vehicle.driver
        },
        currentLocation,
        vehicleStatus,
        currentShipment,
        recentTracking,
        recentAlerts,
        statistics: vehicleStats
      }
    })
  } catch (error) {
    console.error('获取车辆位置信息失败:', error)
    return NextResponse.json(
      { error: '获取车辆位置信息失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：计算车辆统计信息
async function calculateVehicleStats(vehicleId: string) {
  const [
    totalShipments,
    activeShipments,
    completedShipments,
    totalDistance,
    totalDuration,
    alertsByType,
    fuelConsumption
  ] = await Promise.all([
    prisma.shipment.count({
      where: { vehicleId }
    }),
    prisma.shipment.count({
      where: {
        vehicleId,
        status: {
          in: ['IN_TRANSIT', 'LOADING', 'UNLOADING']
        }
      }
    }),
    prisma.shipment.count({
      where: {
        vehicleId,
        status: {
          in: ['DELIVERED', 'COMPLETED']
        }
      }
    }),
    prisma.trackingLog.findMany({
      where: {
        shipment: {
          vehicleId
        }
      },
      select: {
        latitude: true,
        longitude: true,
        timestamp: true
      }
    }),
    prisma.shipment.findMany({
      where: {
        vehicleId,
        status: {
          in: ['DELIVERED', 'COMPLETED']
        }
      },
      select: {
        actualDeparture: true,
        actualArrival: true
      }
    }),
    prisma.trackingAlert.groupBy({
      by: ['alertType'],
      where: {
        shipment: {
          vehicleId
        }
      },
      _count: { alertType: true }
    }),
    prisma.shipment.aggregate({
      where: {
        vehicleId,
        status: {
          in: ['DELIVERED', 'COMPLETED']
        }
      },
      _sum: {
        fuelUsed: true
      }
    })
  ])

  // 计算总距离
  let calculatedDistance = 0
  if (totalDistance.length > 1) {
    for (let i = 1; i < totalDistance.length; i++) {
      const distance = await TrackingService['calculateDistance'](
        totalDistance[i-1].latitude,
        totalDistance[i-1].longitude,
        totalDistance[i].latitude,
        totalDistance[i].longitude
      )
      calculatedDistance += distance
    }
  }

  // 计算总运输时间
  let totalTransportTime = 0
  totalDuration.forEach(shipment => {
    if (shipment.actualDeparture && shipment.actualArrival) {
      const duration = shipment.actualArrival.getTime() - shipment.actualDeparture.getTime()
      totalTransportTime += duration
    }
  })

  // 计算平均速度
  const avgSpeed = totalTransportTime > 0 ? (calculatedDistance / (totalTransportTime / (1000 * 60 * 60))) : 0

  // 按类型统计警报
  const alertsByTypeMap = alertsByType.reduce((acc, item) => {
    acc[item.alertType] = item._count.alertType
    return acc
  }, {} as Record<string, number>)

  return {
    totalShipments,
    activeShipments,
    completedShipments,
    totalDistance: Math.round(calculatedDistance * 100) / 100,
    totalTransportTime: Math.round(totalTransportTime / (1000 * 60 * 60)), // 转换为小时
    avgSpeed: Math.round(avgSpeed * 100) / 100,
    totalFuelUsed: fuelConsumption._sum.fuelUsed || 0,
    alertsByType: alertsByTypeMap
  }
}

// 辅助函数：确定车辆状态
function determineVehicleStatus(currentLocation: any, lastMaintenance: Date | null) {
  const now = new Date()

  // 检查维护状态
  if (lastMaintenance) {
    const maintenanceThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) // 30天
    if (lastMaintenance < maintenanceThreshold) {
      return 'maintenance_needed'
    }
  }

  // 检查在线状态
  if (!currentLocation) {
    return 'offline'
  }

  const lastUpdate = new Date(currentLocation.timestamp)
  const timeDiff = now.getTime() - lastUpdate.getTime()
  const hoursAgo = timeDiff / (1000 * 60 * 60)

  if (hoursAgo > 2) {
    return 'offline'
  }

  // 根据速度确定状态
  if (currentLocation.speed === 0) {
    return 'stopped'
  }

  if (currentLocation.speed > 120) {
    return 'speeding'
  }

  return 'moving'
}