import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { OrderService } from '@/services/orderService'
import { CustomerService } from '@/services/customerService'
import { VehicleService } from '@/services/vehicleService'
import { DriverService } from '@/services/driverService'

const commandSchema = z.object({
  command: z.string().min(1, '命令不能为空'),
  userId: z.string().uuid().optional(),
  context: z.object({}).optional()
})

// 增强的意图识别和参数提取
function identifyIntent(command: string) {
  const lowerCommand = command.toLowerCase()

  // 创建订单
  if (lowerCommand.includes('创建订单') || lowerCommand.includes('新增订单') ||
      (lowerCommand.includes('下单') && lowerCommand.includes('从')) ||
      (lowerCommand.includes('运货') && lowerCommand.includes('到'))) {
    // 提取客户名
    const customerMatch = command.match(/(?:为|给)\s*([^\s，。]+)(?:\s*创建|下单)/)
    // 提取地址
    const originMatch = command.match(/从\s*([^\s，。]+)\s*(?:运|送)/)
    const destMatch = command.match(/(?:运|送)\s*到\s*([^\s，。]+)/)
    // 提取货物信息
    const cargoMatch = command.match(/(\d+)\s*(箱|吨|公斤|kg)/)

    return {
      intent: 'create_order',
      confidence: 0.9,
      parameters: {
        customerName: customerMatch?.[1],
        origin: originMatch?.[1],
        destination: destMatch?.[1],
        cargo: cargoMatch ? {
          quantity: parseInt(cargoMatch[1]),
          unit: cargoMatch[2]
        } : undefined
      }
    }
  }

  // 查询订单
  if (lowerCommand.includes('查询订单') || lowerCommand.includes('查看订单') ||
      lowerCommand.includes('订单状态')) {
    const orderNumberMatch = command.match(/订单[号]?\s*([A-Z0-9]+)/)
    const customerMatch = command.match(/([^\s，。]+)\s*(?:的|所有)订单/)

    return {
      intent: 'query_orders',
      confidence: 0.9,
      parameters: {
        orderNumber: orderNumberMatch?.[1],
        customerName: customerMatch?.[1]
      }
    }
  }

  // 查询车辆
  if (lowerCommand.includes('查询车辆') || lowerCommand.includes('查看车辆') ||
      lowerCommand.includes('车辆位置') || lowerCommand.includes('司机位置')) {
    const plateMatch = command.match(/车牌[号]?\s*([A-Z0-9]+)/)
    const driverMatch = command.match(/司机\s*([^\s，。]+)/)

    return {
      intent: 'query_vehicle',
      confidence: 0.9,
      parameters: {
        plateNumber: plateMatch?.[1],
        driverName: driverMatch?.[1]
      }
    }
  }

  // 分配车辆
  if (lowerCommand.includes('分配车辆') || lowerCommand.includes('安排车辆') ||
      lowerCommand.includes('调度') || lowerCommand.includes('排车')) {
    const orderMatch = command.match(/订单[号]?\s*([A-Z0-9]+)/)
    const vehicleMatch = command.match(/车辆[号]?\s*([A-Z0-9]+)/)

    return {
      intent: 'assign_vehicle',
      confidence: 0.9,
      parameters: {
        orderNumber: orderMatch?.[1],
        vehicleNumber: vehicleMatch?.[1]
      }
    }
  }

  // 创建客户
  if (lowerCommand.includes('创建客户') || lowerCommand.includes('新增客户')) {
    const nameMatch = command.match(/(?:创建|新增)\s*([^\s，。]+)\s*(?:客户|公司)/)
    const typeMatch = lowerCommand.includes('公司') ? 'COMPANY' : 'INDIVIDUAL'

    return {
      intent: 'create_customer',
      confidence: 0.9,
      parameters: {
        name: nameMatch?.[1],
        type: typeMatch
      }
    }
  }

  return {
    intent: 'unknown',
    confidence: 0.3,
    parameters: {}
  }
}

// 命令执行器
async function executeCommand(intent: string, parameters: any) {
  switch (intent) {
    case 'create_order':
      return await executeCreateOrder(parameters)

    case 'query_orders':
      return await executeQueryOrders(parameters)

    case 'query_vehicle':
      return await executeQueryVehicle(parameters)

    case 'assign_vehicle':
      return await executeAssignVehicle(parameters)

    case 'create_customer':
      return await executeCreateCustomer(parameters)

    default:
      throw new Error('未知的命令意图')
  }
}

async function executeCreateOrder(params: any) {
  // 查找客户
  let customerId
  if (params.customerName) {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { companyName: { contains: params.customerName, mode: 'insensitive' } },
          { firstName: { contains: params.customerName, mode: 'insensitive' } },
          { lastName: { contains: params.customerName, mode: 'insensitive' } }
        ]
      }
    })

    if (customers.length === 0) {
      throw new Error(`未找到客户: ${params.customerName}`)
    }
    customerId = customers[0].id
  }

  // 创建订单
  const orderData = {
    customerId,
    cargo: {
      name: params.cargo?.name || '货物',
      weight: params.cargo?.quantity * 10 || 100, // 假设每箱10kg
      volume: params.cargo?.quantity * 0.5 || 5, // 假设每箱0.5立方米
      value: 1000
    },
    addresses: {
      origin: params.origin || '待确认',
      destination: params.destination || '待确认',
      originContact: '待确认',
      destinationContact: '待确认'
    },
    expectedTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24小时后
  }

  // 调用订单服务
  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customerId: orderData.customerId,
      cargoName: orderData.cargo.name,
      cargoWeight: orderData.cargo.weight,
      cargoVolume: orderData.cargo.volume,
      cargoValue: orderData.cargo.value,
      originAddress: orderData.addresses.origin,
      destinationAddress: orderData.addresses.destination,
      originContact: orderData.addresses.originContact,
      destinationContact: orderData.addresses.destinationContact,
      expectedTime: orderData.expectedTime,
      status: 'PENDING',
      totalAmount: 0, // 后续计算
      paymentStatus: 'UNPAID',
      createdBy: 'system',
      updatedBy: 'system'
    }
  })

  return {
    action: 'create_order',
    message: '订单创建成功',
    data: order
  }
}

