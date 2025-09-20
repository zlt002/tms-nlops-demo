import { NextRequest, NextResponse } from 'next/server'
import { validateRequest } from '@/lib/middleware/validation'
import { rateLimit } from '@/lib/middleware/security'
import { logRequest } from '@/lib/middleware/logging'
import { SecurityMiddleware } from '@/lib/middleware/security'
import { ErrorHandler } from '@/lib/middleware/errorHandling'
import { ResponseFormatter } from '@/lib/middleware/response'
import { generateRequestId } from '@/lib/utils/requestId'

/**
 * TMS NL-Ops演示系统根级中间件
 * 统一处理API请求验证、安全防护、错误处理和响应格式化
 */
export async function middleware(request: NextRequest) {
  const requestId = generateRequestId()

  try {
    // 1. 记录请求日志
    await logRequest(request, requestId)

    // 2. 基础请求验证
    const validationResult = await validateRequest(request)
    if (!validationResult.valid) {
      return ResponseFormatter.error(
        '请求验证失败',
        400,
        validationResult.errors
      )
    }

    // 3. 安全检查和速率限制
    const securityResult = await SecurityMiddleware.middleware({
      enableCORS: true,
      enableHelmet: true,
      enableRateLimit: true,
      maxBodySize: 10 * 1024 * 1024, // 10MB
      allowedOrigins: process.env.NODE_ENV === 'production'
        ? [process.env.ALLOWED_ORIGINS || '']
        : ['*']
    })(request)

    if (securityResult.status !== 200) {
      return securityResult
    }

    // 4. 为API路由添加请求头
    if (request.nextUrl.pathname.startsWith('/api/')) {
      const response = NextResponse.next()

      // 添加请求ID追踪
      response.headers.set('X-Request-ID', requestId)

      // 添加安全头
      response.headers.set('X-Content-Type-Options', 'nosniff')
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('X-XSS-Protection', '1; mode=block')

      // 添加时间戳
      response.headers.set('X-Request-Start', Date.now().toString())

      return response
    }

    return NextResponse.next()
  } catch (error) {
    // 统一错误处理
    console.error(`[${requestId}] Middleware Error:`, error)
    return ErrorHandler.handle(error, request)
  }
}

/**
 * 中间件配置
 * 指定哪些路由需要应用中间件
 */
export const config = {
  matcher: [
    // API路由
    '/api/:path*',
    // 受保护的路由
    '/dashboard/:path*',
    '/admin/:path*',
    // 静态资源排除
    '/((?!_next/static|_next/image|favicon.ico|public/).*)'
  ]
}

/**
 * 性能优化的请求验证函数
 */
async function validateRequest(request: NextRequest): Promise<{ valid: boolean; errors?: any[] }> {
  const errors: any[] = []

  // 验证User-Agent
  const userAgent = request.headers.get('user-agent')
  if (!userAgent || userAgent.length < 10) {
    errors.push({
      field: 'user-agent',
      message: '无效的User-Agent'
    })
  }

  // 验证请求方法
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  if (!allowedMethods.includes(request.method)) {
    errors.push({
      field: 'method',
      message: `不支持的HTTP方法: ${request.method}`
    })
  }

  // 验证请求体大小
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const contentLength = request.headers.get('content-length')
    if (contentLength) {
      const length = parseInt(contentLength)
      if (length > 10 * 1024 * 1024) { // 10MB限制
        errors.push({
          field: 'content-length',
          message: '请求体过大，最大支持10MB'
        })
      }
    }
  }

  // 验证Content-Type（对于有请求体的请求）
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const contentType = request.headers.get('content-type')
    if (!contentType) {
      errors.push({
        field: 'content-type',
        message: '缺少Content-Type头'
      })
    } else {
      const allowedContentTypes = [
        'application/json',
        'application/x-www-form-urlencoded',
        'multipart/form-data'
      ]

      const isAllowed = allowedContentTypes.some(type =>
        contentType.toLowerCase().includes(type.toLowerCase())
      )

      if (!isAllowed) {
        errors.push({
          field: 'content-type',
          message: `不支持的Content-Type: ${contentType}`
        })
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined
  }
}

/**
 * 增强的日志记录函数
 */
async function logRequest(request: NextRequest, requestId: string): Promise<void> {
  const logData = {
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') ||
         request.headers.get('x-real-ip') ||
         'unknown',
    timestamp: new Date().toISOString()
  }

  // 开发环境：彩色控制台输出
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `\x1b[90m${logData.timestamp}\x1b[0m ` +
      `\x1b[36m${request.method}\x1b[0m ` +
      `${request.url} ` +
      `[${requestId}] ` +
      `[${logData.ip}]`
    )
  } else {
    // 生产环境：结构化日志
    console.log(JSON.stringify({
      ...logData,
      level: 'info',
      component: 'middleware'
    }))
  }
}