import { prisma } from '@/lib/db/prisma'
import { VehicleService } from '@/services/vehicleService'
import { OrderService } from '@/services/orderService'
import { OrderStatus, VehicleStatus, DispatchStatus, DriverStatus } from '@prisma/client'
import type {
  CreateDispatchRequest,
  UpdateDispatchRequest,
  DispatchQueryParams,
  RouteOptimizationRequest,
  RouteOptimizationResult,
  DispatchStatistics,
  VehicleScore,
  DispatchOptimization
} from '@/types/dispatch'

export class DispatchService {
  static async generateShipmentNumber(): string {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `SHIP${timestamp.slice(-6)}${random}`
  }

  static async createDispatch(data: CreateDispatchRequest) {
    const { orderIds, vehicleId, driverId, plannedDeparture, originAddress, destinationAddress, totalWeight, totalVolume, totalValue, route, instructions, requirements, notes } = data

    // 验证订单状态
    const orders = await prisma.order.findMany({
      where: { id: { in: orderIds } }
    })

    if (orders.some(order => order.status !== OrderStatus.CONFIRMED)) {
      throw new Error('只能调度已确认的订单')
    }

    // 计算总货物信息
    const calculatedTotalWeight = totalWeight || orders.reduce((sum, order) => sum + order.cargoWeight, 0)
    const calculatedTotalVolume = totalVolume || orders.reduce((sum, order) => sum + order.cargoVolume, 0)
    const calculatedTotalValue = totalValue || orders.reduce((sum, order) => sum + (order.cargoValue || 0), 0)

    // 验证车辆状态
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle || vehicle.status !== VehicleStatus.AVAILABLE) {
      throw new Error('车辆不可用')
    }

    // 验证车辆容量
    if (calculatedTotalWeight > vehicle.maxLoad) {
      throw new Error('货物总重量超过车辆载重')
    }

    if (calculatedTotalVolume > vehicle.maxVolume) {
      throw new Error('货物总体积超过车辆容量')
    }

    // 验证司机
    const driver = await prisma.driver.findUnique({
      where: { id: driverId }
    })

    if (!driver || driver.status !== DriverStatus.AVAILABLE) {
      throw new Error('司机不可用')
    }

    // 计算距离和预计时间
    const distance = await this.calculateDistance(originAddress, destinationAddress)
    const estimatedDuration = Math.ceil(distance / 60) // 假设平均时速60km/h

    // 计算费用
    const baseRate = await this.calculateBaseRate(vehicle, distance)
    const fuelSurcharge = this.calculateFuelSurcharge(distance)
    const tollFees = await this.estimateTollFees(originAddress, destinationAddress)
    const totalAmount = baseRate + fuelSurcharge + tollFees

    // 获取客户ID（从第一个订单）
    const customerId = orders[0].customerId

    // 创建发车单
    const dispatch = await prisma.dispatch.create({
      data: {
        dispatchNumber: await this.generateDispatchNumber(),
        customerId,
        vehicleId,
        driverId,
        originAddress,
        destinationAddress,
        distance,
        estimatedDuration,
        plannedDeparture,
        estimatedArrival: new Date(plannedDeparture.getTime() + estimatedDuration * 60 * 60 * 1000),
        totalWeight: calculatedTotalWeight,
        totalVolume: calculatedTotalVolume,
        totalValue: calculatedTotalValue,
        baseRate,
        fuelSurcharge,
        tollFees,
        additionalCharges: 0,
        totalAmount,
        status: DispatchStatus.SCHEDULED,
        route: route || null,
        instructions,
        requirements,
        notes,
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
            customerId,
            orderId,
            dispatchId: dispatch.id,
            vehicleId,
            driverId,
            originAddress: orders.find(o => o.id === orderId)?.originAddress || originAddress,
            destinationAddress: orders.find(o => o.id === orderId)?.destinationAddress || destinationAddress,
            weight: orders.find(o => o.id === orderId)?.cargoWeight || calculatedTotalWeight / orderIds.length,
            volume: orders.find(o => o.id === orderId)?.cargoVolume || calculatedTotalVolume / orderIds.length,
            value: orders.find(o => o.id === orderId)?.cargoValue || calculatedTotalValue / orderIds.length,
            departureTime: plannedDeparture,
            estimatedArrival: new Date(plannedDeparture.getTime() + estimatedDuration * 60 * 60 * 1000),
            status: 'SCHEDULED',
            sequence: index + 1,
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
      data: { status: VehicleStatus.IN_TRANSIT }
    })

    // 更新司机状态
    await prisma.driver.update({
      where: { id: driverId },
      data: { status: DriverStatus.ON_DUTY }
    })

    return {
      dispatch,
      shipments
    }
  }

