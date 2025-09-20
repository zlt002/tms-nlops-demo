import { NextRequest } from 'next/server'
import { GET, POST, PUT, PATCH } from '@/app/api/tracking/alerts/route'
import { prisma } from '@/lib/db'

// Mock prisma
jest.mock('@/lib/db')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>

describe('Tracking Alerts API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/tracking/alerts', () => {
    it('should return alerts with pagination', async () => {
      const mockAlerts = [
        {
          id: 'alert-1',
          shipmentId: 'shipment-1',
          alertType: 'SPEEDING',
          severity: 'HIGH',
          title: '超速警报',
          description: '车辆速度达到 130 km/h',
          triggeredAt: new Date(),
          status: 'ACTIVE',
          shipment: {
            id: 'shipment-1',
            shipmentNumber: 'S001',
            status: 'IN_TRANSIT',
            originAddress: 'Beijing',
            destinationAddress: 'Shanghai'
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

      mockedPrisma.trackingAlert.findMany.mockResolvedValue(mockAlerts as any)
      mockedPrisma.trackingAlert.count.mockResolvedValue(1)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts?shipmentId=shipment-1&limit=10&page=1')
      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockAlerts)
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      })

      expect(mockedPrisma.trackingAlert.findMany).toHaveBeenCalledWith({
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
          },
          trackingLog: {
            select: {
              id: true,
              timestamp: true,
              latitude: true,
              longitude: true,
              speed: true,
              status: true
            }
          }
        },
        skip: 0,
        take: 10,
        orderBy: {
          triggeredAt: 'desc'
        }
      })
    })

    it('should filter by alert type and severity', async () => {
      mockedPrisma.trackingAlert.findMany.mockResolvedValue([])
      mockedPrisma.trackingAlert.count.mockResolvedValue(0)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts?alertType=SPEEDING&severity=HIGH&status=ACTIVE')
      const response = await GET(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.findMany).toHaveBeenCalledWith({
        where: {
          alertType: 'SPEEDING',
          severity: 'HIGH',
          status: 'ACTIVE'
        },
        include: expect.any(Object),
        skip: 0,
        take: 20,
        orderBy: {
          triggeredAt: 'desc'
        }
      })
    })

    it('should filter by date range', async () => {
      const startDate = '2024-01-01T00:00:00Z'
      const endDate = '2024-01-31T23:59:59Z'

      mockedPrisma.trackingAlert.findMany.mockResolvedValue([])
      mockedPrisma.trackingAlert.count.mockResolvedValue(0)

      const request = new NextRequest(`http://localhost:3000/api/tracking/alerts?startDate=${startDate}&endDate=${endDate}`)
      const response = await GET(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.findMany).toHaveBeenCalledWith({
        where: {
          triggeredAt: {
            gte: new Date(startDate),
            lte: new Date(endDate)
          }
        },
        include: expect.any(Object),
        skip: 0,
        take: 20,
        orderBy: {
          triggeredAt: 'desc'
        }
      })
    })

    it('should handle server errors', async () => {
      mockedPrisma.trackingAlert.findMany.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts')
      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('获取警报列表失败')
    })
  })

  describe('POST /api/tracking/alerts', () => {
    it('should create alert successfully', async () => {
      const mockShipment = {
        id: 'shipment-1',
        shipmentNumber: 'S001',
        status: 'IN_TRANSIT'
      }

      const mockAlert = {
        id: 'alert-1',
        shipmentId: 'shipment-1',
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        description: '车辆速度达到 130 km/h',
        location: '{"lat": 35.6762, "lng": 139.6503}',
        status: 'ACTIVE',
        shipment: mockShipment
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        description: '车辆速度达到 130 km/h',
        location: '{"lat": 35.6762, "lng": 139.6503}'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingAlert.create.mockResolvedValue(mockAlert as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockAlert)
      expect(data.message).toBe('警报创建成功')

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'SPEEDING',
          severity: 'HIGH',
          title: '超速警报',
          description: '车辆速度达到 130 km/h',
          location: '{"lat": 35.6762, "lng": 139.6503}',
          status: 'ACTIVE'
        }),
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

    it('should validate required fields', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        alertType: 'SPEEDING'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should handle invalid location format', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        description: '车辆速度达到 130 km/h',
        location: 'invalid-json'
      }

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
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
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        description: '车辆速度达到 130 km/h'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单不存在')
    })
  })

  describe('PUT /api/tracking/alerts', () => {
    it('should acknowledge alert successfully', async () => {
      const mockAlert = {
        id: 'alert-1',
        shipmentId: 'shipment-1',
        alertType: 'SPEEDING',
        severity: 'HIGH',
        title: '超速警报',
        status: 'ACTIVE',
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

      const requestBody = {
        alertId: 'alert-1',
        action: 'acknowledge',
        actionTaken: '已确认超速警报',
        notes: '已通知司机减速'
      }

      mockedPrisma.trackingAlert.findUnique.mockResolvedValue(mockAlert as any)
      mockedPrisma.trackingAlert.update.mockResolvedValue({
        ...mockAlert,
        status: 'ACKNOWLEDGED',
        acknowledgedBy: 'system',
        acknowledgedAt: expect.any(Date),
        actionTaken: '已确认超速警报',
        notes: '已通知司机减速'
      } as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.message).toBe('警报操作成功')

      expect(mockedPrisma.trackingAlert.update).toHaveBeenCalledWith({
        where: { id: 'alert-1' },
        data: {
          status: 'ACKNOWLEDGED',
          acknowledgedBy: 'system',
          acknowledgedAt: expect.any(Date),
          actionTaken: '已确认超速警报',
          notes: '已通知司机减速'
        },
        include: expect.any(Object)
      })
    })

    it('should resolve alert successfully', async () => {
      const mockAlert = {
        id: 'alert-1',
        status: 'ACTIVE'
      }

      const requestBody = {
        alertId: 'alert-1',
        action: 'resolve',
        resolution: '司机已减速至安全速度',
        actionTaken: '已联系司机处理'
      }

      mockedPrisma.trackingAlert.findUnique.mockResolvedValue(mockAlert as any)
      mockedPrisma.trackingAlert.update.mockResolvedValue({
        ...mockAlert,
        status: 'RESOLVED',
        resolvedAt: expect.any(Date),
        resolution: '司机已减速至安全速度',
        actionTaken: '已联系司机处理'
      } as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)

      expect(mockedPrisma.trackingAlert.update).toHaveBeenCalledWith({
        where: { id: 'alert-1' },
        data: {
          status: 'RESOLVED',
          resolvedAt: expect.any(Date),
          resolution: '司机已减速至安全速度',
          actionTaken: '已联系司机处理'
        },
        include: expect.any(Object)
      })
    })

    it('should dismiss alert successfully', async () => {
      const mockAlert = {
        id: 'alert-1',
        status: 'ACTIVE'
      }

      const requestBody = {
        alertId: 'alert-1',
        action: 'dismiss',
        notes: '误报，实际速度正常'
      }

      mockedPrisma.trackingAlert.findUnique.mockResolvedValue(mockAlert as any)
      mockedPrisma.trackingAlert.update.mockResolvedValue({
        ...mockAlert,
        status: 'DISMISSED',
        resolvedAt: expect.any(Date),
        resolution: '已忽略',
        actionTaken: 'dismiss',
        notes: '误报，实际速度正常'
      } as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)

      expect(mockedPrisma.trackingAlert.update).toHaveBeenCalledWith({
        where: { id: 'alert-1' },
        data: {
          status: 'DISMISSED',
          resolvedAt: expect.any(Date),
          resolution: '已忽略',
          actionTaken: 'dismiss',
          notes: '误报，实际速度正常'
        },
        include: expect.any(Object)
      })
    })

    it('should handle non-existent alert', async () => {
      const requestBody = {
        alertId: 'non-existent',
        action: 'acknowledge'
      }

      mockedPrisma.trackingAlert.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PUT',
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request)

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('警报不存在')
    })
  })

  describe('PATCH /api/tracking/alerts (statistics)', () => {
    it('should return alert statistics', async () => {
      const mockStats = {
        totalAlerts: 10,
        activeAlerts: 3,
        alertsByType: [
          { alertType: 'SPEEDING', _count: { alertType: 4 } },
          { alertType: 'DELAY', _count: { alertType: 3 } },
          { alertType: 'LOW_FUEL', _count: { alertType: 3 } }
        ],
        alertsBySeverity: [
          { severity: 'HIGH', _count: { severity: 2 } },
          { severity: 'MEDIUM', _count: { severity: 5 } },
          { severity: 'LOW', _count: { severity: 3 } }
        ],
        recentAlerts: []
      }

      mockedPrisma.trackingAlert.count.mockResolvedValue(mockStats.totalAlerts)
      mockedPrisma.trackingAlert.count.mockResolvedValue(mockStats.activeAlerts)
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue(mockStats.alertsByType as any)
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue(mockStats.alertsBySeverity as any)
      mockedPrisma.trackingAlert.findMany.mockResolvedValue(mockStats.recentAlerts as any)

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PATCH',
        body: JSON.stringify({ shipmentId: 'shipment-1' })
      })

      const response = await PATCH(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        totalAlerts: 10,
        activeAlerts: 3,
        alertsByType: {
          SPEEDING: 4,
          DELAY: 3,
          LOW_FUEL: 3
        },
        alertsBySeverity: {
          HIGH: 2,
          MEDIUM: 5,
          LOW: 3
        },
        recentAlerts: []
      })
    })

    it('should return overall statistics when no shipmentId provided', async () => {
      mockedPrisma.trackingAlert.count.mockResolvedValue(10)
      mockedPrisma.trackingAlert.count.mockResolvedValue(3)
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue([])
      mockedPrisma.trackingAlert.groupBy.mockResolvedValue([])
      mockedPrisma.trackingAlert.findMany.mockResolvedValue([])

      const request = new NextRequest('http://localhost:3000/api/tracking/alerts', {
        method: 'PATCH',
        body: JSON.stringify({})
      })

      const response = await PATCH(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        totalAlerts: 10,
        activeAlerts: 3,
        alertsByType: {},
        alertsBySeverity: {},
        recentAlerts: []
      })
    })
  })
})