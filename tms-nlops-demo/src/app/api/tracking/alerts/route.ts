import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { alertQuerySchema, createTrackingAlertSchema, alertActionSchema } from '@/lib/validators/tracking'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = {
      shipmentId: searchParams.get('shipmentId') || undefined,
      alertType: searchParams.get('alertType') || undefined,
      severity: searchParams.get('severity') || undefined,
      status: searchParams.get('status') || undefined,
      startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'triggeredAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = alertQuerySchema.parse(query)

    const where: any = {}
    if (validatedQuery.shipmentId) where.shipmentId = validatedQuery.shipmentId
    if (validatedQuery.alertType) where.alertType = validatedQuery.alertType
    if (validatedQuery.severity) where.severity = validatedQuery.severity
    if (validatedQuery.status) where.status = validatedQuery.status
    if (validatedQuery.startDate || validatedQuery.endDate) {
      where.triggeredAt = {}
      if (validatedQuery.startDate) where.triggeredAt.gte = validatedQuery.startDate
      if (validatedQuery.endDate) where.triggeredAt.lte = validatedQuery.endDate
    }

    const [alerts, total] = await Promise.all([
      prisma.trackingAlert.findMany({
        where,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true,
              originAddress: true,
              destinationAddress: true
            }
          },
          trackingLog: {
            select: {
              id: true,
              timestamp: true,
              latitude: true,
              longitude: true,
              speed: true,
              status: true
            }
          }
        },
        skip: (validatedQuery.page - 1) * validatedQuery.limit,
        take: validatedQuery.limit,
        orderBy: {
          [validatedQuery.sortBy]: validatedQuery.sortOrder
        }
      }),
      prisma.trackingAlert.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: alerts,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        total,
        pages: Math.ceil(total / validatedQuery.limit)
      }
    })
  } catch (error) {
    console.error('获取警报列表失败:', error)
    return NextResponse.json(
      { error: '获取警报列表失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createTrackingAlertSchema.parse(body)

    // 检查运单是否存在
    const shipment = await prisma.shipment.findUnique({
      where: { id: validatedData.shipmentId }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    const alert = await prisma.trackingAlert.create({
      data: {
        shipmentId: validatedData.shipmentId,
        alertType: validatedData.alertType,
        severity: validatedData.severity,
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        trackingLogId: validatedData.trackingLogId,
        notes: validatedData.notes,
        status: 'ACTIVE'
      },
      include: {
        shipment: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true
          }
        }
      }
    })

    // 发送通知（这里可以集成消息推送服务）
    await sendAlertNotification(alert)

    return NextResponse.json({
      success: true,
      data: alert,
      message: '警报创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建警报失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '创建警报失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 警报操作路由
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = alertActionSchema.parse(body)

    const alert = await prisma.trackingAlert.findUnique({
      where: { id: validatedData.alertId }
    })

    if (!alert) {
      return NextResponse.json(
        { error: '警报不存在' },
        { status: 404 }
      )
    }

    let updateData: any = {}
    const currentTime = new Date()

    switch (validatedData.action) {
      case 'acknowledge':
        updateData = {
          status: 'ACKNOWLEDGED',
          acknowledgedBy: 'system', // 实际应用中应该是用户ID
          acknowledgedAt: currentTime,
          actionTaken: validatedData.actionTaken,
          notes: validatedData.notes
        }
        break
      case 'resolve':
        updateData = {
          status: 'RESOLVED',
          resolvedAt: currentTime,
          resolution: validatedData.resolution,
          actionTaken: validatedData.actionTaken,
          notes: validatedData.notes
        }
        break
      case 'dismiss':
        updateData = {
          status: 'DISMISSED',
          resolvedAt: currentTime,
          resolution: '已忽略',
          actionTaken: validatedData.actionTaken,
          notes: validatedData.notes
        }
        break
    }

    const updatedAlert = await prisma.trackingAlert.update({
      where: { id: validatedData.alertId },
      data: updateData,
      include: {
        shipment: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true
          }
        },
        trackingLog: {
          select: {
            id: true,
            timestamp: true,
            latitude: true,
            longitude: true,
            speed: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedAlert,
      message: '警报操作成功'
    })
  } catch (error) {
    console.error('警报操作失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '警报操作失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：发送警报通知
async function sendAlertNotification(alert: any) {
  try {
    // 这里可以集成各种通知服务，如：
    // - 邮件通知
    // - 短信通知
    // - 推送通知
    // - Webhook调用

    console.log('发送警报通知:', {
      alertId: alert.id,
      title: alert.title,
      severity: alert.severity,
      shipmentId: alert.shipmentId,
      shipmentNumber: alert.shipment?.shipmentNumber
    })

    // 示例：调用Webhook
    if (process.env.ALERT_WEBHOOK_URL) {
      await fetch(process.env.ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alert,
          timestamp: new Date().toISOString()
        })
      })
    }
  } catch (error) {
    console.error('发送警报通知失败:', error)
    // 不抛出错误，避免影响主要业务流程
  }
}

// 获取警报统计信息
export async function PATCH(request: NextRequest) {
  try {
    const { shipmentId } = await request.json()

    const where = shipmentId ? { shipmentId } : {}

    const [
      totalAlerts,
      activeAlerts,
      alertsByType,
      alertsBySeverity,
      recentAlerts
    ] = await Promise.all([
      prisma.trackingAlert.count({ where }),
      prisma.trackingAlert.count({
        where: {
          ...where,
          status: 'ACTIVE'
        }
      }),
      prisma.trackingAlert.groupBy({
        by: ['alertType'],
        where,
        _count: { alertType: true }
      }),
      prisma.trackingAlert.groupBy({
        by: ['severity'],
        where,
        _count: { severity: true }
      }),
      prisma.trackingAlert.findMany({
        where,
        orderBy: { triggeredAt: 'desc' },
        take: 10,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      })
    ])

    const alertsByTypeMap = alertsByType.reduce((acc, item) => {
      acc[item.alertType] = item._count.alertType
      return acc
    }, {} as Record<string, number>)

    const alertsBySeverityMap = alertsBySeverity.reduce((acc, item) => {
      acc[item.severity] = item._count.severity
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      success: true,
      data: {
        totalAlerts,
        activeAlerts,
        alertsByType: alertsByTypeMap,
        alertsBySeverity: alertsBySeverityMap,
        recentAlerts
      }
    })
  } catch (error) {
    console.error('获取警报统计失败:', error)
    return NextResponse.json(
      { error: '获取警报统计失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}