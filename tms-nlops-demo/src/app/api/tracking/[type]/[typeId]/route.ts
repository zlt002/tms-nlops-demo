import { NextRequest, NextResponse } from 'next/server'
import { TrackingService } from '@/services/trackingService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; typeId: string } }
) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url)

    // 获取实时位置流（简化版）
    if (searchParams.get('stream') === 'true') {
      const location = await TrackingService.getCurrentLocation(params.type, params.typeId)

      // 在实际项目中，这里应该使用SSE或WebSocket
      return NextResponse.json({
        success: true,
        data: location,
        timestamp: new Date().toISOString()
      })
    }

    // 获取最近的跟踪点
    const recentCount = parseInt(searchParams.get('recent') || '10')
    const logs = await prisma.trackingLog.findMany({
      where: {
        type: params.type,
        typeId: params.typeId
      },
      orderBy: { timestamp: 'desc' },
      take: recentCount
    })

    return ApiResponseBuilder.success(logs)
  })()
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string; typeId: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()

    // 更新位置
    const trackingLog = await TrackingService.reportLocation({
      type: params.type,
      typeId: params.typeId,
      ...body
    })

    return ApiResponseBuilder.success(trackingLog, '位置更新成功')
  })()
}
