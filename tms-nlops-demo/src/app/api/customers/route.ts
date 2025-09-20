import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const query = {
      customerType: searchParams.get('customerType') || undefined,
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
      city: searchParams.get('city') || undefined,
      province: searchParams.get('province') || undefined,
      minCreditRating: searchParams.get('minCreditRating') ? parseInt(searchParams.get('minCreditRating')!) : undefined,
      maxCreditRating: searchParams.get('maxCreditRating') ? parseInt(searchParams.get('maxCreditRating')!) : undefined,
      tags: searchParams.get('tags') ? searchParams.get('tags')!.split(',') : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const result = await CustomerService.getCustomersWithStats(query)

    return NextResponse.json({
      success: true,
      data: result.customers,
      pagination: result.pagination
    })
  } catch (error) {
    console.error('获取客户列表失败:', error)
    return NextResponse.json(
      { error: '获取客户列表失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 })
    }

    const body = await request.json()

    const customer = await CustomerService.createCustomer(body, user.id)

    return NextResponse.json({
      success: true,
      data: customer,
      message: '客户创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建客户失败:', error)

    if (error.message.includes('邮箱已被使用')) {
      return NextResponse.json(
        { error: '邮箱已被使用' },
        { status: 400 }
      )
    }

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '创建客户失败', details: error.message },
      { status: 500 }
    )
  }
}
