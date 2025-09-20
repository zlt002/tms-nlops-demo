import { OpenAPIV3 } from 'openapi-types'

export const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'TMS NL-Ops演示系统 API',
    version: '1.0.0',
    description: '运输管理系统自然语言操作演示系统API文档',
    contact: {
      name: 'API Support',
      email: 'support@tms-nlops.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production'
        ? 'https://api.tms-nlops.com'
        : 'http://localhost:3000/api',
      description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Development Server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key'
      }
    },
    schemas: {
      // 通用响应模式
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: '请求是否成功'
          },
          data: {
            type: 'object',
            description: '响应数据'
          },
          error: {
            type: 'string',
            description: '错误信息'
          },
          code: {
            type: 'string',
            description: '错误代码'
          },
          details: {
            type: 'object',
            description: '错误详情'
          },
          message: {
            type: 'string',
            description: '响应消息'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: '响应时间戳'
          }
        }
      },
      // 分页响应模式
      PaginatedResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: {
            type: 'array',
            items: { type: 'object' }
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              pages: { type: 'integer' }
            }
          },
          message: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      },
      // 错误响应模式
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string' },
          code: { type: 'string' },
          details: { type: 'object' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      },
      // 健康检查响应模式
      HealthCheckResponse: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          uptime: { type: 'integer' },
          version: { type: 'string' },
          environment: { type: 'string' },
          database: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              responseTime: { type: 'integer' }
            }
          },
          memory: {
            type: 'object',
            properties: {
              rss: { type: 'number' },
              heapTotal: { type: 'number' },
              heapUsed: { type: 'number' },
              external: { type: 'number' }
            }
          },
          system: {
            type: 'object',
            properties: {
              platform: { type: 'string' },
              arch: { type: 'string' },
              nodeVersion: { type: 'string' },
              cpuUsage: { type: 'object' }
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: '订单管理',
      description: '订单相关操作'
    },
    {
      name: '客户管理',
      description: '客户相关操作'
    },
    {
      name: '车辆管理',
      description: '车辆相关操作'
    },
    {
      name: '调度管理',
      description: '调度相关操作'
    },
    {
      name: '在途跟踪',
      description: '在途跟踪相关操作'
    },
    {
      name: '回单管理',
      description: '回单管理相关操作'
    },
    {
      name: '司机管理',
      description: '司机管理相关操作'
    },
    {
      name: '文档管理',
      description: '文档管理相关操作'
    },
    {
      name: '系统管理',
      description: '系统管理相关操作'
    },
    {
      name: '自然语言操作',
      description: '自然语言操作相关接口'
    },
    {
      name: '认证授权',
      description: '认证授权相关操作'
    }
  ],
  paths: {}
}