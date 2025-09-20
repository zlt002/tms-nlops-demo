"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 调度任务状态
const dispatchStatusMap = {
  PENDING: { label: '待调度', color: 'bg-yellow-100 text-yellow-800' },
  ASSIGNED: { label: '已分配', color: 'bg-blue-100 text-blue-800' },
  IN_PROGRESS: { label: '进行中', color: 'bg-green-100 text-green-800' },
  DELAYED: { label: '延迟', color: 'bg-orange-100 text-orange-800' },
  CANCELLED: { label: '已取消', color: 'bg-red-100 text-red-800' },
  COMPLETED: { label: '已完成', color: 'bg-gray-100 text-gray-800' },
}

// 任务优先级
const priorityMap = {
  LOW: { label: '低', color: 'bg-gray-100 text-gray-800' },
  MEDIUM: { label: '中', color: 'bg-blue-100 text-blue-800' },
  HIGH: { label: '高', color: 'bg-orange-100 text-orange-800' },
  URGENT: { label: '紧急', color: 'bg-red-100 text-red-800' },
}

// 模拟调度任务数据
const dispatchTasks = [
  {
    id: 'D001',
    orderId: 'O001',
    orderRef: 'ORD-2024-001',
    customer: '上海华东商贸有限公司',
    origin: '上海市浦东新区张江高科技园区',
    destination: '江苏省苏州市工业园区',
    vehicleType: '重型卡车',
    vehicleId: 'V001',
    driverId: 'D001',
    driverName: '张三',
    driverPhone: '13812345678',
    scheduledTime: '2024-01-20 08:00',
    estimatedDuration: '3小时',
    actualStartTime: '',
    estimatedArrival: '2024-01-20 11:00',
    status: 'PENDING',
    priority: 'HIGH',
    distance: '120公里',
    cargoType: '电子产品',
    weight: '5吨',
    volume: '20立方米',
    specialRequirements: '需要温控运输',
    notes: '客户要求上午11点前送达',
    route: {
      waypoints: [
        { location: '上海市浦东新区张江高科技园区', time: '08:00' },
        { location: 'G2京沪高速入口', time: '08:30' },
        { location: '服务区休息点', time: '09:30' },
        { location: '江苏省苏州市工业园区', time: '11:00' },
      ],
    },
  },
  {
    id: 'D002',
    orderId: 'O003',
    orderRef: 'ORD-2024-003',
    customer: '广州华南物流集团',
    origin: '深圳市南山区科技园',
    destination: '东莞市虎门镇',
    vehicleType: '中型货车',
    vehicleId: 'V003',
    driverId: 'D003',
    driverName: '王五',
    driverPhone: '13856789012',
    scheduledTime: '2024-01-20 09:00',
    estimatedDuration: '2小时',
    actualStartTime: '2024-01-20 09:15',
    estimatedArrival: '2024-01-20 11:15',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    distance: '60公里',
    cargoType: '日用品',
    weight: '3吨',
    volume: '15立方米',
    specialRequirements: '无',
    notes: '正常运输',
    route: {
      waypoints: [
        { location: '深圳市南山区科技园', time: '09:00' },
        { location: '广深高速', time: '09:30' },
        { location: '东莞市虎门镇', time: '11:00' },
      ],
    },
  },
  {
    id: 'D003',
    orderId: 'O005',
    orderRef: 'ORD-2024-005',
    customer: '北京北方供应链',
    origin: '北京市朝阳区CBD',
    destination: '天津市滨海新区',
    vehicleType: '轻型货车',
    vehicleId: 'V005',
    driverId: 'D005',
    driverName: '赵七',
    driverPhone: '13890123456',
    scheduledTime: '2024-01-20 10:00',
    estimatedDuration: '2.5小时',
    actualStartTime: '',
    estimatedArrival: '2024-01-20 12:30',
    status: 'ASSIGNED',
    priority: 'LOW',
    distance: '150公里',
    cargoType: '文件资料',
    weight: '0.5吨',
    volume: '5立方米',
    specialRequirements: '保密运输',
    notes: '重要文件，需专人押运',
    route: {
      waypoints: [
        { location: '北京市朝阳区CBD', time: '10:00' },
        { location: '京津高速', time: '10:30' },
        { location: '天津市滨海新区', time: '12:30' },
      ],
    },
  },
]

