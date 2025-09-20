import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/pod/route'
import { PODService } from '@/services/podService'
import { prisma } from '@/lib/db/prisma'

// Mock the dependencies
jest.mock('@/services/podService')

describe('GET /api/tms/pod', () => {
  const mockPODs = [
    {
      id: '1',
      podNumber: 'POD123456',
      orderId: 'order1',
      documentType: 'PROOF_OF_DELIVERY',
      status: 'UPLOADED',
      fileName: 'test.jpg',
      originalName: 'test.jpg',
      fileSize: 1024,
      mimeType: 'image/jpeg',
      filePath: '/uploads/pod/order1/test.jpg',
      fileUrl: '/api/tms/pod/files/order1/test.jpg',
      checksum: 'md5hash',
      deliveryLocation: '北京市朝阳区',
      receiverName: '张三',
      cargoCondition: '良好',
      tags: ['加急', '重要'],
      version: 1,
      createdBy: 'user1',
      updatedBy: 'user1',
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString(),
      order: {
        id: 'order1',
        orderNumber: 'ORD001',
        cargoName: '电子产品',
        originAddress: '上海市浦东新区',
        destinationAddress: '北京市朝阳区',
        status: 'DELIVERED'
      },
      signatures: [],
      activityLogs: []
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

  describe('成功获取POD列表', () => {
    it('应该返回POD列表和分页信息', async () => {
      // Mock service响应
      ;(PODService.getPODs as jest.Mock).mockResolvedValue({
        pods: mockPODs,
        pagination: mockPagination
      })

      // 创建模拟请求
      const request = new NextRequest('http://localhost:3000/api/tms/pod?page=1&limit=20&status=UPLOADED')

      // 调用API
      const response = await GET(request)

      // 验证响应
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockPODs)
      expect(data.pagination).toEqual(mockPagination)
      expect(data.message).toBe('POD列表获取成功')

      // 验证服务调用
      expect(PODService.getPODs).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        status: 'UPLOADED',
        sortOrder: 'desc',
        sortBy: 'createdAt'
      })
    })

    it('应该支持各种查询参数', async () => {
      ;(PODService.getPODs as jest.Mock).mockResolvedValue({
        pods: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 }
      })

      const request = new NextRequest(
        'http://localhost:3000/api/tms/pod?orderId=order1&documentType=PROOF_OF_DELIVERY&receiverName=张三&tags=加急,重要&search=test&page=2&limit=10&sortBy=createdAt&sortOrder=asc'
      )

      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(PODService.getPODs).toHaveBeenCalledWith({
        orderId: 'order1',
        documentType: 'PROOF_OF_DELIVERY',
        receiverName: '张三',
        tags: ['加急', '重要'],
        search: 'test',
        page: 2,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'asc'
      })
    })

    it('应该处理日期范围查询', async () => {
      ;(PODService.getPODs as jest.Mock).mockResolvedValue({
        pods: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      })

      const startDate = '2024-01-01'
      const endDate = '2024-01-31'
      const request = new NextRequest(
        `http://localhost:3000/api/tms/pod?startDate=${startDate}&endDate=${endDate}`
      )

      const response = await GET(request)

      expect(response.status).toBe(200)
      const callArgs = (PODService.getPODs as jest.Mock).mock.calls[0][0]

      expect(callArgs.startDate).toBeInstanceOf(Date)
      expect(callArgs.endDate).toBeInstanceOf(Date)
      expect(callArgs.startDate?.toISOString()).toBe(new Date(startDate).toISOString())
      expect(callArgs.endDate?.toISOString()).toBe(new Date(endDate).toISOString())
    })
  })

  describe('错误处理', () => {
    it('应该处理服务层错误', async () => {
      ;(PODService.getPODs as jest.Mock).mockRejectedValue(
        new Error('数据库连接失败')
      )

      const request = new NextRequest('http://localhost:3000/api/tms/pod')

      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据库连接失败')
    })

    it('应该处理验证错误', async () => {
      // 使用无效的页码
      const request = new NextRequest('http://localhost:3000/api/tms/pod?page=0')

      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('page')
    })
  })

  describe('默认参数处理', () => {
    it('应该使用默认的分页参数', async () => {
      ;(PODService.getPODs as jest.Mock).mockResolvedValue({
        pods: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      })

      const request = new NextRequest('http://localhost:3000/api/tms/pod')

      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(PODService.getPODs).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('应该处理空的可选参数', async () => {
      ;(PODService.getPODs as jest.Mock).mockResolvedValue({
        pods: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 }
      })

      const request = new NextRequest('http://localhost:3000/api/tms/pod?orderId=&tags=')

      const response = await GET(request)

      expect(response.status).toBe(200)
      const callArgs = (PODService.getPODs as jest.Mock).mock.calls[0][0]

      expect(callArgs.orderId).toBeUndefined()
      expect(callArgs.tags).toEqual([]) // 空字符串应该转换为空数组
    })
  })
})