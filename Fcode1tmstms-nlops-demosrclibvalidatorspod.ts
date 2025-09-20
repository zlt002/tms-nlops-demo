import { z } from 'zod'

export const podUploadSchema = z.object({
  orderId: z.string().min(1, '订单ID不能为空'),
  fileUrl: z.string().url('文件URL格式不正确'),
  fileName: z.string().min(1, '文件名不能为空'),
  fileSize: z.number().positive('文件大小必须大于0'),
  mimeType: z.string().min(1, '文件类型不能为空'),
  deliveryPhoto: z.string().url('交货照片URL格式不正确').optional(),
  receiverName: z.string().min(1, '收货人姓名不能为空'),
  receiverSignature: z.string().min(1, '签名数据不能为空').optional(),
  deliveryTime: z.string().datetime('交货时间格式不正确').optional(),
  notes: z.string().max(500, '备注不能超过500字符').optional(),
  tags: z.array(z.string()).default([])
})

export const podVerificationSchema = z.object({
  signatureWaived: z.boolean().default(false),
  photoWaived: z.boolean().default(false),
  verifiedBy: z.string().min(1, '验证人不能为空'),
  notes: z.string().max(500, '备注不能超过500字符').optional(),
  autoVerify: z.boolean().default(false)
})

export const podQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  orderId: z.string().optional(),
  status: z.enum(['UPLOADED', 'VERIFIED', 'REJECTED']).optional(),
  uploaderId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['createdAt', 'deliveryTime', 'verifiedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const bulkUploadSchema = z.object({
  pods: z.array(podUploadSchema).min(1, '至少需要一个回单').max(100, '批量上传不能超过100个回单')
})

export const podReportSchema = z.object({
  podId: z.string().min(1, '回单ID不能为空'),
  format: z.enum(['json', 'pdf']).default('json'),
  includeDetails: z.boolean().default(true),
  includeVerification: z.boolean().default(true)
})
