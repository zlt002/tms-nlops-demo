import {
  createCustomerSchema,
  updateCustomerSchema,
  customerQuerySchema,
  contactSchema,
  transformCreateCustomerData,
  transformUpdateCustomerData
} from '@/lib/validators/customer'
import { CustomerType, CustomerStatus } from '@prisma/client'

describe('Customer Validators', () => {
  describe('createCustomerSchema', () => {
    const validCompanyCustomer = {
      customerType: CustomerType.COMPANY,
      companyName: 'Test Company',
      email: 'company@test.com',
      phone: '1234567890',
      address: 'Test Address',
      city: 'Test City',
      province: 'Test Province'
    }

    const validIndividualCustomer = {
      customerType: CustomerType.INDIVIDUAL,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      phone: '1234567890',
      address: 'Test Address',
      city: 'Test City',
      province: 'Test Province'
    }

    it('should validate company customer data', () => {
      const result = createCustomerSchema.safeParse(validCompanyCustomer)
      expect(result.success).toBe(true)
    })

    it('should validate individual customer data', () => {
      const result = createCustomerSchema.safeParse(validIndividualCustomer)
      expect(result.success).toBe(true)
    })

    it('should reject company customer without company name', () => {
      const invalidData = { ...validCompanyCustomer, companyName: undefined }
      const result = createCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.message).toContain('企业客户必须提供公司名称')
    })

    it('should reject individual customer without first name', () => {
      const invalidData = { ...validIndividualCustomer, firstName: undefined }
      const result = createCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.message).toContain('个人客户必须提供姓名')
    })

    it('should reject invalid email', () => {
      const invalidData = { ...validCompanyCustomer, email: 'invalid-email' }
      const result = createCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('邮箱格式不正确')
    })

    it('should reject negative credit limit', () => {
      const invalidData = { ...validCompanyCustomer, creditLimit: -1000 }
      const result = createCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('信用额度不能为负数')
    })

    it('should accept optional fields', () => {
      const dataWithOptionals = {
        ...validCompanyCustomer,
        businessLicense: '123456789',
        secondaryPhone: '0987654321',
        postalCode: '12345',
        creditLimit: 5000,
        tags: ['VIP'],
        contacts: [
          {
            name: 'Contact',
            phone: '1234567890',
            email: 'contact@test.com',
            isPrimary: true
          }
        ]
      }

      const result = createCustomerSchema.safeParse(dataWithOptionals)
      expect(result.success).toBe(true)
    })
  })

  describe('updateCustomerSchema', () => {
    const validUpdateData = {
      companyName: 'Updated Company',
      creditLimit: 15000,
      creditRating: 85,
      notes: 'Updated notes'
    }

    it('should validate update data', () => {
      const result = updateCustomerSchema.safeParse(validUpdateData)
      expect(result.success).toBe(true)
    })

    it('should accept partial updates', () => {
      const partialData = { companyName: 'Updated Company' }
      const result = updateCustomerSchema.safeParse(partialData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid credit rating range', () => {
      const invalidData = { ...validUpdateData, creditRating: 150 }
      const result = updateCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('信用评分必须在0-100之间')
    })

    it('should reject negative credit limit', () => {
      const invalidData = { ...validUpdateData, creditLimit: -100 }
      const result = updateCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('信用额度不能为负数')
    })

    it('should validate email when provided', () => {
      const validEmailData = { email: 'updated@test.com' }
      const result = updateCustomerSchema.safeParse(validEmailData)
      expect(result.success).toBe(true)

      const invalidEmailData = { email: 'invalid-email' }
      const invalidResult = updateCustomerSchema.safeParse(invalidEmailData)
      expect(invalidResult.success).toBe(false)
    })
  })

  describe('customerQuerySchema', () => {
    const validQuery = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const
    }

    it('should validate query parameters', () => {
      const result = customerQuerySchema.safeParse(validQuery)
      expect(result.success).toBe(true)
    })

    it('should apply default values', () => {
      const minimalQuery = {}
      const result = customerQuerySchema.safeParse(minimalQuery)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(20)
        expect(result.data.sortBy).toBe('createdAt')
        expect(result.data.sortOrder).toBe('desc')
      }
    })

    it('should validate filtered queries', () => {
      const filteredQuery = {
        ...validQuery,
        customerType: CustomerType.COMPANY,
        status: CustomerStatus.ACTIVE,
        minCreditRating: 70,
        maxCreditRating: 90,
        tags: ['VIP'],
        search: 'test'
      }

      const result = customerQuerySchema.safeParse(filteredQuery)
      expect(result.success).toBe(true)
    })

    it('should reject invalid page number', () => {
      const invalidQuery = { ...validQuery, page: 0 }
      const result = customerQuerySchema.safeParse(invalidQuery)
      expect(result.success).toBe(false)
    })

    it('should reject invalid limit range', () => {
      const invalidQuery = { ...validQuery, limit: 150 }
      const result = customerQuerySchema.safeParse(invalidQuery)
      expect(result.success).toBe(false)
    })

    it('should reject invalid credit rating range', () => {
      const invalidQuery = { ...validQuery, minCreditRating: 150 }
      const result = customerQuerySchema.safeParse(invalidQuery)
      expect(result.success).toBe(false)
    })
  })

  describe('contactSchema', () => {
    const validContact = {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john@test.com',
      position: 'Manager',
      isPrimary: true
    }

    it('should validate contact data', () => {
      const result = contactSchema.safeParse(validContact)
      expect(result.success).toBe(true)
    })

    it('should require name and phone', () => {
      const invalidContact = { ...validContact, name: '' }
      const result = contactSchema.safeParse(invalidContact)
      expect(result.success).toBe(false)
      expect(result.error?.issues[0].message).toBe('联系人姓名不能为空')
    })

    it('should validate email when provided', () => {
      const withEmail = { ...validContact, email: 'john@test.com' }
      const result = contactSchema.safeParse(withEmail)
      expect(result.success).toBe(true)

      const withInvalidEmail = { ...validContact, email: 'invalid-email' }
      const invalidResult = contactSchema.safeParse(withInvalidEmail)
      expect(invalidResult.success).toBe(false)
    })

    it('should apply default values', () => {
      const minimalContact = { name: 'John Doe', phone: '1234567890' }
      const result = contactSchema.safeParse(minimalContact)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.isPrimary).toBe(false)
      }
    })
  })

  describe('transform functions', () => {
    describe('transformCreateCustomerData', () => {
      const rawData = {
        customerType: CustomerType.COMPANY,
        companyName: 'Test Company',
        email: 'test@test.com',
        phone: '1234567890',
        address: 'Test Address',
        city: 'Test City',
        province: 'Test Province',
        creditLimit: 10000,
        tags: ['VIP'],
        contacts: [
          { name: 'Contact', phone: '1234567890', isPrimary: true }
        ]
      }

      it('should transform create customer data correctly', () => {
        const result = transformCreateCustomerData(rawData)

        expect(result).toEqual({
          customerType: CustomerType.COMPANY,
          companyName: 'Test Company',
          email: 'test@test.com',
          phone: '1234567890',
          address: 'Test Address',
          city: 'Test City',
          province: 'Test Province',
          creditLimit: 10000,
          tags: ['VIP'],
          contacts: [
            { name: 'Contact', phone: '1234567890', isPrimary: true }
          ]
        })
      })

      it('should handle default values', () => {
        const minimalData = {
          customerType: CustomerType.INDIVIDUAL,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          phone: '1234567890',
          address: 'Test Address',
          city: 'Test City',
          province: 'Test Province'
        }

        const result = transformCreateCustomerData(minimalData)

        expect(result.creditLimit).toBe(0)
        expect(result.tags).toEqual([])
      })
    })

    describe('transformUpdateCustomerData', () => {
      const rawData = {
        companyName: 'Updated Company',
        creditLimit: 15000,
        status: CustomerStatus.INACTIVE,
        tags: ['Updated', 'VIP']
      }

      it('should transform update customer data correctly', () => {
        const result = transformUpdateCustomerData(rawData)

        expect(result).toEqual({
          companyName: 'Updated Company',
          creditLimit: 15000,
          status: CustomerStatus.INACTIVE,
          tags: ['Updated', 'VIP']
        })
      })

      it('should filter out undefined values', () => {
        const dataWithUndefined = {
          ...rawData,
          companyName: undefined,
          creditLimit: undefined
        }

        const result = transformUpdateCustomerData(dataWithUndefined)

        expect(result).toEqual({
          status: CustomerStatus.INACTIVE,
          tags: ['Updated', 'VIP']
        })
      })

      it('should handle empty data', () => {
        const result = transformUpdateCustomerData({})
        expect(result).toEqual({})
      })
    })
  })

  describe('Enum validation', () => {
    it('should accept valid customer types', () => {
      const validTypes = [CustomerType.COMPANY, CustomerType.INDIVIDUAL]

      validTypes.forEach(type => {
        const data = { ...validCompanyCustomer, customerType: type }
        const result = createCustomerSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid customer types', () => {
      const invalidData = { ...validCompanyCustomer, customerType: 'INVALID_TYPE' }
      const result = createCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept valid customer statuses', () => {
      const validStatuses = [
        CustomerStatus.ACTIVE,
        CustomerStatus.INACTIVE,
        CustomerStatus.SUSPENDED,
        CustomerStatus.BLACKLISTED
      ]

      validStatuses.forEach(status => {
        const data = { ...validUpdateData, status }
        const result = updateCustomerSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })

    it('should reject invalid customer statuses', () => {
      const invalidData = { ...validUpdateData, status: 'INVALID_STATUS' }
      const result = updateCustomerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})