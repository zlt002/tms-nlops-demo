import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'
import { CustomerStatus } from '@prisma/client'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const body = await request.json()
    const { status, reason } = body

    if (!Object.values(CustomerStatus).includes(status)) {
      return NextResponse.json(
        { error: '无效的客户状态' },
        { status: 400 }
      )
    }

    const updatedCustomer = await CustomerService.updateCustomerStatus(
      params.id,
      status,
      reason,
      user.id
    )

    return NextResponse.json({
      success: true,
      data: updatedCustomer,
      message: '客户状态更新成功'
    })
  } catch (error) {
    console.error('更新客户状态失败:', error)

    if (error.message.includes('客户不存在')) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    if (error.message.includes('无法从')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '更新客户状态失败', details: error.message },
      { status: 500 }
    )
  }
}