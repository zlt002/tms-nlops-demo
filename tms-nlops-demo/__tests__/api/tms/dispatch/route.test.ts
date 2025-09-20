import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/tms/dispatch/route'
import { DispatchService } from '@/services/dispatchService'

// Mock the DispatchService
jest.mock('@/services/dispatchService')

describe('/api/tms/dispatch', () => {
  const mockDispatches = [
    {
      id: 'dispatch1',
      dispatchNumber: 'DISP20240115001',
      customerId: 'customer1',
      vehicleId: 'vehicle1',
      driverId: 'driver1',
      originAddress: '北京市朝阳区',
      destinationAddress: '上海市浦东新区',
      status: 'SCHEDULED',
      plannedDeparture: new Date('2024-01-15T10:00:00Z'),
      totalWeight: 10,
      totalVolume: 20,
      totalAmount: 1000,
      customer: {
        id: 'customer1',
        customerNumber: 'CUST001',
        companyName: '测试客户公司',
        email: 'test@example.com',
        phone: '13800138000'
      },
      vehicle: {
        id: 'vehicle1',
        licensePlate: '京A12345',
        type: 'TRUCK',
        maxLoad: 20,
        maxVolume: 40,
        status: 'AVAILABLE'
      },
      driver: {
        id: 'driver1',
        name: '张三',
        phone: '13800138001',
        licenseNumber: 'D123456',
        rating: 4.5,
        status: 'AVAILABLE'
      },
      shipments: [
        {
          id: 'shipment1',
          shipmentNumber: 'SHP20240115001',
          order: {
            id: 'order1',
            orderNumber: 'ORD001',
            cargoName: '测试货物1',
            totalAmount: 500
          }
        }
      ]
    }
  ]

  const mockPagination = {
    page: 1,
    limit: 20,
    total: 1,
    pages: 1
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET method', () => {
    it('应该成功获取发车单列表', async () => {
      // Mock service response
      ;(DispatchService.getDispatches as jest.Mock).mockResolvedValue({
        dispatches: mockDispatches,
        pagination: mockPagination
      })

      // Create mock request with query params
      const request = new NextRequest(
        'http://localhost:3000/api/tms/dispatch?page=1&limit=10&status=SCHEDULED'
      )

      // Call the handler
      const response = await GET(request)

      // Verify response
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data.dispatches).toEqual(mockDispatches)
      expect(data.data.pagination).toEqual(mockPagination)
      expect(data.message).toBe('获取发车单列表成功')

      // Verify service was called with correct parameters
      expect(DispatchService.getDispatches).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        status: 'SCHEDULED',
        driverId: undefined,
        vehicleId: undefined,
        customerId: undefined,
        startDate: undefined,
        endDate: undefined,
        origin: undefined,
        destination: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('应该处理所有查询参数', async () => {
      ;(DispatchService.getDispatches as jest.Mock).mockResolvedValue({
        dispatches: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      })

      const url = new URL('http://localhost:3000/api/tms/dispatch')
      url.searchParams.set('status', 'IN_TRANSIT')
      url.searchParams.set('driverId', 'driver1')
      url.searchParams.set('vehicleId', 'vehicle1')
      url.searchParams.set('customerId', 'customer1')
      url.searchParams.set('startDate', '2024-01-01')
      url.searchParams.set('endDate', '2024-01-31')
      url.searchParams.set('origin', '北京')
      url.searchParams.set('destination', '上海')
      url.searchParams.set('sortBy', 'plannedDeparture')
      url.searchParams.set('sortOrder', 'asc')

      const request = new NextRequest(url)
      await GET(request)

      expect(DispatchService.getDispatches).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: 'IN_TRANSIT',
        driverId: 'driver1',
        vehicleId: 'vehicle1',
        customerId: 'customer1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        origin: '北京',
        destination: '上海',
        sortBy: 'plannedDeparture',
        sortOrder: 'asc'
      })
    })

    it('应该使用默认参数', async () => {
      ;(DispatchService.getDispatches as jest.Mock).mockResolvedValue({
        dispatches: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      })

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch')
      await GET(request)

      expect(DispatchService.getDispatches).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: undefined,
        driverId: undefined,
        vehicleId: undefined,
        customerId: undefined,
        startDate: undefined,
        endDate: undefined,
        origin: undefined,
        destination: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('应该处理服务层错误', async () => {
      const errorMessage = '数据库查询失败'
      ;(DispatchService.getDispatches as jest.Mock).mockRejectedValue(new Error(errorMessage))

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('获取发车单列表失败')
      expect(data.details).toBe(errorMessage)
    })
  })

  describe('POST method', () => {
    const createDispatchData = {
      orderIds: ['order1', 'order2'],
      vehicleId: 'vehicle1',
      driverId: 'driver1',
      plannedDeparture: '2024-01-15T10:00:00Z',
      originAddress: '北京市朝阳区',
      destinationAddress: '上海市浦东新区',
      totalWeight: 25,
      totalVolume: 40,
      instructions: '小心轻放',
      notes: '测试发车单'
    }

    it('应该成功创建发车单', async () => {
      const mockResult = {
        dispatch: mockDispatches[0],
        shipments: [mockDispatches[0].shipments[0]]
      }

      ;(DispatchService.createDispatch as jest.Mock).mockResolvedValue(mockResult)

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(createDispatchData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockResult)
      expect(data.message).toBe('发车单创建成功')

      expect(DispatchService.createDispatch).toHaveBeenCalledWith(createDispatchData)
    })

    it('应该处理路线优化请求', async () => {
      const optimizeData = {
        action: 'optimize',
        orderIds: ['order1', 'order2'],
        vehicleId: 'vehicle1',
        preferences: {
          prioritizeDistance: true,
          avoidTolls: false
        }
      }

      const mockOptimizedRoute = {
        waypoints: [],
        totalDistance: 150,
        estimatedDuration: 180,
        totalWeight: 25,
        totalVolume: 40
      }

      ;(DispatchService.optimizeRoute as jest.Mock).mockResolvedValue(mockOptimizedRoute)

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(optimizeData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOptimizedRoute)
      expect(data.message).toBe('路线优化成功')

      expect(DispatchService.optimizeRoute).toHaveBeenCalledWith(optimizeData)
    })

    it('应该处理自动调度请求', async () => {
      const autoDispatchData = {
        action: 'auto-dispatch',
        date: '2024-01-15'
      }

      const mockAutoResult = [
        {
          orderId: 'order1',
          dispatchId: 'dispatch1',
          status: 'success'
        }
      ]

      ;(DispatchService.optimizeDispatch as jest.Mock).mockResolvedValue(mockAutoResult)

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(autoDispatchData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockAutoResult)
      expect(data.message).toBe('智能调度完成')

      expect(DispatchService.optimizeDispatch).toHaveBeenCalledWith(new Date('2024-01-15'))
    })

    it('应该处理统计信息请求', async () => {
      const statsData = {
        action: 'statistics',
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      }

      const mockStatistics = {
        totalDispatches: 10,
        completedDispatches: 8,
        completionRate: 80,
        totalShipments: 15,
        avgShipmentsPerDispatch: 1.5
      }

      ;(DispatchService.getDispatchStatistics as jest.Mock).mockResolvedValue(mockStatistics)

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(statsData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockStatistics)
      expect(data.message).toBe('获取统计信息成功')

      expect(DispatchService.getDispatchStatistics).toHaveBeenCalledWith({
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31')
      })
    })

    it('应该处理数据验证错误', async () => {
      const invalidData = {
        // 缺少必需字段
        orderIds: [],
        vehicleId: 'vehicle1'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('数据验证失败')
      expect(data.details).toBeDefined() // 应该包含Zod验证错误详情
    })

    it('应该处理服务层错误', async () => {
      const errorMessage = '创建发车单失败'
      ;(DispatchService.createDispatch as jest.Mock).mockRejectedValue(new Error(errorMessage))

      const request = new NextRequest('http://localhost:3000/api/tms/dispatch', {
        method: 'POST',
        body: JSON.stringify(createDispatchData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('处理发车单请求失败')
      expect(data.details).toBe(errorMessage)
    })
  })
})