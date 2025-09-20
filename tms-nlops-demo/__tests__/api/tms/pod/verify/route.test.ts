import { NextRequest } from 'next/server'
import { POST } from '@/app/api/tms/pod/verify/route'
import { PODService } from '@/services/podService'
import { prisma } from '@/lib/db/prisma'

// Mock the dependencies
jest.mock('@/services/podService')

describe('POST /api/tms/pod/verify', () => {
  const mockPODId = 'pod123'

  const mockVerifiedPOD = {
    id: mockPODId,
    podNumber: 'POD789012',
    orderId: 'order123',
    documentType: 'PROOF_OF_DELIVERY',
    status: 'VERIFIED', // 验证后的状态
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
    verifiedBy: 'system',
    verifiedAt: new Date('2024-01-01T11:00:00Z'),
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

  describe('成功验证POD', () => {
    it('应该成功验证POD', async () => {
      // Mock service响应
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue(mockVerifiedPOD)

      // 创建模拟请求体
      const requestBody = {
        podId: mockPODId,
        action: 'verify',
        notes: '文件清晰，信息完整'
      }

      // 创建模拟请求
      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      // 调用API
      const response = await POST(request)

      // 验证响应
      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.success).toBe(true)
      // 验证关键字段（由于JSON序列化，日期会变成字符串）
      expect(data.data.id).toBe(mockVerifiedPOD.id)
      expect(data.data.status).toBe(mockVerifiedPOD.status)
      expect(data.data.verifiedBy).toBe(mockVerifiedPOD.verifiedBy)
      expect(data.message).toBe('POD验证操作成功')

      // 验证服务调用
      expect(PODService.verifyPOD).toHaveBeenCalledWith({
        podId: mockPODId,
        action: 'verify',
        notes: '文件清晰，信息完整',
        userId: 'system',
        userName: 'System User'
      })
    })

    it('应该成功批准POD', async () => {
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
        ...mockVerifiedPOD,
        status: 'APPROVED',
        approvedBy: 'system',
        approvedAt: new Date('2024-01-01T12:00:00Z')
      })

      const requestBody = {
        podId: mockPODId,
        action: 'approve',
        reason: '符合所有要求'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(PODService.verifyPOD).toHaveBeenCalledWith({
        podId: mockPODId,
        action: 'approve',
        reason: '符合所有要求',
        userId: 'system',
        userName: 'System User'
      })
    })

    it('应该成功拒绝POD并提供原因', async () => {
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
        ...mockVerifiedPOD,
        status: 'REJECTED',
        rejectedBy: 'system',
        rejectedAt: new Date('2024-01-01T12:00:00Z'),
        rejectionReason: '文件模糊，无法辨认内容'
      })

      const requestBody = {
        podId: mockPODId,
        action: 'reject',
        reason: '文件模糊，无法辨认内容',
        notes: '需要重新上传清晰的文件'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(PODService.verifyPOD).toHaveBeenCalledWith({
        podId: mockPODId,
        action: 'reject',
        reason: '文件模糊，无法辨认内容',
        notes: '需要重新上传清晰的文件',
        userId: 'system',
        userName: 'System User'
      })
    })

    it('应该处理最小必需参数', async () => {
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue(mockVerifiedPOD)

      const requestBody = {
        podId: mockPODId,
        action: 'verify'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(PODService.verifyPOD).toHaveBeenCalledWith({
        podId: mockPODId,
        action: 'verify',
        userId: 'system',
        userName: 'System User'
      })
    })
  })

  describe('错误处理', () => {
    it('应该处理服务层错误', async () => {
      ;(PODService.verifyPOD as jest.Mock).mockRejectedValue(
        new Error('POD不存在')
      )

      const requestBody = {
        podId: mockPODId,
        action: 'verify'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('POD不存在')
    })

    it('应该处理无效的操作类型', async () => {
      const requestBody = {
        podId: mockPODId,
        action: 'invalid_action'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('Invalid option')
    })

    it('应该处理缺少必需字段', async () => {
      const requestBody = {
        action: 'verify'
        // 缺少podId
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toContain('podId')
    })

    it('应该处理拒绝操作缺少原因的情况', async () => {
      // 模拟服务层拒绝操作时缺少原因的错误
      ;(PODService.verifyPOD as jest.Mock).mockRejectedValue(
        new Error('拒绝POD必须提供原因')
      )

      const requestBody = {
        podId: mockPODId,
        action: 'reject'
        // 缺少reason
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('拒绝POD必须提供原因')
    })

    it('应该处理JSON解析错误', async () => {
      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: 'invalid json'
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
    })
  })

  describe('业务逻辑验证', () => {
    it('应该验证状态转换的正确性', async () => {
      // 测试从已上传状态验证
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
        ...mockVerifiedPOD,
        status: 'VERIFIED'
      })

      const verifyRequest = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          podId: mockPODId,
          action: 'verify'
        })
      })

      const verifyResponse = await POST(verifyRequest)
      expect(verifyResponse.status).toBe(200)

      // 测试从已验证状态批准
      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
        ...mockVerifiedPOD,
        status: 'APPROVED'
      })

      const approveRequest = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          podId: mockPODId,
          action: 'approve'
        })
      })

      const approveResponse = await POST(approveRequest)
      expect(approveResponse.status).toBe(200)
    })

    it('应该处理无效的状态转换', async () => {
      // 模拟试图批准未验证的POD
      ;(PODService.verifyPOD as jest.Mock).mockRejectedValue(
        new Error('只有已验证的POD才能批准')
      )

      const requestBody = {
        podId: mockPODId,
        action: 'approve'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()

      expect(data.success).toBe(false)
      expect(data.error).toBe('只有已验证的POD才能批准')
    })

    it('应该正确设置审核时间和审核人', async () => {
      const verificationTime = new Date('2024-01-01T11:00:00Z')

      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
        ...mockVerifiedPOD,
        verifiedAt: verificationTime,
        verifiedBy: 'system'
      })

      const requestBody = {
        podId: mockPODId,
        action: 'verify'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(new Date(data.data.verifiedAt)).toEqual(verificationTime)
      expect(data.data.verifiedBy).toBe('system')
    })

    it('应该支持所有验证操作类型', async () => {
      const actions = ['verify', 'approve', 'reject']

      for (const action of actions) {
        ;(PODService.verifyPOD as jest.Mock).mockResolvedValue({
          ...mockVerifiedPOD,
          status: action === 'verify' ? 'VERIFIED' : action === 'approve' ? 'APPROVED' : 'REJECTED'
        })

        const requestBody = {
          podId: mockPODId,
          action,
          ...(action === 'reject' && { reason: '测试拒绝原因' })
        }

        const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })

        const response = await POST(request)

        expect(response.status).toBe(200)
        expect(PODService.verifyPOD).toHaveBeenCalledWith(
          expect.objectContaining({
            action,
            userId: 'system',
            userName: 'System User'
          })
        )
      }
    })
  })

  describe('数据完整性', () => {
    it('应该包含完整的审核信息', async () => {
      const approvedPOD = {
        ...mockVerifiedPOD,
        status: 'APPROVED',
        verifiedBy: 'verifier1',
        verifiedAt: new Date('2024-01-01T11:00:00Z'),
        approvedBy: 'approver1',
        approvedAt: new Date('2024-01-01T12:00:00Z')
      }

      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue(approvedPOD)

      const requestBody = {
        podId: mockPODId,
        action: 'approve'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      // 验证验证信息
      expect(data.data.verifiedBy).toBe('verifier1')
      expect(data.data.verifiedAt).toBeDefined()

      // 验证批准信息
      expect(data.data.approvedBy).toBe('approver1')
      expect(data.data.approvedAt).toBeDefined()
    })

    it('应该处理拒绝时的拒绝原因', async () => {
      const rejectedPOD = {
        ...mockVerifiedPOD,
        status: 'REJECTED',
        rejectedBy: 'rejector1',
        rejectedAt: new Date('2024-01-01T12:00:00Z'),
        rejectionReason: '文件质量不合格'
      }

      ;(PODService.verifyPOD as jest.Mock).mockResolvedValue(rejectedPOD)

      const requestBody = {
        podId: mockPODId,
        action: 'reject',
        reason: '文件质量不合格'
      }

      const request = new NextRequest('http://localhost:3000/api/tms/pod/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()

      expect(data.data.rejectedBy).toBe('rejector1')
      expect(data.data.rejectedAt).toBeDefined()
      expect(data.data.rejectionReason).toBe('文件质量不合格')
    })
  })
})