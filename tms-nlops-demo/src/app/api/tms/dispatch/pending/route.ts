import { NextRequest, NextResponse } from 'next/server'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder } from '@/lib/api/response'

export async function GET(request: NextRequest) {
  try {
    // 获取待调度的订单
    const pendingOrders = await DispatchService.getPendingOrders()

    return ApiResponseBuilder.success({
      orders: pendingOrders,
      total: pendingOrders.length,
      summary: {
        totalWeight: pendingOrders.reduce((sum, order) => sum + order.cargoWeight, 0),
        totalVolume: pendingOrders.reduce((sum, order) => sum + order.cargoVolume, 0),
        totalValue: pendingOrders.reduce((sum, order) => sum + (order.cargoValue || 0), 0),
        highPriorityCount: pendingOrders.filter(order => order.priority === 'HIGH' || order.priority === 'URGENT').length,
        mediumPriorityCount: pendingOrders.filter(order => order.priority === 'MEDIUM').length,
        lowPriorityCount: pendingOrders.filter(order => order.priority === 'LOW').length
      }
    }, '获取待调度订单成功')
  } catch (error) {
    console.error('获取待调度订单失败:', error)
    return ApiResponseBuilder.error(
      '获取待调度订单失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}