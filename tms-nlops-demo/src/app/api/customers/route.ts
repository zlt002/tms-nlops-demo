import { NextRequest, NextResponse } from 'next/server'
import { CustomerService } from '@/services/customerService'
import { createCustomerSchema, customerQuerySchema } from '@/lib/validators/customer'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = {
      customerType: searchParams.get('customerType') || undefined,
      status: searchParams.get('status') || undefined,
      search: searchParams.get('search') || undefined,
      industry: searchParams.get('industry') || undefined,
      minCreditRating: searchParams.get('minCreditRating') ? parseInt(searchParams.get('minCreditRating')!) : undefined,
      maxCreditRating: searchParams.get('maxCreditRating') ? parseInt(searchParams.get('maxCreditRating')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    }

    const validatedQuery = customerQuerySchema.parse(query)
    const result = await CustomerService.getCustomersWithStats(validatedQuery)

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
    const body = await request.json()
    const validatedData = createCustomerSchema.parse(body)

    const customer = await CustomerService.createCustomer(validatedData)

    return NextResponse.json({
      success: true,
      data: customer,
      message: '客户创建成功'
    }, { status: 201 })
  } catch (error) {
    console.error('创建客户失败:', error)
    return NextResponse.json(
      { error: '创建客户失败', details: error.message },
      { status: 500 }
    )
  }
}
