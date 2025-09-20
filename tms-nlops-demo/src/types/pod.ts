import {
  PODDocumentType,
  PODStatus,
  SignatureType,
  SignatureStatus
} from '../../../prisma/generated/client'

export interface POD {
  id: string
  podNumber: string
  orderId: string
  documentType: PODDocumentType
  status: PODStatus

  // 文件信息
  fileName: string
  originalName: string
  fileSize: number
  mimeType: string
  filePath: string
  fileUrl: string
  checksum: string

  // POD特有信息
  deliveryLocation?: string
  deliveryTime?: Date
  receiverName?: string
  receiverContact?: string
  cargoCondition?: string
  specialNotes?: string

  // 审核信息
  verifiedBy?: string
  verifiedAt?: Date
  approvedBy?: string
  approvedAt?: Date
  rejectedBy?: string
  rejectedAt?: Date
  rejectionReason?: string

  // 元数据
  tags: string[]
  metadata?: string
  version: number

  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date

  // 关联数据（可选）
  order?: {
    id: string
    orderNumber: string
    cargoName: string
    originAddress: string
    destinationAddress: string
    status: string
  }
  signatures?: PODSignature[]
  activityLogs?: PODActivityLog[]
}

export interface PODSignature {
  id: string
  podId: string
  signerId: string
  signerName: string
  signerType: string
  signatureData: string
  signatureType: SignatureType

  // 签署信息
  ipAddress?: string
  userAgent?: string
  location?: string
  timestamp: Date

  // 验证信息
  verificationCode?: string
  isVerified: boolean
  verifiedAt?: Date
  verifiedBy?: string

  status: SignatureStatus
  reason?: string

  createdAt: Date
}

export interface PODActivityLog {
  id: string
  podId: string
  action: string
  description: string
  performedBy: string
  changes?: string
  metadata?: string
  ipAddress?: string
  userAgent?: string
  timestamp: Date
}

export interface CreatePODRequest {
  orderId: string
  documentType?: PODDocumentType
  file: File
  deliveryLocation?: string
  deliveryTime?: Date
  receiverName?: string
  receiverContact?: string
  cargoCondition?: string
  specialNotes?: string
  tags?: string[]
  metadata?: string
}

export interface UpdatePODRequest {
  documentType?: PODDocumentType
  deliveryLocation?: string
  deliveryTime?: Date
  receiverName?: string
  receiverContact?: string
  cargoCondition?: string
  specialNotes?: string
  tags?: string[]
  metadata?: string
  status?: PODStatus
  rejectionReason?: string
}

export interface CreatePODSignatureRequest {
  signerId: string
  signerName: string
  signerType: string
  signatureData: string
  signatureType?: SignatureType
  reason?: string
  location?: string
}

export interface VerifyPODRequest {
  podId: string
  action: 'verify' | 'approve' | 'reject'
  reason?: string
  notes?: string
}

export interface PODQueryParams {
  orderId?: string
  documentType?: PODDocumentType
  status?: PODStatus
  receiverName?: string
  startDate?: Date
  endDate?: Date
  tags?: string[]
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PODListResponse {
  pods: POD[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface PODStatistics {
  totalPODs: number
  byStatus: Record<PODStatus, number>
  byDocumentType: Record<PODDocumentType, number>
  averageProcessingTime: number
  rejectionRate: number
  recentUploads: POD[]
}