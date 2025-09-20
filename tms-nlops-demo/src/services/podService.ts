import { prisma } from '@/lib/db/prisma'
import { PODStatus, PODDocumentType } from '../../../prisma/generated/client'
import { FileUploadService } from '@/lib/fileUpload'
import { CreatePODInput, UpdatePODInput, CreatePODSignatureInput, VerifyPODInput, PODQueryInput } from '@/lib/validators/pod'
import { POD, PODSignature, PODActivityLog, PODStatistics } from '@/types/pod'

export class PODService {
  static async createPOD(data: CreatePODInput & { file: File; createdBy: string }): Promise<POD> {
    // 上传文件
    const fileInfo = await FileUploadService.uploadFile(data.file, data.orderId)

    // 生成POD编号
    const podNumber = await this.generatePODNumber(data.documentType || PODDocumentType.PROOF_OF_DELIVERY)

    // 创建POD记录
    const pod = await prisma.pOD.create({
      data: {
        podNumber,
        orderId: data.orderId,
        documentType: data.documentType || PODDocumentType.PROOF_OF_DELIVERY,
        status: PODStatus.UPLOADED,

        // 文件信息
        fileName: fileInfo.fileName,
        originalName: data.file.name,
        fileSize: fileInfo.fileSize,
        mimeType: fileInfo.mimeType,
        filePath: fileInfo.filePath,
        fileUrl: fileInfo.fileUrl,
        checksum: fileInfo.checksum,

        // POD特有信息
        deliveryLocation: data.deliveryLocation,
        deliveryTime: data.deliveryTime,
        receiverName: data.receiverName,
        receiverContact: data.receiverContact,
        cargoCondition: data.cargoCondition,
        specialNotes: data.specialNotes,

        // 元数据
        tags: data.tags || [],
        metadata: data.metadata,

        createdBy: data.createdBy,
        updatedBy: data.createdBy
      },
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            cargoName: true,
            originAddress: true,
            destinationAddress: true,
            status: true
          }
        }
      }
    })

    // 添加活动日志
    await this.createActivityLog(pod.id, 'UPLOAD', 'POD上传成功', data.createdBy, {
      fileName: fileInfo.fileName,
      fileSize: fileInfo.fileSize,
      mimeType: fileInfo.mimeType
    })

    return this.transformPOD(pod)
  }

  static async getPODs(params: PODQueryInput): Promise<{
    pods: POD[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }> {
    const {
      page = 1,
      limit = 20,
      orderId,
      documentType,
      status,
      receiverName,
      startDate,
      endDate,
      tags,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (orderId) where.orderId = orderId
    if (documentType) where.documentType = documentType
    if (status) where.status = status
    if (receiverName) {
      where.receiverName = {
        contains: receiverName,
        mode: 'insensitive'
      }
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags
      }
    }

    if (search) {
      where.OR = [
        { podNumber: { contains: search, mode: 'insensitive' } },
        { receiverName: { contains: search, mode: 'insensitive' } },
        { deliveryLocation: { contains: search, mode: 'insensitive' } },
        { specialNotes: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [pods, total] = await Promise.all([
      prisma.pOD.findMany({
        where,
        include: {
          order: {
            select: {
              id: true,
              orderNumber: true,
              cargoName: true,
              originAddress: true,
              destinationAddress: true,
              status: true
            }
          },
          signatures: {
            orderBy: { timestamp: 'desc' },
            take: 3
          },
          activityLogs: {
            orderBy: { timestamp: 'desc' },
            take: 5
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.pOD.count({ where })
    ])

    return {
      pods: pods.map(pod => this.transformPOD(pod)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getPODById(id: string): Promise<POD | null> {
    const pod = await prisma.pOD.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            cargoName: true,
            originAddress: true,
            destinationAddress: true,
            status: true
          }
        },
        signatures: {
          orderBy: { timestamp: 'desc' }
        },
        activityLogs: {
          orderBy: { timestamp: 'desc' },
          take: 20
        }
      }
    })

    return pod ? this.transformPOD(pod) : null
  }

  static async updatePOD(id: string, data: UpdatePODInput & { updatedBy: string }): Promise<POD> {
    const existingPOD = await prisma.pOD.findUnique({
      where: { id }
    })

    if (!existingPOD) {
      throw new Error('POD不存在')
    }

    const updateData: any = {
      updatedBy: data.updatedBy,
      updatedAt: new Date()
    }

    // 更新字段
    const updatableFields = [
      'documentType', 'deliveryLocation', 'deliveryTime', 'receiverName',
      'receiverContact', 'cargoCondition', 'specialNotes', 'tags', 'metadata', 'status', 'rejectionReason'
    ]

    updatableFields.forEach(field => {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    })

    const updatedPOD = await prisma.pOD.update({
      where: { id },
      data: updateData,
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            cargoName: true,
            originAddress: true,
            destinationAddress: true,
            status: true
          }
        },
        signatures: {
          orderBy: { timestamp: 'desc' },
          take: 3
        },
        activityLogs: {
          orderBy: { timestamp: 'desc' },
          take: 5
        }
      }
    })

    // 添加活动日志
    await this.createActivityLog(id, 'UPDATE', 'POD信息更新', data.updatedBy, data)

    return this.transformPOD(updatedPOD)
  }

  static async verifyPOD(data: VerifyPODInput & { userId: string; userName: string }): Promise<POD> {
    const pod = await prisma.pOD.findUnique({
      where: { id: data.podId }
    })

    if (!pod) {
      throw new Error('POD不存在')
    }

    let newStatus = pod.status
    const updateData: any = {
      updatedBy: data.userId,
      updatedAt: new Date()
    }

    switch (data.action) {
      case 'verify':
        if (pod.status !== PODStatus.UPLOADED) {
          throw new Error('只有已上传的POD才能验证')
        }
        newStatus = PODStatus.VERIFIED
        updateData.verifiedBy = data.userId
        updateData.verifiedAt = new Date()
        break

      case 'approve':
        if (pod.status !== PODStatus.VERIFIED) {
          throw new Error('只有已验证的POD才能批准')
        }
        newStatus = PODStatus.APPROVED
        updateData.approvedBy = data.userId
        updateData.approvedAt = new Date()
        break

      case 'reject':
        if (!data.reason) {
          throw new Error('拒绝POD必须提供原因')
        }
        newStatus = PODStatus.REJECTED
        updateData.rejectedBy = data.userId
        updateData.rejectedAt = new Date()
        updateData.rejectionReason = data.reason
        break
    }

    updateData.status = newStatus

    const updatedPOD = await prisma.pOD.update({
      where: { id: data.podId },
      data: updateData,
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            cargoName: true,
            originAddress: true,
            destinationAddress: true,
            status: true
          }
        }
      }
    })

    // 添加活动日志
    await this.createActivityLog(
      data.podId,
      data.action.toUpperCase(),
      `${data.action === 'verify' ? '验证' : data.action === 'approve' ? '批准' : '拒绝'}POD`,
      data.userId,
      { reason: data.reason, notes: data.notes }
    )

    return this.transformPOD(updatedPOD)
  }

  static async createSignature(data: CreatePODSignatureInput & { podId: string }): Promise<PODSignature> {
    const signature = await prisma.pODSignature.create({
      data: {
        podId: data.podId,
        signerId: data.signerId,
        signerName: data.signerName,
        signerType: data.signerType,
        signatureData: data.signatureData,
        signatureType: data.signatureType,
        reason: data.reason,
        location: data.location,
        status: 'SIGNED' as any
      }
    })

    // 添加活动日志
    await this.createActivityLog(
      data.podId,
      'SIGNATURE',
      '添加签名',
      data.signerId,
      { signerName: data.signerName, signerType: data.signerType }
    )

    return {
      id: signature.id,
      podId: signature.podId,
      signerId: signature.signerId,
      signerName: signature.signerName,
      signerType: signature.signerType,
      signatureData: signature.signatureData,
      signatureType: signature.signatureType,
      timestamp: signature.timestamp,
      isVerified: signature.isVerified,
      status: signature.status,
      createdAt: signature.createdAt
    }
  }

  static async getStatistics(dateRange?: { start: Date; end: Date }): Promise<PODStatistics> {
    const where: any = {}
    if (dateRange) {
      where.createdAt = {
        gte: dateRange.start,
        lte: dateRange.end
      }
    }

    const [
      totalPODs,
      byStatus,
      byDocumentType,
      recentUploads
    ] = await Promise.all([
      prisma.pOD.count({ where }),
      prisma.pOD.groupBy({
        by: ['status'],
        where,
        _count: true
      }),
      prisma.pOD.groupBy({
        by: ['documentType'],
        where,
        _count: true
      }),
      prisma.pOD.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          order: {
            select: {
              orderNumber: true,
              cargoName: true
            }
          }
        }
      })
    ])

    const statusCounts = byStatus.reduce((acc, item) => {
      acc[item.status] = item._count
      return acc
    }, {} as Record<PODStatus, number>)

    const typeCounts = byDocumentType.reduce((acc, item) => {
      acc[item.documentType] = item._count
      return acc
    }, {} as Record<PODDocumentType, number>)

    return {
      totalPODs,
      byStatus: statusCounts,
      byDocumentType: typeCounts,
      averageProcessingTime: this.calculateAverageProcessingTime(byStatus),
      rejectionRate: totalPODs > 0 ? (statusCounts[PODStatus.REJECTED] || 0) / totalPODs : 0,
      recentUploads: recentUploads.map(pod => this.transformPOD(pod))
    }
  }

  private static async generatePODNumber(documentType: PODDocumentType): Promise<string> {
    const prefix = {
      [PODDocumentType.PROOF_OF_DELIVERY]: 'POD',
      [PODDocumentType.BILL_OF_LADING]: 'BOL',
      [PODDocumentType.INVOICE]: 'INV',
      [PODDocumentType.RECEIPT]: 'REC',
      [PODDocumentType.PHOTOGRAPH]: 'PHO',
      [PODDocumentType.CERTIFICATE]: 'CERT',
      [PODDocumentType.OTHER]: 'DOC'
    }[documentType]

    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}${timestamp.slice(-6)}${random}`
  }

  private static async createActivityLog(
    podId: string,
    action: string,
    description: string,
    performedBy: string,
    changes?: any,
    metadata?: any
  ): Promise<void> {
    await prisma.pODActivityLog.create({
      data: {
        podId,
        action,
        description,
        performedBy,
        changes: changes ? JSON.stringify(changes) : undefined,
        metadata: metadata ? JSON.stringify(metadata) : undefined
      }
    })
  }

  private static transformPOD(pod: any): POD {
    return {
      id: pod.id,
      podNumber: pod.podNumber,
      orderId: pod.orderId,
      documentType: pod.documentType,
      status: pod.status,
      fileName: pod.fileName,
      originalName: pod.originalName,
      fileSize: pod.fileSize,
      mimeType: pod.mimeType,
      filePath: pod.filePath,
      fileUrl: pod.fileUrl,
      checksum: pod.checksum,
      deliveryLocation: pod.deliveryLocation,
      deliveryTime: pod.deliveryTime,
      receiverName: pod.receiverName,
      receiverContact: pod.receiverContact,
      cargoCondition: pod.cargoCondition,
      specialNotes: pod.specialNotes,
      verifiedBy: pod.verifiedBy,
      verifiedAt: pod.verifiedAt,
      approvedBy: pod.approvedBy,
      approvedAt: pod.approvedAt,
      rejectedBy: pod.rejectedBy,
      rejectedAt: pod.rejectedAt,
      rejectionReason: pod.rejectionReason,
      tags: pod.tags,
      metadata: pod.metadata,
      version: pod.version,
      createdBy: pod.createdBy,
      updatedBy: pod.updatedBy,
      createdAt: pod.createdAt,
      updatedAt: pod.updatedAt,
      order: pod.order,
      signatures: pod.signatures?.map((sig: any) => ({
        id: sig.id,
        podId: sig.podId,
        signerId: sig.signerId,
        signerName: sig.signerName,
        signerType: sig.signerType,
        signatureData: sig.signatureData,
        signatureType: sig.signatureType,
        timestamp: sig.timestamp,
        isVerified: sig.isVerified,
        status: sig.status,
        createdAt: sig.createdAt
      })) || [],
      activityLogs: pod.activityLogs?.map((log: any) => ({
        id: log.id,
        podId: log.podId,
        action: log.action,
        description: log.description,
        performedBy: log.performedBy,
        changes: log.changes,
        metadata: log.metadata,
        timestamp: log.timestamp
      })) || []
    }
  }

  private static calculateAverageProcessingTime(byStatus: any[]): number {
    // 简化计算，实际应用中应该基于具体的时间差
    const total = byStatus.reduce((sum, item) => sum + item._count, 0)
    return total > 0 ? 24 : 0 // 假设平均处理时间为24小时
  }
}
