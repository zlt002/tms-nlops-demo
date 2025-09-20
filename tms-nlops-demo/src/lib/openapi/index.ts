import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

export const registry = new OpenAPIRegistry()

// 基础信息
export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'TMS NL-Ops API',
    version: '1.0.0',
    description: 'TMS NL-Ops Demo System API Documentation',
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
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Error message' },
              code: { type: 'string', example: 'ERROR_CODE' },
              details: { type: 'object' }
            }
          },
          timestamp: { type: 'string', format: 'date-time' },
          requestId: { type: 'string' }
        }
      },
      Pagination: {
        type: 'object',
        properties: {
          page: { type: 'integer', example: 1 },
          limit: { type: 'integer', example: 20 },
          total: { type: 'integer', example: 100 },
          pages: { type: 'integer', example: 5 }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: 'Health',
      description: '系统健康检查'
    },
    {
      name: 'Auth',
      description: '用户认证'
    },
    {
      name: 'Orders',
      description: '订单管理'
    },
    {
      name: 'Customers',
      description: '客户管理'
    },
    {
      name: 'Vehicles',
      description: '车辆管理'
    },
    {
      name: 'Drivers',
      description: '司机管理'
    },
    {
      name: 'Documents',
      description: '文档管理'
    },
    {
      name: 'Dispatch',
      description: '调度管理'
    },
    {
      name: 'Tracking',
      description: '实时追踪'
    },
    {
      name: 'POD',
      description: '回单管理'
    },
    {
      name: 'NL-Ops',
      description: '自然语言操作'
    }
  ]
}

// 生成OpenAPI文档
export function generateOpenAPIDocument() {
  return {
    ...openApiSpec,
    paths: registry.definitions.paths,
    components: {
      ...openApiSpec.components,
      schemas: {
        ...openApiSpec.components.schemas,
        ...registry.definitions.schemas
      }
    }
  }
}
