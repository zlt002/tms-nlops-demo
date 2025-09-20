import { NextRequest } from 'next/server'
import { z } from 'zod'
import { ApiResponseBuilder } from '@/lib/api/response'
import { ValidationError as AppValidationError } from './errorHandling'

export interface ValidationOptions {
  strict?: boolean
  abortEarly?: boolean
  stripUnknown?: boolean
  coerce?: boolean
  partial?: boolean
}

export interface ValidationResult<T = any> {
  valid: boolean
  data?: T
  errors?: ValidationErrorDetail[]
}

export interface ValidationErrorDetail {
  field: string
  message: string
  code: string
  expected?: string
  received?: any
  path?: string[]
}

/**
 * 增强的请求验证器
 */
export class RequestValidator {
  /**
   * 验证请求体
   */
  static async validateBody<T>(
    request: NextRequest,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): Promise<T> {
    try {
      const body = await this.parseRequestBody(request)
      const result = await this.validateWithSchema(body, schema, options)

      if (!result.valid) {
        throw new AppValidationError('请求参数验证失败', result.errors || [])
      }

      return result.data as T
    } catch (error) {
      if (error instanceof AppValidationError) {
        throw error
      }
      throw new AppValidationError('解析请求体失败')
    }
  }

  /**
   * 验证查询参数
   */
  static validateQuery<T>(
    searchParams: URLSearchParams,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): T {
    try {
      const query = this.parseQueryParams(searchParams)
      const result = this.validateWithSchema(query, schema, options)

      if (!result.valid) {
        throw new AppValidationError('查询参数验证失败', result.errors || [])
      }

      return result.data as T
    } catch (error) {
      if (error instanceof AppValidationError) {
        throw error
      }
      throw new AppValidationError('解析查询参数失败')
    }
  }

  /**
   * 验证路径参数
   */
  static validateParams<T>(
    params: Record<string, string>,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): T {
    try {
      const result = this.validateWithSchema(params, schema, options)

      if (!result.valid) {
        throw new AppValidationError('路径参数验证失败', result.errors || [])
      }

      return result.data as T
    } catch (error) {
      if (error instanceof AppValidationError) {
        throw error
      }
      throw new AppValidationError('解析路径参数失败')
    }
  }

  /**
   * 验证请求头
   */
  static validateHeaders<T>(
    headers: Headers,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): T {
    try {
      const headerObj: Record<string, string> = {}
      headers.forEach((value, key) => {
        headerObj[key.toLowerCase()] = value
      })

      const result = this.validateWithSchema(headerObj, schema, options)

      if (!result.valid) {
        throw new AppValidationError('请求头验证失败', result.errors || [])
      }

      return result.data as T
    } catch (error) {
      if (error instanceof AppValidationError) {
        throw error
      }
      throw new AppValidationError('解析请求头失败')
    }
  }

  /**
   * 通用Schema验证方法
   */
  static validateWithSchema<T>(
    data: any,
    schema: z.ZodSchema<T>,
    options: ValidationOptions = {}
  ): ValidationResult<T> {
    const config = {
      strict: options.strict ?? true,
      abortEarly: options.abortEarly ?? false,
      stripUnknown: options.stripUnknown ?? true,
      coerce: options.coerce ?? true
    }

    try {
      let result
      if (options.partial) {
        result = schema.partial().safeParse(data, config)
      } else {
        result = schema.safeParse(data, config)
      }

      if (result.success) {
        return {
          valid: true,
          data: result.data
        }
      }

      return {
        valid: false,
        errors: this.formatZodError(result.error)
      }
    } catch (error) {
      return {
        valid: false,
        errors: [{
          field: 'unknown',
          message: '验证过程中发生未知错误',
          code: 'UNKNOWN_ERROR'
        }]
      }
    }
  }

  /**
   * 安全地解析请求体
   */
  private static async parseRequestBody(request: NextRequest): Promise<any> {
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      return await request.json()
    }

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      const result: Record<string, any> = {}
      for (const [key, value] of formData.entries()) {
        result[key] = value
      }
      return result
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const result: Record<string, any> = {}
      for (const [key, value] of formData.entries()) {
        result[key] = value
      }
      return result
    }

    if (contentType.includes('text/plain')) {
      return await request.text()
    }

    throw new AppValidationError(`不支持的Content-Type: ${contentType}`)
  }

  /**
   * 解析查询参数
   */
  private static parseQueryParams(searchParams: URLSearchParams): Record<string, any> {
    const query: Record<string, any> = {}

    searchParams.forEach((value, key) => {
      // 处理数组参数
      if (key.endsWith('[]')) {
        const cleanKey = key.slice(0, -2)
        if (!query[cleanKey]) {
          query[cleanKey] = []
        }
        query[cleanKey].push(this.convertValue(value))
      } else if (query[key]) {
        // 已存在的键，转换为数组
        if (Array.isArray(query[key])) {
          query[key].push(this.convertValue(value))
        } else {
          query[key] = [query[key], this.convertValue(value)]
        }
      } else {
        query[key] = this.convertValue(value)
      }
    })

    return query
  }

  /**
   * 智能转换值类型
   */
  private static convertValue(value: string): any {
    // 数字
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10)
    }

    // 浮点数
    if (/^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value)
    }

    // 布尔值
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false

    // null
    if (value.toLowerCase() === 'null') return null

    // 空字符串
    if (value === '') return ''

    // 默认返回字符串
    return value
  }

  /**
   * 格式化Zod错误
   */
  private static formatZodError(error: z.ZodError): ValidationErrorDetail[] {
    return error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
      expected: this.getExpectedType(err),
      received: err.received,
      path: err.path
    }))
  }

  /**
   * 获取期望类型
   */
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
      case 'invalid_union':
        return 'union'
      case 'invalid_literal':
        return 'literal'
      case 'invalid_enum_value':
        return 'enum'
      case 'unrecognized_keys':
        return 'object'
      case 'invalid_arguments':
        return 'function'
      case 'invalid_return_type':
        return 'function'
      case 'invalid_date':
        return 'date'
      default:
        return 'unknown'
    }
  }
}

