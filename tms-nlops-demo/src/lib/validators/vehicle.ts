import { z } from 'zod'
import { VehicleType, VehicleStatus, MaintenanceType } from '@prisma/client'

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90, '纬度必须在-90到90之间'),
  longitude: z.number().min(-180).max(180, '经度必须在-180到180之间'),
  address: z.string().optional(),
  speed: z.number().min(0).max(300, '速度必须在0-300之间').optional(),
  heading: z.number().min(0).max(360, '方向必须在0-360度之间').optional(),
  accuracy: z.number().positive('GPS精度必须大于0').optional()
})

export const createVehicleSchema = z.object({
  licenseNumber: z.string().min(1, '车牌号不能为空'),
  vinNumber: z.string().min(17, 'VIN码长度必须为17位').max(17, 'VIN码长度必须为17位'),
  brand: z.string().min(1, '品牌不能为空'),
  model: z.string().min(1, '型号不能为空'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1, '年份无效'),
  color: z.string().optional(),
  vehicleType: z.nativeEnum(VehicleType),
  maxLoad: z.number().positive('最大载重必须大于0'),
  maxVolume: z.number().positive('最大体积必须大于0'),
  dailyRate: z.number().positive('日租金必须大于0'),
  insuranceCompany: z.string().optional(),
  insurancePolicy: z.string().optional(),
  insuranceExpiry: z.date().optional(),
  nextMaintenance: z.date().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const updateVehicleSchema = z.object({
  licenseNumber: z.string().min(1, '车牌号不能为空').optional(),
  vinNumber: z.string().min(17, 'VIN码长度必须为17位').max(17, 'VIN码长度必须为17位').optional(),
  brand: z.string().min(1, '品牌不能为空').optional(),
  model: z.string().min(1, '型号不能为空').optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1, '年份无效').optional(),
  color: z.string().optional(),
  vehicleType: z.nativeEnum(VehicleType).optional(),
  maxLoad: z.number().positive('最大载重必须大于0').optional(),
  maxVolume: z.number().positive('最大体积必须大于0').optional(),
  dailyRate: z.number().positive('日租金必须大于0').optional(),
  status: z.nativeEnum(VehicleStatus).optional(),
  driverId: z.string().optional(),
  nextMaintenance: z.date().optional(),
  insuranceCompany: z.string().optional(),
  insurancePolicy: z.string().optional(),
  insuranceExpiry: z.date().optional(),
  fuelLevel: z.number().min(0).max(100, '燃油百分比必须在0-100之间').optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional()
})

export const updateVehicleLocationSchema = locationSchema

export const vehicleQuerySchema = z.object({
  status: z.nativeEnum(VehicleStatus).optional(),
  vehicleType: z.nativeEnum(VehicleType).optional(),
  driverId: z.string().optional(),
  available: z.boolean().optional(),
  minMaxLoad: z.number().positive().optional(),
  maxMaxLoad: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const createMaintenanceSchema = z.object({
  maintenanceType: z.nativeEnum(MaintenanceType),
  description: z.string().min(1, '维护描述不能为空'),
  cost: z.number().positive('维护费用必须大于0'),
  mileage: z.number().positive('里程数必须大于0'),
  performedBy: z.string().min(1, '执行人不能为空'),
  performedAt: z.date(),
  nextDueDate: z.date().optional(),
  notes: z.string().optional()
})

export const createFuelRecordSchema = z.object({
  fuelAmount: z.number().positive('加油量必须大于0'),
  fuelCost: z.number().positive('加油费用必须大于0'),
  fuelType: z.string().min(1, '燃油类型不能为空'),
  mileage: z.number().positive('里程数必须大于0'),
  location: z.string().optional(),
  filledBy: z.string().min(1, '加油人不能为空'),
  filledAt: z.date().optional(),
  notes: z.string().optional()
})

export const vehicleLocationSchema = locationSchema
export const vehicleMaintenanceSchema = createMaintenanceSchema
export const vehicleFuelSchema = createFuelRecordSchema