import { prisma } from '@/lib/db'
import {
  TrackingStatus,
  TrackingEvent,
  AlertType,
  AlertSeverity,
  RouteStatus,
  CheckpointType,
  CheckpointStatus
} from '@prisma/client'

export class TrackingService {
  /**
   * 更新运单位置
   */
  static async updateShipmentLocation(shipmentId: string, location: any) {
    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: {
        route: true,
        checkpoints: true
      }
    })

    if (!shipment) return

    // 计算运输进度
    const progress = await this.calculateProgress(shipment, location)

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
    await this.checkCheckpoints(shipment, location)

    // 更新路线统计
    if (shipment.route) {
      await this.updateRouteStats(shipment.route.id, location)
    }
  }

  /**
   * 计算运输进度
   */
  static async calculateProgress(shipment: any, currentLocation: any): Promise<number> {
    try {
      const origin = JSON.parse(shipment.originCoordinates || '{}')
      const destination = JSON.parse(shipment.destinationCoordinates || '{}')

      const totalDistance = await this.calculateDistance(
        origin.lat, origin.lng,
        destination.lat, destination.lng
      )

      const remainingDistance = await this.calculateDistance(
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

  /**
   * 检查并创建警报
   */
  static async checkAndCreateAlerts(shipment: any, trackingLog: any) {
    const alerts = []

    // 检查超速
    if (trackingLog.speed > 120) {
      alerts.push({
        shipmentId: shipment.id,
        alertType: AlertType.SPEEDING,
        severity: AlertSeverity.HIGH,
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
        alertType: AlertType.LOW_FUEL,
        severity: AlertSeverity.MEDIUM,
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

    // 检查路线偏离
    if (shipment.route) {
      const isOffRoute = await this.checkRouteDeviation(
        shipment.route,
        trackingLog.latitude,
        trackingLog.longitude
      )

      if (isOffRoute) {
        alerts.push({
          shipmentId: shipment.id,
          alertType: AlertType.DEVIATION,
          severity: AlertSeverity.MEDIUM,
          title: '路线偏离警报',
          description: '车辆偏离了预定路线',
          location: JSON.stringify({
            lat: trackingLog.latitude,
            lng: trackingLog.longitude,
            address: trackingLog.address
          }),
          trackingLogId: trackingLog.id
        })
      }
    }

    // 检查延迟
    if (shipment.estimatedArrival && new Date() > new Date(shipment.estimatedArrival)) {
      alerts.push({
        shipmentId: shipment.id,
        alertType: AlertType.DELAY,
        severity: AlertSeverity.MEDIUM,
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
        await this.sendAlertNotification(alert)
      } catch (error) {
        console.error('创建警报失败:', error)
      }
    }
  }

  /**
   * 获取跟踪路线
   */
  static async getTrackingRoute(shipmentId: string) {
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
      statistics: await this.calculateRouteStatistics(shipmentId)
    }

    return routeData
  }

  /**
   * 计算路线统计
   */
  static async calculateRouteStatistics(shipmentId: string) {
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
      const distance = await this.calculateDistance(
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

  /**
   * 计算距离（Haversine公式）
   */
  private static async calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): Promise<number> {
    const R = 6371 // 地球半径(公里)
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  /**
   * 检查路线偏离
   */
  private static async checkRouteDeviation(route: any, lat: number, lng: number): Promise<boolean> {
    try {
      const plannedRoute = JSON.parse(route.plannedRoute)
      // 简化版偏离检查，实际应该使用更复杂的算法
      let minDistance = Infinity

      for (const point of plannedRoute) {
        const distance = await this.calculateDistance(
          lat, lng, point.lat, point.lng
        )
        minDistance = Math.min(minDistance, distance)
      }

      // 如果偏离超过500米，认为偏离路线
      return minDistance > 0.5
    } catch (error) {
      console.error('检查路线偏离失败:', error)
      return false
    }
  }

  /**
   * 检查检查点
   */
  private static async checkCheckpoints(shipment: any, location: any) {
    if (!shipment.checkpoints || shipment.checkpoints.length === 0) return

    for (const checkpoint of shipment.checkpoints) {
      if (checkpoint.status !== CheckpointStatus.PENDING) continue

      try {
        const checkpointCoords = JSON.parse(checkpoint.coordinates)
        const distance = await this.calculateDistance(
          location.latitude, location.longitude,
          checkpointCoords.lat, checkpointCoords.lng
        )

        if (distance <= checkpoint.radius / 1000) { // 转换为公里
          await prisma.trackingCheckpoint.update({
            where: { id: checkpoint.id },
            data: {
              status: CheckpointStatus.ARRIVED,
              actualTime: new Date(),
              visitCount: { increment: 1 }
            }
          })
        }
      } catch (error) {
        console.error('检查检查点失败:', error)
      }
    }
  }

  /**
   * 更新路线统计
   */
  private static async updateRouteStats(routeId: string, location: any) {
    // 更新路线统计信息的实现
    // 这里可以根据实际需求添加更详细的统计逻辑
  }

  /**
   * 发送警报通知
   */
  private static async sendAlertNotification(alert: any) {
    // 发送警报通知的实现
    // 这里可以集成邮件、短信、推送等通知服务
    console.log('发送警报通知:', alert)
  }

  /**
   * 计算路线信息
   */
  static async calculateRouteInfo(route: any): Promise<{ distance: number; duration: number }> {
    // 简化版路线信息计算
    try {
      const points = JSON.parse(route)
      let totalDistance = 0

      for (let i = 1; i < points.length; i++) {
        const distance = await this.calculateDistance(
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

  /**
   * 获取运单跟踪历史
   */
  static async getShipmentTrackingHistory(shipmentId: string, options: any = {}) {
    const {
      startDate,
      endDate,
      limit = 100,
      offset = 0
    } = options

    const where: any = { shipmentId }

    if (startDate || endDate) {
      where.timestamp = {}
      if (startDate) where.timestamp.gte = startDate
      if (endDate) where.timestamp.lte = endDate
    }

    const [logs, total] = await Promise.all([
      prisma.trackingLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      }),
      prisma.trackingLog.count({ where })
    ])

    return {
      logs,
      total,
      pagination: {
        limit,
        offset,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  /**
   * 获取车辆当前位置
   */
  static async getVehicleCurrentLocation(vehicleId: string) {
    // 获取车辆最近的位置记录
    const recentLog = await prisma.trackingLog.findFirst({
      where: {
        shipment: {
          vehicleId: vehicleId
        }
      },
      orderBy: { timestamp: 'desc' },
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

    if (!recentLog) {
      return null
    }

    // 计算车辆状态
    const status = this.determineVehicleStatus(recentLog)

    return {
      ...recentLog,
      vehicleStatus: status,
      lastUpdate: recentLog.timestamp
    }
  }

  /**
   * 批量位置更新
   */
  static async batchLocationUpdates(shipmentId: string, updates: any[], deviceId?: string) {
    const results = []
    const errors = []

    for (const update of updates) {
      try {
        const trackingLog = await prisma.trackingLog.create({
          data: {
            shipmentId,
            latitude: update.latitude,
            longitude: update.longitude,
            address: update.address,
            altitude: update.altitude,
            accuracy: update.accuracy,
            speed: update.speed || 0,
            heading: update.heading || 0,
            status: TrackingStatus.NORMAL,
            timestamp: update.timestamp || new Date(),
            receivedAt: new Date(),
            deviceId,
            createdBy: 'batch'
          }
        })

        // 更新运单位置
        await this.updateShipmentLocation(shipmentId, update)

        results.push(trackingLog)
      } catch (error) {
        console.error('批量位置更新失败:', error)
        errors.push({
          update,
          error: error instanceof Error ? error.message : '未知错误'
        })
      }
    }

    return {
      success: true,
      results,
      errors,
      total: updates.length,
      successful: results.length,
      failed: errors.length
    }
  }

  /**
   * 确定车辆状态
   */
  private static determineVehicleStatus(log: any): string {
    const now = new Date()
    const logTime = new Date(log.timestamp)
    const timeDiff = now.getTime() - logTime.getTime()
    const minutesAgo = timeDiff / (1000 * 60)

    if (minutesAgo > 30) {
      return 'offline'
    }

    if (log.speed === 0) {
      return 'stopped'
    }

    if (log.speed > 120) {
      return 'speeding'
    }

    return 'moving'
  }

  /**
   * 获取跟踪仪表板数据
   */
  static async getTrackingDashboard() {
    const [
      activeShipments,
      totalShipments,
      alertsByType,
      alertsBySeverity,
      recentLogs,
      recentAlerts
    ] = await Promise.all([
      prisma.shipment.count({
        where: {
          status: {
            in: ['IN_TRANSIT', 'LOADING', 'UNLOADING']
          }
        }
      }),
      prisma.shipment.count(),
      prisma.trackingAlert.groupBy({
        by: ['alertType'],
        _count: { alertType: true }
      }),
      prisma.trackingAlert.groupBy({
        by: ['severity'],
        _count: { severity: true }
      }),
      prisma.trackingLog.findMany({
        orderBy: { timestamp: 'desc' },
        take: 10,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      }),
      prisma.trackingAlert.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { triggeredAt: 'desc' },
        take: 10,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      })
    ])

    const alertsByTypeMap = alertsByType.reduce((acc, item) => {
      acc[item.alertType] = item._count.alertType
      return acc
    }, {} as Record<string, number>)

    const alertsBySeverityMap = alertsBySeverity.reduce((acc, item) => {
      acc[item.severity] = item._count.severity
      return acc
    }, {} as Record<string, number>)

    return {
      activeShipments,
      totalShipments,
      alertsByType: alertsByTypeMap,
      alertsBySeverity: alertsBySeverityMap,
      recentLogs,
      recentAlerts
    }
  }

  /**
   * 清理过期数据
   */
  static async cleanupOldData(daysToKeep: number = 90) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

    const [deletedLogs, deletedAlerts] = await Promise.all([
      prisma.trackingLog.deleteMany({
        where: {
          timestamp: {
            lt: cutoffDate
          }
        }
      }),
      prisma.trackingAlert.deleteMany({
        where: {
          triggeredAt: {
            lt: cutoffDate
          },
          status: {
            in: ['RESOLVED', 'DISMISSED']
          }
        }
      })
    ])

    return {
      deletedLogs: deletedLogs.count,
      deletedAlerts: deletedAlerts.count,
      cutoffDate
    }
  }
}