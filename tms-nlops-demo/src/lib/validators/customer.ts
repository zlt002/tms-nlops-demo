import { z } from 'zod'
import { CustomerType, CustomerStatus } from '@prisma/client'

const companyInfoSchema = z.object({
  companyName: z.string().min(1, '公司名称不能为空'),
  businessLicense: z.string().optional(),
  taxNumber: z.string().optional(),
  industry: z.string().optional()
})

const personalInfoSchema = z.object({
  firstName: z.string().min(1, '姓名不能为空'),
  lastName: z.string().min(1, '姓名不能为空'),
  idNumber: z.string().optional()
})

const contactInfoSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  phone: z.string().min(1, '电话号码不能为空'),
  secondaryPhone: z.string().optional()
})

const addressSchema = z.object({
  address: z.string().min(1, '地址不能为空'),
  city: z.string().min(1, '城市不能为空'),
  province: z.string().min(1, '省份不能为空'),
  postalCode: z.string().optional()
})

const contactSchema = z.object({
  name: z.string().min(1, '联系人姓名不能为空'),
  position: z.string().optional(),
  phone: z.string().min(1, '电话号码不能为空'),
  email: z.string().email('邮箱格式不正确').optional(),
  isPrimary: z.boolean().default(false)
})

export const createCustomerSchema = z.object({
  customerType: z.nativeEnum(CustomerType),
  companyName: z.string().optional(),
  businessLicense: z.string().optional(),
  taxNumber: z.string().optional(),
  industry: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  idNumber: z.string().optional(),
  email: z.string().email('邮箱格式不正确'),
  phone: z.string().min(1, '电话号码不能为空'),
  secondaryPhone: z.string().optional(),
  address: z.string().min(1, '地址不能为空'),
  city: z.string().min(1, '城市不能为空'),
  province: z.string().min(1, '省份不能为空'),
  postalCode: z.string().optional(),
  creditLimit: z.number().min(0, '信用额度不能为负数').optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  contacts: z.array(contactSchema).optional()
}).refine(data => {
  // 企业客户必须有公司名称
  if (data.customerType === CustomerType.COMPANY && !data.companyName) {
    return false
  }
  // 个人客户必须有姓名
  if (data.customerType === CustomerType.INDIVIDUAL && (!data.firstName || !data.lastName)) {
    return false
  }
  return true
}, {
  message: '企业客户必须提供公司名称，个人客户必须提供姓名',
  path: ['customerType']
})

export const updateCustomerSchema = z.object({
  companyName: z.string().optional(),
  businessLicense: z.string().optional(),
  taxNumber: z.string().optional(),
  industry: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  idNumber: z.string().optional(),
  email: z.string().email('邮箱格式不正确').optional(),
  phone: z.string().min(1, '电话号码不能为空').optional(),
  secondaryPhone: z.string().optional(),
  address: z.string().min(1, '地址不能为空').optional(),
  city: z.string().min(1, '城市不能为空').optional(),
  province: z.string().min(1, '省份不能为空').optional(),
  postalCode: z.string().optional(),
  status: z.nativeEnum(CustomerStatus).optional(),
  creditRating: z.number().min(0).max(100, '信用评分必须在0-100之间').optional(),
  creditLimit: z.number().min(0, '信用额度不能为负数').optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const customerQuerySchema = z.object({
  customerType: z.nativeEnum(CustomerType).optional(),
  status: z.nativeEnum(CustomerStatus).optional(),
  search: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  minCreditRating: z.number().min(0).max(100).optional(),
  maxCreditRating: z.number().min(0).max(100).optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const contactSchema = contactSchema

export const customerContactSchema = z.object({
  name: z.string().min(1, '联系人姓名不能为空'),
  position: z.string().optional(),
  phone: z.string().min(1, '电话号码不能为空'),
  email: z.string().email('邮箱格式不正确').optional(),
  isPrimary: z.boolean().default(false)
})

// 创建客户时的数据转换函数
export function transformCreateCustomerData(data: any) {
  return {
    customerType: data.customerType,
    companyName: data.companyName,
    businessLicense: data.businessLicense,
    taxNumber: data.taxNumber,
    industry: data.industry,
    firstName: data.firstName,
    lastName: data.lastName,
    idNumber: data.idNumber,
    email: data.email,
    phone: data.phone,
    secondaryPhone: data.secondaryPhone,
    address: data.address,
    city: data.city,
    province: data.province,
    postalCode: data.postalCode,
    creditLimit: data.creditLimit || 0,
    paymentTerms: data.paymentTerms,
    notes: data.notes,
    tags: data.tags || [],
    contacts: data.contacts
  }
}

// 更新客户时的数据转换函数
export function transformUpdateCustomerData(data: any) {
  const updateData: any = {}

  // 只更新提供的字段
  if (data.companyName !== undefined) updateData.companyName = data.companyName
  if (data.businessLicense !== undefined) updateData.businessLicense = data.businessLicense
  if (data.taxNumber !== undefined) updateData.taxNumber = data.taxNumber
  if (data.industry !== undefined) updateData.industry = data.industry
  if (data.firstName !== undefined) updateData.firstName = data.firstName
  if (data.lastName !== undefined) updateData.lastName = data.lastName
  if (data.idNumber !== undefined) updateData.idNumber = data.idNumber
  if (data.email !== undefined) updateData.email = data.email
  if (data.phone !== undefined) updateData.phone = data.phone
  if (data.secondaryPhone !== undefined) updateData.secondaryPhone = data.secondaryPhone
  if (data.address !== undefined) updateData.address = data.address
  if (data.city !== undefined) updateData.city = data.city
  if (data.province !== undefined) updateData.province = data.province
  if (data.postalCode !== undefined) updateData.postalCode = data.postalCode
  if (data.status !== undefined) updateData.status = data.status
  if (data.creditRating !== undefined) updateData.creditRating = data.creditRating
  if (data.creditLimit !== undefined) updateData.creditLimit = data.creditLimit
  if (data.paymentTerms !== undefined) updateData.paymentTerms = data.paymentTerms
  if (data.notes !== undefined) updateData.notes = data.notes
  if (data.tags !== undefined) updateData.tags = data.tags

  return updateData
}