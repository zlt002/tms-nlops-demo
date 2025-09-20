import { z } from 'zod'
import {
  TrackingStatus,
  TrackingEvent,
  AlertType,
  AlertSeverity,
  RouteStatus,
  CheckpointType,
  CheckpointStatus
} from '@prisma/client'

// 坐标验证schema
const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  address: z.string().optional()
})

// 创建跟踪日志验证schema
export const createTrackingLogSchema = z.object({
  shipmentId: z.string().min(1, '运单ID不能为空'),
  latitude: z.number().min(-90).max(90, '纬度必须在-90到90之间'),
  longitude: z.number().min(-180).max(180, '经度必须在-180到180之间'),
  address: z.string().optional(),
  altitude: z.number().optional(),
  accuracy: z.number().positive('GPS精度必须大于0').optional(),
  speed: z.number().min(0).max(300, '速度必须在0-300之间').default(0),
  heading: z.number().min(0).max(360, '方向必须在0-360度之间').default(0),
  status: z.nativeEnum(TrackingStatus).default(TrackingStatus.NORMAL),
  event: z.nativeEnum(TrackingEvent).optional(),
  description: z.string().optional(),
  deviceId: z.string().optional(),
  signalStrength: z.number().min(-100).max(0, '信号强度必须在-100到0之间').optional(),
  batteryLevel: z.number().min(0).max(100, '电池电量必须在0-100之间').optional(),
  temperature: z.number().optional(),
  humidity: z.number().min(0).max(100, '湿度必须在0-100之间').optional(),
  timestamp: z.date().optional(),
  notes: z.string().optional()
})

// 创建跟踪警报验证schema
export const createTrackingAlertSchema = z.object({
  shipmentId: z.string().min(1, '运单ID不能为空'),
  alertType: z.nativeEnum(AlertType),
  severity: z.nativeEnum(AlertSeverity),
  title: z.string().min(1, '警报标题不能为空'),
  description: z.string().min(1, '警报描述不能为空'),
  location: z.string().refine(val => {
    if (!val) return true
    try {
      const coords = JSON.parse(val)
      return coordinatesSchema.safeParse(coords).success
    } catch {
      return false
    }
  }, '位置格式不正确').optional(),
  trackingLogId: z.string().optional(),
  notes: z.string().optional()
})

// 创建跟踪路线验证schema
export const createTrackingRouteSchema = z.object({
  shipmentId: z.string().min(1, '运单ID不能为空'),
  plannedRoute: z.string().min(1, '计划路线不能为空'),
  distance: z.number().positive('距离必须大于0'),
  duration: z.number().positive('时间必须大于0'),
  checkpoints: z.array(z.object({
    name: z.string().min(1, '检查点名称不能为空'),
    type: z.nativeEnum(CheckpointType),
    address: z.string().min(1, '检查点地址不能为空'),
    coordinates: z.string().refine(val => {
      try {
        const coords = JSON.parse(val)
        return coordinatesSchema.safeParse(coords).success
      } catch {
        return false
      }
    }, '坐标格式不正确'),
    radius: z.number().positive('半径必须大于0').default(100),
    estimatedTime: z.date().optional(),
    isRequired: z.boolean().default(true),
    notes: z.string().optional(),
    order: z.number().min(0, '顺序不能为负数')
  })).optional()
})

