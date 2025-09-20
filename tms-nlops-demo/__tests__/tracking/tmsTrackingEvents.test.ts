import { NextRequest } from 'next/server'
import { POST } from '@/app/api/tms/tracking/events/route'
import { prisma } from '@/lib/db'
import { TrackingService } from '@/services/trackingService'

// Mock prisma and TrackingService
jest.mock('@/lib/db')
jest.mock('@/services/trackingService')
const mockedPrisma = prisma as jest.Mocked<typeof prisma>
const mockedTrackingService = TrackingService as jest.Mocked<typeof TrackingService>

describe('TMS Tracking Events API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/tms/tracking/events', () => {
    it('should report tracking event successfully', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' },
        order: { id: 'order-1' }
      }

      const mockTrackingLog = {
        id: 'log-1',
        shipmentId: 'shipment-1',
        latitude: 35.6762,
        longitude: 139.6503,
        address: 'Tokyo, Japan',
        event: 'DEPARTURE',
        description: '车辆出发',
        timestamp: new Date(),
        receivedAt: new Date(),
        shipment: {
          id: 'shipment-1',
          shipmentNumber: 'S001',
          status: 'IN_TRANSIT',
          originAddress: 'Beijing',
          destinationAddress: 'Shanghai'
        }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DEPARTURE',
        description: '车辆出发',
        location: {
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan'
        },
        timestamp: new Date().toISOString()
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue(mockTrackingLog as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue(mockTrackingLog as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        eventId: 'log-1',
        event: 'DEPARTURE',
        shipmentId: 'shipment-1',
        shipmentNumber: 'S001',
        timestamp: expect.any(Date),
        status: 'success'
      })
      expect(data.message).toBe('事件上报成功')

      expect(mockedPrisma.shipment.findUnique).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        include: {
          vehicle: true,
          driver: true,
          order: true
        }
      })

      expect(mockedPrisma.trackingLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          shipmentId: 'shipment-1',
          latitude: 35.6762,
          longitude: 139.6503,
          address: 'Tokyo, Japan',
          event: 'DEPARTURE',
          description: '车辆出发',
          timestamp: expect.any(Date)
        })
      })
    })

    it('should handle DEPARTURE event - update shipment status', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'SCHEDULED',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DEPARTURE',
        description: '车辆开始运输',
        location: {
          latitude: 35.6762,
          longitude: 139.6503
        }
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'DEPARTURE'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'IN_TRANSIT' }
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: {
          status: 'IN_TRANSIT',
          actualDeparture: expect.any(Date)
        }
      })
    })

    it('should handle ARRIVAL event - update shipment status and progress', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'ARRIVAL',
        description: '车辆到达目的地',
        location: {
          latitude: 35.6762,
          longitude: 139.6503
        }
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'ARRIVAL'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'UNLOADING' }
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: {
          status: 'UNLOADING',
          actualArrival: expect.any(Date),
          progress: 100
        }
      })
    })

    it('should handle LOADING_COMPLETE event - update shipment status', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'LOADING',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'LOADING_COMPLETE',
        description: '装载完成'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'LOADING_COMPLETE'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'IN_TRANSIT' }
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: {
          status: 'IN_TRANSIT',
          actualDeparture: expect.any(Date)
        }
      })
    })

    it('should handle UNLOADING_COMPLETE event - update shipment status', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'UNLOADING',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'UNLOADING_COMPLETE',
        description: '卸载完成'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'UNLOADING_COMPLETE'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'DELIVERED' }
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: {
          status: 'DELIVERED',
          actualArrival: expect.any(Date),
          progress: 100
        }
      })
    })

    it('should handle DELAY event - update estimated arrival', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        estimatedArrival: new Date(),
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DELAY',
        description: '交通拥堵导致延迟'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'DELAY'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'IN_TRANSIT' }
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.shipment.update).toHaveBeenCalledWith({
        where: { id: 'shipment-1' },
        data: {
          estimatedArrival: expect.any(Date)
        }
      })
    })

    it('should handle EMERGENCY event - create critical alert', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'EMERGENCY',
        description: '车辆故障，需要紧急救援',
        location: {
          latitude: 35.6762,
          longitude: 139.6503
        }
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'EMERGENCY'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'IN_TRANSIT' }
      } as any)
      mockedPrisma.trackingAlert.create.mockResolvedValue({
        id: 'alert-1',
        shipmentId: 'shipment-1',
        alertType: 'EMERGENCY',
        severity: 'CRITICAL'
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.trackingAlert.create).toHaveBeenCalledWith({
        data: {
          shipmentId: 'shipment-1',
          alertType: 'EMERGENCY',
          severity: 'CRITICAL',
          title: '紧急事件',
          description: '车辆故障，需要紧急救援',
          location: '{"lat":35.6762,"lng":139.6503}',
          status: 'ACTIVE'
        }
      })
    })

    it('should handle CHECKPOINT_PASS event - update checkpoint status', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'IN_TRANSIT',
        routeId: 'route-1',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const mockCheckpoint = {
        id: 'checkpoint-1',
        routeId: 'route-1',
        status: 'PENDING',
        coordinates: '{"lat": 35.6762, "lng": 139.6503}',
        radius: 100,
        order: 1
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'CHECKPOINT_PASS',
        description: '通过检查点',
        location: {
          latitude: 35.6762,
          longitude: 139.6503
        }
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)
      mockedPrisma.trackingLog.create.mockResolvedValue({
        id: 'log-1',
        shipmentId: 'shipment-1',
        event: 'CHECKPOINT_PASS'
      } as any)
      mockedPrisma.trackingLog.findFirst.mockResolvedValue({
        id: 'log-1',
        shipment: { shipmentNumber: 'S001', status: 'IN_TRANSIT' }
      } as any)
      mockedPrisma.trackingCheckpoint.findFirst.mockResolvedValue(mockCheckpoint as any)
      mockedPrisma.trackingCheckpoint.update.mockResolvedValue({
        ...mockCheckpoint,
        status: 'ARRIVED',
        actualTime: expect.any(Date),
        visitCount: 1
      } as any)
      mockedTrackingService.updateShipmentLocation.mockResolvedValue(undefined)
      mockedTrackingService.checkAndCreateAlerts.mockResolvedValue(undefined)
      mockedTrackingService['calculateDistance'].mockResolvedValue(0.05) // 50 meters

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)

      expect(mockedPrisma.trackingCheckpoint.update).toHaveBeenCalledWith({
        where: { id: 'checkpoint-1' },
        data: {
          status: 'ARRIVED',
          actualTime: expect.any(Date),
          visitCount: { increment: 1 }
        }
      })
    })

    it('should validate required fields', async () => {
      const requestBody = {
        shipmentId: 'shipment-1'
        // Missing event
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
    })

    it('should validate location coordinates', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DEPARTURE',
        location: {
          latitude: 95, // Invalid latitude
          longitude: 139.6503
        }
      }

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
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
        event: 'DEPARTURE'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单不存在')
    })

    it('should reject cancelled or completed shipments', async () => {
      const mockShipment = {
        id: 'shipment-1',
        status: 'CANCELLED',
        vehicle: { id: 'vehicle-1' },
        driver: { id: 'driver-1' }
      }

      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DEPARTURE'
      }

      mockedPrisma.shipment.findUnique.mockResolvedValue(mockShipment as any)

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('运单已取消或完成，无法上报事件')
    })

    it('should handle server errors', async () => {
      const requestBody = {
        shipmentId: 'shipment-1',
        event: 'DEPARTURE'
      }

      mockedPrisma.shipment.findUnique.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/tms/tracking/events', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('跟踪事件上报失败')
    })
  })
})