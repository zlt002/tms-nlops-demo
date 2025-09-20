import { NextRequest, NextResponse } from 'next/server'
import { generateRequestId } from '@/lib/utils/requestId'

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
  traceId?: string
  spanId?: string
  body?: any
  response?: any
  error?: any
  memoryUsage?: {
    heapUsed: number
    heapTotal: number
    external: number
  }
  cpuUsage?: number
}

export interface LogOptions {
  logBody?: boolean
  logResponse?: boolean
  sensitiveFields?: string[]
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
  sampleRate?: number
}

export class RequestLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development'
  private static isProduction = process.env.NODE_ENV === 'production'
  private static isTest = process.env.NODE_ENV === 'test'

  private static logBuffer: LogEntry[] = []
  private static maxBufferSize = 1000

  /**
   * 创建中间件
   */
  static middleware(options: LogOptions = {}) {
    return async function loggingMiddleware(request: NextRequest): Promise<NextResponse> {
      const startTime = performance.now()
      const requestId = generateRequestId()
      const traceId = request.headers.get('x-trace-id') || generateRequestId()

      // 将requestId添加到请求头，用于追踪
      const responseHeaders = new Headers()
      responseHeaders.set('X-Request-ID', requestId)
      responseHeaders.set('X-Trace-ID', traceId)

      try {
        // 记录请求开始
        this.logRequestStart(request, requestId, traceId, options)

        // 克隆响应以便记录
        const response = await this.processRequestWithLogging(request, requestId, traceId, options)

        // 计算请求耗时
        const duration = performance.now() - startTime

        // 记录请求完成
        await this.logRequestEnd(request, response, requestId, traceId, duration, options)

        // 添加响应头
        responseHeaders.forEach((value, key) => {
          if (!response.headers.has(key)) {
            response.headers.set(key, value)
          }
        })

        // 添加性能头
        response.headers.set('X-Response-Time', duration.toFixed(2) + 'ms')
        response.headers.set('X-Memory-Usage', JSON.stringify(process.memoryUsage()))

        return response
      } catch (error) {
        const duration = performance.now() - startTime

        // 记录错误日志
        this.logRequestError(request, error, requestId, traceId, duration, options)

        throw error
      }
    }.bind(this)
  }

  private static async processRequestWithLogging(
    request: NextRequest,
    requestId: string,
    traceId: string,
    options: LogOptions
  ): Promise<NextResponse> {
    // 在实际应用中，这里应该调用Next.js的处理函数
    // 这里返回NextResponse.next()让请求继续处理
    return NextResponse.next()
  }

  /**
   * 记录请求开始
   */
  private static logRequestStart(
    request: NextRequest,
    requestId: string,
    traceId: string,
    options: LogOptions
  ): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      statusCode: 0, // 开始时状态码为0
      duration: 0,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: this.getClientIP(request),
      requestId,
      traceId,
      spanId: requestId,
      memoryUsage: this.getMemoryUsage(),
      cpuUsage: this.getCPUUsage()
    }

    // 根据采样率决定是否记录
    if (this.shouldLog(options)) {
      this.writeLog('info', 'Request Started', logEntry, options)
    }
  }

  /**
   * 记录请求完成
   */
  private static async logRequestEnd(
    request: NextRequest,
    response: NextResponse,
    requestId: string,
    traceId: string,
    duration: number,
    options: LogOptions
  ): Promise<void> {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      statusCode: response.status,
      duration,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: this.getClientIP(request),
      requestId,
      traceId,
      spanId: requestId,
      memoryUsage: this.getMemoryUsage(),
      cpuUsage: this.getCPUUsage()
    }

    // 记录慢请求
    if (duration > 1000) {
      this.writeLog('warn', 'Slow Request Detected', logEntry, options)
    } else if (this.shouldLog(options)) {
      this.writeLog('info', 'Request Completed', logEntry, options)
    }

    // 记录响应（如果启用）
    if (options.logResponse && this.shouldLog(options)) {
      try {
        const responseClone = response.clone()
        const responseData = await responseClone.json()
        this.writeLog('debug', 'Response Data', { ...logEntry, response: responseData }, options)
      } catch (error) {
        // 静默处理响应解析错误
      }
    }
  }

  /**
   * 记录请求错误
   */
  private static logRequestError(
    request: NextRequest,
    error: any,
    requestId: string,
    traceId: string,
    duration: number,
    options: LogOptions
  ): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      statusCode: 500,
      duration,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: this.getClientIP(request),
      requestId,
      traceId,
      spanId: requestId,
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name
      },
      memoryUsage: this.getMemoryUsage(),
      cpuUsage: this.getCPUUsage()
    }

    this.writeLog('error', 'Request Failed', logEntry, options)
  }

  /**
   * 写入日志
   */
  private static writeLog(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    data: LogEntry,
    options: LogOptions
  ): void {
    const logLevel = options.logLevel || 'info'
    const levels = ['debug', 'info', 'warn', 'error']
    const currentLevelIndex = levels.indexOf(level)
    const configuredLevelIndex = levels.indexOf(logLevel)

    if (currentLevelIndex < configuredLevelIndex) {
      return
    }

    const logData = {
      level,
      message,
      ...data,
      environment: process.env.NODE_ENV,
      pid: process.pid,
      version: process.env.npm_package_version || 'unknown'
    }

    if (this.isDevelopment) {
      this.writeConsoleLog(logData)
    } else {
      this.writeStructuredLog(logData)
    }

    // 添加到缓冲区
    this.addToBuffer(logData)
  }

  /**
   * 控制台日志输出（彩色）
   */
  private static writeConsoleLog(logData: any): void {
    const timestamp = new Date(logData.timestamp).toLocaleTimeString()
    const method = logData.method
    const url = new URL(logData.url).pathname
    const statusCode = logData.statusCode
    const duration = logData.duration
    const requestId = logData.requestId

    // 状态码颜色
    let statusColor = '\x1b[32m' // 绿色
    if (statusCode >= 500) statusColor = '\x1b[31m' // 红色
    else if (statusCode >= 400) statusColor = '\x1b[33m' // 黄色
    else if (statusCode >= 300) statusColor = '\x1b[36m' // 青色

    // 时长颜色
    const durationColor = duration > 1000 ? '\x1b[31m' : '\x1b[32m'

    // 日志级别图标
    const levelIcons = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    }

    const icon = levelIcons[logData.level] || '📝'

    console.log(
      `${icon} [${timestamp}] ` +
      `${method} ${url} ` +
      `${statusColor}${statusCode}\x1b[0m ` +
      `${durationColor}${duration.toFixed(2)}ms\x1b[0m ` +
      `[\x1b[35m${requestId}\x1b[0m] ` +
      `[\x1b[36m${logData.ip || 'unknown'}\x1b[0m]`
    )

    // 如果有错误，输出错误信息
    if (logData.error) {
      console.error(`  Error: ${logData.error.message}`)
      if (logData.level === 'error' && logData.error.stack) {
        console.error(`  Stack: ${logData.error.stack}`)
      }
    }
  }

  /**
   * 结构化日志输出
   */
  private static writeStructuredLog(logData: any): void {
    console.log(JSON.stringify(logData))
  }

  /**
   * 添加到缓冲区
   */
  private static addToBuffer(logData: LogEntry): void {
    this.logBuffer.push(logData)

    // 如果缓冲区满了，批量写入
    if (this.logBuffer.length >= this.maxBufferSize) {
      this.flushBuffer()
    }
  }

  /**
   * 清空缓冲区
   */
  private static flushBuffer(): void {
    if (this.logBuffer.length === 0) return

    // 这里可以批量发送到日志服务
    // 例如：发送到ELK、Splunk、CloudWatch等
    console.log(`[BATCH] Flushing ${this.logBuffer.length} log entries`)

    this.logBuffer = []
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
      'unknown'
    )
  }

  /**
   * 获取内存使用情况
   */
  private static getMemoryUsage() {
    const usage = process.memoryUsage()
    return {
      heapUsed: usage.heapUsed,
      heapTotal: usage.heapTotal,
      external: usage.external
    }
  }

  /**
   * 获取CPU使用情况（简化版）
   */
  private static getCPUUsage(): number {
    // 简化实现，实际应该使用node.js的process.cpuUsage()
    return 0
  }

  /**
   * 判断是否应该记录日志
   */
  private static shouldLog(options: LogOptions): boolean {
    const sampleRate = options.sampleRate || 1
    return Math.random() <= sampleRate
  }

  // 业务日志记录
  static logAction(action: string, data: any, userId?: string, options: LogOptions = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      data: this.sanitizeData(data, options.sensitiveFields),
      userId,
      environment: process.env.NODE_ENV,
      component: 'business'
    }

    this.writeLog('info', `Action: ${action}`, logEntry, options)
  }

  // 安全日志记录
  static logSecurity(event: string, details: any, request?: NextRequest, options: LogOptions = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details: this.sanitizeData(details, options.sensitiveFields),
      ip: request ? this.getClientIP(request) : undefined,
      userAgent: request?.headers.get('user-agent'),
      url: request?.url,
      environment: process.env.NODE_ENV,
      component: 'security'
    }

    // 安全日志总是记录
    this.writeLog('warn', `Security Event: ${event}`, logEntry, { ...options, logLevel: 'warn' })
  }

  // 性能日志记录
  static logPerformance(metric: string, value: number, unit: string = 'ms', options: LogOptions = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      metric,
      value,
      unit,
      environment: process.env.NODE_ENV,
      component: 'performance'
    }

    this.writeLog('info', `Performance: ${metric} = ${value}${unit}`, logEntry, options)
  }

  // 数据清理
  private static sanitizeData(data: any, sensitiveFields: string[] = []): any {
    if (!data || typeof data !== 'object') {
      return data
    }

    const defaultSensitiveFields = ['password', 'token', 'secret', 'key', 'authorization']
    const fieldsToSanitize = [...defaultSensitiveFields, ...(sensitiveFields || [])]

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item, fieldsToSanitize))
    }

    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      if (fieldsToSanitize.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
        sanitized[key] = '***REDACTED***'
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeData(value, fieldsToSanitize)
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }
}

