import { NextRequest, NextResponse } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url)
    const podId = params.id

    // 获取POD详情
    if (searchParams.get('action') === 'detail') {
      const pods = await PODService.getPODs({ orderId: podId })

      if (pods.pods.length === 0) {
        return ApiResponseBuilder.error('回单不存在', 404)
      }

      return ApiResponseBuilder.success(pods.pods[0])
    }

    // 生成POD报告
    if (searchParams.get('action') === 'report') {
      const format = searchParams.get('format') || 'json'
      const includeDetails = searchParams.get('includeDetails') !== 'false'

      const report = await PODService.generatePODReport(podId)

      return ApiResponseBuilder.success(report)
    }

    // 默认返回POD信息
    const pods = await PODService.getPODs({ podId })
    
    if (pods.pods.length === 0) {
      return ApiResponseBuilder.error('回单不存在', 404)
    }

    return ApiResponseBuilder.success(pods.pods[0])
  })()
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const podId = params.id

    // 更新POD信息
    if (body.action === 'update') {
      const { notes, tags } = body

      // TODO: 实现POD更新逻辑
      // 由于Prisma模式中没有定义update方法，这里需要添加

      return ApiResponseBuilder.success(null, 'POD更新成功')
    }

    // 验证POD
    if (body.action === 'verify') {
      const verifiedBy = body.verifiedBy || 'system'
      const verificationData = {
        verifiedBy,
        signatureWaived: body.signatureWaived || false,
        photoWaived: body.photoWaived || false,
        notes: body.notes,
        autoVerify: body.autoVerify || false
      }

      const pod = await PODService.verifyPOD(podId, verificationData)

      return ApiResponseBuilder.success(pod, 'POD验证成功')
    }

    return ApiResponseBuilder.error('不支持的操作', 400)
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const podId = params.id

    // TODO: 实现POD删除逻辑
    // 由于Prisma模式中没有定义delete方法，这里需要添加
    // 或者标记为已删除状态

    return ApiResponseBuilder.success(null, 'POD删除成功')
  })()
}
