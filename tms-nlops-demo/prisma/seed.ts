import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始数据库种子数据初始化...')

  // 创建系统配置
  const configs = await prisma.systemConfig.createMany({
    data: [
      {
        key: 'app_name',
        value: { value: 'TMS NL-Ops Demo' },
        description: '应用程序名称',
        category: 'app',
        isPublic: true,
      },
      {
        key: 'app_version',
        value: { value: '1.0.0' },
        description: '应用程序版本',
        category: 'app',
        isPublic: true,
      },
      {
        key: 'openai_model',
        value: { value: 'gpt-4' },
        description: 'OpenAI模型名称',
        category: 'ai',
      },
      {
        key: 'max_order_weight',
        value: { value: 50000 },
        description: '最大订单重量(kg)',
        category: 'business',
      },
    ],
    skipDuplicates: true,
  })

  console.log('系统配置创建完成')

  // 创建意图定义
  const intents = await prisma.intent.createMany({
    data: [
      {
        name: 'create_order',
        description: '创建新订单',
        parameters: JSON.stringify([
          { name: 'customer_name', type: 'string', required: true, description: '客户名称' },
          { name: 'origin', type: 'string', required: true, description: '起始地点' },
          { name: 'destination', type: 'string', required: true, description: '目的地' },
          { name: 'weight', type: 'number', required: true, description: '货物重量' },
          { name: 'pickup_time', type: 'date', required: true, description: '取货时间' },
          { name: 'delivery_time', type: 'date', required: true, description: '送达时间' },
        ]),
        requiredParameters: [
          'customer_name',
          'origin',
          'destination',
          'weight',
          'pickup_time',
          'delivery_time',
        ],
        examples: JSON.stringify([
          '创建一个从北京到上海的订单，重量10吨，明天取货，后天送达',
          '我要从广州发5吨货到深圳，今天下午取货，明天上午送达',
        ]),
      },
      {
        name: 'update_order',
        description: '更新订单信息',
        parameters: JSON.stringify([
          { name: 'order_id', type: 'string', required: true, description: '订单ID' },
          { name: 'status', type: 'string', required: false, description: '订单状态' },
          { name: 'weight', type: 'number', required: false, description: '货物重量' },
          { name: 'pickup_time', type: 'date', required: false, description: '取货时间' },
        ]),
        requiredParameters: ['order_id'],
        examples: JSON.stringify(['更新订单123的状态为已确认', '修改订单456的重量为15吨']),
      },
      {
        name: 'track_order',
        description: '查询订单状态',
        parameters: JSON.stringify([
          { name: 'order_id', type: 'string', required: true, description: '订单ID' },
        ]),
        requiredParameters: ['order_id'],
        examples: JSON.stringify(['查询订单123的当前状态', '订单456到哪里了？']),
      },
      {
        name: 'assign_vehicle',
        description: '分配车辆到订单',
        parameters: JSON.stringify([
          { name: 'order_id', type: 'string', required: true, description: '订单ID' },
          { name: 'vehicle_id', type: 'string', required: true, description: '车辆ID' },
        ]),
        requiredParameters: ['order_id', 'vehicle_id'],
        examples: JSON.stringify(['给订单123分配车辆456', '安排车辆788处理订单999']),
      },
    ],
    skipDuplicates: true,
  })

  console.log('意图定义创建完成')

  // 创建示例客户
  const customers = await prisma.customer.createMany({
    data: [
      {
        name: 'ABC物流公司',
        contactPerson: '张经理',
        phone: '13800138000',
        email: 'zhang@abc-logistics.com',
        address: '北京市朝阳区建国路1号',
        company: 'ABC物流有限公司',
        creditLimit: 1000000,
      },
      {
        name: 'XYZ贸易集团',
        contactPerson: '李总',
        phone: '13900139000',
        email: 'li@xyz-trade.com',
        address: '上海市浦东新区陆家嘴100号',
        company: 'XYZ贸易集团有限公司',
        creditLimit: 2000000,
      },
    ],
    skipDuplicates: true,
  })

  console.log('示例客户创建完成')

  // 创建示例用户
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        name: '系统管理员',
        role: 'ADMIN',
      },
      {
        email: 'driver1@example.com',
        name: '王司机',
        role: 'DRIVER',
      },
      {
        email: 'manager@example.com',
        name: '刘经理',
        role: 'MANAGER',
      },
    ],
    skipDuplicates: true,
  })

  console.log('示例用户创建完成')

  // 获取用户ID
  const adminUser = await prisma.user.findFirst({ where: { email: 'admin@example.com' } })
  const driverUser = await prisma.user.findFirst({ where: { email: 'driver1@example.com' } })

  // 创建示例车辆
  const vehicles = await prisma.vehicle.createMany({
    data: [
      {
        licensePlate: '京A12345',
        type: 'TRUCK',
        capacity: 20000,
        driverId: driverUser?.id || '',
        status: 'AVAILABLE',
      },
      {
        licensePlate: '京B67890',
        type: 'VAN',
        capacity: 5000,
        driverId: driverUser?.id || '',
        status: 'AVAILABLE',
      },
    ],
    skipDuplicates: true,
  })

  console.log('示例车辆创建完成')

  // 获取客户和车辆
  const customer1 = await prisma.customer.findFirst({ where: { name: 'ABC物流公司' } })
  const vehicle1 = await prisma.vehicle.findFirst({ where: { licensePlate: '京A12345' } })

  // 创建示例订单
  if (customer1 && vehicle1) {
    const order1 = await prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        customerId: customer1.id,
        status: 'PENDING',
        origin: '北京市朝阳区',
        destination: '上海市浦东新区',
        weight: 10000,
        volume: 20,
        value: 50000,
        pickupTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 明天
        deliveryTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 后天
        specialInstructions: '需要冷藏运输',
        assignedVehicleId: vehicle1.id,
      },
    })

    // 创建排车记录
    await prisma.schedule.create({
      data: {
        orderId: order1.id,
        vehicleId: vehicle1.id,
        plannedDeparture: new Date(Date.now() + 24 * 60 * 60 * 1000),
        plannedArrival: new Date(Date.now() + 48 * 60 * 60 * 1000),
        status: 'PLANNED',
        route: ['北京市朝阳区', '天津市', '济南市', '上海市浦东新区'],
      },
    })

    console.log('示例订单创建完成')
  }

  console.log('数据库种子数据初始化完成!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
