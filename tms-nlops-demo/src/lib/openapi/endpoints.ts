import { apiDocGenerator } from './generator'
import { z } from 'zod'

// 预定义一些常用的API端点
export function defineApiEndpoints() {
  // 订单管理API
  apiDocGenerator.addPath('/orders', 'GET', {
    summary: '获取订单列表',
    description: '分页获取订单列表，支持搜索和筛选',
    tags: ['订单管理'],
    security: true,
    parameters: [
      {
        name: 'page',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 1 },
        description: '页码'
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 20, maximum: 100 },
        description: '每页数量'
      },
      {
        name: 'search',
        in: 'query',
        required: false,
        schema: { type: 'string' },
        description: '搜索关键词'
      },
      {
        name: 'status',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'] },
        description: '订单状态'
      }
    ],
    responses: {
      '200': {
        description: '成功获取订单列表',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PaginatedResponse' }
          }
        }
      }
    },
    examples: {
      request: 'GET /api/orders?page=1&limit=10&status=CONFIRMED',
      response: JSON.stringify({
        success: true,
        data: [
          {
            id: 'order-123',
            orderNumber: 'ORD-2024-001',
            customerId: 'customer-456',
            cargoName: '电子产品',
            status: 'CONFIRMED',
            createdAt: '2024-01-01T10:00:00Z'
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 25,
          pages: 3
        },
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })

  apiDocGenerator.addPath('/orders', 'POST', {
    summary: '创建订单',
    description: '创建新的运输订单',
    tags: ['订单管理'],
    security: true,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['customerId', 'cargoName', 'originAddress', 'destinationAddress'],
            properties: {
              customerId: { type: 'string', description: '客户ID' },
              cargoName: { type: 'string', description: '货物名称' },
              cargoWeight: { type: 'number', description: '货物重量(kg)' },
              cargoVolume: { type: 'number', description: '货物体积(m³)' },
              originAddress: { type: 'string', description: '起始地址' },
              destinationAddress: { type: 'string', description: '目的地地址' },
              expectedTime: { type: 'string', format: 'date-time', description: '预计送达时间' },
              specialRequirements: { type: 'string', description: '特殊要求' }
            }
          }
        }
      }
    },
    responses: {
      '201': {
        description: '订单创建成功',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      }
    },
    examples: {
      request: `POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "customerId": "customer-456",
  "cargoName": "电子产品",
  "cargoWeight": 100,
  "cargoVolume": 2,
  "originAddress": "北京市朝阳区",
  "destinationAddress": "上海市浦东新区",
  "expectedTime": "2024-01-02T18:00:00Z"
}`,
      response: JSON.stringify({
        success: true,
        data: {
          id: 'order-123',
          orderNumber: 'ORD-2024-001',
          status: 'PENDING',
          createdAt: '2024-01-01T10:00:00Z'
        },
        message: '订单创建成功',
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })

  // 客户管理API
  apiDocGenerator.addPath('/customers', 'GET', {
    summary: '获取客户列表',
    description: '分页获取客户列表',
    tags: ['客户管理'],
    security: true,
    parameters: [
      {
        name: 'page',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 1 },
        description: '页码'
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 20 },
        description: '每页数量'
      },
      {
        name: 'customerType',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['INDIVIDUAL', 'COMPANY'] },
        description: '客户类型'
      }
    ],
    responses: {
      '200': {
        description: '成功获取客户列表',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PaginatedResponse' }
          }
        }
      }
    }
  })

  apiDocGenerator.addPath('/customers', 'POST', {
    summary: '创建客户',
    description: '创建新客户',
    tags: ['客户管理'],
    security: true,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['customerType', 'name', 'phone'],
            properties: {
              customerType: { type: 'string', enum: ['INDIVIDUAL', 'COMPANY'], description: '客户类型' },
              name: { type: 'string', description: '客户姓名或公司名称' },
              companyName: { type: 'string', description: '公司名称（仅企业客户）' },
              email: { type: 'string', format: 'email', description: '邮箱地址' },
              phone: { type: 'string', description: '联系电话' },
              address: { type: 'string', description: '地址' },
              city: { type: 'string', description: '城市' },
              province: { type: 'string', description: '省份' }
            }
          }
        }
      }
    },
    responses: {
      '201': {
        description: '客户创建成功',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      }
    }
  })

  // 车辆管理API
  apiDocGenerator.addPath('/vehicles', 'GET', {
    summary: '获取车辆列表',
    description: '分页获取车辆列表',
    tags: ['车辆管理'],
    security: true,
    parameters: [
      {
        name: 'page',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 1 },
        description: '页码'
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer', default: 20 },
        description: '每页数量'
      },
      {
        name: 'vehicleType',
        in: 'query',
        required: false,
        schema: { type: 'string' },
        description: '车辆类型'
      },
      {
        name: 'status',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'] },
        description: '车辆状态'
      }
    ],
    responses: {
      '200': {
        description: '成功获取车辆列表',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PaginatedResponse' }
          }
        }
      }
    }
  })

  // 在途跟踪API
  apiDocGenerator.addPath('/tracking/logs', 'POST', {
    summary: '上报位置日志',
    description: '上报车辆位置和状态信息',
    tags: ['在途跟踪'],
    security: true,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['shipmentId', 'latitude', 'longitude'],
            properties: {
              shipmentId: { type: 'string', description: '运单ID' },
              latitude: { type: 'number', minimum: -90, maximum: 90, description: '纬度' },
              longitude: { type: 'number', minimum: -180, maximum: 180, description: '经度' },
              address: { type: 'string', description: '地址描述' },
              speed: { type: 'number', minimum: 0, maximum: 300, description: '速度(km/h)' },
              heading: { type: 'number', minimum: 0, maximum: 360, description: '方向角度' },
              altitude: { type: 'number', description: '海拔(m)' },
              accuracy: { type: 'number', minimum: 0, description: 'GPS精度(m)' },
              timestamp: { type: 'string', format: 'date-time', description: '时间戳' },
              deviceId: { type: 'string', description: '设备ID' }
            }
          }
        }
      }
    },
    responses: {
      '201': {
        description: '位置上报成功',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      }
    },
    examples: {
      request: `POST /api/tracking/logs
Content-Type: application/json
Authorization: Bearer <token>

{
  "shipmentId": "shipment-123",
  "latitude": 39.9042,
  "longitude": 116.4074,
  "address": "北京市朝阳区",
  "speed": 60,
  "heading": 90,
  "timestamp": "2024-01-01T10:00:00Z"
}`,
      response: JSON.stringify({
        success: true,
        data: {
          id: 'log-123',
          shipmentId: 'shipment-123',
          timestamp: '2024-01-01T10:00:00Z'
        },
        message: '位置上报成功',
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })

  // 自然语言操作API
  apiDocGenerator.addPath('/nlops/command', 'POST', {
    summary: '自然语言命令',
    description: '使用自然语言执行系统操作',
    tags: ['自然语言操作'],
    security: true,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['command'],
            properties: {
              command: { type: 'string', description: '自然语言命令' },
              context: { type: 'object', description: '上下文信息' },
              userId: { type: 'string', description: '用户ID' }
            }
          }
        }
      }
    },
    responses: {
      '200': {
        description: '命令执行成功',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ApiResponse' }
          }
        }
      }
    },
    examples: {
      request: `POST /api/nlops/command
Content-Type: application/json
Authorization: Bearer <token>

{
  "command": "创建一个新的运输订单，从北京到上海",
  "context": {
    "userIntent": "create_order"
  }
}`,
      response: JSON.stringify({
        success: true,
        data: {
          action: 'create_order',
          parameters: {
            origin: '北京',
            destination: '上海'
          },
          result: '订单创建成功',
          orderId: 'order-123'
        },
        message: '命令执行成功',
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })

  // 健康检查API
  apiDocGenerator.addPath('/health', 'GET', {
    summary: '系统健康检查',
    description: '检查系统各组件的健康状态',
    tags: ['系统管理'],
    security: false,
    responses: {
      '200': {
        description: '系统健康状态',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/HealthCheckResponse' }
          }
        }
      }
    },
    examples: {
      request: 'GET /api/health',
      response: JSON.stringify({
        success: true,
        data: {
          status: 'healthy',
          timestamp: '2024-01-01T10:00:00Z',
          uptime: 3600,
          version: '1.0.0',
          environment: 'development',
          database: {
            status: 'connected',
            responseTime: 50
          },
          memory: {
            rss: 256,
            heapTotal: 128,
            heapUsed: 64,
            external: 32
          }
        },
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })

  // 认证API
  apiDocGenerator.addPath('/auth/login', 'POST', {
    summary: '用户登录',
    description: '用户登录获取访问令牌',
    tags: ['认证授权'],
    security: false,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: { type: 'string', format: 'email', description: '邮箱地址' },
              password: { type: 'string', description: '密码' }
            }
          }
        }
      }
    },
    responses: {
      '200': {
        description: '登录成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                data: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', description: 'JWT访问令牌' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        email: { type: 'string' },
                        name: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    examples: {
      request: `POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}`,
      response: JSON.stringify({
        success: true,
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 'user-123',
            email: 'user@example.com',
            name: '张三'
          }
        },
        timestamp: '2024-01-01T10:00:00Z'
      }, null, 2)
    }
  })
}