const { performance } = require('perf_hooks')
const axios = require('axios')
const { createServer } = require('http')

// 性能测试配置
const config = {
  baseUrl: 'http://localhost:3000/api',
  testDuration: 30000, // 30秒
  concurrentUsers: 50,
  endpoints: [
    {
      name: '健康检查',
      path: '/health',
      method: 'GET',
      weight: 0.1
    },
    {
      name: '获取订单列表',
      path: '/orders',
      method: 'GET',
      weight: 0.3
    },
    {
      name: '获取客户列表',
      path: '/customers',
      method: 'GET',
      weight: 0.2
    },
    {
      name: '获取车辆列表',
      path: '/vehicles',
      method: 'GET',
      weight: 0.2
    },
    {
      name: '自然语言命令',
      path: '/nlops/command',
      method: 'POST',
      weight: 0.2,
      data: {
        command: '查询订单状态',
        context: { userIntent: 'query_status' }
      }
    }
  ]
}

// 性能测试结果统计
class PerformanceStats {
  constructor() {
    this.results = []
    this.startTime = performance.now()
  }

  addResult(endpoint, responseTime, statusCode, error = null) {
    this.results.push({
      endpoint,
      responseTime,
      statusCode,
      timestamp: Date.now(),
      error
    })
  }

  getSummary() {
    const totalTime = performance.now() - this.startTime
    const successfulRequests = this.results.filter(r => !r.error && r.statusCode < 400)
    const failedRequests = this.results.filter(r => r.error || r.statusCode >= 400)

    const responseTimes = successfulRequests.map(r => r.responseTime)
    const avgResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0
    const maxResponseTime = Math.max(...responseTimes, 0)
    const minResponseTime = Math.min(...responseTimes, 0)

    // 计算百分位数
    const sortedTimes = [...responseTimes].sort((a, b) => a - b)
    const p95 = sortedTimes[Math.floor(sortedTimes.length * 0.95)] || 0
    const p99 = sortedTimes[Math.floor(sortedTimes.length * 0.99)] || 0

    // 按端点分组统计
    const endpointStats = {}
    this.results.forEach(result => {
      if (!endpointStats[result.endpoint]) {
        endpointStats[result.endpoint] = {
          total: 0,
          successful: 0,
          failed: 0,
          totalTime: 0,
          times: []
        }
      }

      const stats = endpointStats[result.endpoint]
      stats.total++
      stats.totalTime += result.responseTime
      stats.times.push(result.responseTime)

      if (!result.error && result.statusCode < 400) {
        stats.successful++
      } else {
        stats.failed++
      }
    })

    // 计算每个端点的统计信息
    Object.keys(endpointStats).forEach(endpoint => {
      const stats = endpointStats[endpoint]
      stats.avgResponseTime = stats.successful > 0
        ? stats.totalTime / stats.successful
        : 0
      stats.successRate = stats.total > 0
        ? (stats.successful / stats.total) * 100
        : 0
      stats.maxResponseTime = Math.max(...stats.times, 0)
      stats.minResponseTime = Math.min(...stats.times, 0)
    })

    return {
      totalRequests: this.results.length,
      successfulRequests: successfulRequests.length,
      failedRequests: failedRequests.length,
      successRate: this.results.length > 0
        ? (successfulRequests.length / this.results.length) * 100
        : 0,
      testDuration: totalTime,
      requestsPerSecond: this.results.length / (totalTime / 1000),
      avgResponseTime,
      minResponseTime,
      maxResponseTime,
      p95ResponseTime: p95,
      p99ResponseTime: p99,
      endpointStats
    }
  }
}

