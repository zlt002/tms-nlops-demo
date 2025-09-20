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

export class AuthenticationError extends AppError {
  constructor(message: string = '认证失败', context?: ErrorContext) {
    super(message, 401, 'AUTHENTICATION_ERROR', true, context)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '授权失败', context?: ErrorContext) {
    super(message, 403, 'AUTHORIZATION_ERROR', true, context)
  }
}

export class NetworkError extends AppError {
  constructor(message: string, url?: string, context?: ErrorContext) {
    super(message, 503, 'NETWORK_ERROR', true, {
      ...context,
      additionalData: { ...context?.additionalData, url }
    })
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string, field?: string, context?: ErrorContext) {
    super(message, 500, 'CONFIGURATION_ERROR', false, {
      ...context,
      additionalData: { ...context?.additionalData, field }
    })
  }
}

// 增强的错误处理器
export class ErrorHandler {
  private static isDevelopment = process.env.NODE_ENV === 'development'
  private static isProduction = process.env.NODE_ENV === 'production'

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
          code: err.code,
          expected: err.expected,
          received: err.received
        }))
      )
      return this.handleAppError(validationError)
    }

    // 处理Prisma错误
    if (error.code?.startsWith('P')) {
      return this.handlePrismaError(error, request)
    }

    // 处理网络错误
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return this.handleNetworkError(error, request)
    }

    // 处理类型错误
    if (error instanceof TypeError || error instanceof ReferenceError) {
      return this.handleTypeError(error, request)
    }

    // 处理未知错误
    return this.handleUnknownError(error, request)
  }

  private static handleAppError(error: AppError): NextResponse {
    const requestId = this.getRequestId(error.context?.request)

    const response: any = {
      success: false,
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
      requestId
    }

    // 开发环境返回详细信息
    if (this.isDevelopment) {
      response.stack = error.stack
      response.context = error.context
      response.debug = {
        isOperational: error.isOperational,
        statusCode: error.statusCode
      }
    }

    // 验证错误返回详情
    if (error instanceof ValidationError && error.details) {
      response.details = error.details
      response.validation = {
        fieldCount: error.details.length,
        fields: error.details.map((d: any) => d.field)
      }
    }

    // 数据库错误返回额外信息
    if (error instanceof DatabaseError) {
      response.metadata = {
        errorType: 'database',
        operational: error.isOperational
      }
    }

    // 外部服务错误返回服务信息
    if (error instanceof ExternalServiceError) {
      response.service = error.context?.additionalData?.service
      response.metadata = {
        errorType: 'external_service',
        retryable: true
      }
    }

    return NextResponse.json(response, {
      status: error.statusCode,
      headers: {
        'X-Error-Code': error.code,
        'X-Request-ID': requestId
      }
    })
  }

  private static handlePrismaError(error: any, request?: NextRequest): NextResponse {
    const prismaErrorMap: Record<string, { message: string; statusCode: number; code: string }> = {
      'P2002': { message: '唯一约束违反，数据已存在', statusCode: 409, code: 'UNIQUE_CONSTRAINT_VIOLATION' },
      'P2003': { message: '外键约束失败', statusCode: 400, code: 'FOREIGN_KEY_CONSTRAINT_VIOLATION' },
      'P2004': { message: '约束违反', statusCode: 400, code: 'CONSTRAINT_VIOLATION' },
      'P2005': { message: '无效值', statusCode: 400, code: 'INVALID_VALUE' },
      'P2006': { message: '值超出范围', statusCode: 400, code: 'VALUE_OUT_OF_RANGE' },
      'P2007': { message: '数据验证失败', statusCode: 400, code: 'DATA_VALIDATION_FAILED' },
      'P2008': { message: '批量验证失败', statusCode: 400, code: 'BATCH_VALIDATION_FAILED' },
      'P2009': { message: '查询验证失败', statusCode: 400, code: 'QUERY_VALIDATION_FAILED' },
      'P2010': { message: '原始查询失败', statusCode: 400, code: 'RAW_QUERY_FAILED' },
      'P2011': { message: '空约束违反', statusCode: 400, code: 'NULL_CONSTRAINT_VIOLATION' },
      'P2012': { message: '缺少必需字段', statusCode: 400, code: 'MISSING_REQUIRED_FIELD' },
      'P2013': { message: '缺少输出参数', statusCode: 400, code: 'MISSING_OUTPUT_PARAMETER' },
      'P2014': { message: '关系变更冲突', statusCode: 400, code: 'RELATION_CHANGE_CONFLICT' },
      'P2015': { message: '记录不存在', statusCode: 404, code: 'RECORD_NOT_FOUND' },
      'P2016': { message: '查询解释错误', statusCode: 400, code: 'QUERY_INTERPRETATION_ERROR' },
      'P2017': { message: '记录连接失败', statusCode: 400, code: 'RECORD_CONNECTION_FAILED' },
      'P2018': { message: '连接记录不存在', statusCode: 404, code: 'CONNECTED_RECORD_NOT_FOUND' },
      'P2019': { message: '输入错误', statusCode: 400, code: 'INPUT_ERROR' },
      'P2020': { message: '值超出范围', statusCode: 400, code: 'VALUE_OUT_OF_RANGE' },
      'P2021': { message: '表不存在', statusCode: 404, code: 'TABLE_NOT_FOUND' },
      'P2022': { message: '列不存在', statusCode: 404, code: 'COLUMN_NOT_FOUND' },
      'P2023': { message: '不一致的环境', statusCode: 500, code: 'INCONSISTENT_ENVIRONMENT' },
      'P2024': { message: '连接超时', statusCode: 504, code: 'CONNECTION_TIMEOUT' },
      'P2025': { message: '记录不存在', statusCode: 404, code: 'RECORD_NOT_FOUND' },
      'P2026': { message: '不支持的原生查询', statusCode: 400, code: 'UNSUPPORTED_NATIVE_QUERY' },
      'P2027': { message: '多约束错误', statusCode: 400, code: 'MULTIPLE_CONSTRAINT_VIOLATION' },
      'P2028': { message: '事务API错误', statusCode: 500, code: 'TRANSACTION_API_ERROR' },
      'P2029': { message: '查询超时', statusCode: 504, code: 'QUERY_TIMEOUT' },
      'P2030': { message: '找不到全文索引', statusCode: 404, code: 'FULLTEXT_INDEX_NOT_FOUND' },
      'P2031': { message: '连接池已满', statusCode: 503, code: 'CONNECTION_POOL_FULL' },
      'P2032': { message: '连接池超时', statusCode: 504, code: 'CONNECTION_POOL_TIMEOUT' },
      'P2033': { message: '连接被拒绝', statusCode: 503, code: 'CONNECTION_REFUSED' },
      'P2034': { message: '连接中断', statusCode: 503, code: 'CONNECTION_INTERRUPTED' },
      'P2035': { message: '连接重置', statusCode: 503, code: 'CONNECTION_RESET' },
      'P2036': { message: '连接意外关闭', statusCode: 503, code: 'CONNECTION_UNEXPECTED_CLOSE' },
      'P2037': { message: '连接被拒绝', statusCode: 503, code: 'CONNECTION_REJECTED' },
      'P2038': { message: '连接失败', statusCode: 503, code: 'CONNECTION_FAILED' },
      'P1000': { message: '认证失败', statusCode: 503, code: 'AUTHENTICATION_FAILED' },
      'P1001': { message: '无法连接到数据库', statusCode: 503, code: 'CANNOT_CONNECT_TO_DATABASE' },
      'P1002': { message: '数据库不可达', statusCode: 503, code: 'DATABASE_UNREACHABLE' },
      'P1003': { message: '数据库不存在', statusCode: 503, code: 'DATABASE_DOES_NOT_EXIST' },
      'P1004': { message: '数据库已存在', statusCode: 503, code: 'DATABASE_ALREADY_EXISTS' },
      'P1005': { message: '未知数据库', statusCode: 503, code: 'UNKNOWN_DATABASE' },
      'P1006': { message: '连接被拒绝', statusCode: 503, code: 'CONNECTION_REFUSED' },
      'P1007': { message: '连接意外关闭', statusCode: 503, code: 'CONNECTION_UNEXPECTED_CLOSE' },
      'P1008': { message: '操作超时', statusCode: 504, code: 'OPERATION_TIMEOUT' },
      'P1009': { message: '数据库无法访问', statusCode: 503, code: 'DATABASE_INACCESSIBLE' },
      'P1010': { message: '用户版本已过期', statusCode: 503, code: 'USER_VERSION_EXPIRED' },
      'P1011': { message: '迁移错误', statusCode: 500, code: 'MIGRATION_ERROR' },
      'P1012': { message: '数据库迁移失败', statusCode: 500, code: 'DATABASE_MIGRATION_FAILED' },
      'P1013': { message: '数据库连接错误', statusCode: 503, code: 'DATABASE_CONNECTION_ERROR' },
      'P1014': { message: '数据库连接超时', statusCode: 504, code: 'DATABASE_CONNECTION_TIMEOUT' },
      'P1015': { message: '数据库连接被拒绝', statusCode: 503, code: 'DATABASE_CONNECTION_REFUSED' },
      'P1016': { message: '数据库连接中断', statusCode: 503, code: 'DATABASE_CONNECTION_INTERRUPTED' },
      'P1017': { message: '服务器关闭连接', statusCode: 503, code: 'SERVER_CLOSED_CONNECTION' },
      'P1018': { message: '连接已断开', statusCode: 503, code: 'CONNECTION_DISCLOSED' },
      'P1019': { message: '控制台错误', statusCode: 500, code: 'CONSOLE_ERROR' },
      'P1020': { message: '字段不匹配', statusCode: 500, code: 'FIELD_MISMATCH' },
      'P1021': { message: '表不匹配', statusCode: 500, code: 'TABLE_MISMATCH' },
      'P3000': { message: '迁移失败', statusCode: 500, code: 'MIGRATION_FAILED' },
      'P3001': { message: '迁移引擎错误', statusCode: 500, code: 'MIGRATION_ENGINE_ERROR' },
      'P3002': { message: '迁移名称冲突', statusCode: 500, code: 'MIGRATION_NAME_CONFLICT' },
      'P3003': { message: '迁移名称格式错误', statusCode: 500, code: 'MIGRATION_NAME_FORMAT_INVALID' },
      'P3004': { message: '迁移名称太长', statusCode: 500, code: 'MIGRATION_NAME_TOO_LONG' },
      'P3005': { message: '迁移名称包含无效字符', statusCode: 500, code: 'MIGRATION_NAME_INVALID_CHARACTERS' },
      'P3006': { message: '迁移路径错误', statusCode: 500, code: 'MIGRATION_PATH_INVALID' },
      'P3007': { message: '迁移路径包含无效字符', statusCode: 500, code: 'MIGRATION_PATH_INVALID_CHARACTERS' },
      'P3008': { message: '迁移文件格式错误', statusCode: 500, code: 'MIGRATION_FILE_FORMAT_INVALID' },
      'P3009': { message: '迁移文件读取失败', statusCode: 500, code: 'MIGRATION_FILE_READ_FAILED' },
      'P3010': { message: '迁移名称为空', statusCode: 500, code: 'MIGRATION_NAME_EMPTY' },
      'P3011': { message: '迁移名称已存在', statusCode: 500, code: 'MIGRATION_NAME_ALREADY_EXISTS' },
      'P3012': { message: '迁移目录不存在', statusCode: 500, code: 'MIGRATION_DIRECTORY_DOES_NOT_EXIST' },
      'P3013': { message: '迁移目录无法创建', statusCode: 500, code: 'MIGRATION_DIRECTORY_CANNOT_BE_CREATED' },
      'P3014': { message: '迁移目录无法读取', statusCode: 500, code: 'MIGRATION_DIRECTORY_CANNOT_BE_READ' },
      'P3015': { message: '迁移目录无法写入', statusCode: 500, code: 'MIGRATION_DIRECTORY_CANNOT_BE_WRITTEN' },
      'P3016': { message: '迁移文件无法删除', statusCode: 500, code: 'MIGRATION_FILE_CANNOT_BE_DELETED' },
      'P3017': { message: '迁移文件无法重命名', statusCode: 500, code: 'MIGRATION_FILE_CANNOT_BE_RENAMED' },
      'P3018': { message: '迁移文件无法复制', statusCode: 500, code: 'MIGRATION_FILE_CANNOT_BE_COPIED' },
      'P3019': { message: '迁移文件无法移动', statusCode: 500, code: 'MIGRATION_FILE_CANNOT_BE_MOVED' },
      'P3020': { message: '迁移文件无法创建', statusCode: 500, code: 'MIGRATION_FILE_CANNOT_BE_CREATED' },
    }

    const errorInfo = prismaErrorMap[error.code] || {
      message: '数据库操作失败',
      statusCode: 500,
      code: 'DATABASE_ERROR'
    }

    const appError = new DatabaseError(errorInfo.message, { request })
    appError.code = errorInfo.code
    appError.statusCode = errorInfo.statusCode

    return this.handleAppError(appError)
  }

  private static handleNetworkError(error: any, request?: NextRequest): NextResponse {
    const appError = new NetworkError(
      error.message || '网络连接失败',
      error.config?.url,
      { request }
    )
    return this.handleAppError(appError)
  }

  private static handleTypeError(error: any, request?: NextRequest): NextResponse {
    const appError = new AppError(
      `应用程序错误: ${error.message}`,
      500,
      'APPLICATION_ERROR',
      false,
      { request }
    )
    return this.handleAppError(appError)
  }

  private static handleUnknownError(error: any, request?: NextRequest): NextResponse {
    const requestId = this.getRequestId(request)

    console.error('Unknown error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      url: request?.url,
      method: request?.method,
      timestamp: new Date().toISOString(),
      requestId
    })

    const appError = new AppError(
      '服务器内部错误',
      500,
      'INTERNAL_ERROR',
      false,
      { request }
    )

    return this.handleAppError(appError)
  }

  private static getRequestId(request?: NextRequest): string {
    return request?.headers.get('x-request-id') ||
           request?.headers.get('x-trace-id') ||
           Math.random().toString(36).substr(2, 9)
  }

  private static logError(error: any, request?: NextRequest): void {
    const requestId = this.getRequestId(request)
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name,
      url: request?.url,
      method: request?.method,
      timestamp: new Date().toISOString(),
      userAgent: request?.headers.get('user-agent'),
      ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
      requestId,
      environment: process.env.NODE_ENV
    }

    // 在开发环境输出详细信息
    if (this.isDevelopment) {
      console.error('🚨 Error occurred:', JSON.stringify(errorInfo, null, 2))
    } else if (this.isProduction) {
      // 生产环境：结构化日志（可以发送到日志服务）
      console.error(JSON.stringify({
        level: 'error',
        component: 'api',
        ...errorInfo
      }))
    } else {
      // 测试环境：简化日志
      console.error(`[${requestId}] Error: ${errorInfo.message} at ${errorInfo.url}`)
    }

    // 如果是关键错误，发送警报
    if (error.statusCode >= 500) {
      this.sendErrorAlert(errorInfo)
    }
  }

  private static sendErrorAlert(errorInfo: any): void {
    // 这里可以集成错误监控服务，如Sentry、Bugsnag等
    if (process.env.ERROR_WEBHOOK_URL) {
      // 发送错误警报到webhook
      fetch(process.env.ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo)
      }).catch(() => {
        // 静默处理webhook发送失败
      })
    }
  }
}

