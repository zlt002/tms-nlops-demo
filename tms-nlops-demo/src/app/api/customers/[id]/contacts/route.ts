import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'
import { customerContactSchema } from '@/lib/validators/customer'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const contacts = await CustomerService.getCustomerContacts(params.id)

    return NextResponse.json({
      success: true,
      data: contacts
    })
  } catch (error) {
    console.error('获取客户联系人失败:', error)

    if (error.message.includes('客户不存在')) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: '获取客户联系人失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = customerContactSchema.parse(body)

    const contact = await CustomerService.addCustomerContact(params.id, validatedData, user.id)

    return NextResponse.json({
      success: true,
      data: contact,
      message: '联系人创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建客户联系人失败:', error)

    if (error.message.includes('客户不存在')) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '创建客户联系人失败', details: error.message },
      { status: 500 }
    )
  }
}