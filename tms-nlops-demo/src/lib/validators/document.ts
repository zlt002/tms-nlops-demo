import { z } from 'zod'
import { DocumentType, DocumentStatus } from '@prisma/client'

export const createDocumentSchema = z.object({
  title: z.string().min(1, '文档标题不能为空'),
  type: z.nativeEnum(DocumentType),
  entityType: z.enum(['ORDER', 'VEHICLE', 'DRIVER', 'CUSTOMER', 'SHIPMENT']),
  entityId: z.string().min(1, '关联实体ID不能为空'),
  fileUrl: z.string().url('文件URL格式不正确'),
  fileName: z.string().min(1, '文件名不能为空'),
  fileSize: z.number().min(0, '文件大小不能为负数'),
  mimeType: z.string().min(1, '文件类型不能为空'),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  expiryDate: z.date().optional(),
  requiresSignature: z.boolean().default(false),
  signedBy: z.string().optional(),
  signedAt: z.date().optional(),
  notes: z.string().optional()
})

export const updateDocumentSchema = z.object({
  title: z.string().min(1, '文档标题不能为空').optional(),
  type: z.nativeEnum(DocumentType).optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  expiryDate: z.date().optional(),
  status: z.nativeEnum(DocumentStatus).optional(),
  requiresSignature: z.boolean().optional(),
  signedBy: z.string().optional(),
  signedAt: z.date().optional(),
  notes: z.string().optional()
})

export const documentQuerySchema = z.object({
  type: z.nativeEnum(DocumentType).optional(),
  status: z.nativeEnum(DocumentStatus).optional(),
  entityType: z.enum(['ORDER', 'VEHICLE', 'DRIVER', 'CUSTOMER', 'SHIPMENT']).optional(),
  entityId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  expirySoon: z.boolean().optional(),
  requiresSignature: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const documentUploadSchema = z.object({
  file: z.any(),
  entityType: z.enum(['ORDER', 'VEHICLE', 'DRIVER', 'CUSTOMER', 'SHIPMENT']),
  entityId: z.string(),
  type: z.nativeEnum(DocumentType),
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  expiryDate: z.date().optional(),
  requiresSignature: z.boolean().default(false)
})
