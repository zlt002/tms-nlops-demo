import { NextRequest } from 'next/server'

/**
 * 请求ID生成器
 * 用于API请求追踪和调试
 */
export class RequestIdGenerator {
  private static readonly PREFIX = 'req'
  private static readonly SEPARATOR = '_'
  private static readonly LENGTH = 9

  /**
   * 生成唯一的请求ID
   * 格式: req_timestamp_randomString
   */
  static generate(): string {
    const timestamp = Date.now()
    const randomPart = Math.random().toString(36).substring(2, 2 + this.LENGTH)

    return `${this.PREFIX}${this.SEPARATOR}${timestamp}${this.SEPARATOR}${randomPart}`
  }

  /**
   * 从请求中提取请求ID
   * 如果不存在，则生成一个新的
   */
  static getOrCreate(request: NextRequest): string {
    let requestId = request.headers.get('x-request-id')

    if (!requestId) {
      requestId = request.headers.get('x-trace-id')
    }

    if (!requestId) {
      requestId = this.generate()
    }

    return requestId
  }

  /**
   * 验证请求ID格式
   */
  static isValid(requestId: string): boolean {
    const pattern = /^req_\d+_[a-zA-Z0-9]{9}$/
    return pattern.test(requestId)
  }

  /**
   * 从请求ID中提取时间戳
   */
  static getTimestamp(requestId: string): number | null {
    if (!this.isValid(requestId)) {
      return null
    }

    const parts = requestId.split(this.SEPARATOR)
    if (parts.length !== 3) {
      return null
    }

    return parseInt(parts[1])
  }

  /**
   * 计算请求的年龄（毫秒）
   */
  static getAge(requestId: string): number | null {
    const timestamp = this.getTimestamp(requestId)
    if (!timestamp) {
      return null
    }

    return Date.now() - timestamp
  }

  /**
   * 生成追踪ID（用于分布式系统）
   */
  static generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
  }

  /**
   * 生成跨度ID（用于分布式追踪）
   */
  static generateSpanId(): string {
    return Math.random().toString(36).substring(2, 16)
  }
}

/**
 * 便捷函数：生成请求ID
 */
export function generateRequestId(): string {
  return RequestIdGenerator.generate()
}

/**
 * 便捷函数：获取或创建请求ID
 */
export function getOrCreateRequestId(request: NextRequest): string {
  return RequestIdGenerator.getOrCreate(request)
}

/**
 * 便捷函数：验证请求ID
 */
export function isValidRequestId(requestId: string): boolean {
  return RequestIdGenerator.isValid(requestId)
}

/**
 * 请求追踪上下文
 */
export interface TraceContext {
  traceId: string
  spanId: string
  parentId?: string
  requestId: string
  timestamp: number
}

/**
 * 请求追踪管理器
 */
export class TraceManager {
  private static activeTraces: Map<string, TraceContext> = new Map()

  /**
   * 开始一个新的追踪
   */
  static startTrace(requestId?: string): TraceContext {
    const traceId = RequestIdGenerator.generateTraceId()
    const spanId = RequestIdGenerator.generateSpanId()

    const trace: TraceContext = {
      traceId,
      spanId,
      requestId: requestId || RequestIdGenerator.generate(),
      timestamp: Date.now()
    }

    this.activeTraces.set(traceId, trace)
    return trace
  }

  /**
   * 开始一个子跨度
   */
  static startSpan(parentContext: TraceContext): TraceContext {
    const spanId = RequestIdGenerator.generateSpanId()

    const span: TraceContext = {
      traceId: parentContext.traceId,
      spanId,
      parentId: parentContext.spanId,
      requestId: parentContext.requestId,
      timestamp: Date.now()
    }

    this.activeTraces.set(spanId, span)
    return span
  }

  /**
   * 结束追踪
   */
  static endTrace(spanId: string): TraceContext | null {
    const trace = this.activeTraces.get(spanId)
    if (trace) {
      this.activeTraces.delete(spanId)
      return trace
    }
    return null
  }

  /**
   * 获取当前的追踪上下文
   */
  static getCurrentTrace(spanId: string): TraceContext | null {
    return this.activeTraces.get(spanId) || null
  }

  /**
   * 清理过期的追踪
   */
  static cleanup(maxAge: number = 300000): void { // 5分钟
    const now = Date.now()
    const cutoff = now - maxAge

    for (const [spanId, trace] of this.activeTraces) {
      if (trace.timestamp < cutoff) {
        this.activeTraces.delete(spanId)
      }
    }
  }
}