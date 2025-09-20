import { NextResponse } from 'next/server'
import { HealthChecker } from '@/lib/health'

export async function GET() {
  try {
    const isReady = await HealthChecker.ready()

    if (isReady) {
      return NextResponse.json({ status: 'ready' }, { status: 200 })
    } else {
      return NextResponse.json({ status: 'not ready' }, { status: 503 })
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Health check failed'
      },
      { status: 503 }
    )
  }
}