/**
 * 验证中间件创建器
 */
export function withValidation<T>(
  schema: z.ZodSchema<T>,
  options: ValidationOptions & {
    validateBody?: boolean
    validateQuery?: boolean
    validateParams?: boolean
    validateHeaders?: boolean
  } = {}
) {
  return function <U extends (request: NextRequest, ...args: any[]) => Promise<any>>(
    handler: U
  ) {
    return async function validatedHandler(request: NextRequest, ...args: any[]) {
      try {
        const validationResult: any = {}

        // 验证请求体
        if (options.validateBody !== false && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
          validationResult.body = await RequestValidator.validateBody(request, schema, options)
        }

        // 验证查询参数
        if (options.validateQuery !== false) {
          validationResult.query = RequestValidator.validateQuery(
            request.nextUrl.searchParams,
            schema,
            options
          )
        }

        // 验证路径参数
        if (options.validateParams !== false) {
          const params = this.extractPathParams(request)
          if (Object.keys(params).length > 0) {
            validationResult.params = RequestValidator.validateParams(params, schema, options)
          }
        }

        // 验证请求头
        if (options.validateHeaders === true) {
          validationResult.headers = RequestValidator.validateHeaders(
            request.headers,
            schema,
            options
          )
        }

        // 将验证结果附加到请求对象
        ;(request as any).validatedData = validationResult

        return await handler(request, ...args)
      } catch (error) {
        if (error instanceof AppValidationError) {
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

/**
 * 创建验证器工厂
 */
export function createValidator<T>(schema: z.ZodSchema<T>) {
  return {
    body: (request: NextRequest, options?: ValidationOptions) =>
      RequestValidator.validateBody(request, schema, options),

    query: (searchParams: URLSearchParams, options?: ValidationOptions) =>
      RequestValidator.validateQuery(searchParams, schema, options),

    params: (params: Record<string, string>, options?: ValidationOptions) =>
      RequestValidator.validateParams(params, schema, options),

    headers: (headers: Headers, options?: ValidationOptions) =>
      RequestValidator.validateHeaders(headers, schema, options),

    withValidation: (options?: ValidationOptions & {
      validateBody?: boolean
      validateQuery?: boolean
      validateParams?: boolean
      validateHeaders?: boolean
    }) => withValidation(schema, options)
  }
}

/**
 * 辅助方法：提取路径参数
 */
function extractPathParams(request: NextRequest): Record<string, string> {
  const pathname = request.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  const params: Record<string, string> = {}

  // 简化版：假设动态参数在固定位置
  // 实际应用中应该根据路由配置提取
  if (segments.length >= 3) {
    // /api/resource/:id
    if (segments[0] === 'api' && segments.length === 3) {
      params.id = segments[2]
    }
    // /api/resource/:id/subresource/:subId
    else if (segments[0] === 'api' && segments.length === 5) {
      params.id = segments[2]
      params.subId = segments[4]
    }
  }

  return params
}

/**
 * 预定义的常用验证Schema
 */
export const CommonSchemas = {
  // 分页参数
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional()
  }),

  // 搜索参数
  search: z.object({
    query: z.string().min(1).max(100),
    fields: z.array(z.string()).optional(),
    fuzzy: z.boolean().default(false)
  }),

  // 时间范围
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    timezone: z.string().optional()
  }),

  // ID列表
  idList: z.object({
    ids: z.array(z.string().uuid()).min(1).max(100)
  }),

  // 批量操作
  batchOperation: z.object({
    operation: z.enum(['create', 'update', 'delete']),
    items: z.array(z.object({})).min(1).max(1000)
  })
}

/**
 * 组合验证器
 */
export function combineValidators<T>(...validators: Array<(data: any) => ValidationResult<T>>) {
  return (data: any): ValidationResult<T> => {
    for (const validator of validators) {
      const result = validator(data)
      if (!result.valid) {
        return result
      }
    }

    return { valid: true, data }
  }
}
