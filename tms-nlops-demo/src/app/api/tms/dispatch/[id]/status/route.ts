import { NextRequest, NextResponse } from 'next/server'
import { DispatchService } from '@/services/dispatchService'
import { ApiResponseBuilder } from '@/lib/api/response'
import { updateDispatchSchema } from '@/lib/validators/dispatch'
import { DispatchStatus } from '@prisma/client'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateDispatchSchema.parse(body)

    if (!validatedData.status) {
      return ApiResponseBuilder.error('状态参数不能为空', undefined, 400)
    }

    const dispatch = await DispatchService.updateDispatchStatus(
      params.id,
      validatedData.status as DispatchStatus,
      {
        actualDistance: validatedData.actualDistance,
        actualDuration: validatedData.actualDuration,
        reason: validatedData.cancelReason
      }
    )

    // 根据状态变更返回不同的消息
    let message = '发车单状态更新成功'
    switch (validatedData.status) {
      case DispatchStatus.ASSIGNED:
        message = '发车单已分配'
        break
      case DispatchStatus.IN_TRANSIT:
        message = '发车单已开始运输'
        break
      case DispatchStatus.COMPLETED:
        message = '发车单已完成'
        break
      case DispatchStatus.CANCELLED:
        message = '发车单已取消'
        break
      case DispatchStatus.DELAYED:
        message = '发车单已标记为延迟'
        break
    }

    return ApiResponseBuilder.success(dispatch, message)
  } catch (error) {
    console.error('更新发车单状态失败:', error)

    if (error.name === 'ZodError') {
      return ApiResponseBuilder.error(
        '数据验证失败',
        error.errors,
        400
      )
    }

    // 处理业务逻辑错误
    if (error.message.includes('无法从') && error.message.includes('转换到')) {
      return ApiResponseBuilder.error(error.message, undefined, 400)
    }

    if (error.message === '发车单不存在') {
      return ApiResponseBuilder.error(error.message, undefined, 404)
    }

    return ApiResponseBuilder.error(
      '更新发车单状态失败',
      error instanceof Error ? error.message : '未知错误',
      500
    )
  }
}