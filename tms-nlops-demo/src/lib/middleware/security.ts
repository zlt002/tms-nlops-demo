import { NextRequest, NextResponse } from 'next/server'
import { generateRequestId } from '@/lib/utils/requestId'

export interface SecurityOptions {
  enableCORS: boolean
  enableCSRF: boolean
  enableHelmet: boolean
  enableRateLimit: boolean
  enableSanitize: boolean
  enableWAF: boolean
  enableIPWhitelist: boolean
  enableBotProtection: boolean
  maxBodySize: number
  allowedOrigins: string[]
  blockedUserAgents: string[]
  whitelistedIPs: string[]
  blockedIPs: string[]
  rateLimitConfig: {
    windowMs: number
    maxRequests: number
    skipSuccessfulRequests?: boolean
    skipFailedRequests?: boolean
    keyGenerator?: (req: NextRequest) => string
  }
}

export interface RateLimitConfig {
  windowMs: number
  max: number
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (req: NextRequest) => string
  message?: string
}

export interface SecurityContext {
  ip: string
  userAgent: string
  isBot: boolean
  isWhitelisted: boolean
  isBlocked: boolean
  riskScore: number
  threats: string[]
}

export class SecurityMiddleware {
  private static defaultOptions: SecurityOptions = {
    enableCORS: true,
    enableCSRF: true,
    enableHelmet: true,
    enableRateLimit: true,
    enableSanitize: true,
    enableWAF: false,
    enableIPWhitelist: false,
    enableBotProtection: true,
    maxBodySize: 10 * 1024 * 1024, // 10MB
    allowedOrigins: ['*'],
    blockedUserAgents: [],
    whitelistedIPs: [],
    blockedIPs: [],
    rateLimitConfig: {
      windowMs: 15 * 60 * 1000, // 15分钟
      maxRequests: 100,
      skipSuccessfulRequests: false,
      skipFailedRequests: false
    }
  }

  private static rateLimitStore: Map<string, { count: number; resetTime: number; blockedUntil?: number }> = new Map()
  private static blockedIPs: Set<string> = new Set()
  private static whitelistedIPs: Set<string> = new Set()
  private static securityContexts: Map<string, SecurityContext> = new Map()

  /**
   * 创建安全中间件
   */
  static middleware(options: Partial<SecurityOptions> = {}) {
    const opts = { ...this.defaultOptions, ...options }

    return async function securityMiddleware(request: NextRequest): Promise<NextResponse> {
      const requestId = generateRequestId()
      const startTime = performance.now()

      try {
        // 1. 创建安全上下文
        const securityContext = this.createSecurityContext(request)

        // 2. 检查IP白名单
        if (opts.enableIPWhitelist && !this.isIPWhitelisted(securityContext.ip, opts.whitelistedIPs)) {
          return this.createBlockedResponse('IP not whitelisted', 403, requestId)
        }

        // 3. 检查IP黑名单
        if (this.isIPBlocked(securityContext.ip, opts.blockedIPs)) {
          return this.createBlockedResponse('IP blocked', 403, requestId)
        }

        // 4. 检查用户代理
        if (this.isBlockedUserAgent(request, opts.blockedUserAgents)) {
          return this.createBlockedResponse('User agent blocked', 403, requestId)
        }

        // 5. 机器人检测
        if (opts.enableBotProtection && securityContext.isBot) {
          this.logSecurityEvent('BOT_DETECTED', {
            ip: securityContext.ip,
            userAgent: securityContext.userAgent,
            threats: securityContext.threats
          }, request)
        }

        // 6. WAF检查
        if (opts.enableWAF) {
          const wafResult = this.checkWAF(request, securityContext)
          if (wafResult.blocked) {
            return this.createBlockedResponse('WAF blocked', 403, requestId, wafResult.reason)
          }
        }

        // 7. 检查请求体大小
        const contentLength = request.headers.get('content-length')
        if (contentLength && parseInt(contentLength) > opts.maxBodySize) {
          return this.createBlockedResponse('Request entity too large', 413, requestId)
        }

        // 8. 检查速率限制
        if (opts.enableRateLimit) {
          const rateLimitResult = this.checkRateLimit(request, opts.rateLimitConfig)
          if (rateLimitResult.blocked) {
            return this.createRateLimitResponse(rateLimitResult, requestId)
          }
        }

        // 9. 处理请求
        const response = await this.processRequest(request)

        // 10. 添加安全头
        if (opts.enableHelmet) {
          this.addSecurityHeaders(response, securityContext)
        }

        // 11. 添加CORS头
        if (opts.enableCORS) {
          this.addCORSHeaders(response, opts.allowedOrigins, request)
        }

        // 12. CSRF保护
        if (opts.enableCSRF) {
          this.addCSRFHeaders(response, request)
        }

        // 13. 添加安全追踪头
        this.addSecurityTrackingHeaders(response, securityContext, requestId, startTime)

        return response
      } catch (error) {
        this.logSecurityEvent('SECURITY_MIDDLEWARE_ERROR', {
          error: error.message,
          stack: error.stack,
          requestId
        }, request)
        throw error
      }
    }.bind(this)
  }

