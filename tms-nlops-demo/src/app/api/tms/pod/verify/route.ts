import { NextRequest } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { verifyPODSchema } from '@/lib/validators/pod'

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = verifyPODSchema.parse(body)

  const verifyData = {
    ...validatedData,
    userId: 'system', // 实际应用中应该从认证用户获取
    userName: 'System User' // 实际应用中应该从认证用户获取
  }

  const pod = await PODService.verifyPOD(verifyData)

  return ApiResponseBuilder.success(pod, 'POD验证操作成功')
})