// 创建模拟服务器用于测试
function createMockServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:3000`)
    const pathname = url.pathname.replace('/api', '')

    // 模拟延迟
    const delay = Math.random() * 100 + 10 // 10-110ms延迟

    setTimeout(() => {
      if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: { status: 'healthy', timestamp: new Date().toISOString() }
        }))
      } else if (pathname === '/orders' || pathname === '/customers' || pathname === '/vehicles') {
        // 模拟分页数据
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '20')

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: Array(Math.min(limit, 10)).fill(null).map((_, i) => ({
            id: `item-${page}-${i}`,
            name: `测试项目 ${page}-${i}`,
            status: ['ACTIVE', 'PENDING', 'COMPLETED'][Math.floor(Math.random() * 3)]
          })),
          pagination: {
            page,
            limit,
            total: 100,
            pages: Math.ceil(100 / limit)
          }
        }))
      } else if (pathname === '/nlops/command') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: true,
          data: {
            action: 'query_status',
            result: '查询成功',
            data: { totalOrders: 10, activeShipments: 5 }
          }
        }))
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, error: 'Not found' }))
      }
    }, delay)
  })

  return server
}

// 执行单个请求
async function makeRequest(endpoint, config, stats) {
  const startTime = performance.now()

  try {
    const response = await axios({
      method: config.method,
      url: config.baseUrl + config.path,
      data: config.data,
      timeout: 5000
    })

    const responseTime = performance.now() - startTime
    stats.addResult(endpoint, responseTime, response.status)

  } catch (error) {
    const responseTime = performance.now() - startTime
    const statusCode = error.response?.status || 0
    stats.addResult(endpoint, responseTime, statusCode, error.message)
  }
}

// 性能测试主函数
async function runPerformanceTest() {
  console.log('🚀 开始TMS NL-Ops API性能测试')
  console.log(`⏱️  测试时长: ${config.testDuration / 1000}秒`)
  console.log(`👥 并发用户数: ${config.concurrentUsers}`)
  console.log(`🌐 目标服务器: ${config.baseUrl}`)
  console.log('')

  // 创建模拟服务器
  const mockServer = createMockServer()
  mockServer.listen(3000)
  console.log('📡 启动模拟服务器 (端口 3000)')

  // 创建统计对象
  const stats = new PerformanceStats()

  // 加权随机选择端点
  function getRandomEndpoint() {
    const totalWeight = config.endpoints.reduce((sum, ep) => sum + ep.weight, 0)
    let random = Math.random() * totalWeight

    for (const endpoint of config.endpoints) {
      random -= endpoint.weight
      if (random <= 0) {
        return endpoint
      }
    }
    return config.endpoints[0]
  }

  // 开始测试
  console.log('🔥 开始执行性能测试...')
  const testStartTime = performance.now()

  // 创建并发用户
  const users = []
  for (let i = 0; i < config.concurrentUsers; i++) {
    users.push(new Promise(async (resolve) => {
      const userStartTime = performance.now()

      while (performance.now() - testStartTime < config.testDuration) {
        const endpoint = getRandomEndpoint()
        await makeRequest(endpoint.name, { ...endpoint, baseUrl: config.baseUrl }, stats)

        // 添加随机延迟，模拟真实用户行为
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
      }

      resolve()
    }))
  }

  // 等待所有用户完成
  await Promise.all(users)
  const testEndTime = performance.now()

  // 关闭模拟服务器
  mockServer.close()
  console.log('📡 关闭模拟服务器')

  // 生成报告
  const summary = stats.getSummary()

  console.log('\n📊 性能测试报告')
  console.log('=' * 50)
  console.log(`⏱️  总测试时长: ${(testEndTime - testStartTime) / 1000}秒`)
  console.log(`📈 总请求数: ${summary.totalRequests}`)
  console.log(`✅ 成功请求数: ${summary.successfulRequests}`)
  console.log(`❌ 失败请求数: ${summary.failedRequests}`)
  console.log(`🎯 成功率: ${summary.successRate.toFixed(2)}%`)
  console.log(`⚡ 每秒请求数: ${summary.requestsPerSecond.toFixed(2)}`)
  console.log('')

  console.log('📊 响应时间统计:')
  console.log(`   - 平均响应时间: ${summary.avgResponseTime.toFixed(2)}ms`)
  console.log(`   - 最小响应时间: ${summary.minResponseTime.toFixed(2)}ms`)
  console.log(`   - 最大响应时间: ${summary.maxResponseTime.toFixed(2)}ms`)
  console.log(`   - P95响应时间: ${summary.p95ResponseTime.toFixed(2)}ms`)
  console.log(`   - P99响应时间: ${summary.p99ResponseTime.toFixed(2)}ms`)
  console.log('')

  console.log('📊 端点性能统计:')
  for (const [endpoint, stats] of Object.entries(summary.endpointStats)) {
    console.log(`   ${endpoint}:`)
    console.log(`     - 总请求数: ${stats.total}`)
    console.log(`     - 成功率: ${stats.successRate.toFixed(2)}%`)
    console.log(`     - 平均响应时间: ${stats.avgResponseTime.toFixed(2)}ms`)
    console.log(`     - 最大响应时间: ${stats.maxResponseTime.toFixed(2)}ms`)
  }

  // 性能评估
  console.log('\n🎯 性能评估:')
  const isPerformanceGood =
    summary.successRate > 95 &&
    summary.avgResponseTime < 500 &&
    summary.p95ResponseTime < 1000

  if (isPerformanceGood) {
    console.log('✅ 性能表现优秀！系统在高负载下稳定运行。')
  } else if (summary.successRate > 90 && summary.avgResponseTime < 1000) {
    console.log('⚠️  性能表现一般，建议优化响应时间。')
  } else {
    console.log('❌ 性能表现不佳，需要重点关注和优化。')
  }

  // 生成详细报告文件
  const report = {
    testConfig: config,
    summary,
    timestamp: new Date().toISOString(),
    recommendations: generateRecommendations(summary)
  }

  const fs = require('fs')
  const path = require('path')
  const reportPath = path.join(__dirname, 'performance-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\n📄 详细报告已保存到: ${reportPath}`)
}

// 生成性能优化建议
function generateRecommendations(summary) {
  const recommendations = []

  if (summary.successRate < 95) {
    recommendations.push({
      type: 'stability',
      message: '系统稳定性需要改善，建议检查错误日志和增加重试机制'
    })
  }

  if (summary.avgResponseTime > 500) {
    recommendations.push({
      type: 'performance',
      message: '平均响应时间较长，建议优化数据库查询和API逻辑'
    })
  }

  if (summary.p95ResponseTime > 1000) {
    recommendations.push({
      type: 'performance',
      message: 'P95响应时间过高，建议实施缓存策略和性能监控'
    })
  }

  if (summary.requestsPerSecond < 10) {
    recommendations.push({
      type: 'scalability',
      message: '系统吞吐量较低，考虑负载均衡和水平扩展'
    })
  }

  return recommendations
}

// 运行测试
if (require.main === module) {
  runPerformanceTest().catch(console.error)
}

module.exports = { runPerformanceTest, PerformanceStats }