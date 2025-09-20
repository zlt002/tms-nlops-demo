import { DispatchStatus, Priority, DriverStatus } from '@prisma/client'

export interface Dispatch {
  id: string
  dispatchNumber: string
  customerId: string
  vehicleId: string
  driverId: string
  originAddress: string
  destinationAddress: string
  originCoordinates?: string
  destinationCoordinates?: string
  distance?: number
  estimatedDuration?: number
  plannedDeparture: Date
  actualDeparture?: Date
  estimatedArrival: Date
  actualArrival?: Date
  completedAt?: Date
  cancelledAt?: Date
  totalWeight: number
  totalVolume: number
  totalValue?: number
  baseRate: number
  fuelSurcharge: number
  tollFees: number
  additionalCharges: number
  totalAmount: number
  status: DispatchStatus
  priority: Priority
  currentLocation?: string
  currentCoordinates?: string
  progress: number
  route?: any
  instructions?: string
  requirements?: string
  notes?: string
  cancelReason?: string
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date

  // 关联数据
  customer?: Customer
  vehicle?: Vehicle
  driver?: Driver
  shipments?: Shipment[]
  trackingLogs?: TrackingLog[]
  documents?: Document[]
}

export interface Driver {
  id: string
  driverNumber: string
  name: string
  phone: string
  email?: string
  licenseNumber: string
  licenseType: string
  licenseExpiry: Date
  address: string
  emergencyContact?: string
  emergencyPhone?: string
  status: DriverStatus
  drivingYears: number
  accidentCount: number
  violationCount: number
  hourlyRate: number
  monthlySalary?: number
  hireDate: Date
  lastMedicalCheck?: Date
  rating: number
  totalTrips: number
  totalDistance: number
  notes?: string
  tags: string[]
  isActive: boolean
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date

  // 关联数据
  vehicles?: Vehicle[]
  shipments?: Shipment[]
  documents?: Document[]
  dispatches?: Dispatch[]
}

export interface CreateDispatchRequest {
  orderIds: string[]
  vehicleId: string
  driverId: string
  plannedDeparture: Date
  originAddress: string
  destinationAddress: string
  totalWeight: number
  totalVolume: number
  totalValue?: number
  instructions?: string
  requirements?: string
  notes?: string
  route?: {
    origin: {
      address: string
      coordinates: { lat: number; lng: number }
    }
    destination: {
      address: string
      coordinates: { lat: number; lng: number }
    }
    waypoints?: Array<{
      type: 'pickup' | 'delivery'
      orderId: string
      address: string
      coordinates: { lat: number; lng: number }
    }>
    totalDistance?: number
    estimatedDuration?: number
  }
}

export interface UpdateDispatchRequest {
  vehicleId?: string
  driverId?: string
  plannedDeparture?: Date
  actualDeparture?: Date
  estimatedArrival?: Date
  actualArrival?: Date
  status?: DispatchStatus
  priority?: Priority
  actualDistance?: number
  actualDuration?: number
  instructions?: string
  requirements?: string
  notes?: string
  progress?: number
  currentLocation?: string
  currentCoordinates?: string
  cancelReason?: string
}

export interface DispatchQueryParams {
  status?: DispatchStatus
  priority?: Priority
  vehicleId?: string
  driverId?: string
  customerId?: string
  startDate?: Date
  endDate?: Date
  origin?: string
  destination?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CreateDriverRequest {
  name: string
  phone: string
  email?: string
  licenseNumber: string
  licenseType: string
  licenseExpiry: Date
  address: string
  emergencyContact?: string
  emergencyPhone?: string
  hourlyRate: number
  monthlySalary?: number
  hireDate: Date
  lastMedicalCheck?: Date
  notes?: string
  tags?: string[]
}

export interface UpdateDriverRequest {
  name?: string
  phone?: string
  email?: string
  licenseNumber?: string
  licenseType?: string
  licenseExpiry?: Date
  address?: string
  emergencyContact?: string
  emergencyPhone?: string
  status?: DriverStatus
  hourlyRate?: number
  monthlySalary?: number
  lastMedicalCheck?: Date
  notes?: string
  tags?: string[]
  isActive?: boolean
}

// 辅助类型
export interface Customer {
  id: string
  customerNumber: string
  customerType: 'COMPANY' | 'INDIVIDUAL'
  companyName?: string
  firstName?: string
  lastName?: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BLACKLISTED'
  creditRating: number
  creditLimit: number
  outstandingBalance: number
  createdAt: Date
  updatedAt: Date
}

export interface Vehicle {
  id: string
  licensePlate: string
  type: 'TRUCK' | 'VAN' | 'TRAILER'
  capacity: number
  driverId?: string
  status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE' | 'UNAVAILABLE'
  currentLocation?: string
  lastMaintenance?: Date
  maxLoad: number
  maxVolume: number
  fuelLevel: number
  dailyRate: number
  maintenanceCost: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Shipment {
  id: string
  shipmentNumber: string
  customerId: string
  orderId?: string
  dispatchId?: string
  vehicleId?: string
  driverId?: string
  originAddress: string
  destinationAddress: string
  originCoordinates?: string
  destinationCoordinates?: string
  weight: number
  volume: number
  value?: number
  specialHandling: boolean
  departureTime?: Date
  estimatedArrival?: Date
  actualArrival?: Date
  status: string
  sequence: number
  progress: number
  driverNotes?: string
  customerNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface TrackingLog {
  id: string
  orderId?: string
  shipmentId?: string
  dispatchId?: string
  location: string
  status: string
  coordinates: any
  notes?: string
  imageUrl?: string
  event?: string
  timestamp: Date
  createdAt: Date
}

export interface Document {
  id: string
  customerId: string
  orderId?: string
  title: string
  type: string
  fileUrl: string
  fileSize?: number
  mimeType?: string
  description?: string
  tags: string[]
  isPublic: boolean
  isRequired: boolean
  uploadedBy: string
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// 路线优化相关类型
export interface RouteOptimizationRequest {
  orderIds: string[]
  vehicleId: string
  preferences?: {
    prioritizeDistance?: boolean
    prioritizeTime?: boolean
    avoidTolls?: boolean
    maxDetour?: number
  }
}

export interface RouteOptimizationResult {
  waypoints: Array<{
    type: 'pickup' | 'delivery'
    order: any
    address: string
    coordinates: { lat: number; lng: number }
  }>
  totalDistance: number
  estimatedDuration: number
  totalWeight: number
  totalVolume: number
}

// 统计数据类型
export interface DispatchStatistics {
  totalDispatches: number
  completedDispatches: number
  inTransitDispatches: number
  completionRate: number
  totalShipments: number
  avgShipmentsPerDispatch: number
  avgDispatchDuration: number
  topVehicles: Array<{ vehicleId: string; _count: number }>
  topDrivers: Array<{ driverId: string; _count: number }>
}

// 智能调度相关类型
export interface VehicleScore {
  vehicle: Vehicle
  driver: Driver
  distance: number
  score: number
}

export interface DispatchOptimization {
  vehicleScores: VehicleScore[]
  optimalMatch: VehicleScore
  totalOrders: number
  totalWeight: number
  totalVolume: number
  estimatedDuration: number
  estimatedDistance: number
}