// 可用车辆
const availableVehicles = [
  { id: 'V002', licensePlate: '沪B12345', type: '重型卡车', capacity: '10吨', driver: '待分配', location: '上海浦东' },
  { id: 'V004', licensePlate: '粤B67890', type: '中型货车', capacity: '5吨', driver: '待分配', location: '深圳南山' },
  { id: 'V006', licensePlate: '京C13579', type: '轻型货车', capacity: '3吨', driver: '待分配', location: '北京朝阳' },
]

// 可用司机
const availableDrivers = [
  { id: 'D002', name: '李四', phone: '13823456789', license: 'A2', status: 'AVAILABLE', rating: 4.8 },
  { id: 'D004', name: '孙六', phone: '13867890123', license: 'B2', status: 'AVAILABLE', rating: 4.6 },
  { id: 'D006', name: '周八', phone: '13801234567', license: 'C1', status: 'AVAILABLE', rating: 4.7 },
]

export default function DispatchPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTask, setSelectedTask] = useState<any>(null)

  // 筛选任务
  const filteredTasks = dispatchTasks.filter(task => {
    const matchesSearch =
      task.orderRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'ALL' || task.status === selectedStatus
    const matchesPriority = selectedPriority === 'ALL' || task.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  // 统计数据
  const getDispatchStats = () => {
    const total = dispatchTasks.length
    const pending = dispatchTasks.filter(t => t.status === 'PENDING').length
    const inProgress = dispatchTasks.filter(t => t.status === 'IN_PROGRESS').length
    const completed = dispatchTasks.filter(t => t.status === 'COMPLETED').length
    const delayed = dispatchTasks.filter(t => t.status === 'DELAYED').length
    const onTimeRate = total > 0 ? ((completed / total) * 100).toFixed(1) : '0'

    return { total, pending, inProgress, completed, delayed, onTimeRate }
  }

  const stats = getDispatchStats()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">调度管理</h1>
          <p className="text-gray-600 mt-2">管理运输任务的调度和分配</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <span className="mr-2">📋</span>
            批量调度
          </Button>
          <Button variant="outline">
            <span className="mr-2">🗺️</span>
            地图视图
          </Button>
          <Button variant="outline">
            <span className="mr-2">📊</span>
            导出报表
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总任务数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待调度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">进行中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已完成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">延迟任务</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.delayed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">准点率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onTimeRate}%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">任务列表</TabsTrigger>
          <TabsTrigger value="vehicles">可用车辆</TabsTrigger>
          <TabsTrigger value="drivers">可用司机</TabsTrigger>
          <TabsTrigger value="schedule">调度日历</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="搜索订单号、客户或司机..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">所有状态</option>
                  {Object.entries(dispatchStatusMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="ALL">所有优先级</option>
                  {Object.entries(priorityMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 任务列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">路线</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">车辆司机</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间安排</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Link href={`/dashboard/orders/${task.orderId}`} className="text-blue-600 hover:text-blue-800 font-medium">
                              {task.orderRef}
                            </Link>
                            <Badge className={priorityMap[task.priority as keyof typeof priorityMap].color}>
                              {priorityMap[task.priority as keyof typeof priorityMap].label}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{task.customer}</div>
                          <div className="text-sm text-gray-500">{task.cargoType} | {task.weight} | {task.distance}</div>
                          {task.specialRequirements && (
                            <div className="text-sm text-orange-600 mt-1">⚠️ {task.specialRequirements}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">从: {task.origin}</div>
                          <div className="text-gray-600">到: {task.destination}</div>
                          <div className="text-gray-500 mt-1">预计时长: {task.estimatedDuration}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{task.vehicleType} ({task.vehicleId})</div>
                          <div className="text-gray-600">
                            {task.driverName}
                            <span className="text-gray-500 ml-2">{task.driverPhone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">计划: {task.scheduledTime}</div>
                          <div className="text-gray-600">预计到达: {task.estimatedArrival}</div>
                          {task.actualStartTime && (
                            <div className="text-green-600">实际开始: {task.actualStartTime}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={dispatchStatusMap[task.status as keyof typeof dispatchStatusMap].color}>
                          {dispatchStatusMap[task.status as keyof typeof dispatchStatusMap].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedTask(task)}
                          >
                            详情
                          </Button>
                          {task.status === 'PENDING' && (
                            <Button size="sm">
                              分配
                            </Button>
                          )}
                          {task.status === 'IN_PROGRESS' && (
                            <Button size="sm" variant="outline">
                              跟踪
                            </Button>
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

        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{vehicle.licensePlate}</span>
                    <Badge variant="outline">可用</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">类型:</span> {vehicle.type}</div>
                    <div><span className="text-gray-600">载重:</span> {vehicle.capacity}</div>
                    <div><span className="text-gray-600">司机:</span> {vehicle.driver}</div>
                    <div><span className="text-gray-600">位置:</span> {vehicle.location}</div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    分配任务
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDrivers.map((driver) => (
              <Card key={driver.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{driver.name}</span>
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span className="text-sm">{driver.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">电话:</span> {driver.phone}</div>
                    <div><span className="text-gray-600">驾照:</span> {driver.license}</div>
                    <div><span className="text-gray-600">状态:</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">空闲</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    分配任务
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>调度日历视图</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                📅 调度日历功能开发中...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 任务详情模态框 */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">任务详情 - {selectedTask.orderRef}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">任务ID:</span> {selectedTask.id}</div>
                    <div><span className="text-gray-600">订单号:</span> {selectedTask.orderRef}</div>
                    <div><span className="text-gray-600">客户:</span> {selectedTask.customer}</div>
                    <div><span className="text-gray-600">优先级:</span>
                      <Badge className={priorityMap[selectedTask.priority as keyof typeof priorityMap].color}>
                        {priorityMap[selectedTask.priority as keyof typeof priorityMap].label}
                      </Badge>
                    </div>
                    <div><span className="text-gray-600">状态:</span>
                      <Badge className={dispatchStatusMap[selectedTask.status as keyof typeof dispatchStatusMap].color}>
                        {dispatchStatusMap[selectedTask.status as keyof typeof dispatchStatusMap].label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">货物信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">货物类型:</span> {selectedTask.cargoType}</div>
                    <div><span className="text-gray-600">重量:</span> {selectedTask.weight}</div>
                    <div><span className="text-gray-600">体积:</span> {selectedTask.volume}</div>
                    <div><span className="text-gray-600">距离:</span> {selectedTask.distance}</div>
                    {selectedTask.specialRequirements && (
                      <div className="text-orange-600">
                        <span className="text-gray-600">特殊要求:</span> {selectedTask.specialRequirements}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">路线信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">起点:</span> {selectedTask.origin}</div>
                    <div><span className="text-gray-600">终点:</span> {selectedTask.destination}</div>
                    <div><span className="text-gray-600">预计时长:</span> {selectedTask.estimatedDuration}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">时间安排</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">计划时间:</span> {selectedTask.scheduledTime}</div>
                    <div><span className="text-gray-600">预计到达:</span> {selectedTask.estimatedArrival}</div>
                    {selectedTask.actualStartTime && (
                      <div><span className="text-gray-600">实际开始:</span> {selectedTask.actualStartTime}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">车辆信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">车辆类型:</span> {selectedTask.vehicleType}</div>
                    <div><span className="text-gray-600">车辆编号:</span> {selectedTask.vehicleId}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">司机信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">姓名:</span> {selectedTask.driverName}</div>
                    <div><span className="text-gray-600">电话:</span> {selectedTask.driverPhone}</div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">路线节点</h4>
                  <div className="space-y-2">
                    {selectedTask.route.waypoints.map((waypoint: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div>{waypoint.location}</div>
                          <div className="text-gray-500">预计时间: {waypoint.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTask.notes && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3">备注</h4>
                    <p className="text-sm text-gray-600">{selectedTask.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {selectedTask.status === 'PENDING' && (
                  <>
                    <Button>分配车辆和司机</Button>
                    <Button variant="outline">编辑任务</Button>
                  </>
                )}
                {selectedTask.status === 'IN_PROGRESS' && (
                  <>
                    <Button variant="outline">查看实时位置</Button>
                    <Button variant="outline">联系司机</Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
