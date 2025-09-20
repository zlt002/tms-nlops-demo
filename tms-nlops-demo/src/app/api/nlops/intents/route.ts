import { ApiResponseBuilder } from '@/lib/api/response'

// 预定义的意图列表
export const intents = [
  {
    id: 'create_order',
    name: '创建订单',
    description: '创建新的运输订单',
    examples: [
      '创建一个从北京到上海的订单',
      '新增一个运输任务',
      '添加一个订单'
    ],
    parameters: [
      {
        name: 'origin',
        type: 'string',
        required: true,
        description: '起始地点'
      },
      {
        name: 'destination',
        type: 'string',
        required: true,
        description: '目的地'
      },
      {
        name: 'weight',
        type: 'number',
        required: false,
        description: '货物重量（公斤）'
      }
    ]
  },
  {
    id: 'track_order',
    name: '查询订单',
    description: '查询订单状态和跟踪信息',
    examples: [
      '查询订单123的状态',
      '查看订单的当前位置',
      '订单到哪里了'
    ],
    parameters: [
      {
        name: 'orderId',
        type: 'string',
        required: false,
        description: '订单ID或订单号'
      }
    ]
  },
  {
    id: 'assign_vehicle',
    name: '分配车辆',
    description: '为订单分配运输车辆',
    examples: [
      '给订单123分配车辆',
      '安排车辆运输订单',
      '调度车辆'
    ],
    parameters: [
      {
        name: 'orderId',
        type: 'string',
        required: true,
        description: '订单ID'
      },
      {
        name: 'vehicleId',
        type: 'string',
        required: true,
        description: '车辆ID'
      }
    ]
  }
]

export async function GET() {
  return ApiResponseBuilder.success({
    intents,
    count: intents.length
  }, '获取意图列表成功')
}
