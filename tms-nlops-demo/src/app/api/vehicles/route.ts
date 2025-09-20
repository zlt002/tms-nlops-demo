import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createVehicleSchema } from '@/lib/validators'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const filters = {
    type: searchParams.get('type'),
    status: searchParams.get('status'),
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20')
  }

  const vehicles = await prisma.vehicle.findMany({
    where: {
      ...(filters.type && { type: filters.type as any }),
      ...(filters.status && { status: filters.status as any })
    },
    include: {
      driver: true,
      schedules: true
    },
    skip: (filters.page - 1) * filters.limit,
    take: filters.limit,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const total = await prisma.vehicle.count({
    where: {
      ...(filters.type && { type: filters.type as any }),
      ...(filters.status && { status: filters.status as any })
    }
  })

  return ApiResponseBuilder.paginated(
    vehicles,
    {
      page: filters.page,
      limit: filters.limit,
      total,
      pages: Math.ceil(total / filters.limit)
    },
    '获取车辆列表成功'
  )
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = createVehicleSchema.parse(body)

  const vehicle = await prisma.vehicle.create({
    data: validatedData,
    include: {
      driver: true
    }
  })

  return ApiResponseBuilder.success(vehicle, '车辆创建成功', 201)
})