// 创建日志中间件装饰器
export function withLogging(options: LogOptions = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function loggingHandler(request: NextRequest, ...args: any[]) {
      const startTime = performance.now()
      const requestId = generateRequestId()

      try {
        // 记录请求开始
        RequestLogger.logAction('API_REQUEST_START', {
          method: request.method,
          url: request.url,
          userAgent: request.headers.get('user-agent')
        }, undefined, options)

        // 执行处理器
        const result = await handler(request, ...args)

        // 计算耗时
        const duration = performance.now() - startTime

        // 记录请求完成
        RequestLogger.logPerformance('api_response_time', duration, 'ms', options)
        RequestLogger.logAction('API_REQUEST_END', {
          method: request.method,
          url: request.url,
          duration,
          statusCode: result instanceof NextResponse ? result.status : 200
        }, undefined, options)

        return result
      } catch (error) {
        const duration = performance.now() - startTime

        RequestLogger.logPerformance('api_error_time', duration, 'ms', options)
        RequestLogger.logSecurity('API_ERROR', {
          message: error.message,
          stack: error.stack,
          duration
        }, request, options)

        throw error
      }
    }
  }
}

// 增强的性能监控日志
export class PerformanceLogger {
  private static metrics: Map<string, number[]> = new Map()
  private static counters: Map<string, number> = new Map()
  private static gauges: Map<string, number> = new Map()

