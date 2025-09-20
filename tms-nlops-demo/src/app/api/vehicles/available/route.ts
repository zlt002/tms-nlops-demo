import { NextRequest, NextResponse } from 'next/server'
import { VehicleService } from '@/services/vehicleService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      vehicleType: searchParams.get('vehicleType') || undefined,
      minCapacity: searchParams.get('minCapacity') ? parseFloat(searchParams.get('minCapacity')!) : undefined,
      startTime: searchParams.get('startTime') ? new Date(searchParams.get('startTime')!) : undefined,
      endTime: searchParams.get('endTime') ? new Date(searchParams.get('endTime')!) : undefined
    }

    const vehicles = await VehicleService.getAvailableVehicles(params)

    return NextResponse.json({
      success: true,
      data: vehicles,
      message: '获取可用车辆成功'
    })
  } catch (error) {
    console.error('获取可用车辆失败:', error)
    return NextResponse.json(
      { error: '获取可用车辆失败', details: error.message },
      { status: 500 }
    )
  }
}