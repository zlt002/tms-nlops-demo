import { NextResponse } from 'next/server'
import { HealthChecker } from '@/lib/health'
import { ApiResponseBuilder } from '@/lib/api/response'

export async function GET() {
  try {
    const isLive = await HealthChecker.live()

    if (isLive) {
      const healthData = {
        status: 'alive',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0'
      }

      return ApiResponseBuilder.success(healthData, '服务存活检查通过')
    } else {
      return ApiResponseBuilder.error('服务不可用', 503)
    }
  } catch (error) {
    return ApiResponseBuilder.error(
      '健康检查失败',
      503,
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}
