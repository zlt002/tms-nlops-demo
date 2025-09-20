import { NextRequest } from 'next/server'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export const GET = withErrorHandler(async (request: NextRequest) => {
  // 从请求头获取token
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponseBuilder.error('未授权', 401)
  }

  const token = authHeader.substring(7)

  // 解析token获取用户信息（简化版）
  const userId = token.split('-')[1]

  if (!userId) {
    return ApiResponseBuilder.error('无效的token', 401)
  }

  // 返回模拟的用户信息
  return ApiResponseBuilder.success({
    id: userId,
    email: 'user@example.com',
    name: '演示用户',
    role: 'USER'
  })
})
