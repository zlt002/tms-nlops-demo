import { prisma } from '@/lib/db/prisma'

export class TrackingService {
  static async reportLocation(data: any) {
    const {
      type, // 'vehicle' | 'driver' | 'shipment' | 'dispatch'
      typeId,
      latitude,
      longitude,
      address,
      speed,
      heading,
      accuracy,
      deviceId,
      additionalData
    } = data

    // 创建位置记录
    const trackingLog = await prisma.trackingLog.create({
      data: {
        type,
        typeId,
        latitude,
        longitude,
        address,
        speed,
        heading,
        accuracy,
        deviceId,
        additionalData: additionalData || {},
        timestamp: new Date()
      }
    })

    // 更新实时位置
    switch (type) {
      case 'vehicle':
        await this.updateVehicleLocation(typeId, data)
        break
      case 'driver':
        await this.updateDriverLocation(typeId, data)
        break
      case 'shipment':
        await this.updateShipmentLocation(typeId, data)
        break
      case 'dispatch':
        await this.updateDispatchLocation(typeId, data)
        break
    }

    // 检查地理围栏
    await this.checkGeofences(trackingLog)

    return trackingLog
  }

  static async getTrackingHistory(params: any) {
    const {
      type,
      typeId,
      startDate,
      endDate,
      page = 1,
      limit = 100
    } = params

    const where: any = {
      type,
      typeId
    }

    if (startDate || endDate) {
      where.timestamp = {}
      if (startDate) where.timestamp.gte = new Date(startDate)
      if (endDate) where.timestamp.lte = new Date(endDate)
    }

    const [logs, total] = await Promise.all([
      prisma.trackingLog.findMany({
        where,
        orderBy: { timestamp: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.trackingLog.count({ where })
    ])

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getCurrentLocation(type: string, typeId: string) {
    const log = await prisma.trackingLog.findFirst({
      where: {
        type,
        typeId
      },
      orderBy: { timestamp: 'desc' }
    })

    return log
  }

  static async getTrackingRoute(type: string, typeId: string, params: any = {}) {
    const {
      startDate,
      endDate,
      simplify = true,
      tolerance = 0.0001
    } = params

    const where: any = {
      type,
      typeId
    }

    if (startDate || endDate) {
      where.timestamp = {}
      if (startDate) where.timestamp.gte = new Date(startDate)
      if (endDate) where.timestamp.lte = new Date(endDate)
    }

    const logs = await prisma.trackingLog.findMany({
      where,
      select: {
        latitude: true,
        longitude: true,
        timestamp: true,
        speed: true
      },
      orderBy: { timestamp: 'asc' }
    })

    // 路线简化（Douglas-Peucker算法）
    if (simplify && logs.length > 2) {
      return this.simplifyRoute(logs, tolerance)
    }

    return logs
  }

  static async getTrackingStats(type: string, typeId: string, dateRange?: { start: Date; end: Date }) {
    const where: any = {
      type,
      typeId
    }

    if (dateRange) {
      where.timestamp = {
        gte: dateRange.start,
        lte: dateRange.end
      }
    }

    const [
      totalRecords,
      firstRecord,
      lastRecord,
      avgSpeed,
      maxSpeed,
      totalDistance
    ] = await Promise.all([
      prisma.trackingLog.count({ where }),
      prisma.trackingLog.findFirst({ where, orderBy: { timestamp: 'asc' } }),
      prisma.trackingLog.findFirst({ where, orderBy: { timestamp: 'desc' } }),
      prisma.trackingLog.aggregate({
        where,
        _avg: { speed: true },
        _max: { speed: true }
      })
    ])

    // 计算总距离
    const logs = await prisma.trackingLog.findMany({
      where,
      select: { latitude: true, longitude: true },
      orderBy: { timestamp: 'asc' }
    })

    const distance = this.calculateTotalDistance(logs)

    return {
      totalRecords,
      firstRecord,
      lastRecord,
      avgSpeed: avgSpeed._avg.speed || 0,
      maxSpeed: maxSpeed._max.speed || 0,
      totalDistance: distance,
      duration: firstRecord && lastRecord ?
        lastRecord.timestamp.getTime() - firstRecord.timestamp.getTime() : 0
    }
  }

  static async createGeofence(data: any) {
    const {
      name,
      type,
      typeId,
      geometry, // GeoJSON格式
      radius,
      notificationSettings
    } = data

    return await prisma.geofence.create({
      data: {
        name,
        type,
        typeId,
        geometry,
        radius,
        notificationSettings: notificationSettings || {},
        isActive: true,
        createdBy: 'system', // TODO: 从认证用户获取
        createdAt: new Date()
      }
    })
  }

  static async checkGeofences(trackingLog: any) {
    const geofences = await prisma.geofence.findMany({
      where: {
        type: trackingLog.type,
        typeId: trackingLog.typeId,
        isActive: true
      }
    })

    for (const geofence of geofences) {
      const isInside = this.isPointInGeofence(
        { lat: trackingLog.latitude, lng: trackingLog.longitude },
        geofence
      )

      // 检查状态变化
      const lastEvent = await prisma.geofenceEvent.findFirst({
        where: {
          geofenceId: geofence.id,
          trackingLogId: trackingLog.id
        },
        orderBy: { createdAt: 'desc' }
      })

      const currentStatus = isInside ? 'inside' : 'outside'
      const lastStatus = lastEvent?.status || 'outside'

      if (currentStatus !== lastStatus) {
        // 创建地理围栏事件
        await prisma.geofenceEvent.create({
          data: {
            geofenceId: geofence.id,
            trackingLogId: trackingLog.id,
            status: currentStatus,
            triggeredBy: 'automatic',
            createdAt: new Date()
          }
        })

        // 发送通知（简化版）
        if (geofence.notificationSettings?.enabled) {
          await this.sendGeofenceNotification(geofence, trackingLog, currentStatus)
        }
      }
    }
  }

  private static async updateVehicleLocation(vehicleId: string, data: any) {
    await prisma.vehicleLocation.upsert({
      where: { vehicleId },
      update: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        speed: data.speed,
        heading: data.heading,
        accuracy: data.accuracy,
        timestamp: new Date()
      },
      create: {
        vehicleId,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        speed: data.speed,
        heading: data.heading,
        accuracy: data.accuracy,
        timestamp: new Date()
      }
    })

    // 添加到历史记录
    await prisma.vehicleLocationHistory.create({
      data: {
        vehicleId,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        speed: data.speed,
        heading: data.heading,
        timestamp: new Date()
      }
    })
  }

  private static async updateDriverLocation(driverId: string, data: any) {
    await prisma.driverLocation.upsert({
      where: { driverId },
      update: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        speed: data.speed,
        heading: data.heading,
        timestamp: new Date()
      },
      create: {
        driverId,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        speed: data.speed,
        heading: data.heading,
        timestamp: new Date()
      }
    })
  }

  private static async updateShipmentLocation(shipmentId: string, data: any) {
    await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        currentLocation: {
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          timestamp: new Date()
        }
      }
    })
  }

  private static async updateDispatchLocation(dispatchId: string, data: any) {
    await prisma.dispatch.update({
      where: { id: dispatchId },
      data: {
        currentLocation: {
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          timestamp: new Date()
        }
      }
    })
  }

  private static calculateTotalDistance(logs: any[]): number {
    let total = 0
    for (let i = 1; i < logs.length; i++) {
      total += this.calculateDistance(
        { lat: logs[i - 1].latitude, lng: logs[i - 1].longitude },
        { lat: logs[i].latitude, lng: logs[i].longitude }
      )
    }
    return total
  }

  private static calculateDistance(point1: any, point2: any): number {
    const R = 6371 // 地球半径（公里）
    const dLat = (point2.lat - point1.lat) * Math.PI / 180
    const dLon = (point2.lng - point1.lng) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private static simplifyRoute(points: any[], tolerance: number): any[] {
    // Douglas-Peucker算法简化路线
    if (points.length <= 2) return points

    let maxDistance = 0
    let maxIndex = 0

    for (let i = 1; i < points.length - 1; i++) {
      const distance = this.perpendicularDistance(
        points[i],
        points[0],
        points[points.length - 1]
      )
      if (distance > maxDistance) {
        maxDistance = distance
        maxIndex = i
      }
    }

    if (maxDistance > tolerance) {
      const left = points.slice(0, maxIndex + 1)
      const right = points.slice(maxIndex)
      const simplifiedLeft = this.simplifyRoute(left, tolerance)
      const simplifiedRight = this.simplifyRoute(right, tolerance)

      return simplifiedLeft.slice(0, -1).concat(simplifiedRight)
    }

    return [points[0], points[points.length - 1]]
  }

  private static perpendicularDistance(point: any, lineStart: any, lineEnd: any): number {
    const dx = lineEnd.longitude - lineStart.longitude
    const dy = lineEnd.latitude - lineStart.latitude
    const mag = Math.sqrt(dx * dx + dy * dy)

    if (mag === 0) {
      return this.calculateDistance(point, lineStart)
    }

    const u =
      ((point.longitude - lineStart.longitude) * dx +
       (point.latitude - lineStart.latitude) * dy) /
      (mag * mag)

    let closestPoint
    if (u < 0) {
      closestPoint = lineStart
    } else if (u > 1) {
      closestPoint = lineEnd
    } else {
      closestPoint = {
        longitude: lineStart.longitude + u * dx,
        latitude: lineStart.latitude + u * dy
      }
    }

    return this.calculateDistance(point, closestPoint)
  }

  private static isPointInGeofence(point: any, geofence: any): boolean {
    if (geofence.radius) {
      // 圆形地理围栏
      const center = geofence.geometry.coordinates
      const distance = this.calculateDistance(point, { lat: center[1], lng: center[0] })
      return distance <= geofence.radius
    }

    // 多边形地理围栏（简化版）
    // 实际应该使用Ray Casting算法
    return false
  }

  private static async sendGeofenceNotification(geofence: any, trackingLog: any, status: string) {
    // 简化版通知发送
    console.log(`Geofence notification: ${geofence.name} - ${status}`)
    // 实际项目中应该集成推送服务
  }
}
