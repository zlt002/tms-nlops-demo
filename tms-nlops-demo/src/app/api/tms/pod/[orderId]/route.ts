import { NextRequest } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createPODWithFileSchema } from '@/lib/validators/pod'

export const POST = withErrorHandler(async (request: NextRequest, { params }: { params: { orderId: string } }) => {
  const orderId = params.orderId

  // 检查Content-Type是否为multipart/form-data
  const contentType = request.headers.get('content-type')
  if (!contentType?.includes('multipart/form-data')) {
    return ApiResponseBuilder.error('必须使用multipart/form-data格式上传文件', 400)
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return ApiResponseBuilder.error('必须上传文件', 400)
    }

    // 构建POD数据
    const podData = {
      orderId,
      documentType: formData.get('documentType') || undefined,
      deliveryLocation: formData.get('deliveryLocation') || undefined,
      deliveryTime: formData.get('deliveryTime') ? new Date(formData.get('deliveryTime') as string) : undefined,
      receiverName: formData.get('receiverName') || undefined,
      receiverContact: formData.get('receiverContact') || undefined,
      cargoCondition: formData.get('cargoCondition') || undefined,
      specialNotes: formData.get('specialNotes') || undefined,
      tags: formData.get('tags')?.toString().split(',').filter(Boolean) || [],
      metadata: formData.get('metadata') || undefined,
      file,
      createdBy: formData.get('createdBy') || 'system' // 实际应用中应该从认证用户获取
    }

    // 验证数据
    const validatedData = createPODWithFileSchema.parse(podData)

    // 创建POD
    const pod = await PODService.createPOD(validatedData)

    return ApiResponseBuilder.success(pod, 'POD创建成功', 201)
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponseBuilder.error(error.message, 400)
    }
    return ApiResponseBuilder.error('文件上传失败', 400)
  }
})