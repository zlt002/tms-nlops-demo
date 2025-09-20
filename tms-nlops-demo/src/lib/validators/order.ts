import { z } from 'zod'
import { OrderStatus, Priority, PaymentStatus } from '@prisma/client'

// 货物信息验证
const cargoSchema = z.object({
  name: z.string().min(1, '货物名称不能为空'),
  weight: z.number().positive('货物重量必须大于0'),
  volume: z.number().positive('货物体积必须大于0'),
  value: z.number().optional()
})

// 地址信息验证
const addressSchema = z.object({
  origin: z.string().min(1, '发货地址不能为空'),
  destination: z.string().min(1, '收货地址不能为空'),
  originContact: z.string().min(1, '发货联系人不能为空'),
  destinationContact: z.string().min(1, '收货联系人不能为空')
})

// 创建订单验证
export const createOrderSchema = z.object({
  customerId: z.string().min(1, '客户ID不能为空'),
  cargo: cargoSchema,
  addresses: addressSchema,
  pickupTime: z.date().optional(),
  expectedTime: z.date('期望送达时间不能为空'),
  priority: z.nativeEnum(Priority).optional(),
  notes: z.string().optional()
})

// 更新订单验证
export const updateOrderSchema = z.object({
  cargo: cargoSchema.partial(),
  addresses: addressSchema.partial(),
  pickupTime: z.date().optional(),
  deliveryTime: z.date().optional(),
  expectedTime: z.date().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  totalAmount: z.number().positive('总金额必须大于0').optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  notes: z.string().optional()
})

// 订单查询参数验证
export const orderQuerySchema = z.object({
  customerId: z.string().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// 类型导出
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>
export type OrderQueryInput = z.infer<typeof orderQuerySchema>