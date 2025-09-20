import { NextRequest, NextResponse } from 'next/server'
import { ApiResponseBuilder } from '@/lib/api/response'

export interface ErrorContext {
  request?: NextRequest
  userId?: string
  additionalData?: Record<string, any>
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean
  public readonly context?: ErrorContext

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    context?: ErrorContext
  ) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational
    this.context = context

    Error.captureStackTrace(this, AppError)
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 400, 'BAD_REQUEST', true, context)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = '未授权', context?: ErrorContext) {
    super(message, 401, 'UNAUTHORIZED', true, context)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = '权限不足', context?: ErrorContext) {
    super(message, 403, 'FORBIDDEN', true, context)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源不存在', context?: ErrorContext) {
    super(message, 404, 'NOT_FOUND', true, context)
  }
}

export class ConflictError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 409, 'CONFLICT', true, context)
  }
}

export class ValidationError extends AppError {
  public readonly details: any[]

  constructor(message: string, details: any[] = [], context?: ErrorContext) {
    super(message, 422, 'VALIDATION_ERROR', true, context)
    this.details = details
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 500, 'DATABASE_ERROR', false, context)
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string, service: string, context?: ErrorContext) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', true, {
      ...context,
      additionalData: { ...context?.additionalData, service }
    })
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = '请求过于频繁', context?: ErrorContext) {
    super(message, 429, 'RATE_LIMIT_ERROR', true, context)
  }
}

// 错误处理器
export class ErrorHandler {
  private static isDevelopment = process.env.NODE_ENV === 'development'

  static handle(error: any, request?: NextRequest): NextResponse {
    // 记录错误
    this.logError(error, request)

    // 如果是AppError实例，直接处理
    if (error instanceof AppError) {
      return this.handleAppError(error)
    }

    // 处理Zod验证错误
    if (error.name === 'ZodError') {
      const validationError = new ValidationError(
        '数据验证失败',
        error.errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      )
      return this.handleAppError(validationError)
    }

    // 处理Prisma错误
    if (error.code?.startsWith('P')) {
      return this.handlePrismaError(error, request)
    }

    // 处理未知错误
    return this.handleUnknownError(error, request)
  }

  private static handleAppError(error: AppError): NextResponse {
    const response: any = {
      success: false,
      code: error.code,
      message: error.message
    }

    // 开发环境返回详细信息
    if (this.isDevelopment) {
      response.stack = error.stack
      response.context = error.context
    }

    // 验证错误返回详情
    if (error instanceof ValidationError && error.details) {
      response.details = error.details
    }

    return NextResponse.json(response, { status: error.statusCode })
  }

  private static handlePrismaError(error: any, request?: NextRequest): NextResponse {
    let message = '数据库操作失败'
    let statusCode = 500

    switch (error.code) {
      case 'P2002':
        message = '数据已存在'
        statusCode = 409
        break
      case 'P2003':
        message = '外键约束失败'
        statusCode = 400
        break
      case 'P2025':
        message = '记录不存在'
        statusCode = 404
        break
      case 'P1001':
        message = '无法连接到数据库'
        statusCode = 503
        break
    }

    const appError = new DatabaseError(message, { request })
    return this.handleAppError(appError)
  }

  private static handleUnknownError(error: any, request?: NextRequest): NextResponse {
    console.error('Unknown error:', error)

    const appError = new AppError(
      '服务器内部错误',
      500,
      'INTERNAL_ERROR',
      false,
      { request }
    )

    return this.handleAppError(appError)
  }

  private static logError(error: any, request?: NextRequest): void {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      code: error.code,
      url: request?.url,
      method: request?.method,
      timestamp: new Date().toISOString(),
      userAgent: request?.headers.get('user-agent'),
      ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip')
    }

    // 在开发环境输出到控制台
    if (this.isDevelopment) {
      console.error('Error occurred:', JSON.stringify(errorInfo, null, 2))
    } else {
      // 在生产环境应该发送到日志服务
      console.error('Error:', errorInfo.message, 'at', errorInfo.url)
    }
  }
}

// 全局错误处理中间件
export function withErrorHandler() {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function errorHandlerWrapper(request: NextRequest, ...args: any[]) {
      try {
        return await handler(request, ...args)
      } catch (error) {
        return ErrorHandler.handle(error, request)
      }
    }
  }
}

// 异步错误处理包装器
export async function withAsyncErrorHandling<T>(
  fn: () => Promise<T>,
  fallbackValue?: T
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (fallbackValue !== undefined) {
      return fallbackValue
    }
    throw error
  }
}