async function executeQueryOrders(params: any) {
  let where: any = {}

  if (params.orderNumber) {
    where.orderNumber = { contains: params.orderNumber, mode: 'insensitive' }
  }

  if (params.customerName) {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { companyName: { contains: params.customerName, mode: 'insensitive' } },
          { firstName: { contains: params.customerName, mode: 'insensitive' } },
          { lastName: { contains: params.customerName, mode: 'insensitive' } }
        ]
      }
    })

    if (customers.length > 0) {
      where.customerId = { in: customers.map(c => c.id) }
    }
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: true,
      shipments: {
        include: {
          vehicle: true,
          driver: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 20
  })

  return {
    action: 'query_orders',
    message: `找到 ${orders.length} 个订单`,
    data: orders
  }
}

async function executeQueryVehicle(params: any) {
  let where: any = {}

  if (params.plateNumber) {
    where.licenseNumber = { contains: params.plateNumber, mode: 'insensitive' }
  }

  if (params.driverName) {
    where.driver = {
      OR: [
        { firstName: { contains: params.driverName, mode: 'insensitive' } },
        { lastName: { contains: params.driverName, mode: 'insensitive' } }
      ]
    }
  }

  const vehicles = await prisma.vehicle.findMany({
    where,
    include: {
      driver: true,
      location: true,
      shipments: {
        where: { status: 'IN_TRANSIT' },
        include: { order: true }
      }
    }
  })

  return {
    action: 'query_vehicle',
    message: `找到 ${vehicles.length} 个车辆`,
    data: vehicles
  }
}

async function executeAssignVehicle(params: any) {
  if (!params.orderNumber || !params.vehicleNumber) {
    throw new Error('需要提供订单号和车牌号')
  }

  // 查找订单
  const order = await prisma.order.findFirst({
    where: { orderNumber: { contains: params.orderNumber, mode: 'insensitive' } }
  })

  if (!order) {
    throw new Error(`未找到订单: ${params.orderNumber}`)
  }

  // 查找车辆
  const vehicle = await prisma.vehicle.findFirst({
    where: { licenseNumber: { contains: params.vehicleNumber, mode: 'insensitive' } },
    include: { driver: true }
  })

  if (!vehicle) {
    throw new Error(`未找到车辆: ${params.vehicleNumber}`)
  }

  if (!vehicle.driver) {
    throw new Error('该车辆未分配司机')
  }

  // 分配车辆
  const shipment = await OrderService.assignVehicle(order.id, vehicle.id, vehicle.driver.id)

  return {
    action: 'assign_vehicle',
    message: '车辆分配成功',
    data: { order, vehicle, shipment }
  }
}

async function executeCreateCustomer(params: any) {
  const customerData = {
    customerType: params.type || 'COMPANY',
    contactInfo: {
      email: `${params.name.toLowerCase()}@example.com`,
      phone: '13800138000'
    },
    addressInfo: {
      address: '待补充',
      city: '待补充',
      province: '待补充',
      postalCode: '000000'
    }
  }

  if (params.type === 'COMPANY') {
    customerData.companyInfo = { companyName: params.name }
  } else {
    customerData.personalInfo = {
      firstName: params.name,
      lastName: '先生/女士'
    }
  }

  const customer = await CustomerService.createCustomer(customerData)

  return {
    action: 'create_customer',
    message: '客户创建成功',
    data: customer
  }
}

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = commandSchema.parse(body)

  // 意图识别
  const intentResult = identifyIntent(validatedData.command)

  // 创建命令记录
  const nlCommand = await prisma.nLCommand.create({
    data: {
      command: validatedData.command,
      intent: intentResult.intent,
      parameters: intentResult.parameters,
      confidence: intentResult.confidence,
      userId: validatedData.userId,
      context: validatedData.context
    }
  })

  // 执行命令
  let result = null
  let error = null

  try {
    if (intentResult.confidence < 0.7) {
      throw new Error('无法理解您的命令，请换个说法')
    }

    result = await executeCommand(intentResult.intent, intentResult.parameters)

    // 更新命令状态
    await prisma.nLCommand.update({
      where: { id: nlCommand.id },
      data: {
        status: 'COMPLETED',
        executed: true,
        result,
        executedAt: new Date()
      }
    })
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'

    await prisma.nLCommand.update({
      where: { id: nlCommand.id },
      data: {
        status: 'FAILED',
        error,
        executedAt: new Date()
      }
    })
  }

  return ApiResponseBuilder.success({
    command: nlCommand,
    result,
    error,
    intent: intentResult.intent,
    confidence: intentResult.confidence
  }, error ? '命令执行失败' : '命令执行成功')
})