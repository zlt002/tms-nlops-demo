import { NextResponse } from 'next/server'
import { DatabaseConnection } from '@/lib/db/connection'

export async function GET() {
  try {
    const healthStatus = await DatabaseConnection.getHealthStatus()

    if (healthStatus.status === 'healthy') {
      return NextResponse.json({
        status: 'ok',
        message: 'Database connection is healthy',
        database: healthStatus.database,
      })
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          error: healthStatus.error,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
