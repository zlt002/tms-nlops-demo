import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

/**
 * @summary 系统健康检查
 * @description 检查系统各组件的健康状态
 * @tags 系统管理
 * @security false
 */
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()

    // 检查数据库连接
    await prisma.$queryRaw`SELECT 1`

    // 检查系统资源
    const memoryUsage = process.memoryUsage()
    const uptime = process.uptime()

    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.round(uptime),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      database: {
        status: 'connected',
        responseTime: Date.now() - startTime
      },
      memory: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        external: Math.round(memoryUsage.external / 1024 / 1024), // MB
      },
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        cpuUsage: process.cpuUsage()
      }
    }

    return NextResponse.json({
      success: true,
      data: healthCheck
    })
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json({
      success: false,
      error: 'Health check failed',
      code: 'HEALTH_CHECK_FAILED',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}
