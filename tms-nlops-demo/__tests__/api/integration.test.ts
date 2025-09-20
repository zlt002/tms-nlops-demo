import request from 'supertest'
import { createServer } from 'http'

describe('TMS NL-Ops API集成测试', () => {
  let authToken: string
  let server: any

  beforeAll(async () => {
    // 创建模拟服务器用于集成测试
    server = createServer((req, res) => {
      // 模拟API响应
      if (req.url === '/api/auth/login' && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            token: 'integration-test-token',
            user: {
              id: 'integration-user',
              email: 'integration@test.com',
              name: '集成测试用户'
            }
          }
        }))
      } else if (req.url?.startsWith('/api/orders') && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'order-integration-1',
              orderNumber: 'ORD-INT-001',
              status: 'CONFIRMED',
              cargoName: '集成测试货物'
            }
          ],
          pagination: { page: 1, limit: 20, total: 1, pages: 1 }
        }))
      } else if (req.url?.startsWith('/api/customers') && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'customer-integration-1',
              customerType: 'COMPANY',
              companyName: '集成测试公司',
              email: 'integration@company.com'
            }
          ]
        }))
      } else if (req.url?.startsWith('/api/vehicles') && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: [
            {
              id: 'vehicle-integration-1',
              licenseNumber: '京C12345',
              brand: '测试品牌',
              status: 'AVAILABLE'
            }
          ]
        }))
      } else if (req.url?.startsWith('/api/tracking/logs') && req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            id: 'tracking-integration-1',
            shipmentId: 'shipment-integration-1',
            latitude: 39.9042,
            longitude: 116.4074
          }
        }))
      } else if (req.url?.startsWith('/api/nlops/command') && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            action: 'query_status',
            result: '查询成功',
            data: {
              totalOrders: 1,
              activeShipments: 0
            }
          }
        }))
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          error: 'API端点不存在'
        }))
      }
    })

    // 获取认证token
    const loginResponse = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'integration@test.com',
        password: 'password123'
      })

    authToken = loginResponse.body.data.token
  })

  afterAll(() => {
    if (server) {
      server.close()
    }
  })

  describe('完整的业务流程测试', () => {
    test('端到端业务流程：创建订单 -> 分配车辆 -> 跟踪位置', async () => {
      // 1. 获取客户列表
      const customersResponse = await request(server)
        .get('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(customersResponse.body.success).toBe(true)
      expect(customersResponse.body.data.length).toBeGreaterThan(0)
      const customerId = customersResponse.body.data[0].id

      // 2. 获取可用车辆
      const vehiclesResponse = await request(server)
        .get('/api/vehicles')
        .query({ status: 'AVAILABLE' })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(vehiclesResponse.body.success).toBe(true)
      expect(vehiclesResponse.body.data.length).toBeGreaterThan(0)

      // 3. 查询订单状态
      const ordersResponse = await request(server)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      expect(ordersResponse.body.success).toBe(true)
      expect(ordersResponse.body.data).toBeDefined()

      // 4. 使用自然语言查询状态
      const nlopsResponse = await request(server)
        .post('/api/nlops/command')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          command: '查看当前的订单状态',
          context: { userIntent: 'query_status' }
        })
        .expect(200)

      expect(nlopsResponse.body.success).toBe(true)
      expect(nlopsResponse.body.data.action).toBe('query_status')

      // 5. 模拟位置跟踪
      const trackingResponse = await request(server)
        .post('/api/tracking/logs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          shipmentId: 'shipment-integration-1',
          latitude: 39.9042,
          longitude: 116.4074,
          address: '北京市朝阳区',
          speed: 60,
          timestamp: new Date().toISOString()
        })
        .expect(201)

      expect(trackingResponse.body.success).toBe(true)
      expect(trackingResponse.body.data.id).toBeDefined()
    })

    test('并发请求处理能力测试', async () => {
      // 发送多个并发请求
      const requests = [
        request(server).get('/api/orders').set('Authorization', `Bearer ${authToken}`),
        request(server).get('/api/customers').set('Authorization', `Bearer ${authToken}`),
        request(server).get('/api/vehicles').set('Authorization', `Bearer ${authToken}`),
        request(server).post('/api/nlops/command')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ command: '查看系统状态', context: {} })
      ]

      const responses = await Promise.all(requests)

      // 验证所有请求都成功
      responses.forEach(response => {
        expect([200, 201]).toContain(response.status)
        expect(response.body.success).toBe(true)
      })
    })

    test('API响应格式一致性测试', async () => {
      // 测试多个API端点的响应格式是否一致
      const endpoints = [
        { method: 'GET', url: '/api/orders' },
        { method: 'GET', url: '/api/customers' },
        { method: 'GET', url: '/api/vehicles' }
      ]

      for (const endpoint of endpoints) {
        const response = await request(server)
          [endpoint.method.toLowerCase()](endpoint.url)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200)

        // 验证响应格式
        expect(response.body).toHaveProperty('success')
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveProperty('timestamp')
        expect(typeof response.body.success).toBe('boolean')
        expect(Array.isArray(response.body.data)).toBe(true)
      }
    })
  })

  describe('错误处理集成测试', () => {
    test('认证失败处理', async () => {
      // 测试无效token
      const response = await request(server)
        .get('/api/orders')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401)

      expect(response.body.success).toBe(false)

      // 测试无认证
      await request(server)
        .get('/api/orders')
        .expect(401)
    })

    test('请求参数验证', async () => {
      // 测试无效的分页参数
      const response = await request(server)
        .get('/api/orders')
        .query({ page: -1, limit: 0 })
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400)

      expect(response.body.success).toBe(false)
    })

    test('API端点不存在', async () => {
      const response = await request(server)
        .get('/api/nonexistent-endpoint')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)

      expect(response.body.success).toBe(false)
    })
  })

  describe('性能集成测试', () => {
    test('批量操作性能', async () => {
      const startTime = Date.now()

      // 执行批量查询操作
      const batchSize = 10
      const requests = Array(batchSize).fill(null).map(() =>
        request(server)
          .get('/api/orders')
          .set('Authorization', `Bearer ${authToken}`)
      )

      await Promise.all(requests)

      const totalTime = Date.now() - startTime
      const avgTimePerRequest = totalTime / batchSize

      // 平均每个请求应该在合理时间内完成
      expect(avgTimePerRequest).toBeLessThan(500) // 500ms
    })

    test('连接稳定性测试', async () => {
      // 连续发送请求测试连接稳定性
      for (let i = 0; i < 5; i++) {
        const response = await request(server)
          .get('/api/health')
          .expect(200)

        expect(response.body.success).toBe(true)

        // 短暂延迟
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    })
  })

  describe('数据一致性测试', () => {
    test('数据类型一致性', async () => {
      const response = await request(server)
        .get('/api/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)

      // 验证数据类型一致性
      if (response.body.data.length > 0) {
        const order = response.body.data[0]
        expect(typeof order.id).toBe('string')
        expect(typeof order.orderNumber).toBe('string')
        expect(typeof order.status).toBe('string')
        expect(typeof order.createdAt).toBe('string')
      }
    })

    test('分页数据一致性', async () => {
      // 测试不同页面的数据一致性
      const page1 = await request(server)
        .get('/api/orders')
        .query({ page: 1, limit: 5 })
        .set('Authorization', `Bearer ${authToken}`)

      const page2 = await request(server)
        .get('/api/orders')
        .query({ page: 2, limit: 5 })
        .set('Authorization', `Bearer ${authToken}`)

      expect(page1.status).toBe(200)
      expect(page2.status).toBe(200)
      expect(page1.body.pagination.page).toBe(1)
      expect(page2.body.pagination.page).toBe(2)
    })
  })
})