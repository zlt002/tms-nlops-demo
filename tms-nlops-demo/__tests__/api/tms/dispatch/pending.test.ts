import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/dispatch/pending/route'
import { DispatchService } from '@/services/dispatchService'

// Mock the DispatchService
jest.mock('@/services/dispatchService')

describe('GET /api/tms/dispatch/pending', () => {
  const mockPendingOrders = [
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
    },
    {
      id: 'order2',
      orderNumber: 'ORD002',
      cargoName: '测试货物2',
      cargoWeight: 15,
      cargoVolume: 25,
      cargoValue: 8000,
      originAddress: '广州市天河区',
      destinationAddress: '深圳市南山区',
      expectedTime: new Date('2024-01-15T14:00:00Z'),
      priority: 'MEDIUM',
      status: 'CONFIRMED',
      customer: {
        id: 'customer2',
        customerNumber: 'CUST002',
        companyName: '测试客户公司2',
        email: 'test2@example.com',
        phone: '13900139000'
      }
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('应该成功获取待调度订单列表', async () => {
    // Mock service response
    ;(DispatchService.getPendingOrders as jest.Mock).mockResolvedValue(mockPendingOrders)

    // Create mock request
    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/pending')

    // Call the handler
    const response = await GET(request)

    // Verify response
    expect(response.status).toBe(200)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.orders).toEqual(mockPendingOrders)
    expect(data.data.total).toBe(2)
    expect(data.data.summary).toEqual({
      totalWeight: 25,
      totalVolume: 45,
      totalValue: 13000,
      highPriorityCount: 1,
      mediumPriorityCount: 1,
      lowPriorityCount: 0
    })
    expect(data.message).toBe('获取待调度订单成功')

    // Verify service was called
    expect(DispatchService.getPendingOrders).toHaveBeenCalledTimes(1)
  })

  it('应该正确计算统计数据', async () => {
    // Test with different priorities
    const ordersWithMixedPriorities = [
      { ...mockPendingOrders[0], priority: 'URGENT' },
      { ...mockPendingOrders[1], priority: 'LOW' },
      {
        ...mockPendingOrders[0],
        id: 'order3',
        priority: 'HIGH',
        cargoWeight: 5,
        cargoVolume: 10
      }
    ]

    ;(DispatchService.getPendingOrders as jest.Mock).mockResolvedValue(ordersWithMixedPriorities)

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/pending')
    const response = await GET(request)
    const data = await response.json()

    expect(data.data.summary.highPriorityCount).toBe(2) // URGENT + HIGH
    expect(data.data.summary.mediumPriorityCount).toBe(0)
    expect(data.data.summary.lowPriorityCount).toBe(1)
    expect(data.data.summary.totalWeight).toBe(30)
    expect(data.data.summary.totalVolume).toBe(55)
  })

  it('应该处理空订单列表', async () => {
    ;(DispatchService.getPendingOrders as jest.Mock).mockResolvedValue([])

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/pending')
    const response = await GET(request)
    const data = await response.json()

    expect(data.success).toBe(true)
    expect(data.data.orders).toEqual([])
    expect(data.data.total).toBe(0)
    expect(data.data.summary).toEqual({
      totalWeight: 0,
      totalVolume: 0,
      totalValue: 0,
      highPriorityCount: 0,
      mediumPriorityCount: 0,
      lowPriorityCount: 0
    })
  })

  it('应该处理服务层错误', async () => {
    const errorMessage = '数据库连接失败'
    ;(DispatchService.getPendingOrders as jest.Mock).mockRejectedValue(new Error(errorMessage))

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/pending')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('获取待调度订单失败')
    expect(data.details).toBe(errorMessage)
  })

  it('应该处理未知错误', async () => {
    ;(DispatchService.getPendingOrders as jest.Mock).mockRejectedValue('Unknown error')

    const request = new NextRequest('http://localhost:3000/api/tms/dispatch/pending')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('获取待调度订单失败')
    expect(data.details).toBe('未知错误')
  })
})