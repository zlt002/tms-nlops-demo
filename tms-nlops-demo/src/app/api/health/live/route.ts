import { NextResponse } from 'next/server'

export async function GET() {
  // Liveness probe - 简单检查进程是否存活
  return NextResponse.json({ status: 'alive' }, { status: 200 })
}
