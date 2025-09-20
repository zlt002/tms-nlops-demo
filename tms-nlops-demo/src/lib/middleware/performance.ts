import { NextRequest, NextResponse } from 'next/server'

export interface PerformanceMetrics {
  requestCount: number
  responseTime: {
    min: number
    max: number
    avg: number
    p95: number
    p99: number
  }
  errorRate: number
  throughput: number
}

export interface PerformanceOptions {
  enableMetrics: boolean
  enableProfiling: boolean
  enableTracing: boolean
  sampleRate: number
  slowRequestThreshold: number
}

export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map()
  private static counters: Map<string, number> = new Map()
  private static errorCounters: Map<string, number> = new Map()
  private static requestTimes: number[] = []
  private static options: PerformanceOptions = {
    enableMetrics: true,
    enableProfiling: false,
    enableTracing: true,
    sampleRate: 1,
    slowRequestThreshold: 1000
  }

  static configure(options: Partial<PerformanceOptions>): void {
    this.options = { ...this.options, ...options }
  }

  static middleware() {
    return async function performanceMiddleware(request: NextRequest): Promise<NextResponse> {
      const startTime = performance.now()
      const requestId = this.generateRequestId()

      // 添加性能追踪头
      const responseHeaders = new Headers()
      responseHeaders.set('X-Request-ID', requestId)

      try {
        // 执行请求处理
        const response = await this.processRequest(request)

        // 计算处理时间
        const duration = performance.now() - startTime

        // 记录性能指标
        if (this.options.enableMetrics) {
          this.recordMetrics(request, duration, response.status)
        }

        // 记录慢请求
        if (duration > this.options.slowRequestThreshold) {
          this.logSlowRequest(request, duration)
        }

        // 添加性能头
        responseHeaders.set('X-Response-Time', duration.toFixed(2) + 'ms')
        responseHeaders.set('X-Process-Time', process.uptime().toFixed(3) + 's')

        // 合并响应头
        responseHeaders.forEach((value, key) => {
          if (!response.headers.has(key)) {
            response.headers.set(key, value)
          }
        })

        return response
      } catch (error) {
        const duration = performance.now() - startTime

        // 记录错误性能指标
        if (this.options.enableMetrics) {
          this.recordMetrics(request, duration, 500)
        }

        throw error
      }
    }.bind(this)
  }

  private static async processRequest(request: NextRequest): Promise<NextResponse> {
    // 实际应用中，这里应该调用Next.js的处理函数
    // 简化实现，直接返回下一个中间件
    return NextResponse.next()
  }

  private static generateRequestId(): string {
    return 'perf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private static recordMetrics(request: NextRequest, duration: number, statusCode: number): void {
    // 根据采样率决定是否记录
    if (Math.random() > this.options.sampleRate) return

    const endpoint = this.getEndpointKey(request)

    // 记录响应时间
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, [])
    }
    const endpointMetrics = this.metrics.get(endpoint)!
    endpointMetrics.push(duration)

    // 限制历史数据量
    if (endpointMetrics.length > 1000) {
      endpointMetrics.shift()
    }

    // 记录请求计数
    const currentCount = this.counters.get(endpoint) || 0
    this.counters.set(endpoint, currentCount + 1)

    // 记录错误
    if (statusCode >= 400) {
      const errorCount = this.errorCounters.get(endpoint) || 0
      this.errorCounters.set(endpoint, errorCount + 1)
    }

    // 记录全局请求时间
    this.requestTimes.push(duration)
    if (this.requestTimes.length > 10000) {
      this.requestTimes.shift()
    }
  }

  private static getEndpointKey(request: NextRequest): string {
    const url = new URL(request.url)
    return request.method + ':' + url.pathname
  }

  private static logSlowRequest(request: NextRequest, duration: number): void {
    console.warn(`[SLOW REQUEST] ${request.method} ${request.url} - ${duration.toFixed(2)}ms`)
  }

  // 获取性能统计
  static getMetrics(endpoint?: string): PerformanceMetrics | Record<string, PerformanceMetrics> {
    if (endpoint) {
      return this.getEndpointMetrics(endpoint)
    }

    const allMetrics: Record<string, PerformanceMetrics> = {}

    for (const [ep] of this.metrics) {
      allMetrics[ep] = this.getEndpointMetrics(ep)
    }

    return allMetrics
  }

  private static getEndpointMetrics(endpoint: string): PerformanceMetrics {
    const responseTimes = this.metrics.get(endpoint) || []
    const requestCount = this.counters.get(endpoint) || 0
    const errorCount = this.errorCounters.get(endpoint) || 0

    if (responseTimes.length === 0) {
      return {
        requestCount,
        responseTime: { min: 0, max: 0, avg: 0, p95: 0, p99: 0 },
        errorRate: 0,
        throughput: 0
      }
    }

    const sorted = [...responseTimes].sort((a, b) => a - b)
    const sum = responseTimes.reduce((a, b) => a + b, 0)

    return {
      requestCount,
      responseTime: {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        avg: sum / responseTimes.length,
        p95: sorted[Math.floor(sorted.length * 0.95)],
        p99: sorted[Math.floor(sorted.length * 0.99)]
      },
      errorRate: requestCount > 0 ? (errorCount / requestCount) * 100 : 0,
      throughput: this.calculateThroughput(responseTimes)
    }
  }

  private static calculateThroughput(responseTimes: number[]): number {
    if (responseTimes.length < 2) return 0

    const timeSpan = responseTimes[responseTimes.length - 1] - responseTimes[0]
    if (timeSpan === 0) return responseTimes.length

    return (responseTimes.length / timeSpan) * 1000 // requests per second
  }

  // 获取系统性能概览
  static getSystemOverview(): {
    totalRequests: number
    avgResponseTime: number
    errorRate: number
    slowRequests: number
    endpoints: number
  } {
    let totalRequests = 0
    let totalErrors = 0
    let slowRequests = 0
    const allResponseTimes: number[] = []

    for (const [endpoint] of this.metrics) {
      const metrics = this.getEndpointMetrics(endpoint)
      totalRequests += metrics.requestCount
      totalErrors += Math.floor(metrics.requestCount * metrics.errorRate / 100)

      const responseTimes = this.metrics.get(endpoint) || []
      allResponseTimes.push(...responseTimes)
      slowRequests += responseTimes.filter(t => t > this.options.slowRequestThreshold).length
    }

    const avgResponseTime = allResponseTimes.length > 0
      ? allResponseTimes.reduce((a, b) => a + b, 0) / allResponseTimes.length
      : 0

    return {
      totalRequests,
      avgResponseTime,
      errorRate: totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0,
      slowRequests,
      endpoints: this.metrics.size
    }
  }

  // 清理旧数据
  static cleanup(maxAge: number = 3600000): void {
    const cutoff = Date.now() - maxAge

    // 这里应该清理旧的性能数据
    // 简化实现，只是清空所有数据
    this.metrics.clear()
    this.counters.clear()
    this.errorCounters.clear()
    this.requestTimes = []
  }
}

