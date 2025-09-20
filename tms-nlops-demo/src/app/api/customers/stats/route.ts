import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const stats = await CustomerService.getCustomerStats()

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('获取客户统计失败:', error)
    return NextResponse.json(
      { error: '获取客户统计失败', details: error.message },
      { status: 500 }
    )
  }
}