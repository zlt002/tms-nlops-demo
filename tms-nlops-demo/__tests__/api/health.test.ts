import { NextRequest } from 'next/server'
import { GET } from '@/app/api/health/route'

// Mock the response
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status || 200,
      json: async () => data,
      headers: new Map()
    }))
  }
}))

describe('Health API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const request = new NextRequest('http://localhost:3000/api/health', {
        method: 'GET'
      })

      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.data).toHaveProperty('status')
      expect(data.data).toHaveProperty('timestamp')
      expect(data.data).toHaveProperty('version')
      expect(data.data).toHaveProperty('uptime')
    })

    it('should include detailed health info when detailed=true', async () => {
      const request = new NextRequest('http://localhost:3000/api/health?detailed=true', {
        method: 'GET'
      })

      const response = await GET(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.data).toHaveProperty('database')
      expect(data.data).toHaveProperty('redis')
      expect(data.data).toHaveProperty('services')
    })
  })
})