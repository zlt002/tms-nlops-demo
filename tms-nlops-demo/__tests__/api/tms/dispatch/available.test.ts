import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/dispatch/available/route'
import { DispatchService } from '@/services/dispatchService'

// Mock the DispatchService
jest.mock('@/services/dispatchService')

describe('GET /api/tms/dispatch/available', () => {
  const mockOrders = [
    {
      id: 'order1',
      orderNumber: 'ORD001',
      cargoName: '测试货物1',
      cargoWeight: 10,
      cargoVolume: 20,
      cargoValue: 5000,
      originAddress: '北京市朝阳区',
      destinationAddress: '上海市浦东新区',
      expectedTime: new Date('2024-01-15T10:00:00Z'),
      priority: 'HIGH',
      status: 'CONFIRMED',
      customer: {
        id: 'customer1',
        customerNumber: 'CUST001',
        companyName: '测试客户公司',
        email: 'test@example.com',
        phone: '13800138000'
      }
    }
  ]

  const mockVehicles = [
    {
      id: 'vehicle1',
      licensePlate: '京A12345',
      type: 'TRUCK',
      maxLoad: 20,
      maxVolume: 40,
      status: 'AVAILABLE',
      fuelLevel: 80,
      dailyRate: 500,
      driver: {
        id: 'driver1',
        name: '张三',
        phone: '13800138001',
        licenseNumber: 'D123456',
        status: 'AVAILABLE'
      }
    },
    {
      id: 'vehicle2',
      licensePlate: '京A67890',
      type: 'VAN',
      maxLoad: 5,
      maxVolume: 15,
      status: 'AVAILABLE',
      fuelLevel: 60,
      dailyRate: 300,
      driver: {
        id: 'driver2',
        name: '李四',
        phone: '13800138002',
        licenseNumber: 'D789012',
        status: 'AVAILABLE'
      }
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('应该成功获取可用资源列表', async () => {
    // Mock service responses
    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue(mockOrders)
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue(mockVehicles)

    // Create mock request
    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')

    // Call the handler
    const response = await GET(request)

    // Verify response
    expect(response.status).toBe(200)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.orders).toEqual(mockOrders)
    expect(data.data.vehicles).toEqual(mockVehicles)
    expect(data.message).toBe('获取可用资源成功')

    // Verify services were called
    expect(DispatchService.getAvailableOrders).toHaveBeenCalledTimes(1)
    expect(DispatchService.getAvailableVehicles).toHaveBeenCalledTimes(1)
  })

  it('应该正确计算容量利用率', async () => {
    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue(mockOrders)
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue(mockVehicles)

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    const summary = data.data.summary

    // 总容量: 20+5=25吨, 40+15=55立方米
    // 需求: 10吨, 20立方米
    expect(summary.capacityUtilization.weight).toBe(40) // 10/25*100
    expect(summary.capacityUtilization.volume).toBe(36.36) // 20/55*100 (约等于)
  })

  it('应该正确计算紧急度统计', async () => {
    const ordersWithDifferentPriorities = [
      { ...mockOrders[0], priority: 'URGENT' },
      { ...mockOrders[0], id: 'order2', priority: 'HIGH' },
      { ...mockOrders[0], id: 'order3', priority: 'MEDIUM', expectedTime: new Date('2024-01-16T10:00:00Z') }
    ]

    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue(ordersWithDifferentPriorities)
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue(mockVehicles)

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    const urgency = data.data.summary.urgency

    expect(urgency.highPriorityOrders).toBe(2) // URGENT + HIGH
    // 今天订单数取决于当前日期和订单日期
    expect(urgency.ordersToday).toBeGreaterThanOrEqual(0)
  })

  it('应该正确计算车辆统计信息', async () => {
    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue(mockOrders)
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue(mockVehicles)

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    const vehicleStats = data.data.summary.vehicleStats

    expect(vehicleStats.totalCapacity.weight).toBe(25) // 20+5
    expect(vehicleStats.totalCapacity.volume).toBe(55) // 40+15
    expect(vehicleStats.averageDailyRate).toBe(400) // (500+300)/2
  })

  it('应该处理空资源列表', async () => {
    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue([])
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.orders).toEqual([])
    expect(data.data.vehicles).toEqual([])
    expect(data.data.summary.orderCount).toBe(0)
    expect(data.data.summary.vehicleCount).toBe(0)
  })

  it('应该处理除零错误', async () => {
    ;(DispatchService.getAvailableOrders as jest.Mock).mockResolvedValue([])
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    // 当没有车辆时，平均日租金应该是0，不应该出错
    expect(data.data.summary.vehicleStats.averageDailyRate).toBe(0)
    expect(data.data.summary.capacityUtilization.weight).toBe(0)
    expect(data.data.summary.capacityUtilization.volume).toBe(0)
  })

  it('应该处理服务层错误', async () => {
    const errorMessage = '数据库查询失败'
    ;(DispatchService.getAvailableOrders as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('获取可用资源失败')
    expect(data.details).toBe(errorMessage)
  })

  it('应该处理并发调用失败', async () => {
    ;(DispatchService.getAvailableOrders as jest.Mock).mockRejectedValue(new Error('订单服务失败'))
    ;(DispatchService.getAvailableVehicles as jest.Mock).mockRejectedValue(new Error('车辆服务失败'))

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/available')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('获取可用资源失败')
  })
})