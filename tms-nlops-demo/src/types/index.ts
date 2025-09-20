// 基础类型
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// 用户相关类型
export interface User extends BaseEntity {
  email: string
  name: string
  role: 'admin' | 'manager' | 'driver' | 'customer'
  avatar?: string
}

// 客户相关类型
export interface Customer extends BaseEntity {
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  company: string
  creditLimit?: number
}

// 订单相关类型
export interface Order extends BaseEntity {
  orderNumber: string
  customerId: string
  customer: Customer
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'
  origin: string
  destination: string
  weight: number
  volume: number
  value?: number
  pickupTime: Date
  deliveryTime: Date
  specialInstructions?: string
  assignedVehicleId?: string
  assignedVehicle?: Vehicle
}

// 车辆相关类型
export interface Vehicle extends BaseEntity {
  licensePlate: string
  type: 'truck' | 'van' | 'trailer'
  capacity: number
  driverId: string
  driver: User
  status: 'available' | 'in_transit' | 'maintenance' | 'unavailable'
  currentLocation?: string
  lastMaintenance?: Date
}

// 排车相关类型
export interface Schedule extends BaseEntity {
  orderId: string
  order: Order
  vehicleId: string
  vehicle: Vehicle
  plannedDeparture: Date
  plannedArrival: Date
  actualDeparture?: Date
  actualArrival?: Date
  status: 'planned' | 'in_progress' | 'completed' | 'delayed'
  route?: string[]
}

// 跟踪相关类型
export interface Tracking extends BaseEntity {
  orderId: string
  order: Order
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  status: 'pickup' | 'in_transit' | 'delivery' | 'completed'
  timestamp: Date
  notes?: string
  imageUrl?: string
}

// 回单相关类型
export interface Receipt extends BaseEntity {
  orderId: string
  order: Order
  status: 'pending' | 'uploaded' | 'verified' | 'rejected'
  imageUrl?: string
  notes?: string
  verifiedBy?: string
  verifiedAt?: Date
}

// NL-Ops相关类型
export interface NLCommand {
  id: string
  command: string
  intent: string
  parameters: Record<string, any>
  confidence: number
  executed: boolean
  result?: any
  createdAt: Date
  executedAt?: Date
}

export interface Intent {
  name: string
  description: string
  parameters: Parameter[]
  requiredParameters: string[]
}

export interface Parameter {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean' | 'array'
  description: string
  required: boolean
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 分页类型
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}