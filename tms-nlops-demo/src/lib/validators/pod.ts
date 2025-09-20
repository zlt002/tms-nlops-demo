import { z } from 'zod'
import {
  PODDocumentType,
  PODStatus,
  SignatureType,
  SignatureStatus
} from '@prisma/client'

export const createPODSchema = z.object({
  orderId: z.string().min(1, '订单ID不能为空'),
  documentType: z.nativeEnum(PODDocumentType).default(PODDocumentType.PROOF_OF_DELIVERY),
  deliveryLocation: z.string().optional(),
  deliveryTime: z.date().optional(),
  receiverName: z.string().optional(),
  receiverContact: z.string().optional(),
  cargoCondition: z.string().optional(),
  specialNotes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  metadata: z.string().optional()
})

export const updatePODSchema = z.object({
  documentType: z.nativeEnum(PODDocumentType).optional(),
  deliveryLocation: z.string().optional(),
  deliveryTime: z.date().optional(),
  receiverName: z.string().optional(),
  receiverContact: z.string().optional(),
  cargoCondition: z.string().optional(),
  specialNotes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.string().optional(),
  status: z.nativeEnum(PODStatus).optional(),
  rejectionReason: z.string().optional()
})

export const createPODSignatureSchema = z.object({
  signerId: z.string().min(1, '签署人ID不能为空'),
  signerName: z.string().min(1, '签署人姓名不能为空'),
  signerType: z.string().min(1, '签署人类型不能为空'),
  signatureData: z.string().min(1, '签名数据不能为空'),
  signatureType: z.nativeEnum(SignatureType).default(SignatureType.WRITTEN),
  reason: z.string().optional(),
  location: z.string().optional()
})

export const verifyPODSchema = z.object({
  podId: z.string().min(1, 'POD ID不能为空'),
  action: z.enum(['verify', 'approve', 'reject'], {
    errorMap: () => ({ message: '操作类型必须是verify、approve或reject' })
  }),
  reason: z.string().optional(),
  notes: z.string().optional()
})

export const podQuerySchema = z.object({
  orderId: z.string().optional(),
  documentType: z.nativeEnum(PODDocumentType).optional(),
  status: z.nativeEnum(PODStatus).optional(),
  receiverName: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: '必须上传文件' })
    .refine(file => file.size <= 10 * 1024 * 1024, '文件大小不能超过10MB')
    .refine(
      file => [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ].includes(file.type),
      '只支持JPG、PNG、GIF、PDF、DOC、DOCX格式的文件'
    )
})

// 扩展创建POD Schema，包含文件上传验证
export const createPODWithFileSchema = createPODSchema.extend({
  file: fileUploadSchema.shape.file
})

export const updatePODStatusSchema = z.object({
  status: z.nativeEnum(PODStatus, {
    errorMap: () => ({ message: '无效的POD状态' })
  }),
  reason: z.string().optional()
})

// 类型导出
export type CreatePODInput = z.infer<typeof createPODSchema>
export type UpdatePODInput = z.infer<typeof updatePODSchema>
export type CreatePODSignatureInput = z.infer<typeof createPODSignatureSchema>
export type VerifyPODInput = z.infer<typeof verifyPODSchema>
export type PODQueryInput = z.infer<typeof podQuerySchema>
export type UpdatePODStatusInput = z.infer<typeof updatePODStatusSchema>
export type FileUploadInput = z.infer<typeof fileUploadSchema>