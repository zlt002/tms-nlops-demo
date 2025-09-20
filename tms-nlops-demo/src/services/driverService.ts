import { prisma } from '@/lib/db/prisma'
import { DriverStatus } from '@prisma/client'

export class DriverService {
  static async generateEmployeeId(): string {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `DRV${timestamp.slice(-6)}${random}`
  }

  static async createDriver(data: any) {
    const employeeId = await this.generateEmployeeId()

    return await prisma.driver.create({
      data: {
        employeeId,
        firstName: data.personalInfo.firstName,
        lastName: data.personalInfo.lastName,
        idNumber: data.personalInfo.idNumber,
        dateOfBirth: data.personalInfo.dateOfBirth,
        gender: data.personalInfo.gender,
        phone: data.personalInfo.phone,
        email: data.personalInfo.email,
        address: data.personalInfo.address,
        emergencyContact: data.personalInfo.emergencyContact,
        emergencyPhone: data.personalInfo.emergencyPhone,
        licenseNumber: data.license.licenseNumber,
        licenseType: data.license.licenseType,
        licenseIssueDate: data.license.issueDate,
        licenseExpiryDate: data.license.expiryDate,
        issuingAuthority: data.license.issuingAuthority,
        hireDate: data.employment.hireDate,
        salary: data.employment.salary,
        bankAccount: data.employment.bankAccount,
        bankName: data.employment.bankName,
        status: data.status || DriverStatus.AVAILABLE,
        notes: data.notes,
        tags: data.tags || [],
        createdBy: 'system', // TODO: 从认证用户获取
        updatedBy: 'system'
      }
    })
  }

  static async updateDriver(id: string, data: any) {
    const updateData: any = {
      updatedBy: 'system', // TODO: 从认证用户获取
      updatedAt: new Date()
    }

    if (data.personalInfo) {
      if (data.personalInfo.firstName !== undefined) updateData.firstName = data.personalInfo.firstName
      if (data.personalInfo.lastName !== undefined) updateData.lastName = data.personalInfo.lastName
      if (data.personalInfo.phone !== undefined) updateData.phone = data.personalInfo.phone
      if (data.personalInfo.email !== undefined) updateData.email = data.personalInfo.email
      if (data.personalInfo.address !== undefined) updateData.address = data.personalInfo.address
      if (data.personalInfo.emergencyContact !== undefined) updateData.emergencyContact = data.personalInfo.emergencyContact
      if (data.personalInfo.emergencyPhone !== undefined) updateData.emergencyPhone = data.personalInfo.emergencyPhone
    }

    if (data.license) {
      if (data.license.licenseNumber !== undefined) updateData.licenseNumber = data.license.licenseNumber
      if (data.license.licenseType !== undefined) updateData.licenseType = data.license.licenseType
      if (data.license.issueDate !== undefined) updateData.licenseIssueDate = data.license.issueDate
      if (data.license.expiryDate !== undefined) updateData.licenseExpiryDate = data.license.expiryDate
      if (data.license.issuingAuthority !== undefined) updateData.issuingAuthority = data.license.issuingAuthority
    }

    if (data.employment) {
      if (data.employment.hireDate !== undefined) updateData.hireDate = data.employment.hireDate
      if (data.employment.salary !== undefined) updateData.salary = data.employment.salary
      if (data.employment.bankAccount !== undefined) updateData.bankAccount = data.employment.bankAccount
      if (data.employment.bankName !== undefined) updateData.bankName = data.employment.bankName
    }

    if (data.status !== undefined) updateData.status = data.status
    if (data.notes !== undefined) updateData.notes = data.notes
    if (data.tags !== undefined) updateData.tags = data.tags

    return await prisma.driver.update({
      where: { id },
      data: updateData
    })
  }

