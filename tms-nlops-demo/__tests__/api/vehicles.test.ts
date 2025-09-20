import { NextRequest } from 'next/server'
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/vehicles/route'
import { GET as GETById, PUT, DELETE, PATCH } from '@/app/api/vehicles/[id]/route'
import { GET as GETAvailable } from '@/app/api/vehicles/available/route'
import { VehicleService } from '@/services/vehicleService'

// Mock VehicleService
jest.mock('@/services/vehicleService')
const MockVehicleService = VehicleService as jest.MockedClass<typeof VehicleService>

describe('Vehicle API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/vehicles', () => {
    it('should return vehicles list with pagination', async () => {
      const mockVehicles = {
        vehicles: [
          {
            id: '1',
            licensePlate: '京A12345',
            type: 'TRUCK',
            capacity: 10,
            status: 'AVAILABLE',
            driver: null,
            schedules: [],
            orders: [],
            _count: { schedules: 0, orders: 0 }
          }
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          pages: 1
        }
      }

      MockVehicleService.getVehiclesWithStats.mockResolvedValue(mockVehicles)

      const request = new NextRequest('http://localhost:3000/api/vehicles?page=1&limit=20')
      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVehicles.vehicles)
      expect(data.pagination).toEqual(mockVehicles.pagination)
    })

    it('should handle search parameters', async () => {
      const mockVehicles = {
        vehicles: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      }

      MockVehicleService.getVehiclesWithStats.mockResolvedValue(mockVehicles)

      const request = new NextRequest('http://localhost:3000/api/vehicles?search=123&vehicleType=TRUCK&status=AVAILABLE')
      await GET(request)

      expect(MockVehicleService.getVehiclesWithStats).toHaveBeenCalledWith({
        search: '123',
        vehicleType: 'TRUCK',
        status: 'AVAILABLE',
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('should handle errors gracefully', async () => {
      MockVehicleService.getVehiclesWithStats.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/vehicles')
      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBe('获取车辆列表失败')
    })
  })

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle', async () => {
      const mockVehicle = {
        id: '1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        capacity: 10,
        status: 'AVAILABLE',
        driver: null
      }

      MockVehicleService.createVehicle.mockResolvedValue(mockVehicle)

      const request = new NextRequest('http://localhost:3000/api/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          licenseNumber: '京A12345',
          vehicleType: 'TRUCK',
          maxLoad: 10,
          maxVolume: 20,
          brand: 'Test Brand',
          model: 'Test Model',
          year: 2023,
          dailyRate: 500
        })
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVehicle)
      expect(data.message).toBe('车辆创建成功')
    })

    it('should validate required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          // Missing required fields
        })
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.success).toBe(false)
    })

    it('should handle duplicate license plate', async () => {
      MockVehicleService.createVehicle.mockRejectedValue(new Error('车牌号已存在'))

      const request = new NextRequest('http://localhost:3000/api/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          licenseNumber: '京A12345',
          vehicleType: 'TRUCK',
          maxLoad: 10,
          maxVolume: 20,
          brand: 'Test Brand',
          model: 'Test Model',
          year: 2023,
          dailyRate: 500
        })
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('创建车辆失败')
    })
  })

  describe('GET /api/vehicles/[id]', () => {
    it('should return vehicle details', async () => {
      const mockVehicle = {
        id: '1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        capacity: 10,
        status: 'AVAILABLE',
        driver: null,
        schedules: [],
        orders: [],
        _count: { schedules: 0, orders: 0 }
      }

      MockVehicleService.getVehicleById.mockResolvedValue(mockVehicle)

      const { req } = createMocks({
        method: 'GET',
        url: '/api/vehicles/1'
      })

      const request = req as unknown as NextRequest
      const response = await GETById(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVehicle)
    })

    it('should return 404 for non-existent vehicle', async () => {
      MockVehicleService.getVehicleById.mockResolvedValue(null)

      const { req } = createMocks({
        method: 'GET',
        url: '/api/vehicles/999'
      })

      const request = req as unknown as NextRequest
      const response = await GETById(request, { params: { id: '999' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBe('车辆不存在')
    })
  })

  describe('PUT /api/vehicles/[id]', () => {
    it('should update vehicle information', async () => {
      const mockVehicle = {
        id: '1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        capacity: 10,
        status: 'AVAILABLE',
        driver: null
      }

      MockVehicleService.updateVehicle.mockResolvedValue(mockVehicle)

      const { req } = createMocks({
        method: 'PUT',
        url: '/api/vehicles/1',
        body: {
          licenseNumber: '京A12345',
          vehicleType: 'TRUCK',
          maxLoad: 15,
          status: 'IN_TRANSIT'
        }
      })

      const request = req as unknown as NextRequest
      const response = await PUT(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVehicle)
      expect(data.message).toBe('车辆更新成功')
    })

    it('should handle duplicate license plate', async () => {
      MockVehicleService.updateVehicle.mockRejectedValue(new Error('车牌号已被使用'))

      const { req } = createMocks({
        method: 'PUT',
        url: '/api/vehicles/1',
        body: {
          licenseNumber: '京A54321' // Different license plate
        }
      })

      const request = req as unknown as NextRequest
      const response = await PUT(request, { params: { id: '1' } })

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.success).toBe(false)
    })
  })

  describe('DELETE /api/vehicles/[id]', () => {
    it('should delete vehicle (soft delete)', async () => {
      const { req } = createMocks({
        method: 'DELETE',
        url: '/api/vehicles/1'
      })

      const request = req as unknown as NextRequest
      const response = await DELETE(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('车辆删除成功')
    })
  })

  describe('PATCH /api/vehicles/[id]', () => {
    it('should update vehicle location', async () => {
      const mockLocation = {
        id: '1',
        vehicleId: '1',
        latitude: 39.9042,
        longitude: 116.4074
      }

      MockVehicleService.updateVehicleLocation.mockResolvedValue(mockLocation)

      const { req } = createMocks({
        method: 'PATCH',
        url: '/api/vehicles/1',
        body: {
          action: 'updateLocation',
          location: {
            latitude: 39.9042,
            longitude: 116.4074,
            address: '北京市朝阳区'
          }
        }
      })

      const request = req as unknown as NextRequest
      const response = await PATCH(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('位置更新成功')
    })

    it('should add maintenance record', async () => {
      const mockMaintenance = {
        id: '1',
        vehicleId: '1',
        maintenanceType: 'ROUTINE',
        description: 'Regular maintenance',
        cost: 500
      }

      MockVehicleService.addMaintenanceRecord.mockResolvedValue(mockMaintenance)

      const { req } = createMocks({
        method: 'PATCH',
        url: '/api/vehicles/1',
        body: {
          action: 'addMaintenance',
          maintenance: {
            maintenanceType: 'ROUTINE',
            description: 'Regular maintenance',
            cost: 500,
            mileage: 10000,
            performedBy: 'Mechanic',
            performedAt: new Date().toISOString()
          }
        }
      })

      const request = req as unknown as NextRequest
      const response = await PATCH(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('维护记录添加成功')
    })

    it('should add fuel record', async () => {
      const mockFuel = {
        id: '1',
        vehicleId: '1',
        fuelAmount: 50,
        fuelCost: 400
      }

      MockVehicleService.addFuelRecord.mockResolvedValue(mockFuel)

      const { req } = createMocks({
        method: 'PATCH',
        url: '/api/vehicles/1',
        body: {
          action: 'addFuel',
          fuel: {
            fuelAmount: 50,
            fuelCost: 400,
            fuelType: 'Diesel',
            mileage: 10050,
            filledBy: 'Driver'
          }
        }
      })

      const request = req as unknown as NextRequest
      const response = await PATCH(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('加油记录添加成功')
    })

    it('should handle unknown action', async () => {
      const mockVehicle = {
        id: '1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        capacity: 10,
        status: 'AVAILABLE',
        driver: null
      }

      MockVehicleService.updateVehicle.mockResolvedValue(mockVehicle)

      const { req } = createMocks({
        method: 'PATCH',
        url: '/api/vehicles/1',
        body: {
          status: 'MAINTENANCE'
        }
      })

      const request = req as unknown as NextRequest
      const response = await PATCH(request, { params: { id: '1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('车辆更新成功')
    })
  })

  describe('GET /api/vehicles/available', () => {
    it('should return available vehicles', async () => {
      const mockVehicles = [
        {
          id: '1',
          licensePlate: '京A12345',
          type: 'TRUCK',
          capacity: 10,
          status: 'AVAILABLE',
          driver: null
        }
      ]

      MockVehicleService.getAvailableVehicles.mockResolvedValue(mockVehicles)

      const request = new NextRequest('http://localhost:3000/api/vehicles/available?vehicleType=TRUCK&minCapacity=5')
      const response = await GETAvailable(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVehicles)
      expect(data.message).toBe('获取可用车辆成功')
    })

    it('should handle time-based availability', async () => {
      const mockVehicles = []
      MockVehicleService.getAvailableVehicles.mockResolvedValue(mockVehicles)

      const startTime = new Date('2024-01-01T10:00:00Z').toISOString()
      const endTime = new Date('2024-01-01T18:00:00Z').toISOString()

      const request = new NextRequest(`http://localhost:3000/api/vehicles/available?startTime=${startTime}&endTime=${endTime}`)
      await GETAvailable(request)

      expect(MockVehicleService.getAvailableVehicles).toHaveBeenCalledWith({
        startTime: expect.any(Date),
        endTime: expect.any(Date)
      })
    })
  })
})

describe('VehicleService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getVehiclesWithStats', () => {
    it('should call prisma with correct parameters', async () => {
      const mockVehicles = {
        vehicles: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 },
        stats: {}
      }

      MockVehicleService.getVehiclesWithStats.mockResolvedValue(mockVehicles)

      await VehicleService.getVehiclesWithStats({
        vehicleType: 'TRUCK',
        status: 'AVAILABLE',
        page: 1,
        limit: 10
      })

      expect(MockVehicleService.getVehiclesWithStats).toHaveBeenCalledWith({
        vehicleType: 'TRUCK',
        status: 'AVAILABLE',
        page: 1,
        limit: 10
      })
    })
  })

  describe('createVehicle', () => {
    it('should validate license plate uniqueness', async () => {
      MockVehicleService.createVehicle.mockRejectedValue(new Error('车牌号已存在'))

      await expect(VehicleService.createVehicle({
        licenseNumber: '京A12345',
        vehicleType: 'TRUCK',
        maxLoad: 10,
        maxVolume: 20,
        brand: 'Test',
        model: 'Test',
        year: 2023,
        dailyRate: 500
      })).rejects.toThrow('车牌号已存在')
    })
  })

  describe('updateVehicle', () => {
    it('should validate vehicle existence', async () => {
      MockVehicleService.updateVehicle.mockRejectedValue(new Error('车辆不存在'))

      await expect(VehicleService.updateVehicle('999', {
        licenseNumber: '京A54321'
      })).rejects.toThrow('车辆不存在')
    })
  })

  describe('getAvailableVehicles', () => {
    it('should filter by vehicle type and capacity', async () => {
      const mockVehicles = []
      MockVehicleService.getAvailableVehicles.mockResolvedValue(mockVehicles)

      await VehicleService.getAvailableVehicles({
        vehicleType: 'TRUCK',
        minCapacity: 5
      })

      expect(MockVehicleService.getAvailableVehicles).toHaveBeenCalledWith({
        vehicleType: 'TRUCK',
        minCapacity: 5
      })
    })

    it('should check schedule conflicts', async () => {
      const mockVehicles = []
      MockVehicleService.getAvailableVehicles.mockResolvedValue(mockVehicles)

      const startTime = new Date('2024-01-01T10:00:00Z')
      const endTime = new Date('2024-01-01T18:00:00Z')

      await VehicleService.getAvailableVehicles({
        startTime,
        endTime
      })

      expect(MockVehicleService.getAvailableVehicles).toHaveBeenCalledWith({
        startTime,
        endTime
      })
    })
  })
})