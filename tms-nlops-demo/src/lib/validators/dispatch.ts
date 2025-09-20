import { z } from 'zod'

const routePointSchema = z.object({
  type: z.enum(['pickup', 'delivery']),
  orderId: z.string(),
  address: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  })
})

const routeSchema = z.object({
  origin: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  destination: z.object({
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    })
  }),
  waypoints: z.array(routePointSchema).optional(),
  totalDistance: z.number().optional(),
  estimatedDuration: z.number().optional()
})

export const createDispatchSchema = z.object({
  orderIds: z.array(z.string()).min(1, '至少选择一个订单'),
  vehicleId: z.string().min(1, '请选择车辆'),
  driverId: z.string().min(1, '请选择司机'),
  route: routeSchema.optional(),
  estimatedDuration: z.number().positive('预计时长必须大于0').optional(),
  estimatedDistance: z.number().positive('预计距离必须大于0').optional(),
  notes: z.string().optional()
})

export const updateDispatchSchema = z.object({
  status: z.enum(['SCHEDULED', 'DEPARTED', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED', 'CANCELLED']).optional(),
  actualDistance: z.number().positive('实际距离必须大于0').optional(),
  actualDuration: z.number().positive('实际时长必须大于0').optional(),
  notes: z.string().optional(),
  cancelReason: z.string().optional()
})

export const dispatchQuerySchema = z.object({
  status: z.enum(['SCHEDULED', 'DEPARTED', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED', 'CANCELLED']).optional(),
  driverId: z.string().optional(),
  vehicleId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const optimizeRouteSchema = z.object({
  orderIds: z.array(z.string()).min(1, '至少选择一个订单'),
  vehicleId: z.string().min(1, '请选择车辆'),
  preferences: z.object({
    prioritizeDistance: z.boolean().default(false),
    prioritizeTime: z.boolean().default(false),
    avoidTolls: z.boolean().default(false),
    maxDetour: z.number().positive().optional()
  }).optional()
})
