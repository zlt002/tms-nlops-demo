import { CustomerType, CustomerStatus } from '@prisma/client'

export interface Customer {
  id: string
  customerNumber: string
  customerType: CustomerType

  // 公司信息
  companyName?: string
  businessLicense?: string
  taxNumber?: string
  industry?: string

  // 个人信息
  firstName?: string
  lastName?: string
  idNumber?: string

  // 联系信息
  email: string
  phone: string
  secondaryPhone?: string

  // 地址信息
  address: string
  city: string
  province: string
  postalCode?: string

  // 客户状态
  status: CustomerStatus
  creditRating: number

  // 财务信息
  creditLimit: number
  outstandingBalance: number
  paymentTerms?: string

  // 业务统计
  totalOrders: number
  totalAmount: number
  lastOrderDate?: Date

  // 元数据
  notes?: string
  tags: string[]
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date

  // 关联数据
  contacts?: CustomerContact[]
  orders?: Order[]
  shipments?: Shipment[]
  documents?: Document[]
}

export interface CustomerContact {
  id: string
  customerId: string
  name: string
  position?: string
  phone: string
  email?: string
  isPrimary: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateCustomerRequest {
  customerType: CustomerType
  companyName?: string
  businessLicense?: string
  taxNumber?: string
  industry?: string
  firstName?: string
  lastName?: string
  idNumber?: string
  email: string
  phone: string
  secondaryPhone?: string
  address: string
  city: string
  province: string
  postalCode?: string
  creditLimit?: number
  paymentTerms?: string
  notes?: string
  tags?: string[]
  contacts?: Omit<CustomerContact, 'id' | 'customerId' | 'createdAt' | 'updatedAt'>[]
}

export interface UpdateCustomerRequest {
  companyName?: string
  businessLicense?: string
  taxNumber?: string
  industry?: string
  firstName?: string
  lastName?: string
  idNumber?: string
  email?: string
  phone?: string
  secondaryPhone?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  status?: CustomerStatus
  creditRating?: number
  creditLimit?: number
  paymentTerms?: string
  notes?: string
  tags?: string[]
}

export interface CustomerQueryParams {
  customerType?: CustomerType
  status?: CustomerStatus
  search?: string
  city?: string
  province?: string
  minCreditRating?: number
  maxCreditRating?: number
  tags?: string[]
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface CustomerStats {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  totalOrders: number
  totalAmount: number
  averageCreditRating: number
  topCustomers: Customer[]
  customersByType: {
    COMPANY: number
    INDIVIDUAL: number
  }
  customersByStatus: {
    ACTIVE: number
    INACTIVE: number
    SUSPENDED: number
    BLACKLISTED: number
  }
}

// 为了完整性，添加其他相关类型
export interface Order {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: Date
}

export interface Shipment {
  id: string
  shipmentNumber: string
  status: string
  originAddress: string
  destinationAddress: string
  departureTime?: Date
  estimatedArrival?: Date
  actualArrival?: Date
}

export interface Document {
  id: string
  title: string
  type: string
  fileUrl: string
  uploadedAt: Date
}