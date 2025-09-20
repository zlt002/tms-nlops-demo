import { jest } from '@jest/globals'

// Mock Prisma enums before any imports
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(),
  VehicleType: {
    TRUCK: 'TRUCK',
    VAN: 'VAN',
    TRAILER: 'TRAILER'
  },
  VehicleStatus: {
    AVAILABLE: 'AVAILABLE',
    IN_TRANSIT: 'IN_TRANSIT',
    MAINTENANCE: 'MAINTENANCE',
    UNAVAILABLE: 'UNAVAILABLE'
  },
  MaintenanceType: {
    ROUTINE: 'ROUTINE',
    REPAIR: 'REPAIR',
    INSPECTION: 'INSPECTION'
  },
  PODDocumentType: {
    PROOF_OF_DELIVERY: 'PROOF_OF_DELIVERY',
    BILL_OF_LADING: 'BILL_OF_LADING',
    INVOICE: 'INVOICE',
    RECEIPT: 'RECEIPT',
    PHOTOGRAPH: 'PHOTOGRAPH',
    CERTIFICATE: 'CERTIFICATE',
    OTHER: 'OTHER'
  },
  PODStatus: {
    PENDING: 'PENDING',
    UPLOADED: 'UPLOADED',
    PROCESSING: 'PROCESSING',
    VERIFIED: 'VERIFIED',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    ARCHIVED: 'ARCHIVED'
  },
  SignatureType: {
    WRITTEN: 'WRITTEN',
    DIGITAL: 'DIGITAL',
    STAMP: 'STAMP',
    ELECTRONIC: 'ELECTRONIC'
  },
  SignatureStatus: {
    PENDING: 'PENDING',
    SIGNED: 'SIGNED',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
  },
  // Tracking enums
  TrackingStatus: {
    NORMAL: 'NORMAL',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    OFFLINE: 'OFFLINE'
  },
  TrackingEvent: {
    DEPARTURE: 'DEPARTURE',
    ARRIVAL: 'ARRIVAL',
    LOADING_START: 'LOADING_START',
    LOADING_COMPLETE: 'LOADING_COMPLETE',
    UNLOADING_START: 'UNLOADING_START',
    UNLOADING_COMPLETE: 'UNLOADING_COMPLETE',
    DELAY: 'DELAY',
    ROUTE_CHANGE: 'ROUTE_CHANGE',
    EMERGENCY: 'EMERGENCY',
    CHECKPOINT_PASS: 'CHECKPOINT_PASS'
  },
  AlertType: {
    SPEEDING: 'SPEEDING',
    LOW_FUEL: 'LOW_FUEL',
    DEVIATION: 'DEVIATION',
    DELAY: 'DELAY',
    EMERGENCY: 'EMERGENCY',
    DATA_ANOMALY: 'DATA_ANOMALY'
  },
  AlertSeverity: {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL'
  },
  RouteStatus: {
    PLANNED: 'PLANNED',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
  },
  CheckpointType: {
    PICKUP: 'PICKUP',
    DROPOFF: 'DROPOFF',
    WAYPOINT: 'WAYPOINT',
    REST: 'REST',
    FUEL: 'FUEL'
  },
  CheckpointStatus: {
    PENDING: 'PENDING',
    ARRIVED: 'ARRIVED',
    PASSED: 'PASSED',
    SKIPPED: 'SKIPPED'
  }
}))

// Mock the entire vehicle service module
jest.mock('@/services/vehicleService', () => ({
  VehicleService: {
    getVehiclesWithStats: jest.fn(),
    createVehicle: jest.fn(),
    updateVehicle: jest.fn(),
    updateVehicleLocation: jest.fn(),
    addMaintenanceRecord: jest.fn(),
    addFuelRecord: jest.fn(),
    getAvailableVehicles: jest.fn(),
    getVehicleById: jest.fn()
  }
}))

// Mock the entire POD service module
jest.mock('@/services/podService', () => ({
  PODService: {
    createPOD: jest.fn(),
    getPODs: jest.fn(),
    getPODById: jest.fn(),
    updatePOD: jest.fn(),
    verifyPOD: jest.fn(),
    createSignature: jest.fn(),
    getStatistics: jest.fn()
  }
}))

// Mock the entire tracking service module
jest.mock('@/services/trackingService', () => ({
  TrackingService: {
    updateShipmentLocation: jest.fn(),
    calculateProgress: jest.fn(),
    checkAndCreateAlerts: jest.fn(),
    getTrackingRoute: jest.fn(),
    calculateRouteStatistics: jest.fn(),
    calculateDistance: jest.fn(),
    checkRouteDeviation: jest.fn(),
    checkCheckpoints: jest.fn(),
    updateRouteStats: jest.fn(),
    sendAlertNotification: jest.fn(),
    calculateRouteInfo: jest.fn(),
    getShipmentTrackingHistory: jest.fn(),
    getVehicleCurrentLocation: jest.fn(),
    batchLocationUpdates: jest.fn(),
    determineVehicleStatus: jest.fn(),
    getTrackingDashboard: jest.fn(),
    cleanupOldData: jest.fn()
  }
}))

// Mock FileUploadService
jest.mock('@/lib/fileUpload', () => ({
  FileUploadService: {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
    getFileUrl: jest.fn()
  }
}))

// Mock Prisma
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    vehicle: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn()
    },
    schedule: {
      findMany: jest.fn()
    },
    pOD: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn()
    },
    pODSignature: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    pODActivityLog: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    // Tracking models
    trackingLog: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn()
    },
    trackingAlert: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn()
    },
    trackingRoute: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn()
    },
    trackingCheckpoint: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createMany: jest.fn()
    },
    shipment: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn()
    },
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn()
    }
  }
}))

// Global test setup
global.beforeEach(() => {
  jest.clearAllMocks()
})

global.afterEach(() => {
  jest.clearAllMocks()
})