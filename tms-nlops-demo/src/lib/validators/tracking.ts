import { z } from 'zod'

export const locationReportSchema = z.object({
  type: z.enum(['vehicle', 'driver', 'shipment', 'dispatch']),
  typeId: z.string().min(1, '目标ID不能为空'),
  latitude: z.number().min(-90).max(90, '纬度必须在-90到90之间'),
  longitude: z.number().min(-180).max(180, '经度必须在-180到180之间'),
  address: z.string().optional(),
  speed: z.number().min(0).optional(),
  heading: z.number().min(0).max(360).optional(),
  accuracy: z.number().positive().optional(),
  deviceId: z.string().optional(),
  additionalData: z.object({}).optional()
})

export const trackingQuerySchema = z.object({
  type: z.enum(['vehicle', 'driver', 'shipment', 'dispatch']),
  typeId: z.string().min(1, '目标ID不能为空'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(1000).default(100),
  simplify: z.boolean().default(true),
  tolerance: z.number().positive().default(0.0001)
})

export const geofenceSchema = z.object({
  name: z.string().min(1, '围栏名称不能为空'),
  type: z.enum(['vehicle', 'driver', 'shipment', 'dispatch']),
  typeId: z.string().min(1, '目标ID不能为空'),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()])
  }),
  radius: z.number().positive('半径必须大于0'),
  notificationSettings: z.object({
    enabled: z.boolean().default(true),
    enter: z.boolean().default(true),
    exit: z.boolean().default(true),
    webhookUrl: z.string().url().optional(),
    email: z.string().email().optional()
  }).optional()
})

export const realTimeTrackingSchema = z.object({
  type: z.enum(['vehicle', 'driver', 'shipment', 'dispatch']),
  typeIds: z.array(z.string()).min(1, '至少选择一个目标'),
  interval: z.number().positive().min(1).max(300).default(30), // 1-300秒
  includeHistory: z.boolean().default(false),
  historyDuration: z.number().positive().default(3600) // 1小时历史
})