// 性能监控中间件装饰器
export function withPerformanceMonitoring(options: Partial<PerformanceOptions> = {}) {
  PerformanceMonitor.configure(options)

  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function performanceHandler(request: NextRequest, ...args: any[]) {
      const startTime = performance.now()

      try {
        // 添加性能追踪头
        const response = await handler(request, ...args)

        // 计算并记录性能指标
        const duration = performance.now() - startTime
        PerformanceMonitor['recordMetrics'](
          request,
          duration,
          response instanceof NextResponse ? response.status : 200
        )

        return response
      } catch (error) {
        const duration = performance.now() - startTime
        PerformanceMonitor['recordMetrics'](request, duration, 500)
        throw error
      }
    }
  }
}

// 数据库查询性能监控
export class DatabaseProfiler {
  private static queries: Map<string, number[]> = new Map()
  private static activeQueries: Map<string, number> = new Map()

  static startQuery(query: string): string {
    const queryId = this.generateQueryId()
    this.activeQueries.set(queryId, performance.now())
    return queryId
  }

  static endQuery(queryId: string, query: string): void {
    const startTime = this.activeQueries.get(queryId)
    if (!startTime) return

    const duration = performance.now() - startTime
    this.activeQueries.delete(queryId)

    const queryKey = this.normalizeQuery(query)
    if (!this.queries.has(queryKey)) {
      this.queries.set(queryKey, [])
    }
    this.queries.get(queryKey)!.push(duration)
  }

  private static generateQueryId(): string {
    return 'query_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  private static normalizeQuery(query: string): string {
    // 简化查询，移除参数值
    return query.replace(/\d+/g, '?').replace(/'[^']*'/g, '?')
  }

  static getQueryStats(): Record<string, any> {
    const stats: Record<string, any> = {}

    for (const [query, times] of this.queries) {
      stats[query] = {
        count: times.length,
        avgTime: times.reduce((a, b) => a + b, 0) / times.length,
        minTime: Math.min(...times),
        maxTime: Math.max(...times)
      }
    }

    return stats
  }
}

// 内存使用监控
export class MemoryMonitor {
  static getMemoryUsage(): {
    used: number
    total: number
    percentage: number
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
  } {
    const usage = process.memoryUsage()

    return {
      used: usage.heapUsed,
      total: usage.heapTotal,
      percentage: (usage.heapUsed / usage.heapTotal) * 100,
      rss: usage.rss,
      heapTotal: usage.heapTotal,
      heapUsed: usage.heapUsed,
      external: usage.external
    }
  }

  static logMemoryUsage(): void {
    const memory = this.getMemoryUsage()
    console.log(`[MEMORY] Usage: ${(memory.used / 1024 / 1024).toFixed(2)}MB / ${(memory.total / 1024 / 1024).toFixed(2)}MB (${memory.percentage.toFixed(2)}%)`)
  }
}
