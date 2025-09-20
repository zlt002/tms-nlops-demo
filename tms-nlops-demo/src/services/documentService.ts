import { prisma } from '@/lib/db/prisma'
import { DocumentType, DocumentStatus } from '@prisma/client'

export class DocumentService {
  static async createDocument(data: any) {
    // 生成文档编号
    const documentNumber = await this.generateDocumentNumber(data.type)

    return await prisma.document.create({
      data: {
        documentNumber,
        title: data.title,
        type: data.type,
        entityType: data.entityType,
        entityId: data.entityId,
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        description: data.description,
        tags: data.tags || [],
        expiryDate: data.expiryDate,
        requiresSignature: data.requiresSignature || false,
        status: DocumentStatus.ACTIVE,
        createdBy: 'system', // TODO: 从认证用户获取
        updatedBy: 'system'
      }
    })
  }

  static async updateDocument(id: string, data: any) {
    const updateData: any = {
      updatedBy: 'system', // TODO: 从认证用户获取
      updatedAt: new Date()
    }

    if (data.title !== undefined) updateData.title = data.title
    if (data.type !== undefined) updateData.type = data.type
    if (data.description !== undefined) updateData.description = data.description
    if (data.tags !== undefined) updateData.tags = data.tags
    if (data.expiryDate !== undefined) updateData.expiryDate = data.expiryDate
    if (data.status !== undefined) updateData.status = data.status
    if (data.requiresSignature !== undefined) updateData.requiresSignature = data.requiresSignature
    if (data.signedBy !== undefined) updateData.signedBy = data.signedBy
    if (data.signedAt !== undefined) updateData.signedAt = data.signedAt
    if (data.notes !== undefined) updateData.notes = data.notes

    return await prisma.document.update({
      where: { id },
      data: updateData
    })
  }

  static async getDocumentsWithStats(params: any = {}) {
    const {
      page = 1,
      limit = 20,
      type,
      status,
      entityType,
      entityId,
      search,
      tags,
      expirySoon,
      requiresSignature,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (type) where.type = type
    if (status) where.status = status
    if (entityType) where.entityType = entityType
    if (entityId) where.entityId = entityId
    if (requiresSignature !== undefined) where.requiresSignature = requiresSignature

    if (expirySoon) {
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      where.expiryDate = {
        lte: thirtyDaysFromNow,
        gte: new Date()
      }
    }

    if (search) {
      where.OR = [
        { documentNumber: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { fileName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags
      }
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: {
          createdByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          updatedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder
        }
      }),
      prisma.document.count({ where })
    ])

    // 计算文档统计信息
    const documentsWithStats = documents.map(doc => ({
      ...doc,
      isExpiringSoon: doc.expiryDate &&
        new Date(doc.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000, // 30天内过期
      isExpired: doc.expiryDate && new Date(doc.expiryDate) < new Date(),
      isSigned: doc.requiresSignature && !!doc.signedBy
    }))

    return {
      documents: documentsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getDocumentsByEntity(entityType: string, entityId: string) {
    const documents = await prisma.document.findMany({
      where: {
        entityType,
        entityId,
        status: DocumentStatus.ACTIVE
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return documents.map(doc => ({
      ...doc,
      isExpiringSoon: doc.expiryDate &&
        new Date(doc.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000,
      isExpired: doc.expiryDate && new Date(doc.expiryDate) < new Date()
    }))
  }

  static async signDocument(id: string, signerId: string, signatureData?: any) {
    const document = await prisma.document.findUnique({
      where: { id }
    })

    if (!document) {
      throw new Error('文档不存在')
    }

    if (!document.requiresSignature) {
      throw new Error('该文档不需要签名')
    }

    if (document.status !== DocumentStatus.ACTIVE) {
      throw new Error('只有激活状态的文档才能签名')
    }

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        signedBy: signerId,
        signedAt: new Date(),
        status: DocumentStatus.SIGNED,
        signatureData: signatureData,
        updatedBy: 'system' // TODO: 从认证用户获取
      }
    })

    return updatedDocument
  }

  static async checkExpiredDocuments() {
    const now = new Date()

    const expiredDocuments = await prisma.document.findMany({
      where: {
        expiryDate: {
          lt: now
        },
        status: DocumentStatus.ACTIVE
      }
    })

    // 批量更新过期文档状态
    if (expiredDocuments.length > 0) {
      await prisma.document.updateMany({
        where: {
          id: {
            in: expiredDocuments.map(d => d.id)
          }
        },
        data: {
          status: DocumentStatus.EXPIRED
        }
      })
    }

    return expiredDocuments
  }

  static async getDocumentStatistics(dateRange?: { start: Date; end: Date }) {
    const where: any = {}
    if (dateRange) {
      where.createdAt = {
        gte: dateRange.start,
        lte: dateRange.end
      }
    }

    const [
      totalDocuments,
      activeDocuments,
      expiredDocuments,
      signedDocuments,
      documentsByType,
      documentsByEntityType,
      totalFileSize
    ] = await Promise.all([
      prisma.document.count({ where }),
      prisma.document.count({
        where: {
          ...where,
          status: DocumentStatus.ACTIVE
        }
      }),
      prisma.document.count({
        where: {
          ...where,
          status: DocumentStatus.EXPIRED
        }
      }),
      prisma.document.count({
        where: {
          ...where,
          requiresSignature: true,
          signedBy: { not: null }
        }
      }),
      prisma.document.groupBy({
        by: ['type'],
        where,
        _count: true
      }),
      prisma.document.groupBy({
        by: ['entityType'],
        where,
        _count: true
      }),
      prisma.document.aggregate({
        where,
        _sum: {
          fileSize: true
        }
      })
    ])

    return {
      totalDocuments,
      activeDocuments,
      expiredDocuments,
      signedDocuments,
      documentsByType,
      documentsByEntityType,
      totalFileSize: totalFileSize._sum.fileSize || 0,
      averageFileSize: totalDocuments > 0 ? (totalFileSize._sum.fileSize || 0) / totalDocuments : 0
    }
  }

  private static async generateDocumentNumber(type: DocumentType): Promise<string> {
    const typePrefix = {
      [DocumentType.INVOICE]: 'INV',
      [DocumentType.RECEIPT]: 'REC',
      [DocumentType.CONTRACT]: 'CON',
      [DocumentType.CERTIFICATE]: 'CERT',
      [DocumentType.INSURANCE]: 'INS',
      [DocumentType.LICENSE]: 'LIC',
      [DocumentType.POD]: 'POD',
      [DocumentType.OTHER]: 'DOC'
    }

    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${typePrefix[type]}${timestamp.slice(-6)}${random}`
  }

  static async validateDocumentAccess(documentId: string, userId: string, userRole: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        order: {
          select: {
            customerId: true
          }
        },
        vehicle: {
          select: {
            driverId: true
          }
        }
      }
    })

    if (!document) {
      throw new Error('文档不存在')
    }

    // 根据用户角色验证访问权限
    switch (userRole) {
      case 'ADMIN':
        return true
      case 'CUSTOMER':
        return document.entityType === 'ORDER' && document.order?.customerId === userId
      case 'DRIVER':
        return document.entityType === 'VEHICLE' && document.vehicle?.driverId === userId
      default:
        return false
    }
  }
}