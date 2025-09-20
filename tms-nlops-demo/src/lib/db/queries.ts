import { prisma, OrderStatus, VehicleStatus, ScheduleStatus, VehicleType } from './prisma'

export class OrderQueries {
  static async findAll(
    filters: {
      status?: OrderStatus
      customerId?: string
      page?: number
      limit?: number
    } = {}
  ) {
    const { status, customerId, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: {
          status,
          customerId,
        },
        include: {
          customer: true,
          assignedVehicle: {
            include: {
              driver: true,
            },
          },
          schedules: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.order.count({
        where: {
          status,
          customerId,
        },
      }),
    ])

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  static async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true,
          },
        },
        schedules: {
          include: {
            vehicle: {
              include: {
                driver: true,
              },
            },
          },
        },
        trackings: {
          orderBy: {
            timestamp: 'desc',
          },
        },
        receipts: true,
      },
    })
  }

  static async create(data: {
    customerId: string
    origin: string
    destination: string
    weight: number
    volume: number
    pickupTime: Date
    deliveryTime: Date
    value?: number
    specialInstructions?: string
  }) {
    // 生成订单号
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    return prisma.order.create({
      data: {
        orderNumber,
        ...data,
        status: OrderStatus.PENDING,
      },
      include: {
        customer: true,
      },
    })
  }

  static async update(
    id: string,
    data: {
      status?: OrderStatus
      weight?: number
      pickupTime?: Date
      deliveryTime?: Date
      assignedVehicleId?: string
      specialInstructions?: string
    }
  ) {
    return prisma.order.update({
      where: { id },
      data,
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true,
          },
        },
      },
    })
  }
}

export class VehicleQueries {
  static async findAvailable(
    filters: {
      type?: string
      minCapacity?: number
    } = {}
  ) {
    const { type, minCapacity } = filters

    return prisma.vehicle.findMany({
      where: {
        status: VehicleStatus.AVAILABLE,
        ...(type && { type: type as VehicleType }),
        ...(minCapacity && { capacity: { gte: minCapacity } }),
      },
      include: {
        driver: true,
        schedules: {
          where: {
            status: {
              in: [ScheduleStatus.PLANNED, ScheduleStatus.IN_PROGRESS],
            },
          },
        },
      },
    })
  }

  static async findById(id: string) {
    return prisma.vehicle.findUnique({
      where: { id },
      include: {
        driver: true,
        schedules: {
          include: {
            order: true,
          },
        },
      },
    })
  }

  static async updateStatus(id: string, status: VehicleStatus) {
    return prisma.vehicle.update({
      where: { id },
      data: { status },
      include: {
        driver: true,
      },
    })
  }
}

export class ScheduleQueries {
  static async create(data: {
    orderId: string
    vehicleId: string
    plannedDeparture: Date
    plannedArrival: Date
    route?: string[]
  }) {
    return prisma.schedule.create({
      data: {
        ...data,
        status: ScheduleStatus.PLANNED,
      },
      include: {
        order: true,
        vehicle: {
          include: {
            driver: true,
          },
        },
      },
    })
  }

  static async updateActualTimes(id: string, departureTime?: Date, arrivalTime?: Date) {
    const updateData: {
      actualDeparture?: Date
      actualArrival?: Date
      status?: ScheduleStatus
    } = {}
    if (departureTime) updateData.actualDeparture = departureTime
    if (arrivalTime) {
      updateData.actualArrival = arrivalTime
      updateData.status = ScheduleStatus.COMPLETED
    }

    return prisma.schedule.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
        vehicle: true,
      },
    })
  }
}

export class TrackingQueries {
  static async create(data: {
    orderId: string
    location: string
    coordinates: { lat: number; lng: number }
    status?: string
    notes?: string
    imageUrl?: string
  }) {
    return prisma.tracking.create({
      data: {
        ...data,
        status: (data.status as 'IN_TRANSIT' | 'PICKUP' | 'DELIVERY' | 'COMPLETED') || 'IN_TRANSIT',
      },
      include: {
        order: true,
      },
    })
  }

  static async findByOrderId(orderId: string) {
    return prisma.tracking.findMany({
      where: { orderId },
      orderBy: {
        timestamp: 'desc',
      },
    })
  }
}

export class ReceiptQueries {
  static async create(data: { orderId: string; imageUrl: string; notes?: string }) {
    return prisma.receipt.create({
      data: {
        ...data,
        status: 'UPLOADED',
      },
      include: {
        order: true,
        verifier: true,
      },
    })
  }

  static async verify(id: string, verifiedById: string, status: 'VERIFIED' | 'REJECTED') {
    return prisma.receipt.update({
      where: { id },
      data: {
        status,
        verifiedBy: verifiedById,
        verifiedAt: new Date(),
      },
      include: {
        order: true,
        verifier: true,
      },
    })
  }
}

export class NLCommandQueries {
  static async getCommandHistory(
    filters: {
      userId?: string
      intent?: string
      limit?: number
    } = {}
  ) {
    const { userId, intent, limit = 50 } = filters

    return prisma.nLCommand.findMany({
      where: {
        userId,
        intent,
      },
      include: {
        user: true,
        order: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })
  }

  static async create(data: {
    command: string
    intent: string
    parameters: Record<string, unknown>
    confidence: number
    userId?: string
    orderId?: string
  }) {
    return prisma.nLCommand.create({
      data: {
        command: data.command,
        intent: data.intent,
        parameters: data.parameters as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        confidence: data.confidence,
        status: 'PENDING' as const,
        executed: false,
        ...(data.userId && { userId: data.userId }),
        ...(data.orderId && { orderId: data.orderId }),
      },
      include: {
        user: true,
        order: true,
      },
    })
  }

  static async updateExecution(id: string, result: Record<string, unknown>, error?: string) {
    return prisma.nLCommand.update({
      where: { id },
      data: {
        executed: true,
        executedAt: new Date(),
        status: error ? 'FAILED' : 'COMPLETED',
        result: result as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        error,
      },
    })
  }
}

export class IntentQueries {
  static async findActive() {
    return prisma.intent.findMany({
      where: { isActive: true },
    })
  }

  static async findByName(name: string) {
    return prisma.intent.findUnique({
      where: { name },
    })
  }
}
