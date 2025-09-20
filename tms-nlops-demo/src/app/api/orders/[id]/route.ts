import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']).optional(),
  weight: z.number().positive().optional(),
  pickupTime: z.date().optional(),
  deliveryTime: z.date().optional(),
  specialInstructions: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true
          }
        },
        schedules: {
          include: {
            vehicle: {
              include: {
                driver: true
              }
            }
          }
        },
        trackings: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        receipts: true
      }
    })

    if (!order) {
      return ApiResponseBuilder.error('订单不存在', 404)
    }

    return ApiResponseBuilder.success(order)
  })()
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const validatedData = updateOrderSchema.parse(body)

    const order = await prisma.order.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        customer: true,
        assignedVehicle: {
          include: {
            driver: true
          }
        }
      }
    })

    return ApiResponseBuilder.success(order, '订单更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    await prisma.order.delete({
      where: { id: params.id }
    })

    return ApiResponseBuilder.success(null, '订单删除成功')
  })()
}