  /**
   * 记录指标
   */
  static recordMetric(name: string, value: number, tags: Record<string, string> = {}): void {
    const key = this.buildMetricKey(name, tags)

    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }

    const values = this.metrics.get(key)!
    values.push(value)

    // 保留最近1000个值
    if (values.length > 1000) {
      values.shift()
    }
  }

  /**
   * 增加计数器
   */
  static incrementCounter(name: string, value: number = 1, tags: Record<string, string> = {}): void {
    const key = this.buildMetricKey(name, tags)
    const current = this.counters.get(key) || 0
    this.counters.set(key, current + value)
  }

  /**
   * 设置仪表值
   */
  static setGauge(name: string, value: number, tags: Record<string, string> = {}): void {
    const key = this.buildMetricKey(name, tags)
    this.gauges.set(key, value)
  }

  /**
   * 获取指标统计
   */
  static getMetricStats(name: string, tags: Record<string, string> = {}): {
    count: number
    avg: number
    min: number
    max: number
    p50: number
    p95: number
    p99: number
    sum: number
  } | null {
    const key = this.buildMetricKey(name, tags)
    const values = this.metrics.get(key)
    if (!values || values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    return {
      count: values.length,
      avg: sum / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
      sum
    }
  }

  /**
   * 获取所有指标
   */
  static getAllMetrics(): Record<string, any> {
    const result: Record<string, any> = {}

    // 指标统计
    for (const [key] of this.metrics) {
      const stats = this.getMetricStatsByKey(key)
      if (stats) {
        result[key] = stats
      }
    }

    // 计数器
    for (const [key, value] of this.counters) {
      result[key] = { type: 'counter', value }
    }

    // 仪表
    for (const [key, value] of this.gauges) {
      result[key] = { type: 'gauge', value }
    }

    return result
  }

  /**
   * 记录所有指标
   */
  static logAllMetrics(): void {
    const metrics = this.getAllMetrics()
    console.log('[METRICS] All Performance Metrics:', JSON.stringify(metrics, null, 2))
  }

  /**
   * 清理旧数据
   */
  static cleanup(maxAge: number = 3600000): void {
    const cutoff = Date.now() - maxAge

    // 这里应该清理旧的指标数据
    // 简化实现：清空所有数据
    this.metrics.clear()
    this.counters.clear()
    this.gauges.clear()
  }

  private static buildMetricKey(name: string, tags: Record<string, string>): string {
    const tagPairs = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join(',')

    return tagPairs.length > 0 ? `${name}{${tagPairs}}` : name
  }

  private static getMetricStatsByKey(key: string): any {
    const values = this.metrics.get(key)
    if (!values || values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    return {
      count: values.length,
      avg: sum / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
      sum
    }
  }
}
