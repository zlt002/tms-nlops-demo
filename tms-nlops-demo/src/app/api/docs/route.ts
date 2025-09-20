import { NextRequest, NextResponse } from 'next/server'
import { generateOpenAPIDocument } from '@/lib/openapi'

export async function GET(request: NextRequest) {
  try {
    const spec = generateOpenAPIDocument()

    return NextResponse.json(spec, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  } catch (error) {
    console.error('Failed to generate OpenAPI spec:', error)
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
}
