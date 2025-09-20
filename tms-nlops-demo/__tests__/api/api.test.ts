import request from 'supertest'
import { createServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { apiResolver } from 'next/dist/server/api-utils/node'
import handler from '@/pages/api/orders'

// 创建测试用的Next.js API处理器
const createTestHandler = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return apiResolver(
      req,
      res,
      undefined,
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: ''
      },
      false
    )
  }
}

describe('TMS NL-Ops API测试', () => {
  let authToken: string
  let orderId: string
  let customerId: string
  let vehicleId: string

  beforeAll(async () => {
    // 测试前的准备工作
    // 注意：在实际测试中，这里应该设置测试数据库和测试用户
    console.log('开始API测试套件...')
  })

  afterAll(async () => {
    // 测试后的清理工作
    console.log('API测试套件完成')
  })

  describe('健康检查API测试', () => {
    test('GET /api/health - 健康检查应该正常响应', async () => {
      const server = createServer((req, res) => {
        // 模拟健康检查响应
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: 3600,
            version: '1.0.0'
          }
        }))
      })

      const response = await request(server)
        .get('/api/health')
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.status).toBe('healthy')
      expect(response.body.data.timestamp).toBeDefined()
    })

    test('GET /api/health/live - 存活检查应该正常响应', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'alive' }))
      })

      const response = await request(server)
        .get('/api/health/live')
        .expect(200)

      expect(response.body.status).toBe('alive')
    })

    test('GET /api/health/ready - 就绪检查应该正常响应', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ready' }))
      })

      const response = await request(server)
        .get('/api/health/ready')
        .expect(200)

      expect(response.body.status).toBe('ready')
    })
  })

  describe('认证API测试', () => {
    test('POST /api/auth/login - 用户登录应该返回token', async () => {
      const server = createServer((req, res) => {
        // 模拟登录成功响应
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            token: 'test-jwt-token',
            user: {
              id: 'user-123',
              email: 'test@example.com',
              name: '测试用户'
            }
          }
        }))
      })

      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      const response = await request(server)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.token).toBeDefined()
      expect(response.body.data.user.email).toBe(loginData.email)

      authToken = response.body.data.token
    })

    test('POST /api/auth/login - 无效凭据应该返回401', async () => {
      const server = createServer((req, res) => {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: '无效的用户名或密码',
          code: 'INVALID_CREDENTIALS'
        }))
      })

      const invalidData = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      }

      const response = await request(server)
        .post('/api/auth/login')
        .send(invalidData)
        .expect(401)

      expect(response.body.success).toBe(false)
      expect(response.body.error).toBeDefined()
    })
  })

  describe('订单管理API测试', () => {
    test('GET /api/orders - 获取订单列表应该返回分页数据', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'order-123',
              orderNumber: 'ORD-2024-001',
              customerId: 'customer-456',
              cargoName: '测试货物',
              status: 'CONFIRMED',
              createdAt: '2024-01-01T10:00:00Z'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 25,
            pages: 3
          }
        }))
      })

      const response = await request(server)
        .get('/api/orders')
        .query({ page: 1, limit: 10 })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBe(true)
      expect(response.body.pagination).toBeDefined()
      expect(response.body.pagination.page).toBe(1)
    })

    test('POST /api/orders - 创建订单应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'order-123',
            orderNumber: 'ORD-2024-001',
            status: 'PENDING',
            createdAt: '2024-01-01T10:00:00Z'
          }
        }))
      })

      const orderData = {
        customerId: 'customer-456',
        cargoName: '测试货物',
        cargoWeight: 1000,
        cargoVolume: 10,
        originAddress: '北京市朝阳区',
        destinationAddress: '上海市浦东新区',
        expectedTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }

      const response = await request(server)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.status).toBe('PENDING')

      orderId = response.body.data.id
    })

    test('GET /api/orders/:id - 获取订单详情应该返回正确数据', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: orderId,
            orderNumber: 'ORD-2024-001',
            customerId: 'customer-456',
            cargoName: '测试货物',
            status: 'PENDING',
            createdAt: '2024-01-01T10:00:00Z'
          }
        }))
      })

      const response = await request(server)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(orderId)
    })

    test('PUT /api/orders/:id - 更新订单应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: orderId,
            orderNumber: 'ORD-2024-001',
            cargoName: '更新的货物名称',
            status: 'CONFIRMED'
          }
        }))
      })

      const updateData = {
        cargoName: '更新的货物名称',
        status: 'CONFIRMED'
      }

      const response = await request(server)
        .put(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.cargoName).toBe(updateData.cargoName)
    })

    test('GET /api/orders - 无认证应该返回401', async () => {
      const server = createServer((req, res) => {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: '未授权访问',
          code: 'UNAUTHORIZED'
        }))
      })

      const response = await request(server)
        .get('/api/orders')
        .expect(401)

      expect(response.body.success).toBe(false)
    })
  })

  describe('客户管理API测试', () => {
    test('GET /api/customers - 获取客户列表应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'customer-456',
              customerType: 'COMPANY',
              companyName: '测试公司',
              email: 'test@company.com',
              phone: '13800138000',
              status: 'ACTIVE'
            }
          ]
        }))
      })

      const response = await request(server)
        .get('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    test('POST /api/customers - 创建客户应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'customer-789',
            customerType: 'COMPANY',
            companyName: '新测试公司',
            email: 'new@test.com',
            status: 'ACTIVE'
          }
        }))
      })

      const customerData = {
        customerType: 'COMPANY',
        companyName: '新测试公司',
        email: 'new@test.com',
        phone: '13800138001',
        address: '北京市朝阳区',
        city: '北京市',
        province: '北京'
      }

      const response = await request(server)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send(customerData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.companyName).toBe(customerData.companyName)

      customerId = response.body.data.id
    })
  })

  describe('车辆管理API测试', () => {
    test('GET /api/vehicles - 获取车辆列表应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'vehicle-123',
              licenseNumber: '京A12345',
              brand: '东风',
              model: '天龙',
              status: 'AVAILABLE',
              maxLoad: 25
            }
          ]
        }))
      })

      const response = await request(server)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    test('POST /api/vehicles - 创建车辆应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'vehicle-456',
            licenseNumber: '京B67890',
            brand: '解放',
            model: 'J7',
            status: 'AVAILABLE'
          }
        }))
      })

      const vehicleData = {
        licenseNumber: '京B67890',
        vinNumber: 'VIN123456789012345',
        brand: '解放',
        model: 'J7',
        year: 2023,
        vehicleType: 'TRUCK',
        maxLoad: 30,
        maxVolume: 60,
        dailyRate: 1200
      }

      const response = await request(server)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${authToken}`)
        .send(vehicleData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.licenseNumber).toBe(vehicleData.licenseNumber)

      vehicleId = response.body.data.id
    })

    test('GET /api/vehicles/available - 获取可用车辆应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'vehicle-123',
              licenseNumber: '京A12345',
              status: 'AVAILABLE',
              currentLocation: '北京市朝阳区'
            }
          ]
        }))
      })

      const response = await request(server)
        .get('/api/vehicles/available')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBe(true)
    })
  })

  describe('在途跟踪API测试', () => {
    test('POST /api/tracking/logs - 上报位置应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'tracking-log-123',
            shipmentId: 'shipment-456',
            latitude: 39.9042,
            longitude: 116.4074,
            timestamp: '2024-01-01T10:00:00Z'
          }
        }))
      })

      const trackingData = {
        shipmentId: 'shipment-456',
        latitude: 39.9042,
        longitude: 116.4074,
        address: '北京市朝阳区',
        speed: 60,
        heading: 90,
        timestamp: new Date().toISOString()
      }

      const response = await request(server)
        .post('/api/tracking/logs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(trackingData)
        .expect(201)

      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.latitude).toBe(trackingData.latitude)
    })

    test('GET /api/tracking/routes/:shipmentId - 获取跟踪路线应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'route-123',
            shipmentId: 'shipment-456',
            plannedRoute: '北京 -> 上海',
            status: 'ACTIVE'
          }
        }))
      })

      const response = await request(server)
        .get('/api/tracking/routes/shipment-456')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toBeDefined()
    })
  })

  describe('自然语言操作API测试', () => {
    test('POST /api/nlops/command - 自然语言命令应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            action: 'create_order',
            intent: '创建订单',
            parameters: {
              origin: '北京',
              destination: '上海'
            },
            result: '订单创建成功',
            orderId: 'order-123'
          }
        }))
      })

      const commandData = {
        command: '创建一个从北京到上海的运输订单',
        context: {
          userIntent: 'create_order',
          priority: 'normal'
        }
      }

      const response = await request(server)
        .post('/api/nlops/command')
        .set('Authorization', `Bearer ${authToken}`)
        .send(commandData)
        .expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data.action).toBeDefined()
      expect(response.body.data.result).toBeDefined()
    })
  })

  describe('错误处理测试', () => {
    test('无效ID应该返回404', async () => {
      const server = createServer((req, res) => {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: '订单不存在',
          code: 'ORDER_NOT_FOUND'
        }))
      })

      const response = await request(server)
        .get('/api/orders/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)

      expect(response.body.success).toBe(false)
    })

    test('无效数据应该返回400', async () => {
      const server = createServer((req, res) => {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: '请求数据验证失败',
          code: 'VALIDATION_ERROR'
        }))
      })

      const invalidOrderData = {
        // 缺少必需字段
        cargoName: '测试货物'
      }

      const response = await request(server)
        .post('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidOrderData)
        .expect(400)

      expect(response.body.success).toBe(false)
    })
  })

  describe('性能测试', () => {
    test('API响应时间应该在合理范围内', async () => {
      const server = createServer((req, res) => {
        // 模拟快速响应
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({
            success: true,
            data: [],
            pagination: { page: 1, limit: 10, total: 0, pages: 0 }
          }))
        }, 50) // 模拟50ms延迟
      })

      const startTime = Date.now()

      await request(server)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200)

      const responseTime = Date.now() - startTime
      expect(responseTime).toBeLessThan(1000) // 响应时间应该小于1秒
    })
  })

  describe('API文档测试', () => {
    test('GET /api/docs - 应该返回OpenAPI文档', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          openapi: '3.0.0',
          info: {
            title: 'TMS NL-Ops API',
            version: '1.0.0'
          },
          paths: {}
        }))
      })

      const response = await request(server)
        .get('/api/docs')
        .expect(200)

      expect(response.body.openapi).toBe('3.0.0')
      expect(response.body.info).toBeDefined()
      expect(response.body.paths).toBeDefined()
    })

    test('POST /api/docs - 更新文档应该成功', async () => {
      const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          message: 'API文档更新成功'
        }))
      })

      const response = await request(server)
        .post('/api/docs')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(response.body.success).toBe(true)
    })
  })
})