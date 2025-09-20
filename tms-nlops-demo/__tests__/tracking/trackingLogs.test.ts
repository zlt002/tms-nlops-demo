import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/tracking/logs/route'
import { prisma } from '@/lib/db'

// Mock prisma
jest.mock('@/lib/db')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>

describe('Tracking Logs API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/tracking/logs', () => {
    it('should return tracking logs with pagination', async () => {
      const mockLogs = [
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

      mockedPrisma.trackingLog.findMany.mockResolvedValue(mockLogs as any)
      mockedPrisma.trackingLog.count.mockResolvedValue(1)

      const request = new NextRequest('http://localhost:3000/api/tracking/logs?shipmentId=shipment-1&limit=10&page=1')
      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockLogs)
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      })

      expect(mockedPrisma.trackingLog.findMany).toHaveBeenCalledWith({
        where: {
          shipmentId: 'shipment-1'
        },
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
        },
        skip: 0,
        take: 10,
        orderBy: {
          timestamp: 'desc'
        }
      })
    })

    it('should filter by date range', async () => {
      const startDate = '2024-01-01T00:00:00Z'
      const endDate = '2024-01-31T23:59:59Z'

      mockedPrisma.trackingLog.findMany.mockResolvedValue([])
      mockedPrisma.trackingLog.count.mockResolvedValue(0)

      const request = new NextRequest(`http://localhost:3000/api/tracking/logs?startDate=${startDate}&endDate=${endDate}`)
      const response = await GET(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingLog.findMany).toHaveBeenCalledWith({
        where: {
          timestamp: {
            gte: new Date(startDate),
            lte: new Date(endDate)
          }
        },
        include: expect.any(Object),
        skip: 0,
        take: 100,
        orderBy: {
          timestamp: 'desc'
        }
      })
    })

    it('should handle server errors', async () => {
      mockedPrisma.trackingLog.findMany.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tracking/logs')
      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('获取跟踪日志失败')
    })
  })

  describe('POST /api/tracking/logs', () => {
    it('should create tracking log successfully', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockTrackingLog = {
        id: 'log-1',
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503,
        address: 'Tokyo, Japan',
        speed: 60,
        status: 'NORMAL',
        timestamp: new Date(),
        receivedAt: new Date()
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503,
        address: 'Tokyo, Japan',
        speed: 60,
        status: 'NORMAL'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue(mockTrackingLog as any)
      mockedPrisma.shipment.update.mockResolvedValue({} as any)
      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)
      mockedPrisma.vehicle.update.mockResolvedValue({} as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockTrackingLog)
      expect(data.message).toBe('位置上报成功')

      expect(mockedPrisma.trackingLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan',
          speed: 60,
          status: 'NORMAL'
        })
      })
    })

    it('should validate required fields', async () => {
      const requestBody = {
        latitude: 35.6762,
        longitude: 139.6503
        // Missing shipmentId
      }

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should reject invalid coordinates', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        latitude: 95, // Invalid latitude (should be -90 to 90)
        longitude: 139.6503
      }

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should handle non-existent shipment', async () => {
      const requestBody = {
        shipmentId: 'non-existent',
        latitude: 35.6762,
        longitude: 139.6503
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单不存在')
    })

    it('should reject shipment not in transit', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'COMPLETED' // Not in transit
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单不在运输状态')
    })

    it('should handle server errors', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503
      }

      mockedPrisma.shipment.findUnique.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tracking/logs', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('位置上报失败')
    })
  })
})