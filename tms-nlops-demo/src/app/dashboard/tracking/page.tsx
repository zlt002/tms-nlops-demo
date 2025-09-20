"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 跟踪状态
const trackingStatusMap = {
  NOT_STARTED: { label: '未开始', color: 'bg-gray-100 text-gray-800' },
  IN_TRANSIT: { label: '运输中', color: 'bg-blue-100 text-blue-800' },
  AT_PICKUP: { label: '提货中', color: 'bg-yellow-100 text-yellow-800' },
  AT_DROPOFF: { label: '送达中', color: 'bg-orange-100 text-orange-800' },
  DELAYED: { label: '延迟', color: 'bg-red-100 text-red-800' },
  COMPLETED: { label: '已完成', color: 'bg-green-100 text-green-800' },
}

// 车辆状态
const vehicleStatusMap = {
  MOVING: { label: '行驶中', color: 'bg-green-100 text-green-800' },
  STOPPED: { label: '停止', color: 'bg-yellow-100 text-yellow-800' },
  IDLE: { label: '怠速', color: 'bg-orange-100 text-orange-800' },
  OFFLINE: { label: '离线', color: 'bg-gray-100 text-gray-800' },
}

// 模拟实时跟踪数据
const trackingData = [
  {
    id: 'T001',
    orderId: 'O001',
    orderRef: 'ORD-2024-001',
    vehicleId: 'V001',
    vehiclePlate: '沪A12345',
    driverId: 'D001',
    driverName: '张三',
    status: 'IN_TRANSIT',
    vehicleStatus: 'MOVING',
    currentLocation: {
      lat: 31.2304,
      lng: 121.4737,
      address: '上海市浦东新区张江高科技园区',
      city: '上海',
      region: '华东',
    },
    destination: {
      lat: 31.2989,
      lng: 120.5853,
      address: '江苏省苏州市工业园区',
      city: '苏州',
      region: '华东',
    },
    route: {
      totalDistance: 120,
      remainingDistance: 85,
      estimatedTimeOfArrival: '2024-01-20 11:00',
      progress: 29.2,
    },
    speed: 65,
    heading: 180,
    lastUpdate: '2024-01-20 09:45:23',
    fuelLevel: 68,
    temperature: 18.5,
    alerts: [
      { type: 'SPEEDING', message: '超速警告 (当前速度: 85km/h, 限速: 80km/h)', time: '09:30', severity: 'MEDIUM' },
    ],
    milestones: [
      { location: '上海浦东出发地', time: '08:00', status: 'COMPLETED' },
      { location: 'G2京沪高速入口', time: '08:30', status: 'COMPLETED' },
      { location: '昆山服务区', time: '10:00', status: 'PENDING' },
      { location: '苏州工业园区', time: '11:00', status: 'PENDING' },
    ],
  },
  {
    id: 'T002',
    orderId: 'O003',
    orderRef: 'ORD-2024-003',
    vehicleId: 'V003',
    vehiclePlate: '粤B67890',
    driverId: 'D003',
    driverName: '王五',
    status: 'AT_DROPOFF',
    vehicleStatus: 'STOPPED',
    currentLocation: {
      lat: 22.5431,
      lng: 113.9365,
      address: '广东省东莞市虎门镇',
      city: '东莞',
      region: '华南',
    },
    destination: {
      lat: 22.5431,
      lng: 113.9365,
      address: '广东省东莞市虎门镇',
      city: '东莞',
      region: '华南',
    },
    route: {
      totalDistance: 60,
      remainingDistance: 0,
      estimatedTimeOfArrival: '2024-01-20 11:00',
      progress: 100,
    },
    speed: 0,
    heading: 0,
    lastUpdate: '2024-01-20 10:58:12',
    fuelLevel: 45,
    temperature: 22.3,
    alerts: [],
    milestones: [
      { location: '深圳南山出发地', time: '09:00', status: 'COMPLETED' },
      { location: '广深高速', time: '09:30', status: 'COMPLETED' },
      { location: '东莞虎门目的地', time: '11:00', status: 'IN_PROGRESS' },
    ],
  },
  {
    id: 'T003',
    orderId: 'O005',
    orderRef: 'ORD-2024-005',
    vehicleId: 'V005',
    vehiclePlate: '京C13579',
    driverId: 'D005',
    driverName: '赵七',
    status: 'NOT_STARTED',
    vehicleStatus: 'IDLE',
    currentLocation: {
      lat: 39.9042,
      lng: 116.4074,
      address: '北京市朝阳区CBD',
      city: '北京',
      region: '华北',
    },
    destination: {
      lat: 39.0329,
      lng: 117.6618,
      address: '天津市滨海新区',
      city: '天津',
      region: '华北',
    },
    route: {
      totalDistance: 150,
      remainingDistance: 150,
      estimatedTimeOfArrival: '2024-01-20 12:30',
      progress: 0,
    },
    speed: 0,
    heading: 0,
    lastUpdate: '2024-01-20 09:45:00',
    fuelLevel: 85,
    temperature: -2.5,
    alerts: [
      { type: 'LOW_FUEL', message: '燃油不足 (当前: 15%, 建议: >20%)', time: '09:00', severity: 'HIGH' },
      { type: 'TEMPERATURE', message: '低温警告 (当前: -2.5°C)', time: '09:15', severity: 'LOW' },
    ],
    milestones: [
      { location: '北京朝阳出发地', time: '10:00', status: 'PENDING' },
      { location: '京津高速', time: '10:30', status: 'PENDING' },
      { location: '天津滨海新区', time: '12:30', status: 'PENDING' },
    ],
  },
]

