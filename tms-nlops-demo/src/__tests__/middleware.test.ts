import { NextRequest, NextResponse } from 'next/server'
import { AppError, ValidationError, ErrorHandler } from '@/lib/middleware/errorHandling'
import { RequestValidator, CommonSchemas } from '@/lib/middleware/validation'
import { RequestLogger } from '@/lib/middleware/logging'
import { SecurityMiddleware } from '@/lib/middleware/security'
import { z } from 'zod'

// 创建模拟请求
function createMockRequest(overrides: Partial<NextRequest> = {}): NextRequest {
  const url = 'http://localhost:3000/api/test'
  const headers = new Headers({
    'user-agent': 'test-agent',
    'content-type': 'application/json',
    'x-forwarded-for': '192.168.1.1',
    ...overrides.headers
  })

  return {
    url,
    method: 'GET',
    headers,
    nextUrl: new URL(url),
    json: async () => ({ test: 'data' }),
    ...overrides
  } as NextRequest
}

describe('错误处理中间件', () => {
  test('应该正确处理AppError', () => {
    const error = new ValidationError('测试验证错误', [{ field: 'test', message: '错误信息', code: 'INVALID' }])
    const response = ErrorHandler.handle(error)

    expect(response.status).toBe(422)
  })

  test('应该正确处理Zod错误', () => {
    const schema = z.object({ name: z.string() })
    const result = schema.safeParse({ name: 123 })

    if (!result.success) {
      const response = ErrorHandler.handle(result.error)
      expect(response.status).toBe(422)
    }
  })

  test('应该正确处理未知错误', () => {
    const error = new Error('未知错误')
    const response = ErrorHandler.handle(error)

    expect(response.status).toBe(500)
  })
})

describe('请求验证器', () => {
  test('应该正确验证请求体', async () => {
    const schema = z.object({ name: z.string(), age: z.number() })
    const request = createMockRequest({
      method: 'POST',
      json: async () => ({ name: '张三', age: 25 })
    })

    const result = await RequestValidator.validateBody(request, schema)
    expect(result).toEqual({ name: '张三', age: 25 })
  })

  test('应该正确验证查询参数', () => {
    const searchParams = new URLSearchParams('page=1&limit=10&sort=name')
    const schema = CommonSchemas.pagination

    const result = RequestValidator.validateQuery(searchParams, schema)
    expect(result).toEqual({ page: 1, limit: 10, sort: 'name' })
  })

  test('应该正确验证路径参数', () => {
    const params = { id: '123' }
    const schema = z.object({ id: z.string() })

    const result = RequestValidator.validateParams(params, schema)
    expect(result).toEqual({ id: '123' })
  })
})

describe('请求日志记录', () => {
  test('应该正确记录请求日志', () => {
    const request = createMockRequest()
    const logSpy = jest.spyOn(console, 'log')

    RequestLogger.logAction('TEST_ACTION', { data: 'test' }, 'user123')

    expect(logSpy).toHaveBeenCalled()
    logSpy.mockRestore()
  })

  test('应该正确记录安全日志', () => {
    const request = createMockRequest()
    const warnSpy = jest.spyOn(console, 'warn')

    RequestLogger.logSecurity('SECURITY_EVENT', { type: 'test' }, request)

    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })
})

describe('安全中间件', () => {
  test('应该正确清理输入', () => {
    const maliciousInput = '<script>alert("xss")</script>'
    const sanitized = SecurityMiddleware.sanitizeInput(maliciousInput)

    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')
  })

  test('应该正确清理SQL输入', () => {
    const sqlInput = "SELECT * FROM users WHERE id = '1' OR '1'='1'"
    const sanitized = SecurityMiddleware.sanitizeSQL(sqlInput)

    expect(sanitized).toBe("SELECT * FROM users WHERE id = ''1'' OR ''1''=''1''")
  })
})

describe('中间件组合', () => {
  test('应该正确组合多个中间件', async () => {
    const mockHandler = jest.fn().mockResolvedValue(NextResponse.json({ success: true }))
    const request = createMockRequest()

    // 测试中间件组合
    const wrappedHandler = async (req: NextRequest) => {
      try {
        return await mockHandler(req)
      } catch (error) {
        return ErrorHandler.handle(error, req)
      }
    }

    const result = await wrappedHandler(request)
    expect(result.status).toBe(200)
    expect(mockHandler).toHaveBeenCalled()
  })
})