  static async getDriversWithStats(params: any = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      licenseType,
      availability,
      search,
      tags,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (status) where.status = status
    if (licenseType) where.licenseType = licenseType
    if (availability !== undefined) {
      where.status = availability ? DriverStatus.AVAILABLE : { not: DriverStatus.AVAILABLE }
    }

    if (search) {
      where.OR = [
        { employeeId: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { licenseNumber: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags
      }
    }

    const [drivers, total] = await Promise.all([
      prisma.driver.findMany({
        where,
        include: {
          assignedVehicle: {
            select: {
              id: true,
              licenseNumber: true,
              vehicleType: true,
              status: true
            }
          },
          shipments: {
            select: {
              id: true,
              status: true,
              pickupTime: true,
              estimatedArrival: true
            }
          },
          _count: {
            select: {
              shipments: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.driver.count({ where })
    ])

    // 计算司机统计信息
    const driversWithStats = drivers.map(driver => ({
      ...driver,
      activeShipments: driver.shipments.filter(s => s.status === 'IN_TRANSIT').length,
      totalShipments: driver._count.shipments,
      isAvailable: driver.status === DriverStatus.AVAILABLE,
      licenseExpiringSoon: driver.licenseExpiryDate &&
        new Date(driver.licenseExpiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000 // 30天内过期
    }))

    return {
      drivers: driversWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async updateDriverLocation(driverId: string, locationData: any) {
    // 更新司机位置（如果司机有分配车辆，同时更新车辆位置）
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        assignedVehicle: true
      }
    })

    if (!driver) {
      throw new Error('司机不存在')
    }

    // 更新司机位置
    const location = await prisma.driverLocation.upsert({
      where: { driverId },
      update: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        address: locationData.address,
        speed: locationData.speed,
        heading: locationData.heading,
        timestamp: new Date()
      },
      create: {
        driverId,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        address: locationData.address,
        speed: locationData.speed,
        heading: locationData.heading,
        timestamp: new Date()
      }
    })

    // 如果司机有分配车辆，同时更新车辆位置
    if (driver.assignedVehicle) {
      await prisma.vehicleLocation.upsert({
        where: { vehicleId: driver.assignedVehicle.id },
        update: {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          address: locationData.address,
          speed: locationData.speed,
          heading: locationData.heading,
          timestamp: new Date()
        },
        create: {
          vehicleId: driver.assignedVehicle.id,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          address: locationData.address,
          speed: locationData.speed,
          heading: locationData.heading,
          timestamp: new Date()
        }
      })
    }

    return location
  }

  static async getDriverPerformance(driverId: string, startDate: Date, endDate: Date) {
    const driver = await prisma.driver.findUnique({
      where: { id: driverId }
    })

    if (!driver) {
      throw new Error('司机不存在')
    }

    const shipments = await prisma.shipment.findMany({
      where: {
        driverId,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        order: true,
        vehicle: true
      }
    })

    const totalShipments = shipments.length
    const completedShipments = shipments.filter(s => s.status === 'COMPLETED').length
    const totalDistance = shipments.reduce((sum, s) => sum + (s.actualDistance || 0), 0)
    const totalRevenue = shipments.reduce((sum, s) => sum + (s.order?.totalAmount || 0), 0)
    const averageRating = shipments.length > 0
      ? shipments.reduce((sum, s) => sum + (s.rating || 0), 0) / shipments.length
      : 0

    const onTimeDeliveries = shipments.filter(s => {
      if (s.status === 'COMPLETED' && s.actualArrival && s.estimatedArrival) {
        return new Date(s.actualArrival) <= new Date(s.estimatedArrival)
      }
      return false
    }).length

    return {
      driverId,
      driverName: `${driver.firstName} ${driver.lastName}`,
      totalShipments,
      completedShipments,
      completionRate: totalShipments > 0 ? (completedShipments / totalShipments) * 100 : 0,
      totalDistance,
      totalRevenue,
      averageRating: Math.round(averageRating * 100) / 100,
      onTimeDeliveryRate: completedShipments > 0 ? (onTimeDeliveries / completedShipments) * 100 : 0
    }
  }

  static async checkLicenseExpiry() {
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

    const expiringLicenses = await prisma.driver.findMany({
      where: {
        licenseExpiryDate: {
          lte: thirtyDaysFromNow,
          gte: new Date()
        },
        status: DriverStatus.AVAILABLE
      }
    })

    return expiringLicenses
  }
}
