import { NextRequest, NextResponse } from 'next/server'

export interface LogEntry {
  timestamp: string
  method: string
  url: string
  statusCode: number
  duration: number
  userAgent?: string
  ip?: string
  userId?: string
  requestId?: string
  body?: any
  response?: any
  error?: any
}

export class RequestLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development'
  private static isProduction = process.env.NODE_ENV === 'production'

  static middleware() {
    return async function loggingMiddleware(request: NextRequest): Promise<NextResponse> {
      const startTime = Date.now()
      const requestId = this.generateRequestId()

      // 将requestId添加到请求头，用于追踪
      const responseHeaders = new Headers()
      responseHeaders.set('X-Request-ID', requestId)

      try {
        // 克隆响应以便记录
        const response = await this.fetchWithLogging(request, requestId)

        // 计算请求耗时
        const duration = Date.now() - startTime

        // 记录请求日志
        this.logRequest({
          timestamp: new Date().toISOString(),
          method: request.method,
          url: request.url,
          statusCode: response.status,
          duration,
          userAgent: request.headers.get('user-agent') || undefined,
          ip: this.getClientIP(request),
          requestId
        })

        // 添加响应头
        responseHeaders.forEach((value, key) => {
          if (!response.headers.has(key)) {
            response.headers.set(key, value)
          }
        })

        return response
      } catch (error) {
        const duration = Date.now() - startTime

        // 记录错误日志
        this.logRequest({
          timestamp: new Date().toISOString(),
          method: request.method,
          url: request.url,
          statusCode: 500,
          duration,
          userAgent: request.headers.get('user-agent') || undefined,
          ip: this.getClientIP(request),
          requestId,
          error: error instanceof Error ? error.message : String(error)
        })

        throw error
      }
    }.bind(this)
  }

  private static async fetchWithLogging(request: NextRequest, requestId: string): Promise<NextResponse> {
    // 在实际应用中，这里应该调用Next.js的处理函数
    // 由于这是中间件，我们返回一个模拟响应
    // 实际使用时应该配合Next.js的middleware配置

    // 注意：这是简化实现，实际使用时需要集成到Next.js的middleware系统
    return NextResponse.next()
  }

  private static generateRequestId(): string {
    return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private static getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown'
    )
  }

  private static logRequest(entry: LogEntry): void {
    if (this.isDevelopment) {
      // 开发环境：彩色日志输出
      const statusColor = this.getStatusColor(entry.statusCode)
      const durationColor = entry.duration > 1000 ? '\x1b[31m' : '\x1b[32m'

      console.log(
        '\x1b[90m' + entry.timestamp + '\x1b[0m ' +
        entry.method + ' ' + entry.url + ' ' +
        statusColor + entry.statusCode + '\x1b[0m ' +
        durationColor + entry.duration + 'ms\x1b[0m ' +
        (entry.ip ? '[\x1b[36m' + entry.ip + '\x1b[0m] ' : '') +
        (entry.requestId ? '[\x1b[33m' + entry.requestId + '\x1b[0m]' : '')
      )
    } else if (this.isProduction) {
      // 生产环境：JSON格式日志
      console.log(JSON.stringify(entry))
    }
  }

  private static getStatusColor(statusCode: number): string {
    if (statusCode >= 500) return '\x1b[31m'
    if (statusCode >= 400) return '\x1b[33m'
    if (statusCode >= 300) return '\x1b[36m'
    return '\x1b[32m'
  }

  // 业务日志记录
  static logAction(action: string, data: any, userId?: string): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      data,
      userId,
      environment: process.env.NODE_ENV
    }

    if (this.isDevelopment) {
      console.log('[ACTION] ' + action + ':', JSON.stringify(logEntry, null, 2))
    } else {
      console.log(JSON.stringify(logEntry))
    }
  }

  // 安全日志记录
  static logSecurity(event: string, details: any, request?: NextRequest): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      ip: request ? this.getClientIP(request) : undefined,
      userAgent: request?.headers.get('user-agent'),
      url: request?.url
    }

    // 安全日志总是记录，无论环境
    console.warn('[SECURITY] ' + event + ':', JSON.stringify(logEntry))
  }
}

// 创建日志中间件装饰器
export function withLogging(options: {
  logBody?: boolean
  logResponse?: boolean
  sensitiveFields?: string[]
} = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function loggingHandler(request: NextRequest, ...args: any[]) {
      const startTime = Date.now()
      const requestId = RequestLogger['generateRequestId']()

      try {
        // 记录请求开始
        const method = request.method
        const url = request.url

        console.log('[' + requestId + '] ' + method + ' ' + url + ' - Started')

        // 执行处理器
        const result = await handler(request, ...args)

        // 计算耗时
        const duration = Date.now() - startTime

        // 记录请求完成
        console.log(
          '[' + requestId + '] ' + method + ' ' + url + ' - Completed in ' + duration + 'ms'
        )

        return result
      } catch (error) {
        const duration = Date.now() - startTime

        console.error(
          '[' + requestId + '] ' + request.method + ' ' + request.url + ' - Failed after ' + duration + 'ms:',
          error
        )

        throw error
      }
    }
  }
}

// 性能监控日志
export class PerformanceLogger {
  private static metrics: Map<string, number[]> = new Map()

  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const values = this.metrics.get(name)!
    values.push(value)

    // 保留最近1000个值
    if (values.length > 1000) {
      values.shift()
    }
  }

  static getMetricStats(name: string): {
    count: number
    avg: number
    min: number
    max: number
    p95: number
  } | null {
    const values = this.metrics.get(name)
    if (!values || values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    return {
      count: values.length,
      avg: sum / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[Math.floor(sorted.length * 0.95)]
    }
  }

  static logAllMetrics(): void {
    for (const [name] of this.metrics) {
      const stats = this.getMetricStats(name)
      if (stats) {
        console.log('[METRIC] ' + name + ':', JSON.stringify(stats))
      }
    }
  }
}
