import { registry } from '../index'
import { z } from 'zod'

// Order Schema
const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']),
  paymentStatus: z.enum(['UNPAID', 'PARTIALLY_PAID', 'PAID', 'REFUNDED']),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
  customer: z.object({
    id: z.string(),
    companyName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
  }),
  originAddress: z.string(),
  destinationAddress: z.string(),
  cargoName: z.string(),
  cargoWeight: z.number(),
  cargoVolume: z.number(),
  distance: z.number().optional(),
  estimatedDuration: z.number().optional(),
  totalAmount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deliveryTime: z.string().datetime().optional()
})

const OrderCreateSchema = z.object({
  customerId: z.string(),
  originAddress: z.string(),
  destinationAddress: z.string(),
  cargoName: z.string(),
  cargoWeight: z.number().positive(),
  cargoVolume: z.number().positive(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  scheduledPickupTime: z.string().datetime().optional(),
  specialInstructions: z.string().optional()
})

const OrderUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']).optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  scheduledPickupTime: z.string().datetime().optional(),
  specialInstructions: z.string().optional()
})

const OrderQuerySchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']).optional(),
  customerId: z.string().optional(),
  priority: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  search: z.string().optional()
})

registry.register('Order', OrderSchema)
registry.register('OrderCreate', OrderCreateSchema)
registry.register('OrderUpdate', OrderUpdateSchema)
registry.register('OrderQuery', OrderQuerySchema)

// 注册订单API路径
registry.registerPath({
  method: 'get',
  path: '/api/orders',
  tags: ['Orders'],
  summary: '获取订单列表',
  description: '分页获取订单列表，支持多种筛选条件',
  request: {
    query: OrderQuerySchema
  },
  responses: {
    200: {
      description: '订单列表',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'array',
                items: { $ref: '#/components/schemas/Order' }
              },
              pagination: { $ref: '#/components/schemas/Pagination' }
            }
          }
        }
      }
    }
  }
})

registry.registerPath({
  method: 'post',
  path: '/api/orders',
  tags: ['Orders'],
  summary: '创建订单',
  description: '创建新的运输订单',
  security: [{ bearerAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderCreate' }
      }
    }
  },
  responses: {
    201: {
      description: '订单创建成功',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { $ref: '#/components/schemas/Order' }
            }
          }
        }
      }
    },
    400: {
      description: '请求参数错误',
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
  path: '/api/orders/{id}',
  tags: ['Orders'],
  summary: '获取订单详情',
  description: '根据ID获取订单详细信息',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' }
    }
  ],
  responses: {
    200: {
      description: '订单详情',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { $ref: '#/components/schemas/Order' }
            }
          }
        }
      }
    },
    404: {
      description: '订单不存在',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' }
        }
      }
    }
  }
})

registry.registerPath({
  method: 'put',
  path: '/api/orders/{id}',
  tags: ['Orders'],
  summary: '更新订单',
  description: '更新订单信息',
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' }
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/OrderUpdate' }
      }
    }
  },
  responses: {
    200: {
      description: '订单更新成功',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { $ref: '#/components/schemas/Order' }
            }
          }
        }
      }
    }
  }
})

registry.registerPath({
  method: 'delete',
  path: '/api/orders/{id}',
  tags: ['Orders'],
  summary: '删除订单',
  description: '删除指定的订单',
  security: [{ bearerAuth: [], roles: ['ADMIN'] }],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string' }
    }
  ],
  responses: {
    200: {
      description: '订单删除成功'
    },
    403: {
      description: '权限不足'
    },
    404: {
      description: '订单不存在'
    }
  }
})

registry.registerPath({
  method: 'get',
  path: '/api/orders/stats',
  tags: ['Orders'],
  summary: '获取订单统计',
  description: '获取订单相关的统计数据',
  responses: {
    200: {
      description: '统计数据',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  totalOrders: { type: 'integer' },
                  byStatus: { type: 'object' },
                  byPriority: { type: 'object' },
                  revenue: { type: 'number' },
                  avgDistance: { type: 'number' }
                }
              }
            }
          }
        }
      }
    }
  }
})
