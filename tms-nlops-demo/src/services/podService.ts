import { prisma } from '@/lib/db/prisma'
import { DocumentService } from '@/services/documentService'
import { DocumentType, DocumentStatus } from '@prisma/client'

export class PODService {
  static async generatePODNumber(): string {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `POD${timestamp.slice(-6)}${random}`
  }

  static async uploadPOD(data: any) {
    const {
      orderId,
      fileUrl,
      fileName,
      fileSize,
      mimeType,
      uploadedBy,
      deliveryPhoto, // 交货照片
      receiverName,
      receiverSignature, // 签名数据
      deliveryTime,
      notes,
      tags
    } = data

    // 验证订单状态
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { shipments: true }
    })

    if (!order) {
      throw new Error('订单不存在')
    }

    if (order.status !== 'IN_TRANSIT' && order.status !== 'DELIVERED') {
      throw new Error('订单状态不允许上传回单')
    }

    // 创建回单记录
    const pod = await prisma.pOD.create({
      data: {
        podNumber: await this.generatePODNumber(),
        orderId,
        fileUrl,
        fileName,
        fileSize,
        mimeType,
        uploadedBy,
        receiverName,
        receiverSignature,
        deliveryPhoto,
        deliveryTime: deliveryTime || new Date(),
        notes,
        tags: tags || [],
        status: 'UPLOADED',
        createdBy: 'system', // TODO: 从认证用户获取
        createdAt: new Date()
      }
    })

    // 创建文档记录
    await DocumentService.createDocument({
      title: `回单-${order.orderNumber}`,
      type: DocumentType.POD,
      entityType: 'ORDER',
      entityId: orderId,
      fileUrl,
      fileName,
      fileSize,
      mimeType,
      description: `订单${order.orderNumber}的交货回单`,
      tags: ['POD', ...tags || []],
      requiresSignature: false
    })

    // 更新订单状态为已送达
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERED',
        deliveryTime: deliveryTime || new Date()
      }
    })

    return pod
  }

  static async verifyPOD(podId: string, verificationData: any) {
    const pod = await prisma.pOD.findUnique({
      where: { id: podId },
      include: { order: true }
    })

    if (!pod) {
      throw new Error('回单不存在')
    }

    // 验证逻辑
    const verificationResult = await this.performVerification(pod, verificationData)

    // 更新回单状态
    const updatedPOD = await prisma.pOD.update({
      where: { id: podId },
      data: {
        status: verificationResult.isValid ? 'VERIFIED' : 'REJECTED',
        verificationResult: verificationResult,
        verifiedBy: verificationData.verifiedBy,
        verifiedAt: new Date(),
        rejectionReason: verificationResult.isValid ? null : verificationResult.reason,
        updatedAt: new Date()
      }
    })

    // 如果验证通过，更新订单支付状态
    if (verificationResult.isValid) {
      await prisma.order.update({
        where: { id: pod.orderId },
        data: { paymentStatus: 'PAID' }
      })
    }

    return updatedPOD
  }

  static async getPODs(params: any = {}) {
    const {
      page = 1,
      limit = 20,
      orderId,
      status,
      uploaderId,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params

    const where: any = {}

    if (orderId) where.orderId = orderId
    if (status) where.status = status
    if (uploaderId) where.uploadedBy = uploaderId

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }

    const [pods, total] = await Promise.all([
      prisma.pOD.findMany({
        where,
        include: {
          order: {
            include: {
              customer: true,
              shipments: {
                include: {
                  vehicle: true,
                  driver: true
                }
              }
            }
          },
          verifier: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          uploader: {
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
      prisma.pOD.count({ where })
    ])

    return {
      pods,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  static async getPODStats(dateRange?: { start: Date; end: Date }) {
    const where: any = {}
    if (dateRange) {
      where.createdAt = {
        gte: dateRange.start,
        lte: dateRange.end
      }
    }

    const [
      totalPODs,
      verifiedPODs,
      rejectedPODs,
      pendingPODs,
      avgVerificationTime,
      byStatus,
      byUploader
    ] = await Promise.all([
      prisma.pOD.count({ where }),
      prisma.pOD.count({
        where: {
          ...where,
          status: 'VERIFIED'
        }
      }),
      prisma.pOD.count({
        where: {
          ...where,
          status: 'REJECTED'
        }
      }),
      prisma.pOD.count({
        where: {
          ...where,
          status: 'UPLOADED'
        }
      }),
      prisma.pOD.aggregate({
        where: {
          ...where,
          status: 'VERIFIED',
          verifiedAt: { not: null },
          createdAt: { not: null }
        },
        _avg: {
          verificationTime: {
            subtract: ['verifiedAt', 'createdAt']
          }
        }
      }),
      prisma.pOD.groupBy({
        by: ['status'],
        where,
        _count: true
      }),
      prisma.pOD.groupBy({
        by: ['uploadedBy'],
        where,
        _count: true
      })
    ])

    return {
      totalPODs,
      verifiedPODs,
      rejectedPODs,
      pendingPODs,
      verificationRate: totalPODs > 0 ? (verifiedPODs / totalPODs) * 100 : 0,
      avgVerificationTime: avgVerificationTime._avg.verificationTime || 0,
      byStatus,
      topUploaders: byUploader.sort((a, b) => b._count.count - a._count.count).slice(0, 5)
    }
  }

  static async bulkUploadPODs(podDataList: any[]) {
    const results = await Promise.allSettled(
      podDataList.map(data => this.uploadPOD(data))
    )

    const successful = results.filter(r => r.status === 'fulfilled')
    const failed = results.filter(r => r.status === 'rejected')

    return {
      total: podDataList.length,
      successful: successful.length,
      failed: failed.length,
      errors: failed.map(f => (f as PromiseRejectedResult).reason)
    }
  }

  static async generatePODReport(podId: string) {
    const pod = await prisma.pOD.findUnique({
      where: { id: podId },
      include: {
        order: {
          include: {
            customer: true,
            shipments: {
              include: {
                vehicle: true,
                driver: true
              }
            }
          }
        }
      }
    })

    if (!pod) {
      throw new Error('回单不存在')
    }

    // 生成回单报告（简化版）
    const report = {
      podNumber: pod.podNumber,
      orderNumber: pod.order.orderNumber,
      customer: pod.order.customer.companyName || `${pod.order.customer.firstName} ${pod.order.customer.lastName}`,
      deliveryTime: pod.deliveryTime,
      receiverName: pod.receiverName,
      cargo: {
        name: pod.order.cargoName,
        weight: pod.order.cargoWeight,
        volume: pod.order.cargoVolume
      },
      route: {
        origin: pod.order.originAddress,
        destination: pod.order.destinationAddress
      },
      vehicle: pod.order.shipments[0]?.vehicle || null,
      driver: pod.order.shipments[0]?.driver || null,
      verification: {
        status: pod.status,
        verifiedAt: pod.verifiedAt,
        verifiedBy: pod.verifiedBy,
        rejectionReason: pod.rejectionReason
      },
      generatedAt: new Date()
    }

    return report
  }

  private static async performVerification(pod: any, verificationData: any) {
    const issues = []

    // 检查签名
    if (!pod.receiverSignature && !verificationData.signatureWaived) {
      issues.push('缺少收货人签名')
    }

    // 检查照片
    if (!pod.deliveryPhoto && !verificationData.photoWaived) {
      issues.push('缺少交货照片')
    }

    // 检查时间
    const deliveryTime = new Date(pod.deliveryTime)
    const now = new Date()
    const timeDiff = Math.abs(now.getTime() - deliveryTime.getTime())
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24)

    if (daysDiff > 7) {
      issues.push('交货时间超过7天')
    }

    // 检查订单状态
    if (pod.order.status !== 'DELIVERED') {
      issues.push('订单状态不正确')
    }

    return {
      isValid: issues.length === 0,
      issues,
      reason: issues.length > 0 ? issues.join(', ') : null
    }
  }

  static async getPendingVerifications() {
    const pendingPODs = await prisma.pOD.findMany({
      where: {
        status: 'UPLOADED'
      },
      include: {
        order: {
          select: {
            orderNumber: true,
            customer: true
          }
        }
      },
      orderBy: { createdAt: 'asc' },
      take: 50
    })

    return pendingPODs
  }

  static async autoVerifyPODs() {
    // 自动验证规则：上传超过24小时且没有问题的回单
    const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const podsToVerify = await prisma.pOD.findMany({
      where: {
        status: 'UPLOADED',
        createdAt: { lte: threshold },
        receiverSignature: { not: null },
        deliveryPhoto: { not: null }
      }
    })

    const results = await Promise.allSettled(
      podsToVerify.map(pod =>
        this.verifyPOD(pod.id, {
          verifiedBy: 'system',
          autoVerify: true
        })
      )
    )

    return {
      processed: podsToVerify.length,
      successful: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length
    }
  }
}
