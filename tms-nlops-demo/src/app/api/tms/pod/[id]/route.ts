import { NextRequest } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export const GET = withErrorHandler(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const podId = params.id

  const pod = await PODService.getPODById(podId)

  if (!pod) {
    return ApiResponseBuilder.error('POD不存在', 404)
  }

  return ApiResponseBuilder.success(pod, 'POD详情获取成功')
})