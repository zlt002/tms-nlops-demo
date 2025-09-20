import { NextRequest, NextResponse } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import {
  podUploadSchema,
  podVerificationSchema,
  podQuerySchema,
  bulkUploadSchema,
  podReportSchema
} from '@/lib/validators/pod'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  // 获取POD统计
  if (searchParams.get('action') === 'stats') {
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate)
    } : undefined

    const stats = await PODService.getPODStats(dateRange)

    return ApiResponseBuilder.success(stats)
  }

  // 获取待验证列表
  if (searchParams.get('action') === 'pending') {
    const pendingPODs = await PODService.getPendingVerifications()

    return ApiResponseBuilder.success(pendingPODs)
  }

  // 默认返回POD列表
  const query = {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    orderId: searchParams.get('orderId'),
    status: searchParams.get('status'),
    uploaderId: searchParams.get('uploaderId'),
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    sortBy: searchParams.get('sortBy'),
    sortOrder: searchParams.get('sortOrder')
  }

  const validatedQuery = podQuerySchema.parse(query)
  const result = await PODService.getPODs(validatedQuery)

  return NextResponse.json({
    success: true,
    data: result.pods,
    pagination: result.pagination
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()

  // 上传单个POD
  if (body.action === 'upload') {
    const validatedData = podUploadSchema.parse(body)

    const pod = await PODService.uploadPOD({
      ...validatedData,
      uploadedBy: 'current_user' // TODO: 从认证用户获取
    })

    return ApiResponseBuilder.success(pod, '回单上传成功')
  }

  // 验证POD
  if (body.action === 'verify') {
    const { podId, ...verificationData } = body

    if (!podId) {
      return ApiResponseBuilder.error('回单ID不能为空', 400)
    }

    const validatedData = podVerificationSchema.parse(verificationData)

    const pod = await PODService.verifyPOD(podId, validatedData)

    return ApiResponseBuilder.success(pod, '回单验证成功')
  }

  // 批量上传POD
  if (body.action === 'bulkUpload') {
    const validatedData = bulkUploadSchema.parse(body)

    const result = await PODService.bulkUploadPODs(validatedData.pods.map(pod => ({
      ...pod,
      uploadedBy: 'current_user' // TODO: 从认证用户获取
    })))

    if (result.failed > 0) {
      return ApiResponseBuilder.success({
        ...result,
        message: `批量上传完成：成功${result.successful}个，失败${result.failed}个`
      }, '批量上传完成，部分失败')
    }

    return ApiResponseBuilder.success(result, '批量上传成功')
  }

  // 生成报告
  if (body.action === 'generateReport') {
    const validatedData = podReportSchema.parse(body)

    const report = await PODService.generatePODReport(validatedData.podId)

    return ApiResponseBuilder.success(report, '报告生成成功')
  }

  // 自动验证
  if (body.action === 'autoVerify') {
    const result = await PODService.autoVerifyPODs()

    return ApiResponseBuilder.success(result, '自动验证完成')
  }

  return ApiResponseBuilder.error('不支持的操作', 400)
})
