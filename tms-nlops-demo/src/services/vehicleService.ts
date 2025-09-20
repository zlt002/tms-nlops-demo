import { prisma } from '@/lib/db/prisma'
import { VehicleStatus, VehicleType, MaintenanceType } from '@prisma/client'

export class VehicleService {
  static async getVehiclesWithStats(params: any = {}) {
    const {
      vehicleType,
      status,
      driverId,
      isActive = true,
      minMaxLoad,
      maxMaxLoad,
      search,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}
    if (isActive !== undefined) where.isActive = isActive
    if (vehicleType) where.vehicleType = vehicleType
    if (status) where.status = status
    if (driverId) where.driverId = driverId
    if (minMaxLoad !== undefined || maxMaxLoad !== undefined) {
      where.capacity = {}
      if (minMaxLoad !== undefined) where.capacity.gte = minMaxLoad
      if (maxMaxLoad !== undefined) where.capacity.lte = maxMaxLoad
    }
    if (search) {
      where.OR = [
        { licensePlate: { contains: search } },
        { driver: { name: { contains: search } } }
      ]
    }

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          driver: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          schedules: {
            select: {
              id: true,
              status: true,
              plannedDeparture: true,
              plannedArrival: true
            },
            take: 3,
            orderBy: { plannedDeparture: 'desc' }
          },
          orders: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
              pickupTime: true,
              deliveryTime: true
            },
            take: 3,
            orderBy: { pickupTime: 'desc' }
          },
          _count: {
            select: {
              schedules: true,
              orders: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.vehicle.count({ where })
    ])

    // 获取统计信息
    const stats = await prisma.vehicle.groupBy({
      by: ['status'],
      where: { isActive: true },
      _count: {
        status: true
      }
    })

    return {
      vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats.reduce((acc, item) => {
        acc[item.status] = item._count.status
        return acc
      }, {} as Record<string, number>)
    }
  }

  static async createVehicle(data: any) {
    const {
      licenseNumber,
      vinNumber,
      brand,
      model,
      year,
      color,
      vehicleType,
      maxLoad,
      maxVolume,
      dailyRate,
      insuranceCompany,
      insurancePolicy,
      insuranceExpiry,
      nextMaintenance,
      notes,
      tags = []
    } = data

    // 检查车牌号是否已存在
    const existingLicense = await prisma.vehicle.findUnique({
      where: { licensePlate: licenseNumber }
    })

    if (existingLicense) {
      throw new Error('车牌号已存在')
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        licensePlate: licenseNumber,
        type: vehicleType,
        capacity: maxLoad,
        status: VehicleStatus.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return vehicle
  }

  static async updateVehicle(id: string, data: any) {
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id }
    })

    if (!existingVehicle) {
      throw new Error('车辆不存在')
    }

    // 检查车牌号是否已被其他车辆使用
    if (data.licenseNumber && data.licenseNumber !== existingVehicle.licensePlate) {
      const licenseExists = await prisma.vehicle.findUnique({
        where: { licensePlate: data.licenseNumber }
      })

      if (licenseExists) {
        throw new Error('车牌号已被使用')
      }
    }

    const updateData: any = {
      updatedAt: new Date()
    }

    if (data.licenseNumber !== undefined) updateData.licensePlate = data.licenseNumber
    if (data.vehicleType !== undefined) updateData.type = data.vehicleType
    if (data.maxLoad !== undefined) updateData.capacity = data.maxLoad
    if (data.status !== undefined) updateData.status = data.status
    if (data.driverId !== undefined) updateData.driverId = data.driverId

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: updateData,
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return vehicle
  }

  static async updateVehicleLocation(vehicleId: string, locationData: any) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle) {
      throw new Error('车辆不存在')
    }

    const location = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        currentLocation: `${locationData.latitude},${locationData.longitude}`,
        updatedAt: new Date()
      }
    })

    return location
  }

  static async addMaintenanceRecord(vehicleId: string, maintenanceData: any) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle) {
      throw new Error('车辆不存在')
    }

    // 这里需要在实际的schema中添加维护记录表
    // 目前简化实现，只更新车辆信息
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        lastMaintenance: maintenanceData.performedAt,
        updatedAt: new Date()
      }
    })

    return {
      id: Date.now().toString(), // 临时ID
      vehicleId,
      ...maintenanceData,
      createdAt: new Date()
    }
  }

  static async addFuelRecord(vehicleId: string, fuelData: any) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId }
    })

    if (!vehicle) {
      throw new Error('车辆不存在')
    }

    // 这里需要在实际的schema中添加加油记录表
    // 目前简化实现
    return {
      id: Date.now().toString(), // 临时ID
      vehicleId,
      ...fuelData,
      createdAt: new Date()
    }
  }

  static async getAvailableVehicles(params: any = {}) {
    const { vehicleType, minCapacity, startTime, endTime } = params

    const where: any = {
      status: VehicleStatus.AVAILABLE,
      isActive: true
    }

    if (vehicleType) where.type = vehicleType
    if (minCapacity) where.capacity = { gte: minCapacity }

    // 检查车辆在指定时间是否可用
    if (startTime && endTime) {
      const busyVehicles = await prisma.schedule.findMany({
        where: {
          OR: [
            {
              plannedDeparture: { lte: endTime },
              plannedArrival: { gte: startTime }
            }
          ],
          status: {
            in: ['IN_PROGRESS', 'PLANNED']
          }
        },
        select: { vehicleId: true }
      })

      const busyIds = busyVehicles.map(v => v.vehicleId)
      if (busyIds.length > 0) {
        where.id = { notIn: busyIds }
      }
    }

    return await prisma.vehicle.findMany({
      where,
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  static async getVehicleById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        schedules: {
          include: {
            order: {
              select: {
                id: true,
                orderNumber: true,
                origin: true,
                destination: true
              }
            }
          },
          orderBy: { plannedDeparture: 'desc' },
          take: 10
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            pickupTime: true,
            deliveryTime: true
          },
          take: 10,
          orderBy: { pickupTime: 'desc' }
        },
        _count: {
          select: {
            schedules: true,
            orders: true
          }
        }
      }
    })

    return vehicle
  }
}