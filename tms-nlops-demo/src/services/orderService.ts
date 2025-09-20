import { prisma } from '@/lib/db/prisma'
import { OrderStatus, Priority, PaymentStatus } from '@prisma/client'

export class OrderService {
  static async calculateOrderTotal(orderData: any): Promise<number> {
    // 基础运费计算逻辑
    const baseRate = 5 // 每公里基础费率
    const distance = await this.calculateDistance(
      orderData.originAddress,
      orderData.destinationAddress
    )

    const weightRate = orderData.cargoWeight * 0.5
    const volumeRate = orderData.cargoVolume * 2

    let total = (distance * baseRate) + weightRate + volumeRate

    // 根据优先级调整价格
    const priorityMultiplier = {
      [Priority.LOW]: 0.9,
      [Priority.MEDIUM]: 1.0,
      [Priority.HIGH]: 1.2,
      [Priority.URGENT]: 1.5
    }

    total *= priorityMultiplier[orderData.priority || Priority.MEDIUM]

    return Math.round(total * 100) / 100
  }

  static async updateOrderStatus(orderId: string, status: OrderStatus, userId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      throw new Error('订单不存在')
    }

    const validTransitions = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.IN_TRANSIT, OrderStatus.CANCELLED],
      [OrderStatus.IN_TRANSIT]: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.RETURNED]: [OrderStatus.IN_TRANSIT]
    }

    if (!validTransitions[order.status].includes(status)) {
      throw new Error(`无法从 ${order.status} 转换到 ${status}`)
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        updatedBy: userId,
        updatedAt: new Date()
      }
    })

    return updatedOrder
  }

  static async assignVehicle(orderId: string, vehicleId: string, driverId: string) {
    // 检查订单状态
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!order) {
      throw new Error('订单不存在')
    }

    if (order.status !== OrderStatus.CONFIRMED) {
      throw new Error('只有已确认的订单才能分配车辆')
    }

    // 检查车辆状态
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle) {
      throw new Error('车辆不存在')
    }

    if (vehicle.status !== 'AVAILABLE') {
      throw new Error('车辆不可用')
    }

    // 创建运单
    const shipment = await prisma.shipment.create({
      data: {
        orderId,
        vehicleId,
        driverId,
        status: 'SCHEDULED',
        estimatedDeparture: new Date(),
        estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000) // 预计24小时后到达
      }
    })

    // 更新订单状态
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.IN_TRANSIT,
        pickupTime: new Date()
      }
    })

    // 更新车辆状态
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        status: 'IN_TRANSIT',
        driverId
      }
    })

    return shipment
  }

  private static async calculateDistance(origin: string, destination: string): Promise<number> {
    // 简化版距离计算，实际应该使用地图API
    return Math.random() * 500 + 50 // 返回50-550公里之间的随机距离
  }

  static async getOrdersByCustomerId(customerId: string, params: any = {}) {
    const { page = 1, limit = 20, status, sortBy = 'createdAt', sortOrder = 'desc' } = params

    const where: any = { customerId }
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: true,
          shipments: {
            include: {
              vehicle: true,
              driver: true
            }
          },
          documents: true
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.order.count({ where })
    ])

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getOrderStatistics(startDate: Date, endDate: Date) {
    const where = {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }

    const [
      totalOrders,
      completedOrders,
      inTransitOrders,
      totalRevenue,
      ordersByStatus,
      ordersByPriority
    ] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.count({
        where: {
          ...where,
          status: OrderStatus.DELIVERED
        }
      }),
      prisma.order.count({
        where: {
          ...where,
          status: OrderStatus.IN_TRANSIT
        }
      }),
      prisma.order.aggregate({
        where: {
          ...where,
          status: OrderStatus.DELIVERED
        },
        _sum: {
          totalAmount: true
        }
      }),
      prisma.order.groupBy({
        by: ['status'],
        where,
        _count: true
      }),
      prisma.order.groupBy({
        by: ['priority'],
        where,
        _count: true
      })
    ])

    return {
      totalOrders,
      completedOrders,
      inTransitOrders,
      completionRate: totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      ordersByStatus,
      ordersByPriority
    }
  }
}
