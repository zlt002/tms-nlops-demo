import { NextRequest, NextResponse } from 'next/server'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    // 并行获取可用订单和可用车辆
    const [orders, vehicles] = await Promise.all([
      DispatchService.getAvailableOrders(),
      DispatchService.getAvailableVehicles()
    ])

    // 计算统计数据
    const totalAvailableWeight = vehicles.reduce((sum, vehicle) => sum + vehicle.maxLoad, 0)
    const totalAvailableVolume = vehicles.reduce((sum, vehicle) => sum + vehicle.maxVolume, 0)
    const totalRequiredWeight = orders.reduce((sum, order) => sum + order.cargoWeight, 0)
    const totalRequiredVolume = orders.reduce((sum, order) => sum + order.cargoVolume, 0)

    return ApiResponseBuilder.success({
      orders,
      vehicles,
      summary: {
        orderCount: orders.length,
        vehicleCount: vehicles.length,
        capacityUtilization: {
          weight: totalRequiredWeight / totalAvailableWeight * 100,
          volume: totalRequiredVolume / totalAvailableVolume * 100
        },
        urgency: {
          highPriorityOrders: orders.filter(order => order.priority === 'HIGH' || order.priority === 'URGENT').length,
          ordersToday: orders.filter(order => {
            const today = new Date()
            const orderDate = new Date(order.expectedTime)
            return orderDate.toDateString() === today.toDateString()
          }).length
        },
        vehicleStats: {
          totalCapacity: {
            weight: totalAvailableWeight,
            volume: totalAvailableVolume
          },
          averageDailyRate: vehicles.length > 0
            ? vehicles.reduce((sum, v) => sum + v.dailyRate, 0) / vehicles.length
            : 0
        }
      }
    }, '获取可用资源成功')
  } catch (error) {
    console.error('获取可用资源失败:', error)
    return ApiResponseBuilder.error(
      '获取可用资源失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}