import { z } from 'zod'

// 订单验证
export const createOrderSchema = z.object({
  customerId: z.string().uuid('无效的客户ID'),
  origin: z.string().min(1, '起始地点不能为空'),
  destination: z.string().min(1, '目的地不能为空'),
  weight: z.number().positive('重量必须大于0'),
  volume: z.number().positive('体积必须大于0').optional(),
  value: z.number().positive('货物价值必须大于0').optional(),
  pickupTime: z.date('取货时间格式错误'),
  deliveryTime: z.date('送达时间格式错误'),
  specialInstructions: z.string().optional()
}).refine(data => data.deliveryTime > data.pickupTime, {
  message: '送达时间必须晚于取货时间',
  path: ['deliveryTime']
})

// 车辆验证
export const createVehicleSchema = z.object({
  licensePlate: z.string().min(1, '车牌号不能为空'),
  type: z.enum(['TRUCK', 'VAN', 'TRAILER']),
  capacity: z.number().positive('载重量必须大于0'),
  driverId: z.string().uuid('无效的驾驶员ID')
})

// NL命令验证
export const nlCommandSchema = z.object({
  command: z.string().min(1, '命令不能为空'),
  intent: z.string().min(1, '意图不能为空'),
  parameters: z.record(z.string(), z.unknown()).optional()
})

// 类型导出
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>
export type NLCommandInput = z.infer<typeof nlCommandSchema>