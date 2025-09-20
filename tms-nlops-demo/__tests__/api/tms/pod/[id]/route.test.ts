import { NextRequest } from 'next/server'
import { GET } from '@/app/api/tms/pod/[id]/route'
import { PODService } from '@/services/podService'
import { prisma } from '@/lib/db/prisma'

// Mock the dependencies
jest.mock('@/services/podService')

describe('GET /api/tms/pod/[id]', () => {
  const mockPODId = 'pod123'

  const mockPOD = {
    id: mockPODId,
    podNumber: 'POD789012',
    orderId: 'order123',
    documentType: 'PROOF_OF_DELIVERY',
    status: 'UPLOADED',
    fileName: 'timestamp_random.jpg',
    originalName: 'test.jpg',
    fileSize: 1024,
    mimeType: 'image/jpeg',
    filePath: '/uploads/pod/order123/timestamp_random.jpg',
    fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
    checksum: 'md5hash123',
    deliveryLocation: '北京市朝阳区',
    deliveryTime: new Date('2024-01-01T10:00:00Z'),
    receiverName: '张三',
    receiverContact: '13800138000',
    cargoCondition: '良好',
    specialNotes: '贵重物品，请小心搬运',
    tags: ['加急', '易碎'],
    verifiedBy: 'user2',
    verifiedAt: new Date('2024-01-01T11:00:00Z'),
    version: 1,
    createdBy: 'user1',
    updatedBy: 'user2',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-01T11:00:00Z'),
    order: {
      id: 'order123',
      orderNumber: 'ORD001',
      cargoName: '电子产品',
      originAddress: '上海市浦东新区',
      destinationAddress: '北京市朝阳区',
      status: 'DELIVERED'
    },
    signatures: [
      {
        id: 'sig1',
        podId: mockPODId,
        signerId: 'user3',
        signerName: '李四',
        signerType: 'RECEIVER',
        signatureData: 'base64-signature-data',
        signatureType: 'WRITTEN',
        timestamp: new Date('2024-01-01T10:30:00Z'),
        isVerified: false,
        status: 'SIGNED',
        createdAt: new Date('2024-01-01T10:30:00Z')
      }
    ],
    activityLogs: [
      {
        id: 'log1',
        podId: mockPODId,
        action: 'UPLOAD',
        description: 'POD上传成功',
        performedBy: 'user1',
        changes: '{"fileName":"test.jpg","fileSize":1024}',
        metadata: null,
        timestamp: new Date('2024-01-01T10:00:00Z')
      },
      {
        id: 'log2',
        podId: mockPODId,
        action: 'VERIFY',
        description: '验证POD',
        performedBy: 'user2',
        changes: null,
        metadata: '{"notes":"文件清晰，信息完整"}',
        timestamp: new Date('2024-01-01T11:00:00Z')
      }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('成功获取POD详情', () => {
    it('应该返回POD详细信息', async () => {
      // Mock service响应
      ;(PODService.getPODById as jest.Mock).mockResolvedValue(mockPOD)

      // 创建模拟请求
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)

      // 调用API
      const response = await GET(request, { params: { id: mockPODId } })

      // 验证响应
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.message).toBe('POD详情获取成功')

      // 验证关键字段（由于JSON序列化，日期会变成字符串）
      expect(data.data.id).toBe(mockPODId)
      expect(data.data.podNumber).toBe(mockPOD.podNumber)
      expect(data.data.orderId).toBe(mockPOD.orderId)
      expect(data.data.status).toBe(mockPOD.status)
      expect(data.data.fileName).toBe(mockPOD.fileName)
      expect(data.data.receiverName).toBe(mockPOD.receiverName)

      // 验证服务调用
      expect(PODService.getPODById).toHaveBeenCalledWith(mockPODId)
    })

    it('应该包含完整的关联数据', async () => {
      ;(PODService.getPODById as jest.Mock).mockResolvedValue(mockPOD)

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
      const response = await GET(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      const data = await response.json()

      // 验证订单信息
      expect(data.data.order).toEqual(mockPOD.order)

      // 验证签名信息
      expect(data.data.signatures).toHaveLength(1)
      expect(data.data.signatures[0].id).toBe(mockPOD.signatures[0].id)
      expect(data.data.signatures[0].signerName).toBe(mockPOD.signatures[0].signerName)

      // 验证活动日志
      expect(data.data.activityLogs).toHaveLength(2)
      expect(data.data.activityLogs[0].action).toBe(mockPOD.activityLogs[0].action)
      expect(data.data.activityLogs[1].action).toBe(mockPOD.activityLogs[1].action)
    })

    it('应该处理所有POD状态', async () => {
      const statuses = ['PENDING', 'UPLOADED', 'PROCESSING', 'VERIFIED', 'APPROVED', 'REJECTED', 'ARCHIVED']

      for (const status of statuses) {
        ;(PODService.getPODById as jest.Mock).mockResolvedValue({
          ...mockPOD,
          status
        })

        const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
        const response = await GET(request, { params: { id: mockPODId } })

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.data.status).toBe(status)
      }
    })
  })

  describe('POD不存在的情况', () => {
    it('应该返回404错误当POD不存在', async () => {
      // Mock service返回null
      ;(PODService.getPODById as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
      const response = await GET(request, { params: { id: mockPODId } })

      expect(response.status).toBe(404)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('POD不存在')

      // 验证服务调用
      expect(PODService.getPODById).toHaveBeenCalledWith(mockPODId)
    })
  })

  describe('错误处理', () => {
    it('应该处理服务层错误', async () => {
      ;(PODService.getPODById as jest.Mock).mockRejectedValue(
        new Error('数据库连接失败')
      )

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
      const response = await GET(request, { params: { id: mockPODId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('数据库连接失败')
    })

    it('应该处理无效的POD ID', async () => {
      const invalidId = 'invalid-id'
      ;(PODService.getPODById as jest.Mock).mockRejectedValue(
        new Error('无效的POD ID格式')
      )

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${invalidId}`)
      const response = await GET(request, { params: { id: invalidId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('无效的POD ID格式')
    })
  })

  describe('参数处理', () => {
    it('应该处理各种ID格式', async () => {
      const testIds = [
        'pod123',
        '12345',
        'abc-def-ghi',
        'POD_2024_001'
      ]

      for (const testId of testIds) {
        ;(PODService.getPODById as jest.Mock).mockResolvedValue({
          ...mockPOD,
          id: testId
        })

        const request = new NextRequest(`http://localhost:3000/api/tms/pod/${testId}`)
        const response = await GET(request, { params: { id: testId } })

        expect(response.status).toBe(200)
        expect(PODService.getPODById).toHaveBeenCalledWith(testId)
      }
    })

    it('应该正确从URL参数中提取ID', async () => {
      ;(PODService.getPODById as jest.Mock).mockResolvedValue(mockPOD)

      // 测试特殊字符的ID
      const specialId = 'pod_123-456_789'
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${specialId}`)
      const response = await GET(request, { params: { id: specialId } })

      expect(response.status).toBe(200)
      expect(PODService.getPODById).toHaveBeenCalledWith(specialId)
    })
  })

  describe('数据完整性', () => {
    it('应该返回所有必需的字段', async () => {
      ;(PODService.getPODById as jest.Mock).mockResolvedValue(mockPOD)

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
      const response = await GET(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      const data = await response.json()

      // 验证基本字段
      expect(data.data.id).toBe(mockPODId)
      expect(data.data.podNumber).toBeDefined()
      expect(data.data.orderId).toBeDefined()
      expect(data.data.documentType).toBeDefined()
      expect(data.data.status).toBeDefined()
      expect(data.data.fileName).toBeDefined()
      expect(data.data.fileUrl).toBeDefined()
      expect(data.data.createdAt).toBeDefined()
      expect(data.data.updatedAt).toBeDefined()

      // 验证可选字段
      expect(data.data.deliveryLocation).toBeDefined()
      expect(data.data.receiverName).toBeDefined()
      expect(data.data.tags).toBeDefined()
    })

    it('应该正确处理空数组字段', async () => {
      const podWithoutRelations = {
        ...mockPOD,
        signatures: [],
        activityLogs: [],
        tags: []
      }

      ;(PODService.getPODById as jest.Mock).mockResolvedValue(podWithoutRelations)

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}`)
      const response = await GET(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.signatures).toEqual([])
      expect(data.data.activityLogs).toEqual([])
      expect(data.data.tags).toEqual([])
    })
  })
})