// 历史轨迹点
const historicalRoute = [
  { time: '08:00', lat: 31.2304, lng: 121.4737, speed: 0, status: 'DEPARTURE' },
  { time: '08:15', lat: 31.2250, lng: 121.4650, speed: 45, status: 'MOVING' },
  { time: '08:30', lat: 31.2100, lng: 121.4500, speed: 60, status: 'MOVING' },
  { time: '08:45', lat: 31.1950, lng: 121.4350, speed: 65, status: 'MOVING' },
  { time: '09:00', lat: 31.1800, lng: 121.4200, speed: 70, status: 'MOVING' },
  { time: '09:15', lat: 31.1650, lng: 121.4050, speed: 65, status: 'MOVING' },
  { time: '09:30', lat: 31.1500, lng: 121.3900, speed: 60, status: 'MOVING' },
  { time: '09:45', lat: 31.1350, lng: 121.3750, speed: 65, status: 'CURRENT' },
]

export default function TrackingPage() {
  const [selectedTracking, setSelectedTracking] = useState<any>(trackingData[0])
  const [isLive, setIsLive] = useState(true)
  const [selectedVehicle, setSelectedVehicle] = useState<string>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')

  // 模拟实时数据更新
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // 更新第一个跟踪数据
      const newData = [...trackingData]
      const firstItem = newData[0]
      if (firstItem.status === 'IN_TRANSIT') {
        firstItem.speed = 60 + Math.floor(Math.random() * 20)
        firstItem.route.remainingDistance = Math.max(0, firstItem.route.remainingDistance - 0.5)
        firstItem.route.progress = ((firstItem.route.totalDistance - firstItem.route.remainingDistance) / firstItem.route.totalDistance) * 100
        firstItem.lastUpdate = new Date().toLocaleString('zh-CN')
        setSelectedTracking({ ...firstItem })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  // 筛选跟踪数据
  const filteredTracking = trackingData.filter(tracking => {
    const matchesVehicle = selectedVehicle === 'ALL' || tracking.vehicleId === selectedVehicle
    const matchesStatus = selectedStatus === 'ALL' || tracking.status === selectedStatus
    return matchesVehicle && matchesStatus
  })

  // 统计数据
  const getTrackingStats = () => {
    const total = trackingData.length
    const inTransit = trackingData.filter(t => t.status === 'IN_TRANSIT').length
    const atPickup = trackingData.filter(t => t.status === 'AT_PICKUP').length
    const atDropoff = trackingData.filter(t => t.status === 'AT_DROPOFF').length
    const completed = trackingData.filter(t => t.status === 'COMPLETED').length
    const delayed = trackingData.filter(t => t.status === 'DELAYED').length
    const alerts = trackingData.reduce((sum, t) => sum + t.alerts.length, 0)

    return { total, inTransit, atPickup, atDropoff, completed, delayed, alerts }
  }

  const stats = getTrackingStats()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">实时跟踪</h1>
          <p className="text-gray-600 mt-2">监控车辆位置和运输状态</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">实时更新</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            {isLive && <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>}
          </div>
          <Button variant="outline">
            <span className="mr-2">🔔</span>
            告警设置
          </Button>
          <Button variant="outline">
            <span className="mr-2">📊</span>
            导出数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总跟踪数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">运输中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inTransit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">提货中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.atPickup}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">送达中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.atDropoff}</div>
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
            <CardTitle className="text-sm font-medium text-gray-600">延迟</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.delayed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">告警数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.alerts}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">地图视图</TabsTrigger>
          <TabsTrigger value="list">列表视图</TabsTrigger>
          <TabsTrigger value="alerts">告警中心</TabsTrigger>
          <TabsTrigger value="history">历史轨迹</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 地图区域 */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle>实时地图</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[520px] bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p className="text-gray-600">地图组件集成中...</p>
                      <p className="text-sm text-gray-500 mt-2">将集成高德地图/百度地图API</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 车辆列表 */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>车辆位置</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[520px] overflow-y-auto">
                  {filteredTracking.map((tracking) => (
                    <div
                      key={tracking.id}
                      className={`p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                        selectedTracking?.id === tracking.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedTracking(tracking)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{tracking.vehiclePlate}</div>
                        <Badge className={trackingStatusMap[tracking.status as keyof typeof trackingStatusMap].color}>
                          {trackingStatusMap[tracking.status as keyof typeof trackingStatusMap].label}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>司机: {tracking.driverName}</div>
                        <div>位置: {tracking.currentLocation.city}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={vehicleStatusMap[tracking.vehicleStatus as keyof typeof vehicleStatusMap].color}>
                            ●
                          </span>
                          <span>{vehicleStatusMap[tracking.vehicleStatus as keyof typeof vehicleStatusMap].label}</span>
                          {tracking.speed > 0 && <span>· {tracking.speed}km/h</span>}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>行程进度</span>
                          <span>{tracking.route.progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${tracking.route.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {tracking.alerts.length > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-red-600 text-sm">
                          <span>⚠️</span>
                          <span>{tracking.alerts.length} 个告警</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 选中车辆详情 */}
          {selectedTracking && (
            <Card>
              <CardHeader>
                <CardTitle>车辆详情 - {selectedTracking.vehiclePlate}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">基本信息</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">订单:</span>
                        <Link href={`/dashboard/orders/${selectedTracking.orderId}`} className="text-blue-600 hover:underline ml-1">
                          {selectedTracking.orderRef}
                        </Link>
                      </div>
                      <div><span className="text-gray-600">司机:</span> {selectedTracking.driverName}</div>
                      <div><span className="text-gray-600">更新时间:</span> {selectedTracking.lastUpdate}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">当前位置</h4>
                    <div className="space-y-1 text-sm">
                      <div>{selectedTracking.currentLocation.address}</div>
                      <div>{selectedTracking.currentLocation.city}, {selectedTracking.currentLocation.region}</div>
                      <div>经纬度: {selectedTracking.currentLocation.lat.toFixed(4)}, {selectedTracking.currentLocation.lng.toFixed(4)}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">行程信息</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">总距离:</span> {selectedTracking.route.totalDistance}km</div>
                      <div><span className="text-gray-600">剩余:</span> {selectedTracking.route.remainingDistance}km</div>
                      <div><span className="text-gray-600">预计到达:</span> {selectedTracking.route.estimatedTimeOfArrival}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">车辆状态</h4>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">速度:</span> {selectedTracking.speed}km/h</div>
                      <div><span className="text-gray-600">燃油:</span> {selectedTracking.fuelLevel}%</div>
                      <div><span className="text-gray-600">温度:</span> {selectedTracking.temperature}°C</div>
                    </div>
                  </div>
                </div>

                {/* 告警信息 */}
                {selectedTracking.alerts.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-red-600">当前告警</h4>
                    <div className="space-y-2">
                      {selectedTracking.alerts.map((alert: any, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded">
                          <span className="text-red-600 mt-0.5">⚠️</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{alert.message}</div>
                            <div className="text-xs text-gray-500">{alert.time}</div>
                          </div>
                          {alert.severity === 'HIGH' && (
                            <Badge className="bg-red-100 text-red-800">高</Badge>
                          )}
                          {alert.severity === 'MEDIUM' && (
                            <Badge className="bg-yellow-100 text-yellow-800">中</Badge>
                          )}
                          {alert.severity === 'LOW' && (
                            <Badge className="bg-blue-100 text-blue-800">低</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 里程碑 */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">行程节点</h4>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {selectedTracking.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex-shrink-0 text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                          milestone.status === 'COMPLETED' ? 'bg-green-500' :
                          milestone.status === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-xs mt-1 max-w-[100px]">{milestone.location}</div>
                        <div className="text-xs text-gray-500">{milestone.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button size="sm">
                    <span className="mr-2">📞</span>
                    联系司机
                  </Button>
                  <Button size="sm" variant="outline">
                    <span className="mr-2">📍</span>
                    发送位置
                  </Button>
                  <Button size="sm" variant="outline">
                    <span className="mr-2">📝</span>
                    添加备注
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {/* 筛选器 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <select
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                >
                  <option value="ALL">所有车辆</option>
                  {trackingData.map(t => (
                    <option key={t.vehicleId} value={t.vehicleId}>{t.vehiclePlate}</option>
                  ))}
                </select>
                <select
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">所有状态</option>
                  {Object.entries(trackingStatusMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 跟踪列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">车辆信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">当前位置</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行程进度</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTracking.map((tracking) => (
                    <tr key={tracking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{tracking.vehiclePlate}</div>
                          <div className="text-sm text-gray-600">{tracking.driverName}</div>
                          <div className="text-sm text-gray-500">
                            <Link href={`/dashboard/orders/${tracking.orderId}`} className="text-blue-600 hover:underline">
                              {tracking.orderRef}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{tracking.currentLocation.city}</div>
                          <div className="text-gray-500">{tracking.currentLocation.address}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={vehicleStatusMap[tracking.vehicleStatus as keyof typeof vehicleStatusMap].color}>
                              ●
                            </span>
                            <span className="text-xs">{vehicleStatusMap[tracking.vehicleStatus as keyof typeof vehicleStatusMap].label}</span>
                            {tracking.speed > 0 && <span className="text-xs">· {tracking.speed}km/h</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span>{tracking.route.remainingDistance}km / {tracking.route.totalDistance}km</span>
                            <span>{tracking.route.progress.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${tracking.route.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            预计到达: {tracking.route.estimatedTimeOfArrival}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={trackingStatusMap[tracking.status as keyof typeof trackingStatusMap].color}>
                          {trackingStatusMap[tracking.status as keyof typeof trackingStatusMap].label}
                        </Badge>
                        {tracking.alerts.length > 0 && (
                          <div className="flex items-center gap-1 text-red-600 text-xs mt-1">
                            <span>⚠️</span>
                            <span>{tracking.alerts.length}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            详情
                          </Button>
                          <Button size="sm" variant="outline">
                            轨迹
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>告警中心</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trackingData.flatMap(tracking =>
                  tracking.alerts.map((alert: any, index: number) => (
                    <div key={`${tracking.id}-${index}`} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className={`w-2 h-full rounded-full ${
                        alert.severity === 'HIGH' ? 'bg-red-500' :
                        alert.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{tracking.vehiclePlate} - {alert.type}</div>
                          <div className="text-sm text-gray-500">{alert.time}</div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{alert.message}</div>
                        <div className="text-xs text-gray-500">
                          订单: {tracking.orderRef} | 司机: {tracking.driverName} | 位置: {tracking.currentLocation.city}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">处理</Button>
                        <Button size="sm" variant="outline">忽略</Button>
                      </div>
                    </div>
                  ))
                )}
                {trackingData.reduce((sum, t) => sum + t.alerts.length, 0) === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    暂无告警信息
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>历史轨迹</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">选择车辆</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTracking?.id || ''}
                  onChange={(e) => {
                    const tracking = trackingData.find(t => t.id === e.target.value)
                    setSelectedTracking(tracking || null)
                  }}
                >
                  {trackingData.map(tracking => (
                    <option key={tracking.id} value={tracking.id}>
                      {tracking.vehiclePlate} - {tracking.orderRef}
                    </option>
                  ))}
                </select>
              </div>

              {selectedTracking && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3">轨迹回放</h4>
                    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🛣️</div>
                        <p className="text-gray-600">历史轨迹地图</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">轨迹点详情</h4>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {historicalRoute.map((point, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            point.status === 'CURRENT' ? 'bg-blue-500' :
                            point.status === 'DEPARTURE' ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{point.time}</span>
                              <span className="text-sm text-gray-500">{point.speed}km/h</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                            </div>
                          </div>
                          {point.status === 'CURRENT' && (
                            <Badge className="bg-blue-100 text-blue-800">当前位置</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
