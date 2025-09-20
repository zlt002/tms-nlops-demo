import { prisma } from '@/lib/db/prisma'
import { VehicleService } from '@/services/vehicleService'
import { OrderService } from '@/services/orderService'
import { OrderStatus, VehicleStatus } from '@prisma/client'

export class DispatchService {
  static async generateShipmentNumber(): string {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `SHIP${timestamp.slice(-6)}${random}`
  }

  static async createDispatch(data: any) {
    const { orderIds, vehicleId, driverId, route, estimatedDuration, estimatedDistance } = data

    // 验证订单状态
    const orders = await prisma.order.findMany({
      where: { id: { in: orderIds } }
    })

    if (orders.some(order => order.status !== OrderStatus.CONFIRMED)) {
      throw new Error('只能调度已确认的订单')
    }

    // 验证车辆状态
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle || vehicle.status !== VehicleStatus.AVAILABLE) {
      throw new Error('车辆不可用')
    }

    // 验证司机
    const driver = await prisma.driver.findUnique({
      where: { id: driverId }
    })

    if (!driver || driver.status !== 'AVAILABLE') {
      throw new Error('司机不可用')
    }

    // 创建发车单
    const dispatch = await prisma.dispatch.create({
      data: {
        dispatchNumber: await this.generateDispatchNumber(),
        vehicleId,
        driverId,
        status: 'SCHEDULED',
        plannedDeparture: new Date(),
        estimatedDuration,
        estimatedDistance,
        route: route || {},
        createdBy: 'system', // TODO: 从认证用户获取
        updatedBy: 'system'
      }
    })

    // 为每个订单创建运单
    const shipments = await Promise.all(
      orderIds.map((orderId: string, index: number) =>
        prisma.shipment.create({
          data: {
            shipmentNumber: await this.generateShipmentNumber(),
            orderId,
            dispatchId: dispatch.id,
            vehicleId,
            driverId,
            status: 'SCHEDULED',
            sequence: index + 1,
            estimatedDeparture: new Date(),
            estimatedArrival: new Date(Date.now() + (estimatedDuration || 24) * 60 * 60 * 1000),
            plannedRoute: route?.waypoints?.[index] || {},
            createdBy: 'system',
            updatedBy: 'system'
          }
        })
      )
    )

