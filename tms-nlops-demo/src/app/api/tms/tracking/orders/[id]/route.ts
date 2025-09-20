import { NextRequest, NextResponse } from 'next/server'
import { TrackingService } from '@/services/trackingService'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams
    const options = {
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      limit: parseInt(searchParams.get('limit') || '100'),
      offset: parseInt(searchParams.get('offset') || '0')
    }

    // 检查订单是否存在
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        shipments: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true,
            originAddress: true,
            destinationAddress: true,
            scheduledDeparture: true,
            scheduledArrival: true,
            actualDeparture: true,
            actualArrival: true,
            progress: true,
            currentLocation: true,
            currentCoordinates: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: '订单不存在' },
        { status: 404 }
      )
    }

    // 如果订单没有关联的运单，返回基本信息
    if (!order.shipments || order.shipments.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          order: {
            id: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
          },
          shipments: [],
          trackingHistory: [],
          statistics: {
            totalShipments: 0,
            activeShipments: 0,
            completedShipments: 0,
            totalDistance: 0,
            averageProgress: 0
          }
        }
      })
    }

    // 获取所有运单的跟踪历史
    const allTrackingData = []
    let totalDistance = 0
    let activeShipments = 0
    let completedShipments = 0

    for (const shipment of order.shipments) {
      try {
        const trackingHistory = await TrackingService.getShipmentTrackingHistory(
          shipment.id,
          {
            ...options,
            limit: Math.min(options.limit, 50) // 限制每个运单的记录数
          }
        )

        // 获取运单统计信息
        const statistics = await TrackingService.calculateRouteStatistics(shipment.id)

        allTrackingData.push({
          shipment,
          trackingHistory: trackingHistory.logs,
          statistics
        })

        totalDistance += statistics.totalDistance

        if (shipment.status === 'IN_TRANSIT' || shipment.status === 'LOADING' || shipment.status === 'UNLOADING') {
          activeShipments++
        } else if (shipment.status === 'DELIVERED' || shipment.status === 'COMPLETED') {
          completedShipments++
        }
      } catch (error) {
        console.error(`获取运单 ${shipment.id} 跟踪历史失败:`, error)
        // 继续处理其他运单
      }
    }

    // 计算平均进度
    const totalProgress = order.shipments.reduce((sum, shipment) => sum + (shipment.progress || 0), 0)
    const averageProgress = order.shipments.length > 0 ? totalProgress / order.shipments.length : 0

    // 按时间排序所有跟踪记录
    const allTrackingLogs = allTrackingData.flatMap(data =>
      data.trackingHistory.map(log => ({
        ...log,
        shipmentId: data.shipment.id,
        shipmentNumber: data.shipment.shipmentNumber
      }))
    ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // 应用分页
    const startIndex = options.offset
    const endIndex = startIndex + options.limit
    const paginatedLogs = allTrackingLogs.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          customerName: order.customerName,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt
        },
        shipments: order.shipments,
        trackingHistory: paginatedLogs,
        statistics: {
          totalShipments: order.shipments.length,
          activeShipments,
          completedShipments,
          totalDistance: Math.round(totalDistance * 100) / 100,
          averageProgress: Math.round(averageProgress * 100) / 100
        },
        pagination: {
          total: allTrackingLogs.length,
          limit: options.limit,
          offset: options.offset,
          totalPages: Math.ceil(allTrackingLogs.length / options.limit),
          currentPage: Math.floor(options.offset / options.limit) + 1
        }
      }
    })
  } catch (error) {
    console.error('获取订单跟踪历史失败:', error)
    return NextResponse.json(
      { error: '获取订单跟踪历史失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}