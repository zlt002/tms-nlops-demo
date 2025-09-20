import { NextRequest } from 'next/server'
import { ApiResponseBuilder } from './response'

export async function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponseBuilder.error('未授权', 401)
  }

  const token = authHeader.substring(7)

  // 这里应该验证token的有效性
  // 简化版：只检查token格式
  if (!token || !token.includes('-')) {
    return ApiResponseBuilder.error('无效的token', 401)
  }

  return null // 验证通过
}

export async function requireRole(request: NextRequest, requiredRoles: string[]) {
  const authResult = await requireAuth(request)
  if (authResult) return authResult

  // 简化版：从token中获取角色信息
  const authHeader = request.headers.get('authorization')!
  const token = authHeader.substring(7)
  const userRole = token.split('-')[2] || 'USER'

  if (!requiredRoles.includes(userRole)) {
    return ApiResponseBuilder.error('权限不足', 403)
  }

  return null // 验证通过
}

export function logRequest(request: NextRequest) {
  const startTime = Date.now()

  return {
    endTime: () => {
      const duration = Date.now() - startTime
      console.warn(`${request.method} ${request.url} - ${duration}ms`)
    }
  }
}

export function rateLimit(_request: NextRequest, _limit: number = 100, _windowMs: number = 60000) {
  // 这里应该使用Redis等缓存服务实现限流
  // 简化版：直接允许请求通过

  // 返回null表示允许请求
  return null
}