    // 更新订单状态
    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { status: OrderStatus.IN_TRANSIT }
    })

    // 更新车辆状态
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { status: VehicleStatus.IN_TRANSIT, driverId }
    })

    // 更新司机状态
    await prisma.driver.update({
      where: { id: driverId },
      data: { status: 'ON_DUTY' }
    })

    return {
      dispatch,
      shipments
    }
  }

  static async updateDispatchStatus(dispatchId: string, status: string, data?: any) {
    const updateData: any = {
      status,
      updatedBy: 'system', // TODO: 从认证用户获取
      updatedAt: new Date()
    }

    // 根据状态更新相应字段
    switch (status) {
      case 'DEPARTED':
        updateData.departedAt = new Date()
        break
      case 'IN_TRANSIT':
        updateData.departedAt = new Date()
        break
      case 'ARRIVED':
        updateData.arrivedAt = new Date()
        if (data?.actualDistance) updateData.actualDistance = data.actualDistance
        if (data?.actualDuration) updateData.actualDuration = data.actualDuration
        break
      case 'COMPLETED':
        updateData.completedAt = new Date()
        break
      case 'CANCELLED':
        updateData.cancelledAt = new Date()
        if (data?.reason) updateData.cancelReason = data.reason
        break
    }

    const dispatch = await prisma.dispatch.update({
      where: { id: dispatchId },
      data: updateData,
      include: {
        vehicle: true,
        driver: true,
        shipments: {
          include: {
            order: true
          }
        }
      }
    })

    // 如果是取消状态，释放车辆和司机
    if (status === 'CANCELLED') {
      await prisma.vehicle.update({
        where: { id: dispatch.vehicleId },
        data: { status: VehicleStatus.AVAILABLE, driverId: null }
      })

      await prisma.driver.update({
        where: { id: dispatch.driverId },
        data: { status: 'AVAILABLE' }
      })

      // 更新订单状态回已确认
      await prisma.order.updateMany({
        where: { id: { in: dispatch.shipments.map(s => s.orderId) } },
        data: { status: OrderStatus.CONFIRMED }
      })
    }

    return dispatch
  }

  static async getAvailableOrders() {
    const orders = await prisma.order.findMany({
      where: {
        status: OrderStatus.CONFIRMED,
        shipments: {
          none: {}
        }
      },
      include: {
        customer: true,
        _count: {
          select: {
            shipments: true
          }
        }
      },
      orderBy: {
        expectedTime: 'asc'
      }
    })

    return orders
  }

  static async getAvailableVehicles() {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        status: VehicleStatus.AVAILABLE,
        isActive: true
      },
      include: {
        driver: {
          where: { status: 'AVAILABLE' }
        },
        location: true
      }
    })

    return vehicles.filter(v => v.driver) // 只返回有司机的车辆
  }

  static async getDispatches(params: any = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      driverId,
      vehicleId,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (status) where.status = status
    if (driverId) where.driverId = driverId
    if (vehicleId) where.vehicleId = vehicleId

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }

    const [dispatches, total] = await Promise.all([
      prisma.dispatch.findMany({
        where,
        include: {
          vehicle: true,
          driver: true,
          shipments: {
            include: {
              order: {
                include: {
                  customer: true
                }
              }
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.dispatch.count({ where })
    ])

    return {
      dispatches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async optimizeRoute(orders: any[], vehicle: any) {
    // 简化版路线优化算法
    // 实际项目中应该使用专业的路径规划服务如Google Maps API或高德地图API

    // 计算总重量和体积
    const totalWeight = orders.reduce((sum, order) => sum + order.cargoWeight, 0)
    const totalVolume = orders.reduce((sum, order) => sum + order.cargoVolume, 0)

    // 检查车辆容量
    if (totalWeight > vehicle.maxLoad) {
      throw new Error('货物总重量超过车辆载重')
    }

    if (totalVolume > vehicle.maxVolume) {
      throw new Error('货物总体积超过车辆容量')
    }

    // 简单的最近邻算法
    const waypoints = this.calculateOptimalRoute(orders)

    return {
      waypoints,
      totalDistance: this.calculateTotalDistance(waypoints),
      estimatedDuration: this.calculateEstimatedDuration(waypoints),
      totalWeight,
      totalVolume
    }
  }

  private static calculateOptimalRoute(orders: any[]): any[] {
    // 简化版路径优化，实际应该使用真实的地址坐标
    const visited = new Set()
    const route = []
    let current = orders[0] // 从第一个订单开始

    route.push({
      type: 'pickup',
      order: current,
      address: current.originAddress,
      coordinates: this.getCoordinates(current.originAddress)
    })

    visited.add(current.id)

    // 找到最近的下一个点
    while (visited.size < orders.length) {
      let nearest = null
      let minDistance = Infinity

      for (const order of orders) {
        if (!visited.has(order.id)) {
          const distance = this.calculateDistance(
            this.getCoordinates(current.destinationAddress),
            this.getCoordinates(order.originAddress)
          )

          if (distance < minDistance) {
            minDistance = distance
            nearest = order
          }
        }
      }

      if (nearest) {
        route.push({
          type: 'pickup',
          order: nearest,
          address: nearest.originAddress,
          coordinates: this.getCoordinates(nearest.originAddress)
        })

        route.push({
          type: 'delivery',
          order: nearest,
          address: nearest.destinationAddress,
          coordinates: this.getCoordinates(nearest.destinationAddress)
        })

        visited.add(nearest.id)
        current = nearest
      }
    }

    // 最后添加第一个订单的配送点
    route.push({
      type: 'delivery',
      order: orders[0],
      address: orders[0].destinationAddress,
      coordinates: this.getCoordinates(orders[0].destinationAddress)
    })

    return route
  }

  private static calculateDistance(coord1: any, coord2: any): number {
    // 简化版距离计算
    return Math.sqrt(
      Math.pow(coord2.lat - coord1.lat, 2) + Math.pow(coord2.lng - coord1.lng, 2)
    ) * 111 // 转换为公里
  }

  private static calculateTotalDistance(waypoints: any[]): number {
    let total = 0
    for (let i = 0; i < waypoints.length - 1; i++) {
      total += this.calculateDistance(waypoints[i].coordinates, waypoints[i + 1].coordinates)
    }
    return total
  }

  private static calculateEstimatedDuration(waypoints: any[]): number {
    // 假设平均速度50km/h
    const totalDistance = this.calculateTotalDistance(waypoints)
    const drivingTime = (totalDistance / 50) * 60 // 分钟
    const stopTime = waypoints.length * 15 // 每个点停留15分钟
    return Math.ceil(drivingTime + stopTime)
  }

  private static getCoordinates(address: string): any {
    // 简化版，返回模拟坐标
    const hash = address.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    return {
      lat: 30 + (hash % 10),
      lng: 120 + (hash % 10)
    }
  }

  private static async generateDispatchNumber(): Promise<string> {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `DISP${timestamp.slice(-6)}${random}`
  }

  static async getDispatchStatistics(dateRange?: { start: Date; end: Date }) {
    const where: any = {}
    if (dateRange) {
      where.createdAt = {
        gte: dateRange.start,
        lte: dateRange.end
      }
    }

    const [
      totalDispatches,
      completedDispatches,
      inTransitDispatches,
      totalShipments,
      avgDispatchDuration,
      byVehicle,
      byDriver
    ] = await Promise.all([
      prisma.dispatch.count({ where }),
      prisma.dispatch.count({
        where: {
          ...where,
          status: 'COMPLETED'
        }
      }),
      prisma.dispatch.count({
        where: {
          ...where,
          status: 'IN_TRANSIT'
        }
      }),
      prisma.shipment.count({
        where: {
          dispatch: {
            ...where
          }
        }
      }),
      prisma.dispatch.aggregate({
        where: {
          ...where,
          status: 'COMPLETED',
          completedAt: { not: null },
          departedAt: { not: null }
        },
        _avg: {
          actualDuration: true
        }
      }),
      prisma.dispatch.groupBy({
        by: ['vehicleId'],
        where,
        _count: true
      }),
      prisma.dispatch.groupBy({
        by: ['driverId'],
        where,
        _count: true
      })
    ])

    return {
      totalDispatches,
      completedDispatches,
      inTransitDispatches,
      completionRate: totalDispatches > 0 ? (completedDispatches / totalDispatches) * 100 : 0,
      totalShipments,
      avgShipmentsPerDispatch: totalDispatches > 0 ? totalShipments / totalDispatches : 0,
      avgDispatchDuration: avgDispatchDuration._avg.actualDuration || 0,
      topVehicles: byVehicle.sort((a, b) => b._count.count - a._count.count).slice(0, 5),
      topDrivers: byDriver.sort((a, b) => b._count.count - a._count.count).slice(0, 5)
    }
  }
}
