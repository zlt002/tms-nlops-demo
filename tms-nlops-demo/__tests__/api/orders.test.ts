import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/orders/route'

// Mock prisma
jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    order: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn()
    },
    customer: {
      findUnique: jest.fn()
    }
  }
}))

// Mock OrderService
jest.mock('@/services/orderService', () => ({
  OrderService: {
    getOrders: jest.fn(),
    createOrder: jest.fn(),
    getOrdersStats: jest.fn()
  }
}))

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: async () => data,
      headers: new Map()
    }))
  }
}))

describe('Orders API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/orders', () => {
    it('should return orders list', async () => {
      const mockOrders = [
        {
          id: '1',
          orderNumber: 'ORD-20240120-0001',
          status: 'PENDING',
          totalAmount: 1000
        }
      ]

      const { OrderService } = require('@/services/orderService')
      OrderService.getOrders.mockResolvedValue({
        orders: mockOrders,
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          pages: 1
        }
      })

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'GET'
      })

      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOrders)
      expect(data.pagination).toBeDefined()
    })

    it('should filter orders by status', async () => {
      const { OrderService } = require('@/services/orderService')
      OrderService.getOrders.mockResolvedValue({
        orders: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          pages: 0
        }
      })

      const request = new NextRequest('http://localhost:3000/api/orders?status=PENDING', {
        method: 'GET'
      })

      await GET(request)

      expect(OrderService.getOrders).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'PENDING'
        })
      )
    })
  })

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const mockOrder = {
        id: '1',
        orderNumber: 'ORD-20240120-0001',
        status: 'PENDING',
        totalAmount: 1000
      }

      const { OrderService } = require('@/services/orderService')
      OrderService.createOrder.mockResolvedValue(mockOrder)

      const orderData = {
        customerId: 'customer-1',
        originAddress: 'Address A',
        destinationAddress: 'Address B',
        cargoName: 'Test Cargo',
        cargoWeight: 100,
        cargoVolume: 50
      }

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockOrder)
      expect(OrderService.createOrder).toHaveBeenCalledWith(orderData)
    })

    it('should return error for invalid order data', async () => {
      const invalidOrder = {
        customerId: 'customer-1',
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invalidOrder)
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })
  })
})