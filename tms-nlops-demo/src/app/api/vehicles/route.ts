import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/services/vehicleService'
import { createVehicleSchema, vehicleQuerySchema } from '@/lib/validators/vehicle'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = {
      vehicleType: searchParams.get('vehicleType') || undefined,
      status: searchParams.get('status') || undefined,
      driverId: searchParams.get('driverId') || undefined,
      isActive: searchParams.get('isActive') !== 'false',
      minMaxLoad: searchParams.get('minMaxLoad') ? parseFloat(searchParams.get('minMaxLoad')!) : undefined,
      maxMaxLoad: searchParams.get('maxMaxLoad') ? parseFloat(searchParams.get('maxMaxLoad')!) : undefined,
      search: searchParams.get('search') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = vehicleQuerySchema.parse(query)
    const result = await VehicleService.getVehiclesWithStats(validatedQuery)

    return NextResponse.json({
      success: true,
      data: result.vehicles,
      pagination: result.pagination
    })
  } catch (error) {
    console.error('获取车辆列表失败:', error)
    return NextResponse.json(
      { error: '获取车辆列表失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createVehicleSchema.parse(body)

    const vehicle = await VehicleService.createVehicle(validatedData)

    return NextResponse.json({
      success: true,
      data: vehicle,
      message: '车辆创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建车辆失败:', error)
    return NextResponse.json(
      { error: '创建车辆失败', details: error.message },
      { status: 500 }
    )
  }
}
