import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { VehicleService } from '@/services/vehicleService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updateVehicleSchema, vehicleLocationSchema, vehicleMaintenanceSchema, vehicleFuelSchema } from '@/lib/validators/vehicle'
import { VehicleStatus } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        shipments: {
          select: {
            id: true,
            status: true,
            pickupTime: true,
            startTime: true,
            endTime: true
          }
        },
        maintenanceRecords: {
          orderBy: { performedAt: 'desc' },
          take: 5
        },
        location: true,
        _count: {
          select: {
            shipments: true,
            maintenanceRecords: true
          }
        }
      }
    })

    if (!vehicle) {
      return ApiResponseBuilder.error('车辆不存在', 404)
    }

    return ApiResponseBuilder.success(vehicle)
  })()
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const validatedData = updateVehicleSchema.parse(body)

    const vehicle = await VehicleService.updateVehicle(params.id, validatedData)

    return ApiResponseBuilder.success(vehicle, '车辆更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    // 软删除，设置isActive为false
    await prisma.vehicle.update({
      where: { id: params.id },
      data: {
        isActive: false,
        status: VehicleStatus.INACTIVE,
        updatedAt: new Date()
      }
    })

    return ApiResponseBuilder.success(null, '车辆删除成功')
  })()
}

// 更新车辆位置
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()

    // 检查是否是位置更新
    if (body.action === 'updateLocation') {
      const locationData = vehicleLocationSchema.parse(body.location)
      const location = await VehicleService.updateVehicleLocation(params.id, locationData)
      return ApiResponseBuilder.success(location, '位置更新成功')
    }

    // 检查是否是添加维护记录
    if (body.action === 'addMaintenance') {
      const maintenanceData = vehicleMaintenanceSchema.parse(body.maintenance)
      const maintenance = await VehicleService.addMaintenanceRecord(params.id, maintenanceData)
      return ApiResponseBuilder.success(maintenance, '维护记录添加成功')
    }

    // 检查是否是添加加油记录
    if (body.action === 'addFuel') {
      const fuelData = vehicleFuelSchema.parse(body.fuel)
      const fuel = await VehicleService.addFuelRecord(params.id, fuelData)
      return ApiResponseBuilder.success(fuel, '加油记录添加成功')
    }

    // 默认更新操作
    const validatedData = updateVehicleSchema.parse(body)
    const vehicle = await VehicleService.updateVehicle(params.id, validatedData)

    return ApiResponseBuilder.success(vehicle, '车辆更新成功')
  })()
}
