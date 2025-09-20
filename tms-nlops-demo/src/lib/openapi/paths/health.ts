import { registry } from '../index'
import { z } from 'zod'

// 健康检查响应Schema
const HealthCheckSchema = z.object({
  status: z.enum(['OK', 'ERROR', 'DEGRADED']),
  timestamp: z.string().datetime(),
  version: z.string(),
  uptime: z.number(),
  database: z.object({
    status: z.enum(['connected', 'disconnected']),
    latency: z.number().optional()
  }),
  redis: z.object({
    status: z.enum(['connected', 'disconnected']),
    latency: z.number().optional()
  }),
  services: z.record(z.object({
    status: z.enum(['OK', 'ERROR', 'DEGRADED']),
    message: z.string().optional()
  }))
})

registry.register('HealthCheck', HealthCheckSchema)

// 注册健康检查路径
registry.registerPath({
  method: 'get',
  path: '/api/health',
  tags: ['Health'],
  summary: '系统健康检查',
  description: '检查系统各组件的健康状态',
  responses: {
    200: {
      description: '系统健康状态',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/HealthCheck' }
        }
      }
    },
    503: {
      description: '服务不可用',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' }
        }
      }
    }
  }
})

registry.registerPath({
  method: 'get',
  path: '/api/health/db',
  tags: ['Health'],
  summary: '数据库连接检查',
  description: '检查数据库连接状态',
  responses: {
    200: {
      description: '数据库连接正常',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'connected' },
                  latency: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  }
})

registry.registerPath({
  method: 'get',
  path: '/api/health/redis',
  tags: ['Health'],
  summary: 'Redis连接检查',
  description: '检查Redis连接状态',
  responses: {
    200: {
      description: 'Redis连接正常',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'connected' },
                  latency: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  }
})
