import {
  TrackingStatus,
  TrackingEvent,
  AlertType,
  AlertSeverity,
  AlertStatus,
  RouteStatus,
  CheckpointType,
  CheckpointStatus
} from '@prisma/client'

export interface TrackingLog {
  id: string
  shipmentId: string
  latitude: number
  longitude: number
  address?: string
  altitude?: number
  accuracy?: number
  speed: number
  heading: number
  status: TrackingStatus
  event?: TrackingEvent
  description?: string
  deviceId?: string
  signalStrength?: number
  batteryLevel?: number
  temperature?: number
  humidity?: number
  timestamp: Date
  receivedAt: Date
  notes?: string
  verified: boolean
  createdBy?: string
  createdAt: Date
}

export interface TrackingAlert {
  id: string
  shipmentId: string
  alertType: AlertType
  severity: AlertSeverity
  title: string
  description: string
  location?: string
  status: AlertStatus
  acknowledgedBy?: string
  acknowledgedAt?: Date
  triggeredAt: Date
  resolvedAt?: Date
  actionTaken?: string
  resolution?: string
  notes?: string
  trackingLogId?: string
  createdAt: Date
  updatedAt: Date
}

export interface TrackingRoute {
  id: string
  shipmentId: string
  plannedRoute: string
  actualRoute?: string
  distance: number
  duration: number
  totalDistance?: number
  totalDuration?: number
  avgSpeed?: number
  maxSpeed?: number
  fuelUsed?: number
  stops: number
  idleTime: number
  status: RouteStatus
  deviation: number
  isOptimal: boolean
  createdAt: Date
  updatedAt: Date
  checkpoints?: TrackingCheckpoint[]
}

export interface TrackingCheckpoint {
  id: string
  routeId: string
  name: string
  type: CheckpointType
  address: string
  coordinates: string
  radius: number
  estimatedTime?: Date
  actualTime?: Date
  duration?: number
  status: CheckpointStatus
  isPassed: boolean
  isRequired: boolean
  visitCount: number
  avgDuration?: number
  notes?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateTrackingLogRequest {
  shipmentId: string
  latitude: number
  longitude: number
  address?: string
  altitude?: number
  accuracy?: number
  speed?: number
  heading?: number
  status?: TrackingStatus
  event?: TrackingEvent
  description?: string
  deviceId?: string
  signalStrength?: number
  batteryLevel?: number
  temperature?: number
  humidity?: number
  timestamp?: Date
  notes?: string
}

export interface CreateTrackingAlertRequest {
  shipmentId: string
  alertType: AlertType
  severity: AlertSeverity
  title: string
  description: string
  location?: string
  trackingLogId?: string
  notes?: string
}

export interface TrackingQueryParams {
  shipmentId?: string
  status?: TrackingStatus
  event?: TrackingEvent
  startDate?: Date
  endDate?: Date
  deviceId?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AlertQueryParams {
  shipmentId?: string
  alertType?: AlertType
  severity?: AlertSeverity
  status?: AlertStatus
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface RouteQueryParams {
  shipmentId?: string
  status?: RouteStatus
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CheckpointQueryParams {
  routeId?: string
  type?: CheckpointType
  status?: CheckpointStatus
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface LocationUpdate {
  latitude: number
  longitude: number
  address?: string
  altitude?: number
  accuracy?: number
  speed?: number
  heading?: number
  timestamp?: Date
}

export interface BatchLocationUpdate {
  shipmentId: string
  updates: LocationUpdate[]
  deviceId?: string
}

export interface TrackingEventReport {
  shipmentId: string
  event: TrackingEvent
  description?: string
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  deviceId?: string
  timestamp?: Date
  notes?: string
}

export interface TrackingStats {
  totalLogs: number
  totalAlerts: number
  activeAlerts: number
  totalDistance: number
  avgSpeed: number
  maxSpeed: number
  totalDuration: number
  idleTime: number
  stops: number
  fuelEfficiency?: number
  onTimeDelivery?: number
  routeDeviation?: number
}

export interface RouteInfo {
  distance: number
  duration: number
  coordinates: Array<{
    lat: number
    lng: number
    address?: string
  }>
  waypoints?: Array<{
    name: string
    lat: number
    lng: number
    address?: string
  }>
}

export interface TrackingDashboard {
  activeShipments: number
  totalShipments: number
  alertsByType: Record<AlertType, number>
  alertsBySeverity: Record<AlertSeverity, number>
  recentLogs: TrackingLog[]
  recentAlerts: TrackingAlert[]
  stats: TrackingStats
}

export interface NotificationConfig {
  email?: boolean
  sms?: boolean
  push?: boolean
  webhook?: string
}

export interface AlertRule {
  id: string
  name: string
  alertType: AlertType
  severity: AlertSeverity
  conditions: Record<string, any>
  actions: string[]
  enabled: boolean
  notificationConfig: NotificationConfig
  createdAt: Date
  updatedAt: Date
}

export interface Geofence {
  id: string
  name: string
  type: 'circle' | 'polygon' | 'rectangle'
  coordinates: any
  radius?: number
  enabled: boolean
  alertType: AlertType
  createdAt: Date
  updatedAt: Date
}

export interface TrackingDevice {
  id: string
  deviceId: string
  shipmentId?: string
  type: string
  model: string
  firmware: string
  status: 'online' | 'offline' | 'maintenance'
  lastSeen?: Date
  batteryLevel?: number
  signalStrength?: number
  location?: {
    latitude: number
    longitude: number
    address?: string
    timestamp: Date
  }
  config: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface MapSettings {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
  showTraffic: boolean
  showWeather: boolean
  markers: Array<{
    id: string
    position: {
      lat: number
      lng: number
    }
    title: string
    type: string
    icon?: string
    info?: string
  }>
}

export interface ExportOptions {
  format: 'csv' | 'json' | 'excel' | 'pdf'
  dateRange: {
    start: Date
    end: Date
  }
  fields: string[]
  filters?: Record<string, any>
  includeStats?: boolean
}