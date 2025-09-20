import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getCurrentUser } from '@/lib/auth'

/**
 * @summary 获取系统统计信息
 * @description 获取系统运营数据和统计信息
 * @tags 系统管理
 * @security true
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || '7d' // 7d, 30d, 90d, 1y

    // 计算时间范围
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(endDate.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }

    // 并行获取统计数据
    const [
      totalOrders,
      totalCustomers,
      totalVehicles,
      totalShipments,
      ordersByStatus,
      ordersByDate,
      revenue,
      activeShipments,
      completedDeliveries
    ] = await Promise.all([
      // 总订单数
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // 总客户数
      prisma.customer.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // 总车辆数
      prisma.vehicle.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // 总运单数
      prisma.shipment.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),

      // 订单状态分布
      prisma.order.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        },
        _count: true
      }),

      // 每日订单数量
      prisma.$queryRaw`
        SELECT
          DATE(created_at) as date,
          COUNT(*) as count
        FROM orders
        WHERE created_at >= ${startDate}
          AND created_at <= ${endDate}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,

      // 营收统计
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          },
          status: {
            in: ['DELIVERED', 'COMPLETED']
          }
        },
        _sum: {
          totalAmount: true
        }
      }),

      // 活跃运单数
      prisma.shipment.count({
        where: {
          status: {
            in: ['IN_TRANSIT', 'LOADING', 'UNLOADING']
          }
        }
      }),

      // 完成配送数
      prisma.shipment.count({
        where: {
          status: 'DELIVERED',
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      })
    ])

    // 处理订单状态分布
    const statusDistribution = ordersByStatus.reduce((acc, item) => {
      acc[item.status] = item._count
      return acc
    }, {})

    // 处理每日订单数据
    const dailyOrders = (ordersByDate as any[]).map(item => ({
      date: item.date.toISOString().split('T')[0],
      count: parseInt(item.count)
    }))

    const stats = {
      period,
      summary: {
        totalOrders,
        totalCustomers,
        totalVehicles,
        totalShipments,
        activeShipments,
        completedDeliveries,
        revenue: revenue._sum.totalAmount || 0
      },
      statusDistribution,
      dailyOrders,
      performance: {
        completionRate: totalShipments > 0
          ? Math.round((completedDeliveries / totalShipments) * 100)
          : 0,
        averageOrderValue: totalOrders > 0
          ? Math.round((revenue._sum.totalAmount || 0) / totalOrders)
          : 0
      }
    }

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('获取统计数据失败:', error)
    return NextResponse.json(
      { error: '获取统计数据失败', details: error.message },
      { status: 500 }
    )
  }
}