import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder } from '@/lib/api/response'
import { DispatchStatus } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dispatch = await prisma.dispatch.findUnique({
      where: { id: params.id },
      include: {
        customer: {
          select: {
            id: true,
            customerNumber: true,
            companyName: true,
            email: true,
            phone: true,
            address: true,
            creditRating: true
          }
        },
        vehicle: {
          select: {
            id: true,
            licensePlate: true,
            type: true,
            maxLoad: true,
            maxVolume: true,
            status: true,
            fuelLevel: true,
            dailyRate: true
          }
        },
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            licenseNumber: true,
            rating: true,
            status: true,
            drivingYears: true,
            totalTrips: true
          }
        },
        shipments: {
          include: {
            order: {
              select: {
                id: true,
                orderNumber: true,
                cargoName: true,
                cargoWeight: true,
                cargoVolume: true,
                totalAmount: true,
                status: true,
                expectedTime: true
              }
            }
          },
          orderBy: { sequence: 'asc' }
        },
        trackingLogs: {
          orderBy: { timestamp: 'desc' },
          take: 10
        },
        documents: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!dispatch) {
      return ApiResponseBuilder.error('发车单不存在', undefined, 404)
    }

    // 计算额外信息
    const totalElapsed = dispatch.actualDeparture
      ? Date.now() - dispatch.actualDeparture.getTime()
      : 0

    const estimatedTimeRemaining = dispatch.estimatedArrival && dispatch.actualDeparture
      ? Math.max(0, dispatch.estimatedArrival.getTime() - Date.now())
      : 0

    const progress = dispatch.status === DispatchStatus.COMPLETED
      ? 100
      : dispatch.status === DispatchStatus.IN_TRANSIT && dispatch.plannedDeparture && dispatch.estimatedArrival
      ? Math.min(100, ((Date.now() - dispatch.plannedDeparture.getTime()) / (dispatch.estimatedArrival.getTime() - dispatch.plannedDeparture.getTime())) * 100)
      : dispatch.status === DispatchStatus.ASSIGNED ? 10 : 0

    // 构建状态时间线
    const timeline = []
    if (dispatch.createdAt) {
      timeline.push({
        status: 'CREATED',
        timestamp: dispatch.createdAt,
        label: '发车单创建'
      })
    }
    if (dispatch.plannedDeparture) {
      timeline.push({
        status: 'PLANNED',
        timestamp: dispatch.plannedDeparture,
        label: '计划发车'
      })
    }
    if (dispatch.actualDeparture) {
      timeline.push({
        status: 'DEPARTED',
        timestamp: dispatch.actualDeparture,
        label: '实际发车'
      })
    }
    if (dispatch.estimatedArrival) {
      timeline.push({
        status: 'ESTIMATED_ARRIVAL',
        timestamp: dispatch.estimatedArrival,
        label: '预计到达'
      })
    }
    if (dispatch.actualArrival) {
      timeline.push({
        status: 'ARRIVED',
        timestamp: dispatch.actualArrival,
        label: '实际到达'
      })
    }
    if (dispatch.completedAt) {
      timeline.push({
        status: 'COMPLETED',
        timestamp: dispatch.completedAt,
        label: '完成'
      })
    }
    if (dispatch.cancelledAt) {
      timeline.push({
        status: 'CANCELLED',
        timestamp: dispatch.cancelledAt,
        label: '取消'
      })
    }

    return ApiResponseBuilder.success({
      ...dispatch,
      progress: Math.round(progress),
      totalElapsed,
      estimatedTimeRemaining,
      timeline: timeline.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
      statusInfo: {
        current: dispatch.status,
        canUpdate: getAvailableStatusTransitions(dispatch.status),
        nextActions: getNextActions(dispatch.status)
      }
    }, '获取发车单详情成功')
  } catch (error) {
    console.error('获取发车单详情失败:', error)
    return ApiResponseBuilder.error(
      '获取发车单详情失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}

// 获取可用的状态转换
function getAvailableStatusTransitions(currentStatus: DispatchStatus): DispatchStatus[] {
  const transitions = {
    [DispatchStatus.PLANNING]: [DispatchStatus.SCHEDULED, DispatchStatus.CANCELLED],
    [DispatchStatus.SCHEDULED]: [DispatchStatus.ASSIGNED, DispatchStatus.CANCELLED],
    [DispatchStatus.ASSIGNED]: [DispatchStatus.IN_TRANSIT, DispatchStatus.CANCELLED],
    [DispatchStatus.IN_TRANSIT]: [DispatchStatus.COMPLETED, DispatchStatus.DELAYED, DispatchStatus.CANCELLED],
    [DispatchStatus.COMPLETED]: [],
    [DispatchStatus.CANCELLED]: [],
    [DispatchStatus.DELAYED]: [DispatchStatus.IN_TRANSIT, DispatchStatus.COMPLETED, DispatchStatus.CANCELLED]
  }

  return transitions[currentStatus] || []
}

// 获取下一步可执行的操作
function getNextActions(currentStatus: DispatchStatus): string[] {
  const actions = {
    [DispatchStatus.PLANNING]: ['schedule', 'cancel'],
    [DispatchStatus.SCHEDULED]: ['assign', 'cancel'],
    [DispatchStatus.ASSIGNED]: ['start_transport', 'cancel'],
    [DispatchStatus.IN_TRANSIT]: ['complete', 'delay', 'cancel'],
    [DispatchStatus.COMPLETED]: [],
    [DispatchStatus.CANCELLED]: [],
    [DispatchStatus.DELAYED]: ['resume', 'complete', 'cancel']
  }

  return actions[currentStatus] || []
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dispatch = await prisma.dispatch.findUnique({
      where: { id: params.id }
    })

    if (!dispatch) {
      return ApiResponseBuilder.error('发车单不存在', undefined, 404)
    }

    // 检查是否可以删除
    if (dispatch.status === DispatchStatus.IN_TRANSIT) {
      return ApiResponseBuilder.error('运输中的发车单不能删除', undefined, 400)
    }

    if (dispatch.status === DispatchStatus.COMPLETED) {
      return ApiResponseBuilder.error('已完成的发车单不能删除', undefined, 400)
    }

    // 取消发车单
    await DispatchService.updateDispatchStatus(params.id, DispatchStatus.CANCELLED, {
      reason: '用户删除'
    })

    return ApiResponseBuilder.success(null, '发车单已删除')
  } catch (error) {
    console.error('删除发车单失败:', error)

    if (error.message === '发车单不存在') {
      return ApiResponseBuilder.error(error.message, undefined, 404)
    }

    return ApiResponseBuilder.error(
      '删除发车单失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}