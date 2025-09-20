import { prisma } from '@/lib/db/prisma'
import { CustomerType, CustomerStatus } from '@prisma/client'
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerQueryParams,
  CustomerStats,
  CustomerContact
} from '@/types/customer'
import {
  createCustomerSchema,
  updateCustomerSchema,
  customerQuerySchema,
  transformCreateCustomerData,
  transformUpdateCustomerData
} from '@/lib/validators/customer'

export class CustomerService {
  static async createCustomer(data: CreateCustomerRequest, userId: string): Promise<Customer> {
    const validatedData = createCustomerSchema.parse(transformCreateCustomerData(data))

    // 检查邮箱是否已存在
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: validatedData.email }
    })

    if (existingCustomer) {
      throw new Error('邮箱已被使用')
    }

    // 生成客户编号
    const customerNumber = this.generateCustomerNumber(validatedData.customerType)

    const customerData: any = {
      customerNumber,
      customerType: validatedData.customerType,
      email: validatedData.email,
      phone: validatedData.phone,
      secondaryPhone: validatedData.secondaryPhone,
      address: validatedData.address,
      city: validatedData.city,
      province: validatedData.province,
      postalCode: validatedData.postalCode,
      creditLimit: validatedData.creditLimit || 0,
      paymentTerms: validatedData.paymentTerms,
      notes: validatedData.notes,
      tags: validatedData.tags || [],
      createdBy: userId,
      updatedBy: userId
    }

    // 根据客户类型添加特定字段
    if (validatedData.customerType === CustomerType.COMPANY) {
      customerData.companyName = validatedData.companyName
      customerData.businessLicense = validatedData.businessLicense
      customerData.taxNumber = validatedData.taxNumber
      customerData.industry = validatedData.industry
    }

    if (validatedData.customerType === CustomerType.INDIVIDUAL) {
      customerData.firstName = validatedData.firstName
      customerData.lastName = validatedData.lastName
      customerData.idNumber = validatedData.idNumber
    }

    const customer = await prisma.customer.create({
      data: customerData,
      include: {
        contacts: true
      }
    })

    // 创建联系人
    if (validatedData.contacts && validatedData.contacts.length > 0) {
      const contactData = validatedData.contacts.map(contact => ({
        customerId: customer.id,
        name: contact.name,
        position: contact.position,
        phone: contact.phone,
        email: contact.email,
        isPrimary: contact.isPrimary
      }))

      await prisma.customerContact.createMany({
        data: contactData
      })

      // 重新获取包含联系人的客户信息
      const customerWithContacts = await prisma.customer.findUnique({
        where: { id: customer.id },
        include: {
          contacts: true
        }
      })

      return customerWithContacts as Customer
    }

    return customer as Customer
  }

  static async getCustomersWithStats(params: CustomerQueryParams) {
    const validatedParams = customerQuerySchema.parse(params)

    const where: any = {}
    if (validatedParams.customerType) where.customerType = validatedParams.customerType
    if (validatedParams.status) where.status = validatedParams.status
    if (validatedParams.city) where.city = validatedParams.city
    if (validatedParams.province) where.province = validatedParams.province
    if (validatedParams.minCreditRating !== undefined || validatedParams.maxCreditRating !== undefined) {
      where.creditRating = {}
      if (validatedParams.minCreditRating !== undefined) where.creditRating.gte = validatedParams.minCreditRating
      if (validatedParams.maxCreditRating !== undefined) where.creditRating.lte = validatedParams.maxCreditRating
    }
    if (validatedParams.tags && validatedParams.tags.length > 0) {
      where.tags = {
        hasSome: validatedParams.tags
      }
    }

    // 搜索功能
    if (validatedParams.search) {
      where.OR = [
        { customerNumber: { contains: validatedParams.search } },
        { companyName: { contains: validatedParams.search } },
        { firstName: { contains: validatedParams.search } },
        { lastName: { contains: validatedParams.search } },
        { email: { contains: validatedParams.search } },
        { phone: { contains: validatedParams.search } }
      ]
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          contacts: true,
          orders: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
              totalAmount: true,
              createdAt: true
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: {
              orders: true,
              shipments: true,
              contacts: true
            }
          }
        },
        skip: (validatedParams.page - 1) * validatedParams.limit,
        take: validatedParams.limit,
        orderBy: {
          [validatedParams.sortBy]: validatedParams.sortOrder
        }
      }),
      prisma.customer.count({ where })
    ])

    return {
      customers: customers as Customer[],
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        pages: Math.ceil(total / validatedParams.limit)
      }
    }
  }

  static async getCustomerById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        contacts: {
          orderBy: { isPrimary: 'desc' }
        },
        orders: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            totalAmount: true,
            createdAt: true,
            expectedTime: true
          },
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        shipments: {
          select: {
            id: true,
            shipmentNumber: true,
            status: true,
            originAddress: true,
            destinationAddress: true,
            departureTime: true,
            estimatedArrival: true
          },
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        documents: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            orders: true,
            shipments: true,
            contacts: true,
            documents: true
          }
        }
      }
    })

    return customer as Customer | null
  }

  static async updateCustomer(id: string, data: UpdateCustomerRequest, userId: string): Promise<Customer> {
    const validatedData = updateCustomerSchema.parse(transformUpdateCustomerData(data))

    const existingCustomer = await prisma.customer.findUnique({
      where: { id }
    })

    if (!existingCustomer) {
      throw new Error('客户不存在')
    }

    // 检查邮箱是否已被其他客户使用
    if (validatedData.email && validatedData.email !== existingCustomer.email) {
      const emailExists = await prisma.customer.findUnique({
        where: { email: validatedData.email }
      })

      if (emailExists) {
        throw new Error('邮箱已被使用')
      }
    }

    const updateData: any = {
      ...validatedData,
      updatedBy: userId,
      updatedAt: new Date()
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        contacts: true
      }
    })

    return updatedCustomer as Customer
  }

  static async deleteCustomer(id: string): Promise<void> {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            orders: true,
            shipments: true
          }
        }
      }
    })

    if (!customer) {
      throw new Error('客户不存在')
    }

    // 检查客户是否有关联的订单或运单
    if (customer._count.orders > 0 || customer._count.shipments > 0) {
      throw new Error('客户存在关联的订单或运单，无法删除')
    }

    await prisma.customer.delete({
      where: { id }
    })
  }

  static async getCustomerContacts(customerId: string): Promise<CustomerContact[]> {
    const contacts = await prisma.customerContact.findMany({
      where: { customerId },
      orderBy: { isPrimary: 'desc' }
    })

    return contacts as CustomerContact[]
  }

  static async addCustomerContact(customerId: string, contactData: any, userId: string): Promise<CustomerContact> {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    })

    if (!customer) {
      throw new Error('客户不存在')
    }

    // 如果设置为主要联系人，先将其他联系人设为非主要
    if (contactData.isPrimary) {
      await prisma.customerContact.updateMany({
        where: { customerId },
        data: { isPrimary: false }
      })
    }

    const contact = await prisma.customerContact.create({
      data: {
        customerId,
        name: contactData.name,
        position: contactData.position,
        phone: contactData.phone,
        email: contactData.email,
        isPrimary: contactData.isPrimary || false
      }
    })

    return contact as CustomerContact
  }

  static async updateCustomerContact(contactId: string, data: any): Promise<CustomerContact> {
    const existingContact = await prisma.customerContact.findUnique({
      where: { id: contactId }
    })

    if (!existingContact) {
      throw new Error('联系人不存在')
    }

    // 如果设置为主要联系人，先将同客户的其他联系人设为非主要
    if (data.isPrimary) {
      await prisma.customerContact.updateMany({
        where: {
          customerId: existingContact.customerId,
          id: { not: contactId }
        },
        data: { isPrimary: false }
      })
    }

    const updatedContact = await prisma.customerContact.update({
      where: { id: contactId },
      data
    })

    return updatedContact as CustomerContact
  }

  static async deleteCustomerContact(contactId: string): Promise<void> {
    const contact = await prisma.customerContact.findUnique({
      where: { id: contactId }
    })

    if (!contact) {
      throw new Error('联系人不存在')
    }

    await prisma.customerContact.delete({
      where: { id: contactId }
    })
  }

  static async getCustomerStats(): Promise<CustomerStats> {
    const [
      totalCustomers,
      customersByType,
      customersByStatus,
      totalOrders,
      totalAmount,
      topCustomers
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.groupBy({
        by: ['customerType'],
        _count: { customerType: true }
      }),
      prisma.customer.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      prisma.customer.aggregate({
        _sum: { totalOrders: true }
      }),
      prisma.customer.aggregate({
        _sum: { totalAmount: true }
      }),
      prisma.customer.findMany({
        orderBy: [
          { totalOrders: 'desc' },
          { totalAmount: 'desc' }
        ],
        take: 10,
        include: {
          orders: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
              totalAmount: true,
              createdAt: true
            }
          }
        }
      })
    ])

    const typeCounts = customersByType.reduce((acc, item) => {
      acc[item.customerType as keyof typeof acc] = item._count.customerType
      return acc
    }, { COMPANY: 0, INDIVIDUAL: 0 })

    const statusCounts = customersByStatus.reduce((acc, item) => {
      acc[item.status as keyof typeof acc] = item._count.status
      return acc
    }, { ACTIVE: 0, INACTIVE: 0, SUSPENDED: 0, BLACKLISTED: 0 })

    const averageCreditRating = await prisma.customer.aggregate({
      _avg: { creditRating: true }
    })

    return {
      totalCustomers,
      activeCustomers: statusCounts.ACTIVE,
      inactiveCustomers: statusCounts.INACTIVE,
      totalOrders: totalOrders._sum.totalOrders || 0,
      totalAmount: totalAmount._sum.totalAmount || 0,
      averageCreditRating: Math.round(averageCreditRating._avg.creditRating || 0),
      topCustomers: topCustomers as Customer[],
      customersByType: typeCounts,
      customersByStatus: statusCounts
    }
  }

  static async updateCustomerStatus(customerId: string, status: CustomerStatus, reason?: string, userId?: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId }
    })

    if (!customer) {
      throw new Error('客户不存在')
    }

    // 状态转换验证
    const validTransitions = {
      [CustomerStatus.ACTIVE]: [CustomerStatus.INACTIVE, CustomerStatus.SUSPENDED, CustomerStatus.BLACKLISTED],
      [CustomerStatus.INACTIVE]: [CustomerStatus.ACTIVE],
      [CustomerStatus.SUSPENDED]: [CustomerStatus.ACTIVE, CustomerStatus.BLACKLISTED],
      [CustomerStatus.BLACKLISTED]: [CustomerStatus.ACTIVE]
    }

    if (!validTransitions[customer.status].includes(status)) {
      throw new Error(`无法从 ${customer.status} 转换到 ${status}`)
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        status,
        notes: reason ? `${customer.notes || ''}\n[${new Date().toISOString()}] 状态变更为 ${status}: ${reason}` : customer.notes,
        updatedBy: userId,
        updatedAt: new Date()
      },
      include: {
        contacts: true
      }
    })

    return updatedCustomer as Customer
  }

  static async calculateCustomerStats(customerId: string) {
    const [orders, shipments] = await Promise.all([
      prisma.order.findMany({
        where: { customerId },
        select: {
          totalAmount: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.shipment.findMany({
        where: { customerId },
        select: {
          status: true,
          createdAt: true
        }
      })
    ])

    const totalOrders = orders.length
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const completedOrders = orders.filter(order => order.status === 'DELIVERED').length
    const lastOrderDate = orders.length > 0 ? Math.max(...orders.map(o => o.createdAt.getTime())) : null

    // 计算信用评分（基于订单完成率、付款情况等）
    const completionRate = totalOrders > 0 ? completedOrders / totalOrders : 0
    const creditRating = Math.round(completionRate * 80 + 20) // 基础评分60-100

    return {
      totalOrders,
      totalAmount,
      completedOrders,
      lastOrderDate: lastOrderDate ? new Date(lastOrderDate) : null,
      creditRating
    }
  }

  static async updateCustomerStats(customerId: string) {
    const stats = await this.calculateCustomerStats(customerId)

    await prisma.customer.update({
      where: { id: customerId },
      data: {
        totalOrders: stats.totalOrders,
        totalAmount: stats.totalAmount,
        lastOrderDate: stats.lastOrderDate,
        creditRating: stats.creditRating
      }
    })

    return stats
  }

  private static generateCustomerNumber(customerType: CustomerType): string {
    const prefix = customerType === CustomerType.COMPANY ? 'C' : 'I'
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}${timestamp.slice(-6)}${random}`
  }
}