"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// NL-Ops命令类型
const commandTypeMap = {
  CREATE_ORDER: { label: '创建订单', icon: '📦', color: 'bg-blue-100 text-blue-800' },
  UPDATE_STATUS: { label: '更新状态', icon: '🔄', color: 'bg-yellow-100 text-yellow-800' },
  SCHEDULE_DELIVERY: { label: '安排配送', icon: '📅', color: 'bg-green-100 text-green-800' },
  TRACK_SHIPMENT: { label: '跟踪货物', icon: '📍', color: 'bg-purple-100 text-purple-800' },
  GENERATE_REPORT: { label: '生成报告', icon: '📊', color: 'bg-indigo-100 text-indigo-800' },
  OPTIMIZE_ROUTE: { label: '优化路线', icon: '🗺️', color: 'bg-pink-100 text-pink-800' },
}

// 命令状态
const commandStatusMap = {
  PENDING: { label: '待处理', color: 'bg-gray-100 text-gray-800' },
  PROCESSING: { label: '处理中', color: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: '已完成', color: 'bg-green-100 text-green-800' },
  FAILED: { label: '失败', color: 'bg-red-100 text-red-800' },
  CANCELLED: { label: '已取消', color: 'bg-orange-100 text-orange-800' },
}

// 模拟NL-Ops命令历史
const commandHistory = [
  {
    id: 'CMD001',
    command: '创建一个新的运输订单，从上海到北京',
    type: 'CREATE_ORDER',
    intent: {
      action: 'CREATE_ORDER',
      entities: {
        origin: '上海',
        destination: '北京',
        cargo: '电子产品',
        weight: '5吨',
        urgency: 'NORMAL'
      },
      confidence: 0.95
    },
    status: 'COMPLETED',
    result: {
      orderId: 'O001',
      orderRef: 'ORD-2024-001',
      estimatedDelivery: '2024-01-22',
      cost: '3500元'
    },
    executedAt: '2024-01-20 09:15:23',
    executionTime: '1.2秒',
    user: '张经理'
  },
  {
    id: 'CMD002',
    command: '查询订单ORD-2024-002的当前位置',
    type: 'TRACK_SHIPMENT',
    intent: {
      action: 'TRACK_SHIPMENT',
      entities: {
        orderRef: 'ORD-2024-002'
      },
      confidence: 0.98
    },
    status: 'COMPLETED',
    result: {
      currentLocation: '京沪高速昆山服务区',
      progress: '65%',
      estimatedArrival: '2024-01-20 16:30'
    },
    executedAt: '2024-01-20 10:30:45',
    executionTime: '0.8秒',
    user: '李主管'
  },
  {
    id: 'CMD003',
    command: '为司机王五安排明天到苏州的配送任务',
    type: 'SCHEDULE_DELIVERY',
    intent: {
      action: 'SCHEDULE_DELIVERY',
      entities: {
        driver: '王五',
        destination: '苏州',
        date: '明天'
      },
      confidence: 0.87
    },
    status: 'PROCESSING',
    result: null,
    executedAt: '2024-01-20 11:00:12',
    executionTime: null,
    user: '赵调度'
  },
  {
    id: 'CMD004',
    command: '生成本周的运输效率报告',
    type: 'GENERATE_REPORT',
    intent: {
      action: 'GENERATE_REPORT',
      entities: {
        reportType: '运输效率',
        timeRange: '本周'
      },
      confidence: 0.92
    },
    status: 'FAILED',
    result: {
      error: '数据连接超时',
      retryCount: 2
    },
    executedAt: '2024-01-20 14:20:33',
    executionTime: '5.0秒',
    user: '王分析师'
  }
]

// 快捷命令模板
const quickCommands = [
  { command: '创建订单', icon: '📦', description: '快速创建新的运输订单' },
  { command: '查询订单', icon: '🔍', description: '查询订单状态和详情' },
  { command: '跟踪货物', icon: '📍', description: '实时跟踪货物运输状态' },
  { command: '安排配送', icon: '📅', description: '为司机安排配送任务' },
  { command: '优化路线', icon: '🗺️', description: '智能优化配送路线' },
  { command: '生成报告', icon: '📊', description: '生成各类统计报告' },
  { command: '更新状态', icon: '🔄', description: '更新订单或任务状态' },
  { command: '费用结算', icon: '💰', description: '查询和结算运输费用' }
]

