import { NextRequest, NextResponse } from 'next/server'

export interface SecurityOptions {
  enableCORS: boolean
  enableCSRF: boolean
  enableHelmet: boolean
  enableRateLimit: boolean
  enableSanitize: boolean
  maxBodySize: number
  allowedOrigins: string[]
  blockedUserAgents: string[]
}

export class SecurityMiddleware {
  private static defaultOptions: SecurityOptions = {
    enableCORS: true,
    enableCSRF: true,
    enableHelmet: true,
    enableRateLimit: true,
    enableSanitize: true,
    maxBodySize: 1024 * 1024, // 1MB
    allowedOrigins: ['*'],
    blockedUserAgents: []
  }

  private static rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map()

  static middleware(options: Partial<SecurityOptions> = {}) {
    const opts = { ...this.defaultOptions, ...options }

    return async function securityMiddleware(request: NextRequest): Promise<NextResponse> {
      // 1. 检查用户代理
      if (this.isBlockedUserAgent(request, opts.blockedUserAgents)) {
        return new NextResponse('Forbidden', { status: 403 })
      }

      // 2. 检查请求体大小
      const contentLength = request.headers.get('content-length')
      if (contentLength && parseInt(contentLength) > opts.maxBodySize) {
        return new NextResponse('Request entity too large', { status: 413 })
      }

      // 3. 检查速率限制
      if (opts.enableRateLimit) {
        const rateLimitResult = this.checkRateLimit(request)
        if (rateLimitResult) {
          return rateLimitResult
        }
      }

      // 4. 处理请求
      const response = await this.processRequest(request)

      // 5. 添加安全头
      if (opts.enableHelmet) {
        this.addSecurityHeaders(response)
      }

      // 6. 添加CORS头
      if (opts.enableCORS) {
        this.addCORSHeaders(response, opts.allowedOrigins)
      }

      // 7. CSRF保护
      if (opts.enableCSRF) {
        this.addCSRFHeaders(response)
      }

      return response
    }.bind(this)
  }

  private static async processRequest(request: NextRequest): Promise<NextResponse> {
    // 实际应用中，这里应该调用Next.js的处理函数
    return NextResponse.next()
  }

  private static isBlockedUserAgent(request: NextRequest, blockedAgents: string[]): boolean {
    const userAgent = request.headers.get('user-agent') || ''
    return blockedAgents.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()))
  }

  private static checkRateLimit(request: NextRequest): NextResponse | null {
    const clientIP = this.getClientIP(request)
    const key = `rate_limit:${clientIP}`
    const now = Date.now()
    const windowSize = 60000 // 1分钟
    const maxRequests = 100

    let record = this.rateLimitStore.get(key)
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowSize }
      this.rateLimitStore.set(key, record)
    }

    if (record.count >= maxRequests) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': record.resetTime.toString(),
          'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString()
        }
      })
    }

    record.count++

    // 清理过期的记录
    this.cleanupRateLimitRecords()

    return null
  }

  private static cleanupRateLimitRecords(): void {
    const now = Date.now()
    for (const [key, record] of this.rateLimitStore) {
      if (now > record.resetTime) {
        this.rateLimitStore.delete(key)
      }
    }
  }

  private static addSecurityHeaders(response: NextResponse): void {
    // 内容安全策略
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';"
    )

    // 其他安全头
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    // HSTS (仅在生产环境)
    if (process.env.NODE_ENV === 'production') {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }
  }

  private static addCORSHeaders(response: NextResponse, allowedOrigins: string[]): void {
    const origin = response.headers.get('Origin') || '*'

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    } else {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0] || '*')
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.headers.set('Access-Control-Max-Age', '86400')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  private static addCSRFHeaders(response: NextResponse): void {
    // 生成CSRF令牌
    const csrfToken = this.generateCSRFToken()
    response.headers.set('X-CSRF-Token', csrfToken)

    // 设置CSRF cookie
    response.cookies.set({
      name: 'csrf_token',
      value: csrfToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600 // 1小时
    })
  }

  private static generateCSRFToken(): string {
    return 'csrf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private static getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown'
    )
  }

  // 输入清理
  static sanitizeInput(input: string): string {
    if (!input) return input

    // 移除潜在的XSS字符
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
  }

  // SQL注入防护
  static sanitizeSQL(input: string): string {
    if (!input) return input

    // 移除潜在的SQL注入字符
    return input
      .replace(/['"]/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
      .replace(/xp_/gi, '')
      .replace(/exec\s*\(/gi, '')
  }

  // NoSQL注入防护
  static sanitizeNoSQL(input: string): string {
    if (!input) return input

    // 移除潜在的NoSQL注入操作符
    return input
      .replace(/\$where/gi, '')
      .replace(/\$ne/gi, '')
      .replace(/\$gt/gi, '')
      .replace(/\$lt/gi, '')
      .replace(/\$gte/gi, '')
      .replace(/\$lte/gi, '')
      .replace(/\$in/gi, '')
      .replace(/\$nin/gi, '')
      .replace(/\$or/gi, '')
      .replace(/\$and/gi, '')
      .replace(/\$not/gi, '')
      .replace(/\$regex/gi, '')
  }
}

// 安全中间件装饰器
export function withSecurity(options: Partial<SecurityOptions> = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function securityHandler(request: NextRequest, ...args: any[]) {
      try {
        // 验证CSRF令牌（对于状态改变请求）
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
          const csrfToken = request.headers.get('x-csrf-token')
          const cookieToken = request.cookies.get('csrf_token')?.value

          if (!csrfToken || csrfToken !== cookieToken) {
            return new NextResponse('Invalid CSRF token', { status: 403 })
          }
        }

        // 检查内容类型
        const contentType = request.headers.get('content-type')
        if (request.method !== 'GET' && request.method !== 'HEAD' && !contentType?.includes('application/json')) {
          return new NextResponse('Unsupported Media Type', { status: 415 })
        }

        // 执行处理器
        return await handler(request, ...args)
      } catch (error) {
        throw error
      }
    }
  }
}

// 认证中间件
export function withAuth(roles: string[] = []) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function authHandler(request: NextRequest, ...args: any[]) {
      const authHeader = request.headers.get('authorization')

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse('Unauthorized', { status: 401 })
      }

      const token = authHeader.substring(7)

      // 这里应该验证token的有效性
      // 简化实现：检查token格式
      if (!token || !token.includes('-')) {
        return new NextResponse('Invalid token', { status: 401 })
      }

      // 检查角色权限
      if (roles.length > 0) {
        const userRole = token.split('-')[2] || 'USER'
        if (!roles.includes(userRole)) {
          return new NextResponse('Insufficient permissions', { status: 403 })
        }
      }

      // 将用户信息附加到请求
      ;(request as any).user = {
        id: token.split('-')[0],
        role: token.split('-')[2] || 'USER'
      }

      return await handler(request, ...args)
    }
  }
}
