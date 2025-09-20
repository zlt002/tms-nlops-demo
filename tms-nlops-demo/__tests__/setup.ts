import { jest } from '@jest/globals'

// Mock Prisma enums before any imports
jest.mock('@prisma/client', () => ({
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