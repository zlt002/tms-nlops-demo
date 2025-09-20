import { TrackingService } from '@/services/trackingService'
import { prisma } from '@/lib/db'

// Mock prisma
jest.mock('@/lib/db')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>

describe('TrackingService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('updateShipmentLocation', () => {
    it('should update shipment location and progress', async () => {
      const mockShipment = {
        id: 'shipment-1',
        originCoordinates: '{"lat": 39.9042, "lng": 116.4074}',
        destinationCoordinates: '{"lat": 31.2304, "lng": 121.4737}',
        route: { id: 'route-1' }
      }

      const mockLocation = {
        latitude: 35.6762,
        longitude: 139.6503,
        address: 'Tokyo, Japan'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingRoute.findUnique.mockResolvedValue(mockShipment.route)
      mockedPrisma.shipment.update.mockResolvedValue({} as any)
      mockedPrisma.trackingCheckpoint.findMany.mockResolvedValue([])

      await TrackingService.updateShipmentLocation('shipment-1', mockLocation)

      expect(mockedPrisma.shipment.findUnique).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        include: {
          route: true,
          checkpoints: true
        }
      })

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: expect.objectContaining({
          currentLocation: mockLocation.address,
          progress: expect.any(Number)
        })
      })
    })

    it('should handle non-existent shipment', async () => {
      mockedPrisma.shipment.findUnique.mockResolvedValue(null)

      await TrackingService.updateShipmentLocation('non-existent', {
        latitude: 0,
        longitude: 0,
        address: 'Nowhere'
      })

      expect(mockedPrisma.shipment.update).not.toHaveBeenCalled()
    })
  })

  describe('calculateProgress', () => {
    it('should calculate progress correctly', async () => {
      const mockShipment = {
        originCoordinates: '{"lat": 39.9042, "lng": 116.4074}',
        destinationCoordinates: '{"lat": 31.2304, "lng": 121.4737}'
      }

      const currentLocation = {
        latitude: 35.6762,
        longitude: 139.6503
      }

      // Mock distance calculation to return predictable values
      jest.spyOn(TrackingService as any, 'calculateDistance')
        .mockResolvedValueOnce(1000) // Total distance
        .mockResolvedValueOnce(300)  // Remaining distance

      const progress = await (TrackingService as any).calculateProgress(mockShipment, currentLocation)

      expect(progress).toBe(70) // (1000-300)/1000 * 100 = 70
    })

    it('should handle invalid coordinates', async () => {
      const mockShipment = {
        originCoordinates: 'invalid-json',
        destinationCoordinates: '{"lat": 31.2304, "lng": 121.4737}'
      }

      const currentLocation = {
        latitude: 35.6762,
        longitude: 139.6503
      }

      const progress = await (TrackingService as any).calculateProgress(mockShipment, currentLocation)

      expect(progress).toBe(0)
    })
  })

  describe('checkAndCreateAlerts', () => {
    it('should create speeding alert', async () => {
      const mockShipment = {
        id: 'shipment-1',
        estimatedArrival: new Date(Date.now() + 3600000) // 1 hour from now
      }

      const mockTrackingLog = {
        id: 'log-1',
        latitude: 35.6762,
        longitude: 139.6503,
        speed: 130,
        batteryLevel: 50,
        address: 'Tokyo, Japan',
        timestamp: new Date()
      }

      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      await (TrackingService as any).checkAndCreateAlerts(mockShipment, mockTrackingLog)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'SPEEDING',
          severity: 'HIGH',
          title: '超速警报',
          description: expect.stringContaining('130 km/h')
        })
      })
    })

    it('should create low battery alert', async () => {
      const mockShipment = {
        id: 'shipment-1',
        estimatedArrival: new Date(Date.now() + 3600000)
      }

      const mockTrackingLog = {
        id: 'log-1',
        latitude: 35.6762,
        longitude: 139.6503,
        speed: 60,
        batteryLevel: 15,
        address: 'Tokyo, Japan',
        timestamp: new Date()
      }

      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      await (TrackingService as any).checkAndCreateAlerts(mockShipment, mockTrackingLog)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'LOW_FUEL',
          severity: 'MEDIUM',
          title: '低电量警报',
          description: expect.stringContaining('15%')
        })
      })
    })

    it('should create delay alert', async () => {
      const mockShipment = {
        id: 'shipment-1',
        estimatedArrival: new Date(Date.now() - 3600000) // 1 hour ago
      }

      const mockTrackingLog = {
        id: 'log-1',
        latitude: 35.6762,
        longitude: 139.6503,
        speed: 60,
        address: 'Tokyo, Japan',
        timestamp: new Date()
      }

      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      await (TrackingService as any).checkAndCreateAlerts(mockShipment, mockTrackingLog)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'DELAY',
          severity: 'MEDIUM',
          title: '运输延迟警报'
        })
      })
    })
  })

  describe('getShipmentTrackingHistory', () => {
    it('should return tracking history with pagination', async () => {
      const mockLogs = [
        {
          id: 'log-1',
          shipmentId: 'shipment-1',
          timestamp: new Date(),
          shipment: { id: 'shipment-1', shipmentNumber: 'S001', status: 'IN_TRANSIT' }
        }
      ]

      mockedPrisma.trackingLog.findMany.mockResolvedValue(mockLogs as any)
      mockedPrisma.trackingLog.count.mockResolvedValue(1)

      const result = await TrackingService.getShipmentTrackingHistory('shipment-1', {
        limit: 10,
        offset: 0
      })

      expect(result).toEqual({
        logs: mockLogs,
        total: 1,
        pagination: {
          limit: 10,
          offset: 0,
          totalPages: 1
        }
      })

      expect(mockedPrisma.trackingLog.findMany).toHaveBeenCalledWith({
        where: {
          shipmentId: 'shipment-1'
        },
        orderBy: { timestamp: 'desc' },
        take: 10,
        skip: 0,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      })
    })

    it('should filter by date range', async () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-31')

      mockedPrisma.trackingLog.findMany.mockResolvedValue([])
      mockedPrisma.trackingLog.count.mockResolvedValue(0)

      await TrackingService.getShipmentTrackingHistory('shipment-1', {
        startDate,
        endDate,
        limit: 10,
        offset: 0
      })

      expect(mockedPrisma.trackingLog.findMany).toHaveBeenCalledWith({
        where: {
          shipmentId: 'shipment-1',
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 10,
        skip: 0,
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true
            }
          }
        }
      })
    })
  })

  describe('getVehicleCurrentLocation', () => {
    it('should return vehicle current location', async () => {
      const mockLog = {
        id: 'log-1',
        shipment: {
          id: 'shipment-1',
          shipmentNumber: 'S001',
          status: 'IN_TRANSIT',
          originAddress: 'Beijing',
          destinationAddress: 'Shanghai'
        },
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        speed: 60
      }

      mockedPrisma.trackingLog.findFirst.mockResolvedValue(mockLog as any)

      const result = await TrackingService.getVehicleCurrentLocation('vehicle-1')

      expect(result).toEqual({
        ...mockLog,
        vehicleStatus: 'moving',
        lastUpdate: mockLog.timestamp
      })

      expect(mockedPrisma.trackingLog.findFirst).toHaveBeenCalledWith({
        where: {
          shipment: {
            vehicleId: 'vehicle-1'
          }
        },
        orderBy: { timestamp: 'desc' },
        include: {
          shipment: {
            select: {
              id: true,
              shipmentNumber: true,
              status: true,
              originAddress: true,
              destinationAddress: true
            }
          }
        }
      })
    })

    it('should return null for vehicle without tracking data', async () => {
      mockedPrisma.trackingLog.findFirst.mockResolvedValue(null)

      const result = await TrackingService.getVehicleCurrentLocation('vehicle-1')

      expect(result).toBeNull()
    })
  })

  describe('batchLocationUpdates', () => {
    it('should process batch location updates successfully', async () => {
      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan',
          speed: 60,
          timestamp: new Date()
        },
        {
          latitude: 35.6763,
          longitude: 139.6504,
          address: 'Tokyo, Japan',
          speed: 65,
          timestamp: new Date(Date.now() + 60000)
        }
      ]

      const mockTrackingLog = { id: 'log-1' }

      mockedPrisma.trackingLog.create.mockResolvedValue(mockTrackingLog as any)
      mockedPrisma.shipment.findUnique.mockResolvedValue({ id: 'shipment-1' } as any)

      const result = await TrackingService.batchLocationUpdates('shipment-1', mockUpdates)

      expect(result).toEqual({
        success: true,
        results: [mockTrackingLog, mockTrackingLog],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      })

      expect(mockedPrisma.trackingLog.create).toHaveBeenCalledTimes(2)
    })

    it('should handle errors in batch updates', async () => {
      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan',
          speed: 60,
          timestamp: new Date()
        }
      ]

      mockedPrisma.trackingLog.create.mockRejectedValue(new Error('Database error'))

      const result = await TrackingService.batchLocationUpdates('shipment-1', mockUpdates)

      expect(result).toEqual({
        success: true,
        results: [],
        errors: expect.arrayContaining([
          expect.objectContaining({
            error: 'Database error'
          })
        ]),
        total: 1,
        successful: 0,
        failed: 1
      })
    })
  })

  describe('getTrackingDashboard', () => {
    it('should return dashboard data', async () => {
      const mockStats = {
        activeShipments: 5,
        totalShipments: 10,
        alertsByType: [
          { alertType: 'SPEEDING', _count: { alertType: 2 } },
          { alertType: 'DELAY', _count: { alertType: 3 } }
        ],
        alertsBySeverity: [
          { severity: 'HIGH', _count: { severity: 1 } },
          { severity: 'MEDIUM', _count: { severity: 4 } }
        ],
        recentLogs: [],
        recentAlerts: []
      }

      mockedPrisma.shipment.count.mockResolvedValue(mockStats.activeShipments)
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue(mockStats.alertsByType as any)
      mockedPrisma.trackingLog.findMany.mockResolvedValue(mockStats.recentLogs as any)
      mockedPrisma.trackingAlert.findMany.mockResolvedValue(mockStats.recentAlerts as any)

      const result = await TrackingService.getTrackingDashboard()

      expect(result).toEqual({
        activeShipments: mockStats.activeShipments,
        totalShipments: 10,
        alertsByType: {
          SPEEDING: 2,
          DELAY: 3
        },
        alertsBySeverity: {
          HIGH: 1,
          MEDIUM: 4
        },
        recentLogs: mockStats.recentLogs,
        recentAlerts: mockStats.recentAlerts
      })
    })
  })

  describe('cleanupOldData', () => {
    it('should cleanup old tracking data', async () => {
      const mockDeletedLogs = { count: 100 }
      const mockDeletedAlerts = { count: 50 }

      mockedPrisma.trackingLog.deleteMany.mockResolvedValue(mockDeletedLogs as any)
      mockedPrisma.trackingAlert.deleteMany.mockResolvedValue(mockDeletedAlerts as any)

      const result = await TrackingService.cleanupOldData(90)

      expect(result).toEqual({
        deletedLogs: 100,
        deletedAlerts: 50,
        cutoffDate: expect.any(Date)
      })

      expect(mockedPrisma.trackingLog.deleteMany).toHaveBeenCalledWith({
        where: {
          timestamp: {
            lt: expect.any(Date)
          }
        }
      })

      expect(mockedPrisma.trackingAlert.deleteMany).toHaveBeenCalledWith({
        where: {
          triggeredAt: {
            lt: expect.any(Date)
          },
          status: {
            in: ['RESOLVED', 'DISMISSED']
          }
        }
      })
    })
  })
})