  /**
   * 创建安全上下文
   */
  private static createSecurityContext(request: NextRequest): SecurityContext {
    const ip = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || ''

    const threats: string[] = []
    let riskScore = 0

    // 检测威胁
    if (this.detectSuspiciousUserAgent(userAgent)) {
      threats.push('SUSPICIOUS_USER_AGENT')
      riskScore += 20
    }

    if (this.detectPotentialAttack(request)) {
      threats.push('POTENTIAL_ATTACK')
      riskScore += 40
    }

    if (this.detectBot(userAgent)) {
      threats.push('BOT_DETECTED')
      riskScore += 10
    }

    const context: SecurityContext = {
      ip,
      userAgent,
      isBot: this.detectBot(userAgent),
      isWhitelisted: this.whitelistedIPs.has(ip),
      isBlocked: this.blockedIPs.has(ip),
      riskScore,
      threats
    }

    this.securityContexts.set(ip, context)
    return context
  }

  /**
   * WAF检查
   */
  private static checkWAF(request: NextRequest, context: SecurityContext): { blocked: boolean; reason?: string } {
    const url = request.url.toLowerCase()
    const method = request.method.toUpperCase()

    // 检查SQL注入
    const sqlPatterns = [
      /union\s+select/i,
      /or\s+1\s*=\s*1/i,
      /drop\s+table/i,
      /insert\s+into/i,
      /update\s+.*\s+set/i,
      /delete\s+from/i,
      /;\s*drop/i,
      /;\s*exec/i
    ]

    for (const pattern of sqlPatterns) {
      if (pattern.test(url)) {
        this.logSecurityEvent('SQL_INJECTION_DETECTED', {
          ip: context.ip,
          url,
          pattern: pattern.toString()
        }, request)
        return { blocked: true, reason: 'SQL injection detected' }
      }
    }

    // 检查XSS
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i
    ]

    for (const pattern of xssPatterns) {
      if (pattern.test(url)) {
        this.logSecurityEvent('XSS_DETECTED', {
          ip: context.ip,
          url,
          pattern: pattern.toString()
        }, request)
        return { blocked: true, reason: 'XSS detected' }
      }
    }

    // 检查路径遍历
    const pathTraversalPatterns = [
      /\.\.\//i,
      /\.\.\\\\/i,
      /%2e%2e%2f/i,
      /%2e%2e\\\\/i
    ]

    for (const pattern of pathTraversalPatterns) {
      if (pattern.test(url)) {
        this.logSecurityEvent('PATH_TRAVERSAL_DETECTED', {
          ip: context.ip,
          url,
          pattern: pattern.toString()
        }, request)
        return { blocked: true, reason: 'Path traversal detected' }
      }
    }

    // 检查命令注入
    const cmdPatterns = [
      /\|\s*cmd/i,
      /\|\s*sh/i,
      /;\s*ls/i,
      /;\s*cat/i,
      /;\s*rm/i,
      /;\s*wget/i,
      /;\s*curl/i
    ]

    for (const pattern of cmdPatterns) {
      if (pattern.test(url)) {
        this.logSecurityEvent('COMMAND_INJECTION_DETECTED', {
          ip: context.ip,
          url,
          pattern: pattern.toString()
        }, request)
        return { blocked: true, reason: 'Command injection detected' }
      }
    }

