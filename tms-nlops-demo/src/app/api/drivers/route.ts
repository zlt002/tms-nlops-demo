import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { DriverService } from '@/services/driverService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createDriverSchema, driverQuerySchema } from '@/lib/validators/driver'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const query = {
    status: searchParams.get('status') || undefined,
    licenseType: searchParams.get('licenseType') || undefined,
    availability: searchParams.get('availability') === 'true' ? true :
                  searchParams.get('availability') === 'false' ? false : undefined,
    search: searchParams.get('search') || undefined,
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = driverQuerySchema.parse(query)

  const result = await DriverService.getDriversWithStats(validatedQuery)

  return NextResponse.json({
    success: true,
    data: result.drivers,
    pagination: result.pagination
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = createDriverSchema.parse(body)

  const driver = await DriverService.createDriver(validatedData)

  return ApiResponseBuilder.success(driver, '司机创建成功', 201)
})