// NL-Ops统计
const nlopsStats = {
  totalCommands: 1234,
  successRate: 94.5,
  avgResponseTime: 1.2,
  topCommands: [
    { command: '查询订单', count: 456 },
    { command: '创建订单', count: 234 },
    { command: '跟踪货物', count: 189 },
    { command: '生成报告', count: 156 }
  ]
}

export default function NLOpsPage() {
  const [inputCommand, setInputCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandResult, setCommandResult] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState('chat')

  // 处理命令输入
  const handleCommandSubmit = async () => {
    if (!inputCommand.trim()) return

    setIsProcessing(true)
    setCommandResult(null)

    // 模拟处理延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 模拟命令处理结果
    const mockResult = {
      id: `CMD${String(commandHistory.length + 1).padStart(3, '0')}`,
      command: inputCommand,
      type: 'TRACK_SHIPMENT',
      intent: {
        action: 'TRACK_SHIPMENT',
        entities: {
          orderRef: 'ORD-2024-001'
        },
        confidence: 0.96
      },
      status: 'COMPLETED',
      result: {
        orderId: 'O001',
        currentLocation: '沪昆高速嘉兴段',
        progress: '45%',
        estimatedArrival: '2024-01-20 18:00',
        driver: '张三',
        vehicle: '沪A12345'
      },
      executedAt: new Date().toLocaleString('zh-CN'),
      executionTime: '1.1秒',
      user: '当前用户'
    }

    setCommandResult(mockResult)
    setIsProcessing(false)
    setInputCommand('')
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NL-Ops 智能操作</h1>
          <p className="text-gray-600 mt-2">使用自然语言进行智能运输管理操作</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <span className="mr-2">⚙️</span>
            模型配置
          </Button>
          <Button variant="outline">
            <span className="mr-2">📚</span>
            使用指南
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总命令数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlopsStats.totalCommands.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{nlopsStats.successRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">平均响应时间</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nlopsStats.avgResponseTime}秒</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">热门命令</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{nlopsStats.topCommands[0].command}</div>
            <div className="text-sm text-gray-500">{nlopsStats.topCommands[0].count} 次</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">智能对话</TabsTrigger>
          <TabsTrigger value="history">命令历史</TabsTrigger>
          <TabsTrigger value="analytics">使用分析</TabsTrigger>
          <TabsTrigger value="training">模型训练</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 聊天界面 */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>NL-Ops 智能助手</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {/* 欢迎消息 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-medium text-blue-900 mb-1">🤖 NL-Ops 智能助手</div>
                      <p className="text-sm text-blue-700">
                        您好！我是您的智能运输管理助手。您可以直接用自然语言告诉我您想要做什么，比如：
                      </p>
                      <ul className="text-sm text-blue-700 mt-2 list-disc list-inside">
                        <li>创建一个从上海到北京的运输订单</li>
                        <li>查询订单ORD-2024-001的状态</li>
                        <li>安排王五明天去苏州配送</li>
                        <li>生成今天的运输报告</li>
                      </ul>
                    </div>

                    {/* 命令结果 */}
                    {commandResult && (
                      <div className="space-y-3">
                        <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                          <div className="font-medium mb-1">您:</div>
                          <div>{commandResult.command}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-green-900">🤖 NL-Ops</span>
                            <Badge className="bg-green-100 text-green-800">
                              命令执行成功
                            </Badge>
                          </div>
                          <div className="text-sm text-green-800 space-y-2">
                            <div>
                              <span className="font-medium">理解意图:</span> {commandResult.intent.action}
                              <span className="text-green-600 ml-2">({(commandResult.intent.confidence * 100).toFixed(0)}% 置信度)</span>
                            </div>
                            {commandResult.result && (
                              <div>
                                <div className="font-medium mt-2">执行结果:</div>
                                {commandResult.type === 'TRACK_SHIPMENT' && (
                                  <div className="mt-1 p-3 bg-white rounded border">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>订单ID: {commandResult.result.orderId}</div>
                                      <div>当前位置: {commandResult.result.currentLocation}</div>
                                      <div>进度: {commandResult.result.progress}</div>
                                      <div>预计到达: {commandResult.result.estimatedArrival}</div>
                                      <div>司机: {commandResult.result.driver}</div>
                                      <div>车辆: {commandResult.result.vehicle}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="text-xs text-green-600 mt-2">
                              执行时间: {commandResult.executionTime} | {commandResult.executedAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 输入区域 */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="输入您的命令，例如：创建订单、查询状态..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inputCommand}
                        onChange={(e) => setInputCommand(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCommandSubmit()}
                        disabled={isProcessing}
                      />
                      <Button
                        onClick={handleCommandSubmit}
                        disabled={isProcessing || !inputCommand.trim()}
                      >
                        {isProcessing ? '处理中...' : '发送'}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      💡 提示：您可以使用自然语言描述您的需求，系统会智能理解并执行相应操作
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 快捷命令 */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">快捷命令</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickCommands.map((cmd, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      onClick={() => setInputCommand(cmd.command)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{cmd.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{cmd.command}</div>
                          <div className="text-xs text-gray-500">{cmd.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* 使用示例 */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">使用示例</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium mb-1">创建订单</div>
                    <div className="text-gray-600 text-xs">
                      "帮我从上海发货到广州，货物是电子产品，重量3吨"
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium mb-1">查询状态</div>
                    <div className="text-gray-600 text-xs">
                      "查询ORD-2024-001这个订单现在到哪了"
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium mb-1">安排任务</div>
                    <div className="text-gray-600 text-xs">
                      "给李四安排一个明天去杭州的配送任务"
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">命令</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">执行时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commandHistory.map((cmd) => (
                    <tr key={cmd.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{cmd.command}</div>
                          <div className="text-sm text-gray-500">
                            置信度: {(cmd.intent.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={commandTypeMap[cmd.type as keyof typeof commandTypeMap].color}>
                          {commandTypeMap[cmd.type as keyof typeof commandTypeMap].icon}{' '}
                          {commandTypeMap[cmd.type as keyof typeof commandTypeMap].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={commandStatusMap[cmd.status as keyof typeof commandStatusMap].color}>
                          {commandStatusMap[cmd.status as keyof typeof commandStatusMap].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {cmd.user}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {cmd.executionTime && (
                          <div>{cmd.executionTime}</div>
                        )}
                        <div className="text-gray-500">{cmd.executedAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">详情</Button>
                          {cmd.status === 'FAILED' && (
                            <Button size="sm">重试</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>命令类型分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nlopsStats.topCommands.map((cmd, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{cmd.command}</span>
                        <span>{cmd.count} 次 ({(cmd.count / nlopsStats.totalCommands * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(cmd.count / nlopsStats.totalCommands) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能指标</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>成功率</span>
                      <span>{nlopsStats.successRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: `${nlopsStats.successRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>平均响应时间</span>
                      <span>{nlopsStats.avgResponseTime}秒</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      目标: &lt; 2秒
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">94.5%</div>
                      <div className="text-xs text-blue-600">准确率</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">98.2%</div>
                      <div className="text-xs text-green-600">用户满意度</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模型训练与管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">📥</div>
                    <h3 className="font-semibold mb-2">数据导入</h3>
                    <p className="text-sm text-gray-600 mb-4">导入历史对话数据用于模型训练</p>
                    <Button size="sm">开始导入</Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="font-semibold mb-2">意图标注</h3>
                    <p className="text-sm text-gray-600 mb-4">标注和验证命令意图识别结果</p>
                    <Button size="sm">开始标注</Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <h3 className="font-semibold mb-2">模型训练</h3>
                    <p className="text-sm text-gray-600 mb-4">启动新的模型训练任务</p>
                    <Button size="sm">开始训练</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">当前模型版本</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">v2.1.0</span>
                      <Badge className="bg-green-100 text-green-800">生产环境</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      发布时间: 2024-01-15 | 准确率: 94.5% | 训练数据: 10,000条
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">训练历史</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">v2.1.0</div>
                        <div className="text-sm text-gray-500">2024-01-15 14:30</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600">94.5%</div>
                        <div className="text-xs text-gray-500">准确率</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">v2.0.0</div>
                        <div className="text-sm text-gray-500">2024-01-01 10:00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600">92.1%</div>
                        <div className="text-xs text-gray-500">准确率</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
