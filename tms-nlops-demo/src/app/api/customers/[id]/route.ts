import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { CustomerService } from '@/services/customerService'
import { updateCustomerSchema } from '@/lib/validators/customer'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            shipments: {
              include: {
                vehicle: true,
                driver: true
              }
            }
          }
        },
        contacts: {
          orderBy: { isPrimary: 'desc' }
        },
        documents: true,
        _count: {
          select: {
            orders: true,
            contacts: true
          }
        }
      }
    })

    if (!customer) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: customer
    })
  } catch (error) {
    console.error('获取客户详情失败:', error)
    return NextResponse.json(
      { error: '获取客户详情失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateCustomerSchema.parse(body)

    const existingCustomer = await prisma.customer.findUnique({
      where: { id: params.id }
    })

    if (!existingCustomer) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    const updatedCustomer = await CustomerService.updateCustomer(params.id, validatedData)

    return NextResponse.json({
      success: true,
      data: updatedCustomer,
      message: '客户更新成功'
    })
  } catch (error) {
    console.error('更新客户失败:', error)
    return NextResponse.json(
      { error: '更新客户失败', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    })

    if (!customer) {
      return NextResponse.json(
        { error: '客户不存在' },
        { status: 404 }
      )
    }

    // 检查是否有关联的订单
    if (customer._count.orders > 0) {
      return NextResponse.json(
        { error: '该客户有相关订单，无法删除' },
        { status: 400 }
      )
    }

    await prisma.customer.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: '客户删除成功'
    })
  } catch (error) {
    console.error('删除客户失败:', error)
    return NextResponse.json(
      { error: '删除客户失败', details: error.message },
      { status: 500 }
    )
  }
}
