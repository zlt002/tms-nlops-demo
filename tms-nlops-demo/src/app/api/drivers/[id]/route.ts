import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { DriverService } from '@/services/driverService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updateDriverSchema, driverLocationSchema } from '@/lib/validators/driver'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const driver = await prisma.driver.findUnique({
      where: { id: params.id },
      include: {
        assignedVehicle: {
          include: {
            shipments: {
              where: {
                status: 'IN_TRANSIT'
              },
              include: {
                order: true
              }
            }
          }
        },
        shipments: {
          include: {
            order: true,
            vehicle: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        location: true,
        _count: {
          select: {
            shipments: true
          }
        }
      }
    })

    if (!driver) {
      return ApiResponseBuilder.error('司机不存在', 404)
    }

    return ApiResponseBuilder.success(driver)
  })()
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const validatedData = updateDriverSchema.parse(body)

    const driver = await DriverService.updateDriver(params.id, validatedData)

    return ApiResponseBuilder.success(driver, '司机更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    // 检查司机是否有进行中的任务
    const activeShipments = await prisma.shipment.count({
      where: {
        driverId: params.id,
        status: 'IN_TRANSIT'
      }
    })

    if (activeShipments > 0) {
      return ApiResponseBuilder.error('该司机有进行中的任务，无法删除', 400)
    }

    await prisma.driver.delete({
      where: { id: params.id }
    })

    return ApiResponseBuilder.success(null, '司机删除成功')
  })()
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()

    // 检查是否是位置更新
    if (body.action === 'updateLocation') {
      const locationData = driverLocationSchema.parse(body.location)
      const location = await DriverService.updateDriverLocation(params.id, locationData)
      return ApiResponseBuilder.success(location, '位置更新成功')
    }

    // 默认更新操作
    const validatedData = updateDriverSchema.parse(body)
    const driver = await DriverService.updateDriver(params.id, validatedData)

    return ApiResponseBuilder.success(driver, '司机更新成功')
  })()
}