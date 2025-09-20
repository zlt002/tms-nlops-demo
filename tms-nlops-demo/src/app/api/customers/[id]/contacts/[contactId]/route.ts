import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'
import { customerContactSchema } from '@/lib/validators/customer'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    // 获取所有联系人并筛选特定联系人
    const contacts = await CustomerService.getCustomerContacts(params.id)
    const contact = contacts.find(c => c.id === params.contactId)

    if (!contact) {
      return NextResponse.json(
        { error: '联系人不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('获取客户联系人详情失败:', error)

    if (error.message.includes('客户不存在')) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: '获取客户联系人详情失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = customerContactSchema.partial().parse(body)

    const updatedContact = await CustomerService.updateCustomerContact(params.contactId, validatedData)

    return NextResponse.json({
      success: true,
      data: updatedContact,
      message: '联系人更新成功'
    })
  } catch (error) {
    console.error('更新客户联系人失败:', error)

    if (error.message.includes('联系人不存在')) {
      return NextResponse.json(
        { error: '联系人不存在' },
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
      { error: '更新客户联系人失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; contactId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    await CustomerService.deleteCustomerContact(params.contactId)

    return NextResponse.json({
      success: true,
      message: '联系人删除成功'
    })
  } catch (error) {
    console.error('删除客户联系人失败:', error)

    if (error.message.includes('联系人不存在')) {
      return NextResponse.json(
        { error: '联系人不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: '删除客户联系人失败', details: error.message },
      { status: 500 }
    )
  }
}