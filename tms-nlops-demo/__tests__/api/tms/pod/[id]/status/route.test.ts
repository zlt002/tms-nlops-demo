import { NextRequest } from 'next/server'
import { PUT } from '@/app/api/tms/pod/[id]/status/route'
import { PODService } from '@/services/podService'
import { prisma } from '@/lib/db/prisma'

// Mock the dependencies
jest.mock('@/services/podService')

describe('PUT /api/tms/pod/[id]/status', () => {
  const mockPODId = 'pod123'

  const mockUpdatedPOD = {
    id: mockPODId,
    podNumber: 'POD789012',
    orderId: 'order123',
    documentType: 'PROOF_OF_DELIVERY',
    status: 'VERIFIED', // 更新后的状态
    fileName: 'timestamp_random.jpg',
    originalName: 'test.jpg',
    fileSize: 1024,
    mimeType: 'image/jpeg',
    filePath: '/uploads/pod/order123/timestamp_random.jpg',
    fileUrl: '/api/tms/pod/files/order123/timestamp_random.jpg',
    checksum: 'md5hash123',
    deliveryLocation: '北京市朝阳区',
    receiverName: '张三',
    cargoCondition: '良好',
    tags: ['加急'],
    version: 1,
    createdBy: 'user1',
    updatedBy: 'system',
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
    signatures: [],
    activityLogs: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('成功更新POD状态', () => {
    it('应该成功更新POD状态', async () => {
      // Mock service响应
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue(mockUpdatedPOD)

      // 创建模拟请求体
      const requestBody = {
        status: 'VERIFIED',
        reason: '文件清晰，信息完整'
      }

      // 创建模拟请求
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      // 调用API
      const response = await PUT(request, { params: { id: mockPODId } })

      // 验证响应
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      // 验证关键字段（由于JSON序列化，日期会变成字符串）
      expect(data.data.id).toBe(mockUpdatedPOD.id)
      expect(data.data.status).toBe(mockUpdatedPOD.status)
      expect(data.data.updatedBy).toBe(mockUpdatedPOD.updatedBy)
      expect(data.message).toBe('POD状态更新成功')

      // 验证服务调用
      expect(PODService.updatePOD).toHaveBeenCalledWith(mockPODId, {
        status: 'VERIFIED',
        reason: '文件清晰，信息完整',
        updatedBy: 'system'
      })
    })

    it('应该处理只更新状态而不提供原因', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue({
        ...mockUpdatedPOD,
        status: 'APPROVED'
      })

      const requestBody = {
        status: 'APPROVED'
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      expect(PODService.updatePOD).toHaveBeenCalledWith(mockPODId, {
        status: 'APPROVED',
        updatedBy: 'system'
      })
    })

    it('应该支持所有有效的POD状态', async () => {
      const validStatuses = [
        'PENDING',
        'UPLOADED',
        'PROCESSING',
        'VERIFIED',
        'APPROVED',
        'REJECTED',
        'ARCHIVED'
      ]

      for (const status of validStatuses) {
        ;(PODService.updatePOD as jest.Mock).mockResolvedValue({
          ...mockUpdatedPOD,
          status
        })

        const requestBody = { status }
        const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        const response = await PUT(request, { params: { id: mockPODId } })

        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data.data.status).toBe(status)
      }
    })

    it('应该正确处理状态转换为REJECTED并包含原因', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue({
        ...mockUpdatedPOD,
        status: 'REJECTED',
        rejectionReason: '文件模糊，无法辨认内容'
      })

      const requestBody = {
        status: 'REJECTED',
        reason: '文件模糊，无法辨认内容'
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      expect(PODService.updatePOD).toHaveBeenCalledWith(mockPODId, {
        status: 'REJECTED',
        reason: '文件模糊，无法辨认内容',
        updatedBy: 'system'
      })
    })
  })

  describe('错误处理', () => {
    it('应该处理服务层错误', async () => {
      ;(PODService.updatePOD as jest.Mock).mockRejectedValue(
        new Error('POD不存在')
      )

      const requestBody = {
        status: 'VERIFIED'
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('POD不存在')
    })

    it('应该处理无效的状态值', async () => {
      const requestBody = {
        status: 'INVALID_STATUS'
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('Invalid option')
    })

    it('应该处理缺少必需的状态字段', async () => {
      const requestBody = {
        reason: '只是原因，没有状态'
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('status')
    })

    it('应该处理JSON解析错误', async () => {
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 'invalid json'
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
    })
  })

  describe('参数处理', () => {
    it('应该正确从URL参数中提取POD ID', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue(mockUpdatedPOD)

      const testIds = ['pod123', '456', 'test-pod-id']

      for (const testId of testIds) {
        const requestBody = { status: 'VERIFIED' }
        const request = new NextRequest(`http://localhost:3000/api/tms/pod/${testId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        const response = await PUT(request, { params: { id: testId } })

        expect(response.status).toBe(200)
        expect(PODService.updatePOD).toHaveBeenCalledWith(testId, expect.any(Object))
      }
    })

    it('应该处理空原因字段', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue(mockUpdatedPOD)

      const requestBody = {
        status: 'VERIFIED',
        reason: '' // 空原因
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      expect(PODService.updatePOD).toHaveBeenCalledWith(mockPODId, {
        status: 'VERIFIED',
        reason: '',
        updatedBy: 'system'
      })
    })

    it('应该处理额外字段（忽略未知字段）', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue(mockUpdatedPOD)

      const requestBody = {
        status: 'VERIFIED',
        reason: '测试原因',
        extraField: '应该被忽略的额外字段',
        anotherExtra: 123
      }

      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      // 验证只传递了已知字段
      expect(PODService.updatePOD).toHaveBeenCalledWith(mockPODId, {
        status: 'VERIFIED',
        reason: '测试原因',
        updatedBy: 'system'
      })
    })
  })

  describe('业务逻辑验证', () => {
    it('应该正确更新时间戳', async () => {
      const beforeUpdate = new Date()

      ;(PODService.updatePOD as jest.Mock).mockImplementation(async (id, data) => {
        // 模拟服务层更新时间戳
        return {
          ...mockUpdatedPOD,
          updatedAt: new Date(),
          updatedBy: data.updatedBy
        }
      })

      const requestBody = { status: 'VERIFIED' }
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      const data = await response.json()

      // 验证更新时间戳被正确设置
      expect(new Date(data.data.updatedAt).getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime())
    })

    it('应该维护版本号', async () => {
      ;(PODService.updatePOD as jest.Mock).mockResolvedValue({
        ...mockUpdatedPOD,
        version: 2 // 版本号应该递增
      })

      const requestBody = { status: 'VERIFIED' }
      const request = new NextRequest(`http://localhost:3000/api/tms/pod/${mockPODId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await PUT(request, { params: { id: mockPODId } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.data.version).toBe(2)
    })
  })
})