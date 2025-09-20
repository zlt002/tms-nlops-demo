import { NextRequest, NextResponse } from 'next/server'

export interface ResponseOptions {
  pretty?: boolean
  includeMetadata?: boolean
  sanitize?: boolean
  sensitiveFields?: string[]
}

export class ResponseFormatter {
  private static defaultOptions: ResponseOptions = {
    pretty: true,
    includeMetadata: true,
    sanitize: true,
    sensitiveFields: ['password', 'token', 'secret', 'key']
  }

  static success<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
    options: ResponseOptions = {}
  ): NextResponse {
    const opts = { ...this.defaultOptions, ...options }

    const responseBody = {
      success: true,
      data: this.sanitizeData(data, opts),
      message,
      ...(opts.includeMetadata && {
        timestamp: new Date().toISOString(),
        requestId: this.getRequestId()
      })
    }

    return this.createResponse(responseBody, statusCode, opts)
  }

  static error(
    message: string,
    statusCode: number = 500,
    details?: any,
    options: ResponseOptions = {}
  ): NextResponse {
    const opts = { ...this.defaultOptions, ...options }

    const responseBody = {
      success: false,
      error: {
        message,
        code: this.getErrorCode(statusCode),
        ...(details && { details })
      },
      ...(opts.includeMetadata && {
        timestamp: new Date().toISOString(),
        requestId: this.getRequestId()
      })
    }

    return this.createResponse(responseBody, statusCode, opts)
  }

  static paginated<T>(
    data: T[],
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    },
    message?: string,
    options: ResponseOptions = {}
  ): NextResponse {
    const opts = { ...this.defaultOptions, ...options }

    const responseBody = {
      success: true,
      data: this.sanitizeData(data, opts),
      pagination,
      message,
      ...(opts.includeMetadata && {
        timestamp: new Date().toISOString(),
        requestId: this.getRequestId()
      })
    }

    return this.createResponse(responseBody, 200, opts)
  }

  static stream<T>(
    data: AsyncGenerator<T>,
    options: ResponseOptions = {}
  ): Response {
    const opts = { ...this.defaultOptions, ...options }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of data) {
            const chunkData = {
              type: 'data',
              data: ResponseFormatter.sanitizeData(chunk, opts),
              timestamp: new Date().toISOString()
            }

            controller.enqueue(new TextEncoder().encode(JSON.stringify(chunkData) + '\n'))
          }

          // 发送结束标记
          const endData = {
            type: 'end',
            timestamp: new Date().toISOString()
          }
          controller.enqueue(new TextEncoder().encode(JSON.stringify(endData) + '\n'))
          controller.close()
        } catch (error) {
          const errorData = {
            type: 'error',
            error: {
              message: error instanceof Error ? error.message : String(error)
            },
            timestamp: new Date().toISOString()
          }
          controller.enqueue(new TextEncoder().encode(JSON.stringify(errorData) + '\n'))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  }

  private static createResponse(
    body: any,
    statusCode: number,
    options: ResponseOptions
  ): NextResponse {
    const response = NextResponse.json(body, { status: statusCode })

    // 添加CORS头
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // 添加安全头
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')

    // 添加缓存控制
    if (statusCode === 200) {
      response.headers.set('Cache-Control', 'public, max-age=300')
    } else {
      response.headers.set('Cache-Control', 'no-store')
    }

    // 添加请求ID
    const requestId = this.getRequestId()
    if (requestId) {
      response.headers.set('X-Request-ID', requestId)
    }

    // 美化输出
    if (options.pretty) {
      response.headers.set('Content-Type', 'application/json; charset=utf-8')
    }

    return response
  }

  private static sanitizeData(data: any, options: ResponseOptions): any {
    if (!options.sanitize || !data) return data

    const sensitiveFields = options.sensitiveFields || []

    if (typeof data !== 'object' || data === null) {
      return data
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item, options))
    }

    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
        sanitized[key] = '***REDACTED***'
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeData(value, options)
      } else {
        sanitized[key] = value
      }
    }

    return sanitized
  }

  private static getRequestId(): string | undefined {
    // 在实际应用中，这应该从请求上下文中获取
    return undefined
  }

  private static getErrorCode(statusCode: number): string {
    const errorCodes: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMITED',
      500: 'INTERNAL_ERROR',
      502: 'BAD_GATEWAY',
      503: 'SERVICE_UNAVAILABLE',
      504: 'GATEWAY_TIMEOUT'
    }

    return errorCodes[statusCode] || 'UNKNOWN_ERROR'
  }
}

// 响应格式化中间件
export function withResponseFormatter(options: ResponseOptions = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function formattedHandler(request: NextRequest, ...args: any[]) {
      try {
        const result = await handler(request, ...args)

        // 如果已经是NextResponse，直接返回
        if (result instanceof NextResponse) {
          return result
        }

        // 处理成功响应
        if (result && typeof result === 'object' && 'success' in result) {
          if (result.success) {
            return ResponseFormatter.success(
              result.data,
              result.message,
              result.statusCode || 200,
              options
            )
          } else {
            return ResponseFormatter.error(
              result.error?.message || '请求失败',
              result.statusCode || 400,
              result.error?.details,
              options
            )
          }
        }

        // 默认作为成功数据处理
        return ResponseFormatter.success(result, undefined, 200, options)
      } catch (error) {
        // 错误会被错误处理中间件捕获
        throw error
      }
    }
  }
}

// 创建统一的响应构建器
export class UnifiedResponseBuilder {
  static create<T>(options: ResponseOptions = {}) {
    return {
      success: (data: T, message?: string, statusCode?: number) =>
        ResponseFormatter.success(data, message, statusCode, options),

      error: (message: string, statusCode?: number, details?: any) =>
        ResponseFormatter.error(message, statusCode, details, options),

      paginated: (data: T[], pagination: any, message?: string) =>
        ResponseFormatter.paginated(data, pagination, message, options),

      stream: (data: AsyncGenerator<any>) =>
        ResponseFormatter.stream(data, options)
    }
  }
}
