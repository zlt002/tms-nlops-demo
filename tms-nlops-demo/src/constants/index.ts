// 应用常量
export const APP_CONFIG = {
  name: 'TMS NL-Ops Demo',
  version: '1.0.0',
  description: '自然语言操作运输管理系统演示',
} as const

// 分页常量
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const

// 订单状态
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

// 车辆状态
export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  IN_TRANSIT: 'in_transit',
  MAINTENANCE: 'maintenance',
  UNAVAILABLE: 'unavailable',
} as const

// 车辆类型
export const VEHICLE_TYPE = {
  TRUCK: 'truck',
  VAN: 'van',
  TRAILER: 'trailer',
} as const

// 用户角色
export const USER_ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DRIVER: 'driver',
  CUSTOMER: 'customer',
} as const

// 跟踪状态
export const TRACKING_STATUS = {
  PICKUP: 'pickup',
  IN_TRANSIT: 'in_transit',
  DELIVERY: 'delivery',
  COMPLETED: 'completed',
} as const

// 回单状态
export const RECEIPT_STATUS = {
  PENDING: 'pending',
  UPLOADED: 'uploaded',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const

// NL-Ops意图
export const NLOPS_INTENTS = {
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER: 'update_order',
  CANCEL_ORDER: 'cancel_order',
  ASSIGN_VEHICLE: 'assign_vehicle',
  TRACK_ORDER: 'track_order',
  UPLOAD_RECEIPT: 'upload_receipt',
  GET_ORDERS: 'get_orders',
  GET_VEHICLES: 'get_vehicles',
} as const

// API端点
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    UPDATE: '/api/orders/[id]',
    DELETE: '/api/orders/[id]',
    TRACK: '/api/orders/[id]/track',
  },
  VEHICLES: {
    LIST: '/api/vehicles',
    CREATE: '/api/vehicles',
    UPDATE: '/api/vehicles/[id]',
    DELETE: '/api/vehicles/[id]',
  },
  TRACKING: {
    LIST: '/api/tracking',
    CREATE: '/api/tracking',
    UPDATE: '/api/tracking/[id]',
  },
  NLOPS: {
    COMMAND: '/api/nlops/command',
    HISTORY: '/api/nlops/history',
    INTENTS: '/api/nlops/intents',
  },
} as const

// 本地存储键
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const