  static async updateDispatchStatus(dispatchId: string, status: DispatchStatus, data?: { actualDistance?: number; actualDuration?: number; reason?: string }) {
    const existingDispatch = await prisma.dispatch.findUnique({
      where: { id: dispatchId }
    })

    if (!existingDispatch) {
      throw new Error('发车单不存在')
    }

    // 检查状态转换是否有效
    const validTransitions = {
      [DispatchStatus.PLANNING]: [DispatchStatus.SCHEDULED, DispatchStatus.CANCELLED],
      [DispatchStatus.SCHEDULED]: [DispatchStatus.ASSIGNED, DispatchStatus.CANCELLED],
      [DispatchStatus.ASSIGNED]: [DispatchStatus.IN_TRANSIT, DispatchStatus.CANCELLED],
      [DispatchStatus.IN_TRANSIT]: [DispatchStatus.COMPLETED, DispatchStatus.DELAYED, DispatchStatus.CANCELLED],
      [DispatchStatus.COMPLETED]: [],
      [DispatchStatus.CANCELLED]: [],
      [DispatchStatus.DELAYED]: [DispatchStatus.IN_TRANSIT, DispatchStatus.COMPLETED, DispatchStatus.CANCELLED]
    }

    if (!validTransitions[existingDispatch.status].includes(status)) {
      throw new Error(`无法从 ${existingDispatch.status} 转换到 ${status}`)
    }

    const updateData: any = {
      status,
      updatedBy: 'system', // TODO: 从认证用户获取
      updatedAt: new Date()
    }

    // 根据状态更新相应字段
    switch (status) {
      case DispatchStatus.ASSIGNED:
        updateData.actualDeparture = new Date()
        break
      case DispatchStatus.IN_TRANSIT:
        updateData.actualDeparture = new Date()
        break
      case DispatchStatus.COMPLETED:
        updateData.actualArrival = new Date()
        updateData.completedAt = new Date()
        if (data?.actualDistance) updateData.distance = data.actualDistance
        if (data?.actualDuration) updateData.estimatedDuration = data.actualDuration
        break
      case DispatchStatus.CANCELLED:
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

    // 更新相关资源状态
    await this.updateResourceStatus(dispatch, status)

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

  static async getDispatches(params: DispatchQueryParams = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      driverId,
      vehicleId,
      customerId,
      startDate,
      endDate,
      origin,
      destination,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (status) where.status = status
    if (driverId) where.driverId = driverId
    if (vehicleId) where.vehicleId = vehicleId
    if (customerId) where.customerId = customerId

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }

    if (origin) where.originAddress = { contains: origin }
    if (destination) where.destinationAddress = { contains: destination }

    const [dispatches, total] = await Promise.all([
      prisma.dispatch.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              customerNumber: true,
              companyName: true,
              email: true,
              phone: true
            }
          },
          vehicle: {
            select: {
              id: true,
              licensePlate: true,
              type: true,
              maxLoad: true,
              maxVolume: true,
              status: true
            }
          },
          driver: {
            select: {
              id: true,
              name: true,
              phone: true,
              licenseNumber: true,
              rating: true,
              status: true
            }
          },
          shipments: {
            include: {
              order: {
                select: {
                  id: true,
                  orderNumber: true,
                  cargoName: true,
                  totalAmount: true
                }
              }
            },
            orderBy: { sequence: 'asc' }
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

  static async optimizeRoute(request: RouteOptimizationRequest): Promise<RouteOptimizationResult> {
    const { orderIds, vehicleId, preferences } = request

    // 获取订单和车辆信息
    const orders = await Promise.all(
      orderIds.map(id => prisma.order.findUnique({ where: { id } }))
    )

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { driver: true }
    })

    if (!orders.every(o => o) || !vehicle) {
      throw new Error('订单或车辆不存在')
    }

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

  // 获取待调度的订单
  static async getPendingOrders() {
    const orders = await prisma.order.findMany({
      where: {
        status: OrderStatus.CONFIRMED,
        shipments: {
          none: {}
        }
      },
      include: {
        customer: {
          select: {
            id: true,
            customerNumber: true,
            companyName: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        expectedTime: 'asc',
        priority: 'desc'
      }
    })

    return orders
  }

  // 智能调度：找到最优车辆和司机组合
  static async findOptimalVehicle(orderData: any, scheduledTime: Date) {
    const { cargoWeight, cargoVolume, originAddress, destinationAddress } = orderData

    // 获取可用车辆
    const availableVehicles = await prisma.vehicle.findMany({
      where: {
        status: VehicleStatus.AVAILABLE,
        isActive: true,
        maxLoad: { gte: cargoWeight },
        maxVolume: { gte: cargoVolume }
      },
      include: {
        drivers: {
          where: {
            status: DriverStatus.AVAILABLE,
            isActive: true
          }
        }
      }
    })

    if (availableVehicles.length === 0) {
      throw new Error('没有可用的车辆')
    }

    // 计算距离和评分
    const vehicleScores = await Promise.all(
      availableVehicles.map(async (vehicle) => {
        if (!vehicle.drivers || vehicle.drivers.length === 0) {
          return null
        }

        const driver = vehicle.drivers[0]
        const distance = await this.calculateDistance(
          vehicle.currentLocation || originAddress,
          originAddress
        )

        // 计算综合评分
        const distanceScore = Math.max(0, 100 - distance) // 距离越近评分越高
        const vehicleScore = this.calculateVehicleScore(vehicle)
        const driverScore = this.calculateDriverScore(driver)

        const totalScore = (distanceScore * 0.4) + (vehicleScore * 0.3) + (driverScore * 0.3)

        return {
          vehicle,
          driver,
          distance,
          score: totalScore
        }
      })
    )

    // 过滤掉无效结果并按评分排序
    const validScores = vehicleScores.filter(score => score !== null) as VehicleScore[]
    if (validScores.length === 0) {
      throw new Error('没有可用的驾驶员')
    }

    return validScores.sort((a, b) => b.score - a.score)[0]
  }

  // 智能调度优化
  static async optimizeDispatch(date: Date) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0))
    const endOfDay = new Date(date.setHours(23, 59, 59, 999))

    // 获取当天的所有待调度订单
    const orders = await prisma.order.findMany({
      where: {
        expectedTime: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: OrderStatus.CONFIRMED,
        shipments: {
          none: {}
        }
      },
      orderBy: {
        priority: 'desc',
        expectedTime: 'asc'
      }
    })

    if (orders.length === 0) {
      return { message: '没有需要调度的订单' }
    }

    const results = []
    for (const order of orders) {
      try {
        const optimalMatch = await this.findOptimalVehicle(order, order.expectedTime)
        if (!optimalMatch) {
          results.push({
            orderId: order.id,
            error: '无法找到合适的车辆和驾驶员',
            status: 'failed'
          })
          continue
        }

        // 创建发车单
        const dispatch = await this.createDispatch({
          orderIds: [order.id],
          vehicleId: optimalMatch.vehicle.id,
          driverId: optimalMatch.driver.id,
          plannedDeparture: order.expectedTime,
          originAddress: order.originAddress,
          destinationAddress: order.destinationAddress,
          totalWeight: order.cargoWeight,
          totalVolume: order.cargoVolume,
          totalValue: order.cargoValue
        })

        results.push({
          orderId: order.id,
          dispatchId: dispatch.dispatch.id,
          status: 'success'
        })
      } catch (error) {
        results.push({
          orderId: order.id,
          error: error.message,
          status: 'failed'
        })
      }
    }

    return results
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

  // 更新资源状态
  private static async updateResourceStatus(dispatch: any, newStatus: DispatchStatus) {
    const { vehicleId, driverId } = dispatch

    // 更新车辆状态
    let vehicleStatus = null
    let driverStatus = null

    switch (newStatus) {
      case DispatchStatus.ASSIGNED:
        vehicleStatus = VehicleStatus.IN_TRANSIT
        driverStatus = DriverStatus.ON_DUTY
        break
      case DispatchStatus.IN_TRANSIT:
        vehicleStatus = VehicleStatus.IN_TRANSIT
        driverStatus = DriverStatus.DRIVING
        break
      case DispatchStatus.COMPLETED:
        vehicleStatus = VehicleStatus.AVAILABLE
        driverStatus = DriverStatus.ON_DUTY
        break
      case DispatchStatus.CANCELLED:
        vehicleStatus = VehicleStatus.AVAILABLE
        driverStatus = DriverStatus.AVAILABLE
        break
    }

    if (vehicleStatus) {
      await prisma.vehicle.update({
        where: { id: vehicleId },
        data: { status: vehicleStatus, updatedBy: 'system' }
      })
    }

    if (driverStatus) {
      await prisma.driver.update({
        where: { id: driverId },
        data: { status: driverStatus, updatedBy: 'system' }
      })
    }
  }

  // 计算车辆评分
  private static calculateVehicleScore(vehicle: any): number {
    let score = 50 // 基础分数

    // 根据车辆状况加分
    if (vehicle.maintenanceCost < 1000) score += 10
    if (vehicle.fuelLevel > 50) score += 10
    if (vehicle.dailyRate < 1000) score += 10

    return Math.min(100, score)
  }

  // 计算驾驶员评分
  private static calculateDriverScore(driver: any): number {
    let score = 50 // 基础分数

    // 根据驾驶员评分
    score += driver.rating * 10
    if (driver.accidentCount === 0) score += 10
    if (driver.violationCount === 0) score += 10
    if (driver.drivingYears > 5) score += 10

    return Math.min(100, score)
  }

  static async getDispatchStatistics(dateRange?: { start: Date; end: Date }): Promise<DispatchStatistics> {
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
          status: DispatchStatus.COMPLETED,
          completedAt: { not: null },
          actualDeparture: { not: null }
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
      avgDispatchDuration: avgDispatchDuration._avg.estimatedDuration || 0,
      topVehicles: byVehicle.sort((a, b) => b._count.count - a._count.count).slice(0, 5),
      topDrivers: byDriver.sort((a, b) => b._count.count - a._count.count).slice(0, 5)
    }
  }

  // 辅助函数
  private static async calculateDistance(origin: string, destination: string): Promise<number> {
    // 简化版距离计算，实际应该使用地图API
    return Math.random() * 500 + 50 // 返回50-550公里之间的随机距离
  }

  private static async calculateBaseRate(vehicle: any, distance: number): Promise<number> {
    const baseRatePerKm = vehicle.dailyRate / 300 // 假设每天行驶300公里
    return Math.round(baseRatePerKm * distance * 100) / 100
  }

  private static calculateFuelSurcharge(distance: number): number {
    const fuelPrice = 8 // 假设油价8元/升
    const fuelConsumption = 0.3 // 假设油耗0.3升/公里
    return Math.round(distance * fuelConsumption * fuelPrice * 100) / 100
  }

  private static async estimateTollFees(origin: string, destination: string): Promise<number> {
    // 简化版过路费估算
    return Math.random() * 200 + 50 // 返回50-250元之间的随机费用
  }
}
