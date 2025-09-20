import { z } from 'zod'
import { DriverStatus, LicenseType } from '@prisma/client'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, '名字不能为空'),
  lastName: z.string().min(1, '姓氏不能为空'),
  idNumber: z.string().min(15, '身份证号至少15位'),
  dateOfBirth: z.date(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  phone: z.string().min(11, '手机号不能少于11位'),
  email: z.string().email('邮箱格式不正确').optional(),
  address: z.string().min(1, '地址不能为空'),
  emergencyContact: z.string().min(1, '紧急联系人不能为空'),
  emergencyPhone: z.string().min(11, '紧急联系人电话不能少于11位')
})

const licenseSchema = z.object({
  licenseNumber: z.string().min(1, '驾驶证号不能为空'),
  licenseType: z.nativeEnum(LicenseType),
  issueDate: z.date(),
  expiryDate: z.date(),
  issuingAuthority: z.string().min(1, '发证机关不能为空')
})

const employmentSchema = z.object({
  employeeId: z.string().optional(),
  hireDate: z.date(),
  salary: z.number().min(0, '薪资不能为负数'),
  bankAccount: z.string().optional(),
  bankName: z.string().optional()
})

export const createDriverSchema = z.object({
  personalInfo: personalInfoSchema,
  license: licenseSchema,
  employment: employmentSchema,
  status: z.nativeEnum(DriverStatus).default(DriverStatus.AVAILABLE),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
})

export const updateDriverSchema = z.object({
  personalInfo: personalInfoSchema.partial().optional(),
  license: licenseSchema.partial().optional(),
  employment: employmentSchema.partial().optional(),
  status: z.nativeEnum(DriverStatus).optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const driverQuerySchema = z.object({
  status: z.nativeEnum(DriverStatus).optional(),
  licenseType: z.nativeEnum(LicenseType).optional(),
  availability: z.boolean().optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const driverLocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
  speed: z.number().min(0).optional(),
  heading: z.number().min(0).max(360).optional()
})
