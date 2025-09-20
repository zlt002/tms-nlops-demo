import { NextRequest } from 'next/server'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export const POST = withErrorHandler(async (_request: NextRequest) => {
  // 在实际项目中，这里应该将token加入黑名单或清除会话
  // 简化版：直接返回成功

  return ApiResponseBuilder.success(null, '登出成功')
})
