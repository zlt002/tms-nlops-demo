import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

const updateVehicleSchema = z.object({
  licensePlate: z.string().min(1).optional(),
  type: z.enum(['TRUCK', 'VAN', 'TRAILER']).optional(),
  capacity: z.number().positive().optional(),
  status: z.enum(['AVAILABLE', 'IN_TRANSIT', 'MAINTENANCE']).optional(),
  driverId: z.string().uuid().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: params.id },
      include: {
        driver: true,
        schedules: {
          include: {
            order: true
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

    const vehicle = await prisma.vehicle.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        driver: true
      }
    })

    return ApiResponseBuilder.success(vehicle, '车辆更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    await prisma.vehicle.delete({
      where: { id: params.id }
    })

    return ApiResponseBuilder.success(null, '车辆删除成功')
  })()
}