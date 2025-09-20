// 中间件导出文件
export * from './errorHandling'
export * from './validation'
export * from './logging'
export * from './performance'
export * from './security'
export * from './response'

// API中间件组合
import { NextRequest } from 'next/server'
import { requireAuth, requireRole, logRequest, rateLimit } from '@/lib/api/middleware'
import { withErrorHandler } from './errorHandling'
import { withValidation } from './validation'
import { z } from 'zod'

/**
 * 组合多个中间件的工厂函数
 */
export function composeMiddleware<T>(
  ...middlewares: Array<(handler: any) => any>
) {
  return function<U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return middlewares.reduceRight((wrappedHandler, middleware) => {
      return middleware(wrappedHandler)
    }, handler)
  }
}

/**
 * 创建受保护的API处理器
 * 包含错误处理、认证、日志记录等中间件
 */
export function createProtectedHandler<T = any>(
  handler: (request: NextRequest, data?: T) => Promise<any>,
  options: {
    schema?: z.ZodSchema<T>
    requiredRoles?: string[]
    enableRateLimit?: boolean
    rateLimit?: number
  } = {}
) {
  const middlewares = []

  // 1. 错误处理中间件
  middlewares.push(withErrorHandler())

  // 2. 请求验证中间件
  if (options.schema) {
    middlewares.push(withValidation(options.schema))
  }

  // 3. 认证中间件包装器
  const authMiddleware = (handler: any) => {
    return async (request: NextRequest, ...args: any[]) => {
      // 检查认证
      if (options.requiredRoles && options.requiredRoles.length > 0) {
        const authResult = await requireRole(request, options.requiredRoles)
        if (authResult) return authResult
      } else {
        const authResult = await requireAuth(request)
        if (authResult) return authResult
      }

      // 日志记录
      const logger = logRequest(request)

      try {
        const result = await handler(request, ...args)
        logger.endTime()
        return result
      } catch (error) {
        logger.endTime()
        throw error
      }
    }
  }
  middlewares.push(authMiddleware)

  // 4. 限流中间件
  if (options.enableRateLimit) {
    const rateLimitMiddleware = (handler: any) => {
      return async (request: NextRequest, ...args: any[]) => {
        const rateLimitResult = rateLimit(request, options.rateLimit || 100)
        if (rateLimitResult) return rateLimitResult
        return handler(request, ...args)
      }
    }
    middlewares.push(rateLimitMiddleware)
  }

  return composeMiddleware(...middlewares)(handler)
}

/**
 * 创建公共API处理器
 * 包含错误处理、日志记录等中间件，但不包含认证
 */
export function createPublicHandler<T = any>(
  handler: (request: NextRequest, data?: T) => Promise<any>,
  options: {
    schema?: z.ZodSchema<T>
    enableRateLimit?: boolean
    rateLimit?: number
  } = {}
) {
  const middlewares = []

  // 1. 错误处理中间件
  middlewares.push(withErrorHandler())

  // 2. 请求验证中间件
  if (options.schema) {
    middlewares.push(withValidation(options.schema))
  }

  // 3. 日志记录中间件
  const loggingMiddleware = (handler: any) => {
    return async (request: NextRequest, ...args: any[]) => {
      const logger = logRequest(request)

      try {
        const result = await handler(request, ...args)
        logger.endTime()
        return result
      } catch (error) {
        logger.endTime()
        throw error
      }
    }
  }
  middlewares.push(loggingMiddleware)

  // 4. 限流中间件
  if (options.enableRateLimit) {
    const rateLimitMiddleware = (handler: any) => {
      return async (request: NextRequest, ...args: any[]) => {
        const rateLimitResult = rateLimit(request, options.rateLimit || 1000)
        if (rateLimitResult) return rateLimitResult
        return handler(request, ...args)
      }
    }
    middlewares.push(rateLimitMiddleware)
  }

  return composeMiddleware(...middlewares)(handler)
}