// 跟踪查询验证schema
export const trackingQuerySchema = z.object({
  shipmentId: z.string().optional(),
  status: z.nativeEnum(TrackingStatus).optional(),
  event: z.nativeEnum(TrackingEvent).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  deviceId: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(1000).default(100),
  sortBy: z.string().default('timestamp'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// 警报查询验证schema
export const alertQuerySchema = z.object({
  shipmentId: z.string().optional(),
  alertType: z.nativeEnum(AlertType).optional(),
  severity: z.nativeEnum(AlertSeverity).optional(),
  status: z.nativeEnum(AlertStatus).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('triggeredAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// 路线查询验证schema
export const routeQuerySchema = z.object({
  shipmentId: z.string().optional(),
  status: z.nativeEnum(RouteStatus).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// 检查点查询验证schema
export const checkpointQuerySchema = z.object({
  routeId: z.string().optional(),
  type: z.nativeEnum(CheckpointType).optional(),
  status: z.nativeEnum(CheckpointStatus).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('order'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
})

// 位置更新验证schema
export const locationUpdateSchema = z.object({
  latitude: z.number().min(-90).max(90, '纬度必须在-90到90之间'),
  longitude: z.number().min(-180).max(180, '经度必须在-180到180之间'),
  address: z.string().optional(),
  altitude: z.number().optional(),
  accuracy: z.number().positive('GPS精度必须大于0').optional(),
  speed: z.number().min(0).max(300, '速度必须在0-300之间').optional(),
  heading: z.number().min(0).max(360, '方向必须在0-360度之间').optional(),
  timestamp: z.date().optional()
})

// 批量位置更新验证schema
export const batchLocationUpdateSchema = z.object({
  shipmentId: z.string().min(1, '运单ID不能为空'),
  updates: z.array(locationUpdateSchema).min(1, '至少需要一条位置更新'),
  deviceId: z.string().optional()
})

// 跟踪事件上报验证schema
export const trackingEventSchema = z.object({
  shipmentId: z.string().min(1, '运单ID不能为空'),
  event: z.nativeEnum(TrackingEvent),
  description: z.string().optional(),
  location: z.object({
    latitude: z.number().min(-90).max(90, '纬度必须在-90到90之间'),
    longitude: z.number().min(-180).max(180, '经度必须在-180到180之间'),
    address: z.string().optional()
  }).optional(),
  deviceId: z.string().optional(),
  timestamp: z.date().optional(),
  notes: z.string().optional()
})

// 警报处理验证schema
export const alertActionSchema = z.object({
  alertId: z.string().min(1, '警报ID不能为空'),
  action: z.enum(['acknowledge', 'resolve', 'dismiss']),
  resolution: z.string().optional(),
  actionTaken: z.string().optional(),
  notes: z.string().optional()
})

// 路线更新验证schema
export const routeUpdateSchema = z.object({
  routeId: z.string().min(1, '路线ID不能为空'),
  actualRoute: z.string().optional(),
  totalDistance: z.number().positive('总距离必须大于0').optional(),
  totalDuration: z.number().positive('总时间必须大于0').optional(),
  avgSpeed: z.number().min(0, '平均速度不能为负数').optional(),
  maxSpeed: z.number().min(0, '最高速度不能为负数').optional(),
  fuelUsed: z.number().min(0, '燃油消耗不能为负数').optional(),
  stops: z.number().min(0, '停车次数不能为负数').optional(),
  idleTime: z.number().min(0, '怠速时间不能为负数').optional(),
  status: z.nativeEnum(RouteStatus).optional(),
  deviation: z.number().min(0, '偏差百分比不能为负数').optional(),
  isOptimal: z.boolean().optional()
})

// 检查点更新验证schema
export const checkpointUpdateSchema = z.object({
  checkpointId: z.string().min(1, '检查点ID不能为空'),
  status: z.nativeEnum(CheckpointStatus).optional(),
  actualTime: z.date().optional(),
  duration: z.number().min(0, '停留时间不能为负数').optional(),
  notes: z.string().optional(),
  isPassed: z.boolean().optional()
})

// 地理围栏验证schema
export const geofenceSchema = z.object({
  name: z.string().min(1, '围栏名称不能为空'),
  type: z.enum(['circle', 'polygon', 'rectangle']),
  coordinates: z.string().refine(val => {
    try {
      const coords = JSON.parse(val)
      if (Array.isArray(coords)) {
        return coords.every(coord =>
          typeof coord.lat === 'number' && typeof coord.lng === 'number'
        )
      }
      return false
    } catch {
      return false
    }
  }, '坐标格式不正确'),
  radius: z.number().positive('半径必须大于0').optional(),
  alertType: z.nativeEnum(AlertType),
  severity: z.nativeEnum(AlertSeverity),
  enabled: z.boolean().default(true),
  notificationSettings: z.object({
    email: z.boolean().default(false),
    sms: z.boolean().default(false),
    push: z.boolean().default(true),
    webhook: z.string().url().optional()
  }).optional()
})

// 设备配置验证schema
export const deviceConfigSchema = z.object({
  deviceId: z.string().min(1, '设备ID不能为空'),
  type: z.string().min(1, '设备类型不能为空'),
  model: z.string().min(1, '设备型号不能为空'),
  firmware: z.string().optional(),
  reportingInterval: z.number().min(1).max(3600).default(30),
  enableGps: z.boolean().default(true),
  enableBattery: z.boolean().default(true),
  enableTemperature: z.boolean().default(false),
  enableHumidity: z.boolean().default(false),
  speedLimit: z.number().min(0).max(300).optional(),
  geofenceIds: z.array(z.string()).optional(),
  alertRules: z.array(z.string()).optional()
})

// 导出所有验证schema
export const trackingSchemas = {
  createTrackingLog: createTrackingLogSchema,
  createTrackingAlert: createTrackingAlertSchema,
  createTrackingRoute: createTrackingRouteSchema,
  trackingQuery: trackingQuerySchema,
  alertQuery: alertQuerySchema,
  routeQuery: routeQuerySchema,
  checkpointQuery: checkpointQuerySchema,
  locationUpdate: locationUpdateSchema,
  batchLocationUpdate: batchLocationUpdateSchema,
  trackingEvent: trackingEventSchema,
  alertAction: alertActionSchema,
  routeUpdate: routeUpdateSchema,
  checkpointUpdate: checkpointUpdateSchema,
  geofence: geofenceSchema,
  deviceConfig: deviceConfigSchema
}
