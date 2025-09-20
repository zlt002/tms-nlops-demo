import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/tracking/orders/[id]/route'
import { prisma } from '@/lib/db'
import { TrackingService } from '@/services/trackingService'

// Mock prisma and TrackingService
jest.mock('@/lib/db')
jest.mock('@/services/trackingService')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>
const mockedTrackingService = TrackingService as jest.Mocked<typeof TrackingService>

describe('TMS Tracking Orders API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/tms/tracking/orders/[id]', () => {
    it('should return order tracking history successfully', async () => {
      const mockOrder = {
        id: 'order-1',
        orderNumber: 'O001',
        status: 'IN_PROGRESS',
        customerName: 'Test Customer',
        totalAmount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
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

      const mockTrackingHistory = {
        logs: [
          {
            id: 'log-1',
            shipmentId: 'shipment-1',
            latitude: 35.6762,
            longitude: 139.6503,
            address: 'Tokyo, Japan',
            speed: 60,
            status: 'NORMAL',
            timestamp: new Date(),
            shipmentId: 'shipment-1',
            shipmentNumber: 'S001'
          }
        ],
        total: 1,
        pagination: {
          limit: 50,
          offset: 0,
          totalPages: 1
        }
      }

      const mockStatistics = {
        totalDistance: 100,
        totalDuration: 120,
        avgSpeed: 50,
        maxSpeed: 80,
        stops: 2,
        idleTime: 15
      }

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)
      mockedTrackingService.getShipmentTrackingHistory.mockResolvedValue(mockTrackingHistory)
      mockedTrackingService.calculateRouteStatistics.mockResolvedValue(mockStatistics)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1?limit=10&offset=0')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.order).toEqual({
        id: 'order-1',
        orderNumber: 'O001',
        status: 'IN_PROGRESS',
        customerName: 'Test Customer',
        totalAmount: 1000,
        createdAt: mockOrder.createdAt,
        updatedAt: mockOrder.updatedAt
      })

      expect(data.data.shipments).toEqual(mockOrder.shipments)
      expect(data.data.trackingHistory).toHaveLength(1)
      expect(data.data.statistics).toEqual({
        totalShipments: 1,
        activeShipments: 1,
        completedShipments: 0,
        totalDistance: 100,
        averageProgress: 65
      })

      expect(data.data.pagination).toEqual({
        total: 1,
        limit: 10,
        offset: 0,
        totalPages: 1,
        currentPage: 1
      })

      expect(mockedPrisma.order.findUnique).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        include: {
          shipments: {
            select: expect.any(Object)
          }
        }
      })

      expect(mockedTrackingService.getShipmentTrackingHistory).toHaveBeenCalledWith(
        'shipment-1',
        expect.objectContaining({
          limit: 10,
          offset: 0
        })
      )
    })

    it('should handle order without shipments', async () => {
      const mockOrder = {
        id: 'order-1',
        orderNumber: 'O001',
        status: 'PENDING',
        customerName: 'Test Customer',
        totalAmount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        shipments: []
      }

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.shipments).toEqual([])
      expect(data.data.trackingHistory).toEqual([])
      expect(data.data.statistics).toEqual({
        totalShipments: 0,
        activeShipments: 0,
        completedShipments: 0,
        totalDistance: 0,
        averageProgress: 0
      })

      expect(mockedTrackingService.getShipmentTrackingHistory).not.toHaveBeenCalled()
    })

    it('should handle non-existent order', async () => {
      mockedPrisma.order.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/non-existent')
      const response = await GET(request, { params: { id: 'non-existent' } })

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('订单不存在')
    })

    it('should filter by date range', async () => {
      const mockOrder = {
        id: 'order-1',
        shipments: [
          {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai',
            progress: 50
          }
        ]
      }

      const startDate = '2024-01-01T00:00:00Z'
      const endDate = '2024-01-31T23:59:59Z'

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)
      mockedTrackingService.getShipmentTrackingHistory.mockResolvedValue({
        logs: [],
        total: 0,
        pagination: { limit: 50, offset: 0, totalPages: 0 }
      })
      mockedTrackingService.calculateRouteStatistics.mockResolvedValue({
        totalDistance: 0,
        totalDuration: 0,
        avgSpeed: 0,
        maxSpeed: 0,
        stops: 0,
        idleTime: 0
      })

      const request = new NextRequest(`http://localhost:3000/api/tms/tracking/orders/order-1?startDate=${startDate}&endDate=${endDate}`)
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)

      expect(mockedTrackingService.getShipmentTrackingHistory).toHaveBeenCalledWith(
        'shipment-1',
        expect.objectContaining({
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        })
      )
    })

    it('should handle pagination parameters', async () => {
      const mockOrder = {
        id: 'order-1',
        shipments: [
          {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai',
            progress: 50
          }
        ]
      }

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)
      mockedTrackingService.getShipmentTrackingHistory.mockResolvedValue({
        logs: [],
        total: 0,
        pagination: { limit: 20, offset: 40, totalPages: 0 }
      })
      mockedTrackingService.calculateRouteStatistics.mockResolvedValue({
        totalDistance: 0,
        totalDuration: 0,
        avgSpeed: 0,
        maxSpeed: 0,
        stops: 0,
        idleTime: 0
      })

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1?limit=20&offset=40')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)

      expect(mockedTrackingService.getShipmentTrackingHistory).toHaveBeenCalledWith(
        'shipment-1',
        expect.objectContaining({
          limit: 20,
          offset: 40
        })
      )
    })

    it('should handle multiple shipments', async () => {
      const mockOrder = {
        id: 'order-1',
        orderNumber: 'O001',
        status: 'IN_PROGRESS',
        customerName: 'Test Customer',
        totalAmount: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        shipments: [
          {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai',
            progress: 65
          },
          {
            id: 'shipment-2',
            shipmentNumber: 'S002',
            status: 'DELIVERED',
            originAddress: 'Shanghai',
            destinationAddress: 'Guangzhou',
            progress: 100
          }
        ]
      }

      const mockTrackingHistory1 = {
        logs: [
          {
            id: 'log-1',
            shipmentId: 'shipment-1',
            latitude: 35.6762,
            longitude: 139.6503,
            address: 'Tokyo, Japan',
            speed: 60,
            status: 'NORMAL',
            timestamp: new Date(),
            shipmentId: 'shipment-1',
            shipmentNumber: 'S001'
          }
        ],
        total: 1,
        pagination: { limit: 50, offset: 0, totalPages: 1 }
      }

      const mockTrackingHistory2 = {
        logs: [
          {
            id: 'log-2',
            shipmentId: 'shipment-2',
            latitude: 31.2304,
            longitude: 121.4737,
            address: 'Shanghai, China',
            speed: 0,
            status: 'NORMAL',
            timestamp: new Date(),
            shipmentId: 'shipment-2',
            shipmentNumber: 'S002'
          }
        ],
        total: 1,
        pagination: { limit: 50, offset: 0, totalPages: 1 }
      }

      const mockStatistics1 = { totalDistance: 100, avgSpeed: 50, stops: 2 }
      const mockStatistics2 = { totalDistance: 50, avgSpeed: 40, stops: 1 }

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)
      mockedTrackingService.getShipmentTrackingHistory
        .mockResolvedValueOnce(mockTrackingHistory1)
        .mockResolvedValueOnce(mockTrackingHistory2)
      mockedTrackingService.calculateRouteStatistics
        .mockResolvedValueOnce(mockStatistics1)
        .mockResolvedValueOnce(mockStatistics2)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.shipments).toHaveLength(2)
      expect(data.data.trackingHistory).toHaveLength(2)
      expect(data.data.statistics).toEqual({
        totalShipments: 2,
        activeShipments: 1,
        completedShipments: 1,
        totalDistance: 150,
        averageProgress: 82.5
      })

      expect(mockedTrackingService.getShipmentTrackingHistory).toHaveBeenCalledTimes(2)
      expect(mockedTrackingService.calculateRouteStatistics).toHaveBeenCalledTimes(2)
    })

    it('should handle shipment tracking errors gracefully', async () => {
      const mockOrder = {
        id: 'order-1',
        shipments: [
          {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai',
            progress: 50
          }
        ]
      }

      mockedPrisma.order.findUnique.mockResolvedValue(mockOrder as any)
      mockedTrackingService.getShipmentTrackingHistory.mockRejectedValue(new Error('Tracking service error'))

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.trackingHistory).toEqual([])
      expect(data.data.statistics.totalDistance).toBe(0)
    })

    it('should handle server errors', async () => {
      mockedPrisma.order.findUnique.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/orders/order-1')
      const response = await GET(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('获取订单跟踪历史失败')
    })
  })
})