    return { blocked: false }
  }

  /**
   * 检测可疑的用户代理
   */
  private static detectSuspiciousUserAgent(userAgent: string): boolean {
    const suspiciousPatterns = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /metasploit/i,
      /burp/i,
      /zap/i,
      /w3af/i,
      /paros/i,
      /skipfish/i,
      /dirbuster/i,
      /gobuster/i,
      /hydra/i,
      /medusa/i,
      /john/i,
      /hashcat/i,
      /bot/i,
      /spider/i,
      /crawler/i,
      /scanner/i
    ]

    return suspiciousPatterns.some(pattern => pattern.test(userAgent))
  }

  /**
   * 检测潜在攻击
   */
  private static detectPotentialAttack(request: NextRequest): boolean {
    const url = request.url.toLowerCase()
    const headers = request.headers

    // 检查异常的请求头
    const suspiciousHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-client-ip',
      'x-proxy-user-ip'
    ]

    const forwardedCount = suspiciousHeaders.filter(header =>
      headers.get(header) !== null
    ).length

    if (forwardedCount > 2) {
      return true
    }

    // 检查请求参数中的特殊字符
    const specialChars = /[<>\"'&]/g
    if (specialChars.test(url)) {
      return true
    }

    return false
  }

  /**
   * 检测机器人
   */
  private static detectBot(userAgent: string): boolean {
    if (!userAgent || userAgent.length < 10) {
      return true
    }

    const botPatterns = [
      /googlebot/i,
      /bingbot/i,
      /slurp/i,
      /duckduckbot/i,
      /baiduspider/i,
      /yandexbot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /linkedinbot/i,
      /whatsapp/i,
      /telegram/i,
      /curl/i,
      /wget/i,
      /python/i,
      /requests/i,
      /axios/i,
      /postman/i,
      /insomnia/i
    ]

    return botPatterns.some(pattern => pattern.test(userAgent))
  }

  /**
   * 增强的速率限制
   */
  private static checkRateLimit(request: NextRequest, config: RateLimitConfig): { blocked: boolean; retryAfter?: number; reason?: string } {
    const keyGenerator = config.keyGenerator || this.getClientIP.bind(this)
    const key = keyGenerator(request)
    const now = Date.now()
    const windowStart = now - config.windowMs

    let record = this.rateLimitStore.get(key)

    if (!record || now > record.resetTime) {
      record = {
        count: 0,
        resetTime: now + config.windowMs
      }
      this.rateLimitStore.set(key, record)
    }

    // 检查是否被临时封禁
    if (record.blockedUntil && now < record.blockedUntil) {
      return {
        blocked: true,
        retryAfter: Math.ceil((record.blockedUntil - now) / 1000),
        reason: 'Temporary ban'
      }
    }

    if (record.count >= config.max) {
      // 临时封禁（递增）
      const banDuration = Math.min(300000, record.count * 60000) // 最多5分钟
      record.blockedUntil = now + banDuration

      this.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip: key,
        count: record.count,
        max: config.max,
        banDuration
      }, request)

      return {
        blocked: true,
        retryAfter: Math.ceil(banDuration / 1000),
        reason: 'Rate limit exceeded'
      }
    }

    record.count++

    // 清理过期的记录
    this.cleanupRateLimitRecords()

    return { blocked: false }
  }

  /**
   * 创建被阻止的响应
   */
  private static createBlockedResponse(message: string, status: number, requestId: string, details?: string): NextResponse {
    return NextResponse.json({
      success: false,
      error: message,
      code: 'SECURITY_BLOCKED',
      details,
      timestamp: new Date().toISOString(),
      requestId
    }, { status })
  }

  /**
   * 创建速率限制响应
   */
  private static createRateLimitResponse(result: any, requestId: string): NextResponse {
    return NextResponse.json({
      success: false,
      error: result.reason || 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: result.retryAfter,
      timestamp: new Date().toISOString(),
      requestId
    }, { status: 429, headers: {
      'Retry-After': result.retryAfter?.toString(),
      'X-RateLimit-Remaining': '0'
    }})
  }

  /**
   * 处理请求
   */
  private static async processRequest(request: NextRequest): Promise<NextResponse> {
    // 实际应用中，这里应该调用Next.js的处理函数
    return NextResponse.next()
  }

  /**
   * 检查IP白名单
   */
  private static isIPWhitelisted(ip: string, whitelistedIPs: string[]): boolean {
    if (whitelistedIPs.length === 0) return true
    return whitelistedIPs.some(whitelistedIP => {
      // 支持CIDR格式
      if (whitelistedIP.includes('/')) {
        return this.isIPInCIDR(ip, whitistedIP)
      }
      return ip === whitelistedIP
    })
  }

  /**
   * 检查IP黑名单
   */
  private static isIPBlocked(ip: string, blockedIPs: string[]): boolean {
    return blockedIPs.some(blockedIP => {
      // 支持CIDR格式
      if (blockedIP.includes('/')) {
        return this.isIPInCIDR(ip, blockedIP)
      }
      return ip === blockedIP
    })
  }

  /**
   * 检查IP是否在CIDR范围内
   */
  private static isIPInCIDR(ip: string, cidr: string): boolean {
    // 简化实现，实际应该使用netmask或其他库
    return false
  }

  /**
   * 检查被阻止的用户代理
   */
  private static isBlockedUserAgent(request: NextRequest, blockedAgents: string[]): boolean {
    const userAgent = request.headers.get('user-agent') || ''
    return blockedAgents.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()))
  }

  /**
   * 清理速率限制记录
   */
  private static cleanupRateLimitRecords(): void {
    const now = Date.now()
    for (const [key, record] of this.rateLimitStore) {
      if (now > record.resetTime && (!record.blockedUntil || now > record.blockedUntil)) {
        this.rateLimitStore.delete(key)
      }
    }
  }

  /**
   * 添加安全头
   */
  private static addSecurityHeaders(response: NextResponse, context: SecurityContext): void {
    // 内容安全策略
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: http:",
      "font-src 'self' data:",
      "connect-src 'self' https: http:",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "plugin-types 'none'",
      "sandbox allow-scripts allow-same-origin allow-forms"
    ]

    response.headers.set(
      'Content-Security-Policy',
      cspDirectives.join('; ')
    )

    // 其他安全头
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')

    // 移除服务器信息
    response.headers.delete('Server')
    response.headers.delete('X-Powered-By')

    // HSTS (仅在生产环境)
    if (process.env.NODE_ENV === 'production') {
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      )
    }

    // 防点击劫持
    response.headers.set('X-Content-Security-Policy', "default-src 'self'")
  }

  /**
   * 添加CORS头
   */
  private static addCORSHeaders(response: NextResponse, allowedOrigins: string[], request: NextRequest): void {
    const origin = request.headers.get('Origin') || request.headers.get('Referer')?.split('/')[2] || '*'

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    } else {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0] || '*')
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token, X-Request-ID')
    response.headers.set('Access-Control-Max-Age', '86400')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    response.headers.set('Access-Control-Expose-Headers', 'X-Request-ID, X-Response-Time')
  }

  /**
   * 添加CSRF保护
   */
  private static addCSRFHeaders(response: NextResponse, request: NextRequest): void {
    // 只为状态改变请求生成CSRF令牌
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
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
  }

  /**
   * 添加安全追踪头
   */
  private static addSecurityTrackingHeaders(response: NextResponse, context: SecurityContext, requestId: string, startTime: number): void {
    response.headers.set('X-Request-ID', requestId)
    response.headers.set('X-Security-Score', context.riskScore.toString())
    response.headers.set('X-Security-Context', JSON.stringify({
      isBot: context.isBot,
      riskScore: context.riskScore,
      threats: context.threats
    }))

    if (context.threats.length > 0) {
      response.headers.set('X-Security-Threats', context.threats.join(','))
    }
  }

  /**
   * 生成CSRF令牌
   */
  private static generateCSRFToken(): string {
    const crypto = require('crypto')
    return crypto.randomBytes(32).toString('hex')
  }

  /**
   * 获取客户端IP
   */
  private static getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-client-ip') ||
      request.headers.get('x-forwarded')?.split(',')[0]?.trim() ||
      'unknown'
    )
  }

  /**
   * 记录安全事件
   */
  private static logSecurityEvent(event: string, details: any, request?: NextRequest): void {
    const logData = {
      timestamp: new Date().toISOString(),
      event,
      details,
      ip: request ? this.getClientIP(request) : 'unknown',
      userAgent: request?.headers.get('user-agent'),
      url: request?.url,
      method: request?.method
    }

    console.warn('[SECURITY]', JSON.stringify(logData))

    // 这里可以集成到安全监控系统
    // 例如：发送到SIEM系统、安全团队等
  }

  /**
   * 输入清理
   */
  static sanitizeInput(input: string): string {
    if (!input || typeof input !== 'string') return input

    // 移除潜在的XSS字符
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\\/g, '&#x5C;')
  }

  /**
   * SQL注入防护
   */
  static sanitizeSQL(input: string): string {
    if (!input || typeof input !== 'string') return input

    // 移除潜在的SQL注入字符
    return input
      .replace(/['"]/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
      .replace(/xp_/gi, '')
      .replace(/exec\s*\(/gi, '')
      .replace(/select\s+\*/gi, '')
      .replace(/insert\s+into/gi, '')
      .replace(/delete\s+from/gi, '')
      .replace(/update\s+.*\s+set/gi, '')
      .replace(/drop\s+table/gi, '')
  }

  /**
   * NoSQL注入防护
   */
  static sanitizeNoSQL(input: string): string {
    if (!input || typeof input !== 'string') return input

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
      .replace(/\$options/gi, '')
  }

  /**
   * 路径遍历防护
   */
  static sanitizePath(input: string): string {
    if (!input || typeof input !== 'string') return input

    return input
      .replace(/\.\./g, '')
      .replace(/\//g, '_')
      .replace(/\\/g, '_')
      .replace(/^\//, '')
      .replace(/\/$/, '')
  }

  /**
   * 文件名清理
   */
  static sanitizeFilename(input: string): string {
    if (!input || typeof input !== 'string') return input

    return input
      .replace(/[\/\\:*?"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/^\.+/, '')
      .replace(/\.+$/, '')
      .toLowerCase()
  }

  /**
   * 增强的安全中间件装饰器
   */
  static withSecurity(options: Partial<SecurityOptions> = {}) {
    return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
      handler: U
    ) {
      return async function securityHandler(request: NextRequest, ...args: any[]) {
        const opts = { ...SecurityMiddleware.defaultOptions, ...options }

        try {
          // 验证CSRF令牌（对于状态改变请求）
          if (opts.enableCSRF && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
            const csrfToken = request.headers.get('x-csrf-token')
            const cookieToken = request.cookies.get('csrf_token')?.value

            if (!csrfToken || csrfToken !== cookieToken) {
              return SecurityMiddleware.createBlockedResponse('Invalid CSRF token', 403, generateRequestId())
            }
          }

          // 检查内容类型
          const contentType = request.headers.get('content-type')
          if (request.method !== 'GET' && request.method !== 'HEAD' && !contentType?.includes('application/json')) {
            return SecurityMiddleware.createBlockedResponse('Unsupported Media Type', 415, generateRequestId())
          }

          // 执行处理器
          return await handler(request, ...args)
        } catch (error) {
          SecurityMiddleware.logSecurityEvent('SECURITY_HANDLER_ERROR', {
            error: error.message,
            stack: error.stack
          }, request)
          throw error
        }
      }
    }
  }
}

/**
 * 认证中间件
 */
export function withAuth(roles: string[] = [], options: {
  enableJWT?: boolean
  enableApiKey?: boolean
  sessionRequired?: boolean
} = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function authHandler(request: NextRequest, ...args: any[]) {
      const authHeader = request.headers.get('authorization')
      const apiKey = request.headers.get('x-api-key')

      if (!authHeader && !apiKey) {
        return new NextResponse('Unauthorized: No authentication provided', { status: 401 })
      }

      // JWT验证
      if (options.enableJWT && authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7)

        // 这里应该验证JWT token
        // 简化实现：检查token格式
        if (!token || token.split('.').length !== 3) {
          return new NextResponse('Invalid JWT token', { status: 401 })
        }

        // 解析JWT payload
        try {
          const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

          // 检查角色权限
          if (roles.length > 0 && !roles.some(role => payload.roles?.includes(role))) {
            return new NextResponse('Insufficient permissions', { status: 403 })
          }

          // 将用户信息附加到请求
          ;(request as any).user = {
            id: payload.sub,
            roles: payload.roles || [],
            email: payload.email
          }
        } catch (error) {
          return new NextResponse('Invalid JWT token', { status: 401 })
        }
      }
      // API Key验证
      else if (options.enableApiKey && apiKey) {
        // 这里应该验证API Key
        // 简化实现：检查API Key格式
        if (!apiKey || apiKey.length < 16) {
          return new NextResponse('Invalid API key', { status: 401 })
        }

        // 将API信息附加到请求
        ;(request as any).apiKey = {
          key: apiKey,
          type: 'api_key'
        }
      }
      else {
        return new NextResponse('Unsupported authentication method', { status: 401 })
      }

      return await handler(request, ...args)
    }
  }
}
