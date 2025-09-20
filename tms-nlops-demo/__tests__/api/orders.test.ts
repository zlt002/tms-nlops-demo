import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/orders/route'
import { GET as GET_BY_ID, PUT, DELETE } from '@/app/api/orders/[id]/route'
import { prisma } from '@/lib/db/prisma'
import { OrderService } from '@/services/orderService'
import { OrderStatus, Priority, PaymentStatus } from '@prisma/client'

// Mock prisma
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn()
    },
    customer: {
      findUnique: jest.fn()
    }
  }
}))

// Mock OrderService
jest.mock('@/services/orderService', () => ({
  OrderService: {
    calculateOrderTotal: jest.fn(),
    updateOrderStatus: jest.fn()
  }
}))

describe('Orders API', () => {
  const mockOrder = {
    id: 'order-1',
    orderNumber: 'ORD123456',
    customerId: 'customer-1',
    cargoName: '电子产品',
    cargoWeight: 100,
    cargoVolume: 2,
    cargoValue: 50000,
    originAddress: '北京市朝阳区',
    destinationAddress: '上海市浦东新区',
    originContact: '张三',
    destinationContact: '李四',
    expectedTime: new Date(),
    status: OrderStatus.PENDING,
    priority: Priority.MEDIUM,
    totalAmount: 1000,
    paymentStatus: PaymentStatus.UNPAID,
    notes: '测试订单',
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date(),
    updatedAt: new Date(),
    customer: {
      id: 'customer-1',
      name: '测试客户'
    },
    shipments: [],
    documents: [],
    trackingLogs: []
  }

  const mockCustomer = {
    id: 'customer-1',
    name: '测试客户'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/orders', () => {
    it('应该成功获取订单列表', async () => {
      const mockOrders = [mockOrder]
      const mockTotal = 1

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.order.count as jest.Mock).mockResolvedValue(mockTotal)

      const request = new NextRequest('http://localhost:3000/api/orders?page=1&limit=10')
      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOrders)
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        pages: 1
      })
    })

    it('应该支持按状态筛选订单', async () => {
      const mockOrders = [mockOrder]
      const mockTotal = 1

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.order.count as jest.Mock).mockResolvedValue(mockTotal)

      const request = new NextRequest('http://localhost:3000/api/orders?status=PENDING')
      await GET(request)

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: OrderStatus.PENDING
          })
        })
      )
    })

    it('应该支持按客户ID筛选订单', async () => {
      const mockOrders = [mockOrder]
      const mockTotal = 1

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.order.count as jest.Mock).mockResolvedValue(mockTotal)

      const request = new NextRequest('http://localhost:3000/api/orders?customerId=customer-1')
      await GET(request)

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            customerId: 'customer-1'
          })
        })
      )
    })

    it('应该支持日期范围筛选', async () => {
      const mockOrders = [mockOrder]
      const mockTotal = 1

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.order.count as jest.Mock).mockResolvedValue(mockTotal)

      const startDate = '2023-01-01'
      const endDate = '2023-12-31'
      const request = new NextRequest(`http://localhost:3000/api/orders?startDate=${startDate}&endDate=${endDate}`)
      await GET(request)

      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: expect.objectContaining({
              gte: new Date(startDate),
              lte: new Date(endDate)
            })
          })
        })
      )
    })
  })

  describe('POST /api/orders', () => {
    const validOrderData = {
      customerId: 'customer-1',
      cargo: {
        name: '电子产品',
        weight: 100,
        volume: 2,
        value: 50000
      },
      addresses: {
        origin: '北京市朝阳区',
        destination: '上海市浦东新区',
        originContact: '张三',
        destinationContact: '李四'
      },
      expectedTime: new Date(),
      priority: Priority.MEDIUM,
      notes: '测试订单'
    }

    it('应该成功创建订单', async () => {
      ;(prisma.customer.findUnique as jest.Mock).mockResolvedValue(mockCustomer)
      ;(OrderService.calculateOrderTotal as jest.Mock).mockResolvedValue(1000)
      ;(prisma.order.create as jest.Mock).mockResolvedValue(mockOrder)

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validOrderData)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOrder)
      expect(data.message).toBe('订单创建成功')
    })

    it('应该验证必需字段', async () => {
      const invalidData = {
        customerId: 'customer-1',
        // 缺少必需的货物和地址信息
      }

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invalidData)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.success).toBe(false)
    })

    it('应该验证客户存在', async () => {
      ;(prisma.customer.findUnique as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validOrderData)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
    })
  })

  describe('GET /api/orders/[id]', () => {
    it('应该成功获取订单详情', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder)

      const request = new NextRequest('http://localhost:3000/api/orders/order-1')
      const response = await GET_BY_ID(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOrder)
    })

    it('应该返回404当订单不存在时', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/orders/non-existent')
      const response = await GET_BY_ID(request, { params: { id: 'non-existent' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBe('订单不存在')
    })
  })

  describe('PUT /api/orders/[id]', () => {
    it('应该成功更新订单', async () => {
      const updatedOrder = { ...mockOrder, status: OrderStatus.CONFIRMED }
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder)
      ;(OrderService.updateOrderStatus as jest.Mock).mockResolvedValue(updatedOrder)
      ;(prisma.order.update as jest.Mock).mockResolvedValue(updatedOrder)

      const updateData = {
        status: OrderStatus.CONFIRMED
      }

      const request = new NextRequest('http://localhost:3000/api/orders/order-1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      const response = await PUT(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('订单更新成功')
    })

    it('应该验证订单状态转换', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder)
      ;(OrderService.updateOrderStatus as jest.Mock).mockImplementation(() => {
        throw new Error('无法从 PENDING 转换到 DELIVERED')
      })

      const updateData = {
        status: OrderStatus.DELIVERED
      }

      const request = new NextRequest('http://localhost:3000/api/orders/order-1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      const response = await PUT(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(500)
    })

    it('应该返回404当订单不存在时', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(null)

      const updateData = {
        status: OrderStatus.CONFIRMED
      }

      const request = new NextRequest('http://localhost:3000/api/orders/non-existent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      const response = await PUT(request, { params: { id: 'non-existent' } })

      expect(response.status).toBe(404)
    })
  })

  describe('DELETE /api/orders/[id]', () => {
    it('应该成功删除订单', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder)
      ;(prisma.order.delete as jest.Mock).mockResolvedValue(mockOrder)

      const request = new NextRequest('http://localhost:3000/api/orders/order-1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('订单删除成功')
    })

    it('应该只允许删除PENDING状态的订单', async () => {
      const inTransitOrder = { ...mockOrder, status: OrderStatus.IN_TRANSIT }
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(inTransitOrder)

      const request = new NextRequest('http://localhost:3000/api/orders/order-1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: 'order-1' } })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBe('只有待处理的订单才能删除')
    })

    it('应该返回404当订单不存在时', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/orders/non-existent', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: 'non-existent' } })

      expect(response.status).toBe(404)
    })
  })
})