import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/tracking/vehicles/[id]/route'
import { prisma } from '@/lib/db'
import { TrackingService } from '@/services/trackingService'

// Mock prisma and TrackingService
jest.mock('@/lib/db')
jest.mock('@/services/trackingService')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>
const mockedTrackingService = TrackingService as jest.Mocked<typeof TrackingService>

describe('TMS Tracking Vehicles API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/tms/tracking/vehicles/[id]', () => {
    it('should return vehicle tracking information successfully', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        model: 'Model X',
        year: 2023,
        capacity: 10000,
        status: 'AVAILABLE',
        fuelLevel: 80,
        mileage: 50000,
        lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        nextMaintenance: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        driver: {
          id: 'driver-1',
          name: '张三',
          phone: '13800138000',
          licenseNumber: '驾驶证123456'
        },
        shipments: [
          {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai',
            scheduledDeparture: new Date(),
            scheduledArrival: new Date(Date.now() + 86400000),
            actualDeparture: new Date(),
            actualArrival: null,
            progress: 65,
            currentLocation: 'Current Location',
            currentCoordinates: '{"lat": 35.6762, "lng": 139.6503}'
          }
        ]
      }

      const mockCurrentLocation = {
        id: 'log-1',
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503,
        address: 'Tokyo, Japan',
        speed: 60,
        timestamp: new Date(Date.now() - 300000),
        shipment: {
          id: 'shipment-1',
          shipmentNumber: 'S001',
          status: 'IN_TRANSIT',
          originAddress: 'Beijing',
          destinationAddress: 'Shanghai'
        }
      }

      const mockRecentTracking = [
        {
          id: 'log-1',
          shipmentId: 'shipment-1',
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan',
          speed: 60,
          status: 'NORMAL',
          timestamp: new Date(),
          shipment: {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai'
          }
        }
      ]

      const mockRecentAlerts = [
        {
          id: 'alert-1',
          shipmentId: 'shipment-1',
          alertType: 'SPEEDING',
          severity: 'HIGH',
          title: '超速警报',
          triggeredAt: new Date(),
          shipment: {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT'
          },
          trackingLog: {
            id: 'log-1',
            timestamp: new Date(),
            latitude: 35.6762,
            longitude: 139.6503,
            speed: 130,
            status: 'NORMAL'
          }
        }
      ]

      const mockCurrentShipment = {
        id: 'shipment-1',
        shipmentNumber: 'S001',
        status: 'IN_TRANSIT',
        route: {
          id: 'route-1',
          checkpoints: [
            {
              id: 'checkpoint-1',
              name: '检查点1',
              status: 'PENDING',
              order: 1
            }
          ]
        }
      }

      const mockStats = {
        totalShipments: 10,
        activeShipments: 2,
        completedShipments: 8,
        totalDistance: 5000,
        totalTransportTime: 100,
        avgSpeed: 50,
        totalFuelUsed: 500,
        alertsByType: {
          SPEEDING: 3,
          DELAY: 2
        }
      }

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(mockCurrentLocation as any)
      mockedPrisma.trackingLog.findMany.mockResolvedValue(mockRecentTracking as any)
      mockedPrisma.trackingAlert.findMany.mockResolvedValue(mockRecentAlerts as any)
      mockedPrisma.shipment.findFirst.mockResolvedValue(mockCurrentShipment as any)
      mockedPrisma.shipment.count.mockResolvedValue(mockStats.totalShipments)
      mockedPrisma.shipment.count.mockResolvedValue(mockStats.activeShipments)
      mockedPrisma.shipment.count.mockResolvedValue(mockStats.completedShipments)
      mockedPrisma.trackingLog.findMany.mockResolvedValue([]) // For distance calculation
      mockedPrisma.shipment.findMany.mockResolvedValue([]) // For transport time calculation
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue([
        { alertType: 'SPEEDING', _count: { alertType: 3 } },
        { alertType: 'DELAY', _count: { alertType: 2 } }
      ] as any)
      mockedPrisma.shipment.aggregate.mockResolvedValue({
        _sum: { fuelUsed: 500 }
      } as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.vehicle).toEqual({
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        model: 'Model X',
        year: 2023,
        capacity: 10000,
        status: 'AVAILABLE',
        fuelLevel: 80,
        mileage: 50000,
        lastMaintenance: mockVehicle.lastMaintenance,
        nextMaintenance: mockVehicle.nextMaintenance,
        driver: mockVehicle.driver
      })

      expect(data.data.currentLocation).toEqual(mockCurrentLocation)
      expect(data.data.vehicleStatus).toBe('moving')
      expect(data.data.currentShipment).toEqual(mockCurrentShipment)
      expect(data.data.recentTracking).toEqual(mockRecentTracking)
      expect(data.data.recentAlerts).toEqual(mockRecentAlerts)
      expect(data.data.statistics).toEqual({
        totalShipments: 10,
        activeShipments: 2,
        completedShipments: 8,
        totalDistance: 0,
        totalTransportTime: 0,
        avgSpeed: 0,
        totalFuelUsed: 500,
        alertsByType: {
          SPEEDING: 3,
          DELAY: 2
        }
      })

      expect(mockedPrisma.vehicle.findUnique).toHaveBeenCalledWith({
        where: { id: 'vehicle-1' },
        include: {
          driver: {
            select: expect.any(Object)
          },
          shipments: {
            select: expect.any(Object)
          }
        }
      })

      expect(mockedTrackingService.getVehicleCurrentLocation).toHaveBeenCalledWith('vehicle-1')
    })

    it('should handle non-existent vehicle', async () => {
      mockedPrisma.vehicle.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/non-existent')
      const response = await GET(request, { params: { id: 'non-existent' } })

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('车辆不存在')
    })

    it('should handle vehicle without current location', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        status: 'AVAILABLE',
        lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        driver: null,
        shipments: []
      }

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.currentLocation).toBeNull()
      expect(data.data.vehicleStatus).toBe('offline')
    })

    it('should determine vehicle status correctly', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        status: 'AVAILABLE',
        lastMaintenance: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
        driver: null,
        shipments: []
      }

      const mockCurrentLocation = {
        id: 'log-1',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        speed: 0
      }

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(mockCurrentLocation as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.vehicleStatus).toBe('maintenance_needed')
    })

    it('should handle vehicle with high speed', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        status: 'IN_TRANSIT',
        lastMaintenance: new Date(),
        driver: null,
        shipments: []
      }

      const mockCurrentLocation = {
        id: 'log-1',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        speed: 130
      }

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(mockCurrentLocation as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.vehicleStatus).toBe('speeding')
    })

    it('should return limited recent tracking data', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        status: 'AVAILABLE',
        driver: null,
        shipments: []
      }

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingLog.findMany).toHaveBeenCalledWith({
        where: {
          shipment: {
            vehicleId: 'vehicle-1'
          }
        },
        include: {
          shipment: {
            select: expect.any(Object)
          }
        },
        orderBy: { timestamp: 'desc' },
        take: 50
      })

      expect(mockedPrisma.trackingAlert.findMany).toHaveBeenCalledWith({
        where: {
          shipment: {
            vehicleId: 'vehicle-1'
          },
          triggeredAt: {
            gte: expect.any(Date)
          }
        },
        include: {
          shipment: {
            select: expect.any(Object)
          },
          trackingLog: {
            select: expect.any(Object)
          }
        },
        orderBy: { triggeredAt: 'desc' },
        take: 20
      })
    })

    it('should calculate vehicle statistics correctly', async () => {
      const mockVehicle = {
        id: 'vehicle-1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        status: 'AVAILABLE',
        driver: null,
        shipments: []
      }

      const mockDistanceLogs = [
        { latitude: 35.6762, longitude: 139.6503, timestamp: new Date() },
        { latitude: 35.6763, longitude: 139.6504, timestamp: new Date() }
      ]

      const mockShipments = [
        {
          actualDeparture: new Date(Date.now() - 86400000),
          actualArrival: new Date()
        }
      ]

      mockedPrisma.vehicle.findUnique.mockResolvedValue(mockVehicle as any)
      mockedTrackingService.getVehicleCurrentLocation.mockResolvedValue(null)
      mockedPrisma.trackingLog.findMany.mockResolvedValue(mockDistanceLogs as any)
      mockedPrisma.shipment.findMany.mockResolvedValue(mockShipments as any)
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue([
        { alertType: 'SPEEDING', _count: { alertType: 1 } }
      ] as any)
      mockedPrisma.shipment.aggregate.mockResolvedValue({
        _sum: { fuelUsed: 100 }
      } as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.statistics.totalShipments).toBe(0)
      expect(data.data.statistics.activeShipments).toBe(0)
      expect(data.data.statistics.completedShipments).toBe(0)
      expect(data.data.statistics.totalFuelUsed).toBe(100)
      expect(data.data.statistics.alertsByType).toEqual({
        SPEEDING: 1
      })
    })

    it('should handle server errors', async () => {
      mockedPrisma.vehicle.findUnique.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/vehicles/vehicle-1')
      const response = await GET(request, { params: { id: 'vehicle-1' } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('获取车辆位置信息失败')
    })
  })
})