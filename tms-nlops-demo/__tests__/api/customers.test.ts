import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/customers/route'
import { GET as GETById, PUT, DELETE } from '@/app/api/customers/[id]/route'
import { GET as GETContacts, POST as POSTContact } from '@/app/api/customers/[id]/contacts/route'
import { GET as GETStats } from '@/app/api/customers/stats/route'
import { PUT as PUTStatus } from '@/app/api/customers/[id]/status/route'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'
import { CustomerType, CustomerStatus } from '@prisma/client'

// Mock dependencies
jest.mock('@/lib/auth')
jest.mock('@/services/customerService')

const mockGetCurrentUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>
const mockCustomerService = CustomerService as jest.MockedClass<typeof CustomerService>

describe('Customers API', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'ADMIN'
  }

  const mockCustomer = {
    id: 'customer-1',
    customerNumber: 'C123456789',
    customerType: CustomerType.COMPANY,
    companyName: 'Test Company',
    email: 'company@test.com',
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
    tags: ['VIP', 'Enterprise'],
    createdBy: 'user-1',
    updatedBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    contacts: []
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockGetCurrentUser.mockResolvedValue(mockUser)
  })

  describe('GET /api/customers', () => {
    it('should return customers list with pagination', async () => {
      const mockResult = {
        customers: [mockCustomer],
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          pages: 1
        }
      }

      mockCustomerService.getCustomersWithStats.mockResolvedValue(mockResult)

      const request = new NextRequest('http://localhost:3000/api/customers?page=1&limit=20')
      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual([mockCustomer])
      expect(data.pagination).toEqual(mockResult.pagination)
      expect(mockCustomerService.getCustomersWithStats).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('should handle authentication error', async () => {
      mockGetCurrentUser.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/customers')
      const response = await GET(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('未授权访问')
    })

    it('should handle search parameters', async () => {
      const mockResult = {
        customers: [mockCustomer],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          pages: 1
        }
      }

      mockCustomerService.getCustomersWithStats.mockResolvedValue(mockResult)

      const request = new NextRequest('http://localhost:3000/api/customers?search=test&status=ACTIVE&customerType=COMPANY&limit=10')
      const response = await GET(request)

      expect(response.status).toBe(200)
      expect(mockCustomerService.getCustomersWithStats).toHaveBeenCalledWith({
        search: 'test',
        status: CustomerStatus.ACTIVE,
        customerType: CustomerType.COMPANY,
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })
    })

    it('should handle service errors', async () => {
      mockCustomerService.getCustomersWithStats.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/customers')
      const response = await GET(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('获取客户列表失败')
      expect(data.details).toBe('Database error')
    })
  })

  describe('POST /api/customers', () => {
    const createCustomerData = {
      customerType: CustomerType.COMPANY,
      companyName: 'New Company',
      email: 'new@company.com',
      phone: '1234567890',
      address: 'New Address',
      city: 'New City',
      province: 'New Province',
      creditLimit: 5000,
      tags: ['New']
    }

    it('should create a new customer', async () => {
      mockCustomerService.createCustomer.mockResolvedValue(mockCustomer)

      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(createCustomerData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockCustomer)
      expect(data.message).toBe('客户创建成功')
      expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(createCustomerData, mockUser.id)
    })

    it('should handle duplicate email error', async () => {
      mockCustomerService.createCustomer.mockRejectedValue(new Error('邮箱已被使用'))

      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(createCustomerData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('邮箱已被使用')
    })

    it('should handle validation errors', async () => {
      const invalidData = {
        customerType: 'INVALID_TYPE',
        email: 'invalid-email'
      }

      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('数据验证失败')
      expect(data.details).toBeDefined()
    })

    it('should handle authentication error', async () => {
      mockGetCurrentUser.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/customers', {
        method: 'POST',
        body: JSON.stringify(createCustomerData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('未授权访问')
    })
  })

  describe('GET /api/customers/[id]', () => {
    it('should return customer details', async () => {
      mockCustomerService.getCustomerById.mockResolvedValue(mockCustomer)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1')
      const response = await GETById(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockCustomer)
      expect(mockCustomerService.getCustomerById).toHaveBeenCalledWith('customer-1')
    })

    it('should handle customer not found', async () => {
      mockCustomerService.getCustomerById.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/customers/nonexistent')
      const response = await GETById(request, { params: { id: 'nonexistent' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('客户不存在')
    })
  })

  describe('PUT /api/customers/[id]', () => {
    const updateData = {
      companyName: 'Updated Company',
      creditLimit: 15000
    }

    it('should update customer', async () => {
      const updatedCustomer = { ...mockCustomer, ...updateData }
      mockCustomerService.updateCustomer.mockResolvedValue(updatedCustomer)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUT(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(updatedCustomer)
      expect(data.message).toBe('客户更新成功')
      expect(mockCustomerService.updateCustomer).toHaveBeenCalledWith('customer-1', updateData, mockUser.id)
    })

    it('should handle customer not found', async () => {
      mockCustomerService.updateCustomer.mockRejectedValue(new Error('客户不存在'))

      const request = new NextRequest('http://localhost:3000/api/customers/nonexistent', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUT(request, { params: { id: 'nonexistent' } })

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('客户不存在')
    })
  })

  describe('DELETE /api/customers/[id]', () => {
    it('should delete customer', async () => {
      mockCustomerService.deleteCustomer.mockResolvedValue(undefined)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.message).toBe('客户删除成功')
      expect(mockCustomerService.deleteCustomer).toHaveBeenCalledWith('customer-1')
    })

    it('should prevent deletion when customer has related orders', async () => {
      mockCustomerService.deleteCustomer.mockRejectedValue(new Error('客户存在关联的订单或运单，无法删除'))

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1', {
        method: 'DELETE'
      })

      const response = await DELETE(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('客户存在关联的订单或运单，无法删除')
    })
  })

  describe('GET /api/customers/[id]/contacts', () => {
    const mockContacts = [
      {
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
    ]

    it('should return customer contacts', async () => {
      mockCustomerService.getCustomerContacts.mockResolvedValue(mockContacts)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1/contacts')
      const response = await GETContacts(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockContacts)
      expect(mockCustomerService.getCustomerContacts).toHaveBeenCalledWith('customer-1')
    })
  })

  describe('POST /api/customers/[id]/contacts', () => {
    const contactData = {
      name: 'Jane Smith',
      position: 'Assistant',
      phone: '0987654321',
      email: 'jane@company.com',
      isPrimary: false
    }

    it('should create customer contact', async () => {
      const mockContact = {
        id: 'contact-2',
        customerId: 'customer-1',
        ...contactData,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockCustomerService.addCustomerContact.mockResolvedValue(mockContact)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1/contacts', {
        method: 'POST',
        body: JSON.stringify(contactData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POSTContact(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(201)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockContact)
      expect(data.message).toBe('联系人创建成功')
      expect(mockCustomerService.addCustomerContact).toHaveBeenCalledWith('customer-1', contactData, mockUser.id)
    })
  })

  describe('GET /api/customers/stats', () => {
    const mockStats = {
      totalCustomers: 100,
      activeCustomers: 80,
      inactiveCustomers: 15,
      totalOrders: 500,
      totalAmount: 1000000,
      averageCreditRating: 75,
      topCustomers: [mockCustomer],
      customersByType: { COMPANY: 70, INDIVIDUAL: 30 },
      customersByStatus: { ACTIVE: 80, INACTIVE: 15, SUSPENDED: 3, BLACKLISTED: 2 }
    }

    it('should return customer statistics', async () => {
      mockCustomerService.getCustomerStats.mockResolvedValue(mockStats)

      const request = new NextRequest('http://localhost:3000/api/customers/stats')
      const response = await GETStats(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockStats)
      expect(mockCustomerService.getCustomerStats).toHaveBeenCalled()
    })
  })

  describe('PUT /api/customers/[id]/status', () => {
    it('should update customer status', async () => {
      const updatedCustomer = { ...mockCustomer, status: CustomerStatus.INACTIVE }
      mockCustomerService.updateCustomerStatus.mockResolvedValue(updatedCustomer)

      const request = new NextRequest('http://localhost:3000/api/customers/customer-1/status', {
        method: 'PUT',
        body: JSON.stringify({ status: CustomerStatus.INACTIVE, reason: 'Customer request' }),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUTStatus(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toEqual(updatedCustomer)
      expect(data.message).toBe('客户状态更新成功')
      expect(mockCustomerService.updateCustomerStatus).toHaveBeenCalledWith(
        'customer-1',
        CustomerStatus.INACTIVE,
        'Customer request',
        mockUser.id
      )
    })

    it('should handle invalid status', async () => {
      const request = new NextRequest('http://localhost:3000/api/customers/customer-1/status', {
        method: 'PUT',
        body: JSON.stringify({ status: 'INVALID_STATUS' }),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PUTStatus(request, { params: { id: 'customer-1' } })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('无效的客户状态')
    })
  })
})