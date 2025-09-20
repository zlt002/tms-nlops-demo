import { CustomerService } from '@/services/customerService'
import { prisma } from '@/lib/db/prisma'
import { CustomerType, CustomerStatus } from '@prisma/client'

// Mock prisma
jest.mock('@/lib/db/prisma')
const mockPrisma = prisma as jest.Mocked<typeof prisma>

describe('CustomerService', () => {
  const mockCustomer = {
    id: 'customer-1',
    customerNumber: 'C123456789',
    customerType: CustomerType.COMPANY,
    companyName: 'Test Company',
    email: 'test@company.com',
    phone: '1234567890',
    address: 'Test Address',
    city: 'Test City',
    province: 'Test Province',
    status: CustomerStatus.ACTIVE,
    creditRating: 80,
    creditLimit: 10000,
    outstandingBalance: 0,
    totalOrders: 5,
    totalAmount: 50000,
    tags: ['VIP'],
    createdBy: 'user-1',
    updatedBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    contacts: []
  }

  const mockContact = {
    id: 'contact-1',
    customerId: 'customer-1',
    name: 'John Doe',
    position: 'Manager',
    phone: '1234567890',
    email: 'john@company.com',
    isPrimary: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createCustomer', () => {
    const createData = {
      customerType: CustomerType.COMPANY,
      companyName: 'New Company',
      email: 'new@company.com',
      phone: '1234567890',
      address: 'New Address',
      city: 'New City',
      province: 'New Province',
      creditLimit: 5000
    }

    it('should create a company customer successfully', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null)
      mockPrisma.customer.create.mockResolvedValue(mockCustomer)

      const result = await CustomerService.createCustomer(createData, 'user-1')

      expect(result).toEqual(mockCustomer)
      expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
        where: { email: createData.email }
      })
      expect(mockPrisma.customer.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          customerType: CustomerType.COMPANY,
          companyName: 'New Company',
          email: 'new@company.com',
          createdBy: 'user-1',
          updatedBy: 'user-1'
        }),
        include: { contacts: true }
      })
    })

    it('should throw error when email already exists', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)

      await expect(CustomerService.createCustomer(createData, 'user-1'))
        .rejects.toThrow('邮箱已被使用')

      expect(mockPrisma.customer.create).not.toHaveBeenCalled()
    })

    it('should create customer with contacts', async () => {
      const createWithContacts = {
        ...createData,
        contacts: [
          {
            name: 'Contact Name',
            phone: '1234567890',
            email: 'contact@test.com',
            isPrimary: true
          }
        ]
      }

      mockPrisma.customer.findUnique.mockResolvedValue(null)
      mockPrisma.customer.create.mockResolvedValue(mockCustomer)
      mockPrisma.customerContact.createMany.mockResolvedValue({ count: 1 })
      mockPrisma.customer.findUnique.mockResolvedValue({
        ...mockCustomer,
        contacts: [mockContact]
      })

      const result = await CustomerService.createCustomer(createWithContacts, 'user-1')

      expect(mockPrisma.customerContact.createMany).toHaveBeenCalledWith({
        data: [{
          customerId: mockCustomer.id,
          name: 'Contact Name',
          phone: '1234567890',
          email: 'contact@test.com',
          isPrimary: true
        }]
      })
    })

    it('should generate customer number correctly', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null)
      mockPrisma.customer.create.mockImplementation((data) => {
        // Test the customer number generation
        const customerData = data.data as any
        expect(customerData.customerNumber).toMatch(/^[CI]\d{6}\d{3}$/)
        expect(customerData.customerNumber[0]).toBe('C') // Company prefix
        return Promise.resolve(mockCustomer)
      })

      await CustomerService.createCustomer(createData, 'user-1')
    })

    it('should create individual customer correctly', async () => {
      const individualData = {
        ...createData,
        customerType: CustomerType.INDIVIDUAL,
        firstName: 'John',
        lastName: 'Doe'
      }

      mockPrisma.customer.findUnique.mockResolvedValue(null)
      mockPrisma.customer.create.mockResolvedValue({
        ...mockCustomer,
        customerType: CustomerType.INDIVIDUAL,
        firstName: 'John',
        lastName: 'Doe'
      })

      await CustomerService.createCustomer(individualData, 'user-1')

      expect(mockPrisma.customer.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          customerType: CustomerType.INDIVIDUAL,
          firstName: 'John',
          lastName: 'Doe',
          companyName: null
        }),
        include: { contacts: true }
      })
    })
  })

  describe('getCustomersWithStats', () => {
    const queryParams = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const
    }

    it('should return customers with pagination', async () => {
      const mockCustomers = [mockCustomer]
      const mockTotal = 1

      mockPrisma.customer.findMany.mockResolvedValue(mockCustomers)
      mockPrisma.customer.count.mockResolvedValue(mockTotal)

      const result = await CustomerService.getCustomersWithStats(queryParams)

      expect(result).toEqual({
        customers: mockCustomers,
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          pages: 1
        }
      })
      expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
        where: {},
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
        skip: 0,
        take: 20,
        orderBy: { createdAt: 'desc' }
      })
    })

    it('should apply filters correctly', async () => {
      const filteredParams = {
        ...queryParams,
        customerType: CustomerType.COMPANY,
        status: CustomerStatus.ACTIVE,
        city: 'Test City',
        minCreditRating: 70,
        maxCreditRating: 90,
        tags: ['VIP'],
        search: 'test'
      }

      mockPrisma.customer.findMany.mockResolvedValue([mockCustomer])
      mockPrisma.customer.count.mockResolvedValue(1)

      await CustomerService.getCustomersWithStats(filteredParams)

      expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
        where: {
          customerType: CustomerType.COMPANY,
          status: CustomerStatus.ACTIVE,
          city: 'Test City',
          creditRating: {
            gte: 70,
            lte: 90
          },
          tags: {
            hasSome: ['VIP']
          },
          OR: [
            { customerNumber: { contains: 'test' } },
            { companyName: { contains: 'test' } },
            { firstName: { contains: 'test' } },
            { lastName: { contains: 'test' } },
            { email: { contains: 'test' } },
            { phone: { contains: 'test' } }
          ]
        },
        include: expect.any(Object),
        skip: 0,
        take: 20,
        orderBy: { createdAt: 'desc' }
      })
    })
  })

  describe('getCustomerById', () => {
    it('should return customer with full details', async () => {
      const customerWithDetails = {
        ...mockCustomer,
        contacts: [mockContact],
        orders: [],
        shipments: [],
        documents: [],
        _count: {
          orders: 5,
          shipments: 3,
          contacts: 1,
          documents: 2
        }
      }

      mockPrisma.customer.findUnique.mockResolvedValue(customerWithDetails)

      const result = await CustomerService.getCustomerById('customer-1')

      expect(result).toEqual(customerWithDetails)
      expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
        where: { id: 'customer-1' },
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
    })

    it('should return null when customer not found', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null)

      const result = await CustomerService.getCustomerById('nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('updateCustomer', () => {
    const updateData = {
      companyName: 'Updated Company',
      creditLimit: 15000,
      status: CustomerStatus.INACTIVE
    }

    it('should update customer successfully', async () => {
      const updatedCustomer = { ...mockCustomer, ...updateData }
      mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)
      mockPrisma.customer.findUnique.mockResolvedValue(null) // Email check
      mockPrisma.customer.update.mockResolvedValue(updatedCustomer)

      const result = await CustomerService.updateCustomer('customer-1', updateData, 'user-1')

      expect(result).toEqual(updatedCustomer)
      expect(mockPrisma.customer.update).toHaveBeenCalledWith({
        where: { id: 'customer-1' },
        data: {
          ...updateData,
          updatedBy: 'user-1',
          updatedAt: expect.any(Date)
        },
        include: { contacts: true }
      })
    })

    it('should throw error when customer not found', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue(null)

      await expect(CustomerService.updateCustomer('nonexistent', updateData, 'user-1'))
        .rejects.toThrow('客户不存在')
    })

    it('should handle email update', async () => {
      const emailUpdateData = { ...updateData, email: 'new@email.com' }

      mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)
      mockPrisma.customer.findUnique.mockResolvedValueOnce(mockCustomer) // Existing customer
      mockPrisma.customer.findUnique.mockResolvedValueOnce(null) // Email availability check
      mockPrisma.customer.update.mockResolvedValue({ ...mockCustomer, email: 'new@email.com' })

      await CustomerService.updateCustomer('customer-1', emailUpdateData, 'user-1')

      expect(mockPrisma.customer.findUnique).toHaveBeenCalledTimes(2)
      expect(mockPrisma.customer.findUnique).toHaveBeenNthCalledWith(2, {
        where: { email: 'new@email.com' }
      })
    })
  })

  describe('deleteCustomer', () => {
    it('should delete customer successfully', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue({
        ...mockCustomer,
        _count: { orders: 0, shipments: 0 }
      })
      mockPrisma.customer.delete.mockResolvedValue(mockCustomer)

      await CustomerService.deleteCustomer('customer-1')

      expect(mockPrisma.customer.delete).toHaveBeenCalledWith({
        where: { id: 'customer-1' }
      })
    })

    it('should prevent deletion when customer has orders', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue({
        ...mockCustomer,
        _count: { orders: 5, shipments: 2 }
      })

      await expect(CustomerService.deleteCustomer('customer-1'))
        .rejects.toThrow('客户存在关联的订单或运单，无法删除')

      expect(mockPrisma.customer.delete).not.toHaveBeenCalled()
    })
  })

  describe('getCustomerStats', () => {
    it('should return customer statistics', async () => {
      const mockStatsData = [
        { totalCustomers: 100 },
        { customerType: CustomerType.COMPANY, _count: { customerType: 70 } },
        { customerType: CustomerType.INDIVIDUAL, _count: { customerType: 30 } },
        { status: CustomerStatus.ACTIVE, _count: { status: 80 } },
        { status: CustomerStatus.INACTIVE, _count: { status: 15 } },
        { status: CustomerStatus.SUSPENDED, _count: { status: 3 } },
        { status: CustomerStatus.BLACKLISTED, _count: { status: 2 } },
        { _sum: { totalOrders: 500 } },
        { _sum: { totalAmount: 1000000 } },
        { _avg: { creditRating: 75.5 } }
      ]

      mockPrisma.customer.count.mockResolvedValue(100)
      mockPrisma.customer.groupBy.mockResolvedValue(mockStatsData.slice(1, 7))
      mockPrisma.customer.aggregate.mockResolvedValue(mockStatsData[7])
      mockPrisma.customer.aggregate.mockResolvedValue(mockStatsData[8])
      mockPrisma.customer.aggregate.mockResolvedValue(mockStatsData[9])
      mockPrisma.customer.findMany.mockResolvedValue([mockCustomer])

      const result = await CustomerService.getCustomerStats()

      expect(result).toEqual({
        totalCustomers: 100,
        activeCustomers: 80,
        inactiveCustomers: 15,
        totalOrders: 500,
        totalAmount: 1000000,
        averageCreditRating: 76,
        topCustomers: [mockCustomer],
        customersByType: { COMPANY: 70, INDIVIDUAL: 30 },
        customersByStatus: { ACTIVE: 80, INACTIVE: 15, SUSPENDED: 3, BLACKLISTED: 2 }
      })
    })
  })

  describe('updateCustomerStatus', () => {
    it('should update customer status with valid transition', async () => {
      const updatedCustomer = { ...mockCustomer, status: CustomerStatus.INACTIVE }
      mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)
      mockPrisma.customer.update.mockResolvedValue(updatedCustomer)

      const result = await CustomerService.updateCustomerStatus(
        'customer-1',
        CustomerStatus.INACTIVE,
        'Customer request',
        'user-1'
      )

      expect(result).toEqual(updatedCustomer)
      expect(mockPrisma.customer.update).toHaveBeenCalledWith({
        where: { id: 'customer-1' },
        data: {
          status: CustomerStatus.INACTIVE,
          notes: expect.stringContaining('状态变更为 INACTIVE: Customer request'),
          updatedBy: 'user-1',
          updatedAt: expect.any(Date)
        },
        include: { contacts: true }
      })
    })

    it('should throw error for invalid status transition', async () => {
      mockPrisma.customer.findUnique.mockResolvedValue({
        ...mockCustomer,
        status: CustomerStatus.BLACKLISTED
      })

      await expect(CustomerService.updateCustomerStatus(
        'customer-1',
        CustomerStatus.ACTIVE,
        'Reactivation',
        'user-1'
      )).rejects.toThrow('无法从 BLACKLISTED 转换到 ACTIVE')
    })
  })

  describe('calculateCustomerStats', () => {
    it('should calculate customer statistics correctly', async () => {
      const mockOrders = [
        { totalAmount: 10000, status: 'DELIVERED', createdAt: new Date('2023-01-01') },
        { totalAmount: 5000, status: 'CONFIRMED', createdAt: new Date('2023-02-01') },
        { totalAmount: 8000, status: 'DELIVERED', createdAt: new Date('2023-03-01') }
      ]

      const mockShipments = [
        { status: 'COMPLETED', createdAt: new Date() },
        { status: 'IN_TRANSIT', createdAt: new Date() }
      ]

      mockPrisma.order.findMany.mockResolvedValue(mockOrders)
      mockPrisma.shipment.findMany.mockResolvedValue(mockShipments)

      const result = await CustomerService.calculateCustomerStats('customer-1')

      expect(result).toEqual({
        totalOrders: 3,
        totalAmount: 23000,
        completedOrders: 2,
        lastOrderDate: expect.any(Date),
        creditRating: 73 // 2/3 * 80 + 20 = 73.33 -> rounded to 73
      })
    })

    it('should handle customer with no orders', async () => {
      mockPrisma.order.findMany.mockResolvedValue([])
      mockPrisma.shipment.findMany.mockResolvedValue([])

      const result = await CustomerService.calculateCustomerStats('customer-1')

      expect(result).toEqual({
        totalOrders: 0,
        totalAmount: 0,
        completedOrders: 0,
        lastOrderDate: null,
        creditRating: 20 // Base score when no orders
      })
    })
  })
})