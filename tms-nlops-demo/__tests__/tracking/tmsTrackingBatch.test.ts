import { NextRequest } from 'next/server'
import { POST } from '@/app/api/tms/tracking/batch/route'
import { prisma } from '@/lib/db'
import { TrackingService } from '@/services/trackingService'

// Mock prisma and TrackingService
jest.mock('@/lib/db')
jest.mock('@/services/trackingService')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>
const mockedTrackingService = TrackingService as jest.Mocked<typeof TrackingService>

describe('TMS Tracking Batch API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/tms/tracking/batch', () => {
    it('should process batch location updates successfully', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' },
        route: { id: 'route-1' }
      }

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

      const mockResult = {
        success: true,
        results: [
          { id: 'log-1' },
          { id: 'log-2' }
        ],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      }

      const mockStats = {
        totalUpdates: 2,
        timeSpan: 1,
        distanceCovered: 1.2,
        avgSpeed: 62.5,
        maxSpeed: 65,
        altitudeRange: { min: 0, max: 0 },
        accuracyStats: { avg: 0, best: 0, worst: 0 }
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue(mockResult)
      mockedTrackingService['calculateDistance'].mockResolvedValue(1.2)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates,
        deviceId: 'device-1'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        ...mockResult,
        statistics: mockStats,
        processingTime: expect.any(Number)
      })
      expect(data.message).toBe('批量位置更新完成，成功 2 条，失败 0 条')

      expect(mockedPrisma.shipment.findUnique).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        include: {
          vehicle: true,
          driver: true,
          route: true
        }
      })

      expect(mockedTrackingService.batchLocationUpdates).toHaveBeenCalledWith(
        'shipment-1',
        expect.arrayContaining([
          expect.objectContaining({
            latitude: 35.6762,
            longitude: 139.6503,
            speed: 60
          }),
          expect.objectContaining({
            latitude: 35.6763,
            longitude: 139.6504,
            speed: 65
          })
        ]),
        'device-1'
      )
    })

    it('should validate required fields', async () => {
      const requestBody = {
        shipmentId: 'shipment-1'
        // Missing updates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should reject empty updates array', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        updates: []
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should reject too many updates', async () => {
      const mockUpdates = Array(1001).fill({
        latitude: 35.6762,
        longitude: 139.6503,
        speed: 60
      })

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('批量更新最多支持1000条位置数据')
    })

    it('should validate coordinates in updates', async () => {
      const mockUpdates = [
        {
          latitude: 95, // Invalid latitude
          longitude: 139.6503,
          speed: 60
        }
      ]

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
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
        updates: [
          {
            latitude: 35.6762,
            longitude: 139.6503,
            speed: 60
          }
        ]
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
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
        status: 'COMPLETED', // Not in transit
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: [
          {
            latitude: 35.6762,
            longitude: 139.6503,
            speed: 60
          }
        ]
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单不在运输状态，无法批量更新位置')
    })

    it('should preprocess location updates correctly', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const rawUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          timestamp: 'invalid-date' // Should be handled
        },
        {
          latitude: 95, // Should be clamped
          longitude: 139.6503,
          speed: 300 // Should be clamped
        },
        {
          latitude: 35.6763,
          longitude: 139.6504,
          speed: -10, // Should be set to 0
          heading: 370 // Should be normalized to 10
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 3,
        successful: 3,
        failed: 0
      })

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: rawUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      // Check that updates were preprocessed correctly
      const processedUpdates = mockedTrackingService.batchLocationUpdates.mock.calls[0][1]
      expect(processedUpdates).toHaveLength(3)

      // Check invalid timestamp handling
      expect(processedUpdates[0].timestamp).toBeInstanceOf(Date)

      // Check coordinate clamping
      expect(processedUpdates[1].latitude).toBe(90)

      // Check speed clamping
      expect(processedUpdates[1].speed).toBe(300)

      // Check negative speed handling
      expect(processedUpdates[2].speed).toBe(0)

      // Check heading normalization
      expect(processedUpdates[2].heading).toBe(10)
    })

    it('should generate correct batch statistics', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          altitude: 100,
          accuracy: 5,
          timestamp: new Date()
        },
        {
          latitude: 35.6763,
          longitude: 139.6504,
          speed: 80,
          altitude: 150,
          accuracy: 10,
          timestamp: new Date(Date.now() + 300000) // 5 minutes later
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      })
      mockedTrackingService['calculateDistance'].mockResolvedValue(5.0)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.statistics).toEqual({
        totalUpdates: 2,
        timeSpan: 5,
        distanceCovered: 5.0,
        avgSpeed: 70,
        maxSpeed: 80,
        altitudeRange: { min: 100, max: 150 },
        accuracyStats: { avg: 7.5, best: 5, worst: 10 }
      })
    })

    it('should detect time gap anomalies', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          timestamp: new Date()
        },
        {
          latitude: 35.6763,
          longitude: 139.6504,
          speed: 60,
          timestamp: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes later
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      })
      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'DATA_ANOMALY',
          severity: 'MEDIUM',
          title: '批量更新数据异常',
          description: expect.stringContaining('位置数据间隔')
        })
      })
    })

    it('should detect speed anomalies', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 160, // High speed
          timestamp: new Date()
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 1,
        successful: 1,
        failed: 0
      })
      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'DATA_ANOMALY',
          severity: 'HIGH',
          title: '批量更新数据异常',
          description: expect.stringContaining('检测到异常高速')
        })
      })
    })

    it('should detect acceleration anomalies', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          timestamp: new Date()
        },
        {
          latitude: 35.6763,
          longitude: 139.6504,
          speed: 120, // High acceleration
          timestamp: new Date(Date.now() + 10000) // 10 seconds later
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      })
      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'DATA_ANOMALY',
          severity: 'HIGH',
          title: '批量更新数据异常',
          description: expect.stringContaining('检测到异常加速度')
        })
      })
    })

    it('should detect position jump anomalies', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          timestamp: new Date()
        },
        {
          latitude: 36.6762, // Far location
          longitude: 140.6504,
          speed: 60,
          timestamp: new Date(Date.now() + 60000) // 1 minute later
        }
      ]

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue({
        success: true,
        results: [],
        errors: [],
        total: 2,
        successful: 2,
        failed: 0
      })
      mockedTrackingService['calculateDistance'].mockResolvedValue(100) // 100km in 1 minute = 6000 km/h
      mockedPrisma.trackingAlert.create.mockResolvedValue({} as any)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          alertType: 'DATA_ANOMALY',
          severity: 'HIGH',
          title: '批量更新数据异常',
          description: expect.stringContaining('检测到位置跳跃异常')
        })
      })
    })

    it('should handle partial failures gracefully', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockUpdates = [
        {
          latitude: 35.6762,
          longitude: 139.6503,
          speed: 60,
          timestamp: new Date()
        }
      ]

      const mockResult = {
        success: true,
        results: [],
        errors: [
          {
            update: mockUpdates[0],
            error: 'Database error'
          }
        ],
        total: 1,
        successful: 0,
        failed: 1
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedTrackingService.batchLocationUpdates.mockResolvedValue(mockResult)

      const requestBody = {
        shipmentId: 'shipment-1',
        updates: mockUpdates
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.failed).toBe(1)
      expect(data.data.errors).toHaveLength(1)
      expect(data.data.errors[0].error).toBe('Database error')
      expect(data.message).toBe('批量位置更新完成，成功 0 条，失败 1 条')
    })

    it('should handle server errors', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        updates: [
          {
            latitude: 35.6762,
            longitude: 139.6503,
            speed: 60
          }
        ]
      }

      mockedPrisma.shipment.findUnique.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/batch', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('批量位置更新失败')
    })
  })
})