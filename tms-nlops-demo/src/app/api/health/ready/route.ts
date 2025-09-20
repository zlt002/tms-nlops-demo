import { HealthChecker } from '@/lib/health'
import { ApiResponseBuilder } from '@/lib/api/response'

export async function GET() {
  try {
    const isReady = await HealthChecker.ready()

    if (isReady) {
      const healthData = await HealthChecker.check(true)
      return ApiResponseBuilder.success(healthData, '服务就绪检查通过')
    } else {
      return ApiResponseBuilder.error('服务未就绪', 503)
    }
  } catch (error) {
    return ApiResponseBuilder.error(
      '就绪检查失败',
      503,
      error instanceof Error ? error.message : 'Unknown error'
    )
  }
}
