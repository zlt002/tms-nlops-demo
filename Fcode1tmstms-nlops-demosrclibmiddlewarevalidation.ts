import { NextRequest } from 'next/server'
import { z } from 'zod'
import { ApiResponseBuilder } from '@/lib/api/response'

export interface ValidationOptions {
  strict?: boolean
  abortEarly?: boolean
  stripUnknown?: boolean
}

export class RequestValidator {
  static async validateBody<T>(
    request: NextRequest,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): Promise<T> {
    try {
      const body = await request.json()
      const result = schema.safeParse(body, {
        strict: options.strict ?? true,
        abortEarly: options.abortEarly ?? true,
        stripUnknown: options.stripUnknown ?? true
      })

      if (!result.success) {
        const errors = this.formatZodError(result.error)
        throw new ValidationError('请求参数验证失败', errors)
      }

      return result.data
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('解析请求体失败')
    }
  }

  static validateQuery<T>(
    searchParams: URLSearchParams,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): T {
    try {
      const query: Record<string, any> = {}
      
      // 将URL参数转换为适当的类型
      searchParams.forEach((value, key) => {
        // 尝试解析为数字
        if (/^\d+$/.test(value)) {
          query[key] = parseInt(value)
        } 
        // 尝试解析为布尔值
        else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
          query[key] = value.toLowerCase() === 'true'
        }
        // 保留为字符串
        else {
          query[key] = value
        }
      })

      const result = schema.safeParse(query, {
        strict: options.strict ?? true,
        abortEarly: options.abortEarly ?? true,
        stripUnknown: options.stripUnknown ?? true
      })

      if (!result.success) {
        const errors = this.formatZodError(result.error)
        throw new ValidationError('查询参数验证失败', errors)
      }

      return result.data
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error
      }
      throw new ValidationError('解析查询参数失败')
    }
  }

  static validateParams(params: Record<string, string>, required: string[] = []): void {
    const missing = required.filter(param => !params[param])
    if (missing.length > 0) {
      throw new ValidationError(`缺少必要参数: ${missing.join(', ')}`)
    }
  }

  private static formatZodError(error: z.ZodError): ValidationErrorDetail[] {
    return error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
      expected: this.getExpectedType(err),
      received: err.received
    }))
  }

  private static getExpectedType(err: z.ZodIssue): string {
    switch (err.code) {
      case 'invalid_type':
        return err.expected
      case 'invalid_string':
        return err.validation
      case 'too_small':
      case 'too_big':
        return typeof err.minimum !== 'undefined' || typeof err.maximum !== 'undefined' 
          ? 'number' 
          : 'string|array'
      default:
        return 'unknown'
    }
  }
}

export class ValidationError extends Error {
  public readonly details: ValidationErrorDetail[]
  public readonly statusCode: number = 400

  constructor(message: string, details: ValidationErrorDetail[] = []) {
    super(message)
    this.name = 'ValidationError'
    this.details = details
  }
}

export interface ValidationErrorDetail {
  field: string
  message: string
  code: string
  expected?: string
  received?: any
}

// 创建验证中间件
export function withValidation<T>(
  schema: z.ZodSchema<T>,
  options: ValidationOptions = {}
) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function validatedHandler(request: NextRequest, ...args: any[]) {
      try {
        const validatedData = await RequestValidator.validateBody(request, schema, options)
        
        // 将验证后的数据附加到请求对象上
        ;(request as any).validatedBody = validatedData
        
        return await handler(request, ...args)
      } catch (error) {
        if (error instanceof ValidationError) {
          return ApiResponseBuilder.error(
            error.message,
            error.statusCode,
            error.details
          )
        }
        throw error
      }
    }
  }
}
