// 订单验证（从order.ts导入）
export {
  createOrderSchema,
  updateOrderSchema,
  orderQuerySchema,
  type CreateOrderInput,
  type UpdateOrderInput,
  type OrderQueryInput
} from './order'

// 车辆验证
export const createVehicleSchema = z.object({
  licensePlate: z.string().min(1, '车牌号不能为空'),
  type: z.enum(['TRUCK', 'VAN', 'TRAILER']),
  capacity: z.number().positive('载重量必须大于0'),
  driverId: z.string().uuid('无效的驾驶员ID'),
})

// NL命令验证
export const nlCommandSchema = z.object({
  command: z.string().min(1, '命令不能为空'),
  intent: z.string().min(1, '意图不能为空'),
  parameters: z.record(z.string(), z.unknown()).optional(),
})

// 类型导出
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>
export type NLCommandInput = z.infer<typeof nlCommandSchema>
