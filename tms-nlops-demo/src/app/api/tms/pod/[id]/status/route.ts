import { NextRequest } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updatePODStatusSchema } from '@/lib/validators/pod'

export const PUT = withErrorHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const podId = params.id

  const body = await request.json()
  const validatedData = updatePODStatusSchema.parse(body)

  const updateData = {
    ...validatedData,
    updatedBy: 'system' // 实际应用中应该从认证用户获取
  }

  const pod = await PODService.updatePOD(podId, updateData)

  return ApiResponseBuilder.success(pod, 'POD状态更新成功')
})