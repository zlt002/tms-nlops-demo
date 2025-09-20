import { NextRequest } from 'next/server'
import { POST } from '@/app/api/tms/pod/[orderId]/route'
import { PODService } from '@/services/podService'
import { FileUploadService } from '@/lib/fileUpload'
import { prisma } from '@/lib/db/prisma'

// Mock the dependencies
jest.mock('@/services/podService')
jest.mock('@/lib/fileUpload')

describe('POST /api/tms/pod/[orderId]', () => {
  const mockOrderId = 'order123'
  const mockFile = new File(['test content'], 'test.jpg', {
    type: 'image/jpeg'
  })

  const mockPOD = {
    id: 'pod123',
    podNumber: 'POD789012',
    orderId: mockOrderId,
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
    version: 1,
    createdBy: 'user1',
    updatedBy: 'user1',
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-01T10:00:00Z'),
    order: {
      id: mockOrderId,
      orderNumber: 'ORD001',
      cargoName: '电子产品',
      originAddress: '上海市浦东新区',
      destinationAddress: '北京市朝阳区',
      status: 'DELIVERED'
    },
    signatures: [],
    activityLogs: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('成功创建POD', () => {
    it('应该成功上传文件并创建POD记录', async () => {
      // Mock file upload service
      ;(FileUploadService.uploadFile as jest.Mock).mockResolvedValue({
        fileName: 'timestamp_random.jpg',
        filePath: '/uploads/pod/order123/timestamp_random.jpg',
        fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
        fileSize: 1024,
        mimeType: 'image/jpeg',
        checksum: 'md5hash123'
      })

      // Mock POD service
      ;(PODService.createPOD as jest.Mock).mockResolvedValue(mockPOD)

      // 创建模拟请求数据
      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('documentType', 'PROOF_OF_DELIVERY')
      formData.append('deliveryLocation', '北京市朝阳区')
      formData.append('deliveryTime', '2024-01-01T10:00:00Z')
      formData.append('receiverName', '张三')
      formData.append('receiverContact', '13800138000')
      formData.append('cargoCondition', '良好')
      formData.append('specialNotes', '贵重物品，请小心搬运')
      formData.append('tags', '加急,易碎')
      formData.append('createdBy', 'user1')

      // 创建模拟请求 - 使用模拟的formData方法
      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      // 调用API
      const response = await POST(request, { params: { orderId: mockOrderId } })

      // 验证响应
      expect(response.status).toBe(201)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockPOD)
      expect(data.message).toBe('POD创建成功')

      // 验证服务调用
      expect(PODService.createPOD).toHaveBeenCalledWith({
        orderId: mockOrderId,
        documentType: 'PROOF_OF_DELIVERY',
        deliveryLocation: '北京市朝阳区',
        deliveryTime: expect.any(Date),
        receiverName: '张三',
        receiverContact: '13800138000',
        cargoCondition: '良好',
        specialNotes: '贵重物品，请小心搬运',
        tags: ['加急', '易碎'],
        metadata: undefined,
        file: mockFile,
        createdBy: 'user1'
      })
    })

    it('应该处理最小必需参数', async () => {
      ;(FileUploadService.uploadFile as jest.Mock).mockResolvedValue({
        fileName: 'timestamp_random.jpg',
        filePath: '/uploads/pod/order123/timestamp_random.jpg',
        fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
        fileSize: 1024,
        mimeType: 'image/jpeg',
        checksum: 'md5hash123'
      })

      ;(PODService.createPOD as jest.Mock).mockResolvedValue({
        ...mockPOD,
        deliveryLocation: undefined,
        deliveryTime: undefined,
        receiverName: undefined,
        receiverContact: undefined,
        cargoCondition: undefined,
        specialNotes: undefined,
        tags: []
      })

      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('createdBy', 'user1')

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(201)
      expect(PODService.createPOD).toHaveBeenCalledWith({
        orderId: mockOrderId,
        file: mockFile,
        createdBy: 'user1',
        tags: []
      })
    })
  })

  describe('错误处理', () => {
    it('应该拒绝非multipart/form-data请求', async () => {
      const request = new NextRequest('http://localhost:3000/api/tms/pod/order123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('必须使用multipart/form-data格式上传文件')
    })

    it('应该处理缺少文件的情况', async () => {
      const formData = new FormData()
      formData.append('documentType', 'PROOF_OF_DELIVERY')
      // 故意不添加file字段

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('必须上传文件')
    })

    it('应该处理文件上传失败', async () => {
      ;(FileUploadService.uploadFile as jest.Mock).mockRejectedValue(
        new Error('文件大小超过限制')
      )

      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('createdBy', 'user1')

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('文件大小超过限制')
    })

    it('应该处理POD创建失败', async () => {
      ;(FileUploadService.uploadFile as jest.Mock).mockResolvedValue({
        fileName: 'timestamp_random.jpg',
        filePath: '/uploads/pod/order123/timestamp_random.jpg',
        fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
        fileSize: 1024,
        mimeType: 'image/jpeg',
        checksum: 'md5hash123'
      })

      ;(PODService.createPOD as jest.Mock).mockRejectedValue(
        new Error('订单不存在')
      )

      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('createdBy', 'user1')

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('订单不存在')
    })

    it('应该处理验证错误', async () => {
      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('deliveryTime', 'invalid-date') // 无效日期

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(400)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('deliveryTime')
    })
  })

  describe('参数处理', () => {
    it('应该正确解析标签字符串', async () => {
      ;(FileUploadService.uploadFile as jest.Mock).mockResolvedValue({
        fileName: 'timestamp_random.jpg',
        filePath: '/uploads/pod/order123/timestamp_random.jpg',
        fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
        fileSize: 1024,
        mimeType: 'image/jpeg',
        checksum: 'md5hash123'
      })

      ;(PODService.createPOD as jest.Mock).mockResolvedValue(mockPOD)

      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('tags', '加急,易碎,重要') // 逗号分隔的标签
      formData.append('createdBy', 'user1')

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(201)
      expect(PODService.createPOD).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['加急', '易碎', '重要']
        })
      )
    })

    it('应该处理空标签字符串', async () => {
      ;(FileUploadService.uploadFile as jest.Mock).mockResolvedValue({
        fileName: 'timestamp_random.jpg',
        filePath: '/uploads/pod/order123/timestamp_random.jpg',
        fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
        fileSize: 1024,
        mimeType: 'image/jpeg',
        checksum: 'md5hash123'
      })

      ;(PODService.createPOD as jest.Mock).mockResolvedValue(mockPOD)

      const formData = new FormData()
      formData.append('file', mockFile)
      formData.append('tags', '') // 空标签
      formData.append('createdBy', 'user1')

      const request = {
        formData: jest.fn().mockResolvedValue(formData),
        headers: new Headers({
          'Content-Type': 'multipart/form-data'
        })
      } as unknown as NextRequest

      const response = await POST(request, { params: { orderId: mockOrderId } })

      expect(response.status).toBe(201)
      expect(PODService.createPOD).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: []
        })
      )
    })
  })
})