// 增强的全局错误处理中间件
export function withErrorHandler(options: {
  enableStackTrace?: boolean
  enableErrorAlerts?: boolean
  customHandlers?: Record<string, (error: any) => NextResponse>
} = {}) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function errorHandlerWrapper(request: NextRequest, ...args: any[]) {
      try {
        // 添加性能监控
        const startTime = performance.now()

        const result = await handler(request, ...args)

        // 记录成功响应
        const duration = performance.now() - startTime
        if (duration > 1000) { // 超过1秒的请求
          console.warn(`[${request.headers.get('x-request-id')}] Slow request: ${duration.toFixed(2)}ms`)
        }

        return result
      } catch (error) {
        // 检查自定义错误处理器
        if (options.customHandlers && error.constructor.name in options.customHandlers) {
          return options.customHandlers[error.constructor.name](error)
        }

        return ErrorHandler.handle(error, request)
      }
    }
  }
}

// 异步错误处理包装器（增强版）
export async function withAsyncErrorHandling<T>(
  fn: () => Promise<T>,
  fallbackValue?: T,
  errorHandler?: (error: any) => T
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (errorHandler) {
      return errorHandler(error)
    }

    if (fallbackValue !== undefined) {
      console.warn('Async error occurred, using fallback value:', error.message)
      return fallbackValue
    }

    throw error
  }
}

// 错误重试机制
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    delayMs?: number
    backoffFactor?: number
    retryableErrors?: string[]
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delayMs = 1000,
    backoffFactor = 2,
    retryableErrors = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'EXTERNAL_SERVICE_ERROR']
  } = options

  let lastError: any

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      // 检查是否是可重试的错误
      const isRetryable = retryableErrors.includes(error.code) ||
                        error.code?.startsWith('E') ||
                        error.statusCode >= 500

      if (!isRetryable || attempt === maxRetries) {
        throw error
      }

      // 计算延迟时间（指数退避）
      const delay = delayMs * Math.pow(backoffFactor, attempt - 1)
      console.warn(`Retry attempt ${attempt}/${maxRetries} after ${delay}ms for error: ${error.message}`)

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// 错误类型守卫
export function isAppError(error: any): error is AppError {
  return error instanceof AppError
}

export function isValidationError(error: any): error is ValidationError {
  return error instanceof ValidationError
}

export function isDatabaseError(error: any): error is DatabaseError {
  return error instanceof DatabaseError
}

export function isNetworkError(error: any): error is NetworkError {
  return error instanceof NetworkError
}
