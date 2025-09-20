'use client'

import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Map
} from 'lucide-react'

interface Vehicle {
  id: string
  licensePlate: string
  type: string
  model: string
  year: number
  capacity: number
  status: 'AVAILABLE' | 'IN_TRANSIT' | 'MAINTENANCE' | 'OUT_OF_SERVICE'
  currentLocation?: {
    latitude: number
    longitude: number
    address?: string
  }
  driver?: {
    id: string
    name: string
    phone: string
  }
  lastMaintenance?: string
  nextMaintenance?: string
  fuelLevel: number
  mileage: number
  totalTrips: number
  totalDistance: number
  utilization: number
  createdAt: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setVehicles([
        {
          id: '1',
          licensePlate: '沪A12345',
          type: '卡车',
          model: '东风天龙',
          year: 2022,
          capacity: 10,
          status: 'IN_TRANSIT',
          currentLocation: {
            latitude: 31.2304,
            longitude: 121.4737,
            address: '上海市浦东新区世纪大道'
          },
          driver: {
            id: '1',
            name: '王师傅',
            phone: '13812345678'
          },
          lastMaintenance: '2024-01-10T00:00:00Z',
          nextMaintenance: '2024-04-10T00:00:00Z',
          fuelLevel: 75,
          mileage: 45600,
          totalTrips: 89,
          totalDistance: 12345,
          utilization: 85,
          createdAt: '2023-01-15T00:00:00Z'
        },
        {
          id: '2',
          licensePlate: '京B67890',
          type: '厢式货车',
          model: '江淮骏铃',
          year: 2021,
          capacity: 5,
          status: 'AVAILABLE',
          currentLocation: {
            latitude: 39.9042,
            longitude: 116.4074,
            address: '北京市朝阳区建国路'
          },
          lastMaintenance: '2024-01-05T00:00:00Z',
          nextMaintenance: '2024-04-05T00:00:00Z',
          fuelLevel: 90,
          mileage: 32100,
          totalTrips: 56,
          totalDistance: 8765,
          utilization: 72,
          createdAt: '2023-03-20T00:00:00Z'
        },
        {
          id: '3',
          licensePlate: '粤C54321',
          type: '冷藏车',
          model: '福田欧马可',
          year: 2023,
          capacity: 8,
          status: 'MAINTENANCE',
          lastMaintenance: '2024-01-15T00:00:00Z',
          nextMaintenance: '2024-04-15T00:00:00Z',
          fuelLevel: 45,
          mileage: 12300,
          totalTrips: 23,
          totalDistance: 3456,
          utilization: 45,
          createdAt: '2023-06-15T00:00:00Z'
        },
        {
          id: '4',
          licensePlate: '苏D98765',
          type: '牵引车',
          model: '解放J7',
          year: 2020,
          capacity: 15,
          status: 'OUT_OF_SERVICE',
          lastMaintenance: '2023-12-20T00:00:00Z',
          nextMaintenance: '2024-03-20T00:00:00Z',
          fuelLevel: 20,
          mileage: 98700,
          totalTrips: 234,
          totalDistance: 45678,
          utilization: 95,
          createdAt: '2022-01-10T00:00:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredVehicles = vehicles.filter(vehicle => {
    const searchMatch = vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (vehicle.driver && vehicle.driver.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const statusMatch = statusFilter === 'all' || vehicle.status === statusFilter
    const typeMatch = typeFilter === 'all' || vehicle.type === typeFilter

    return searchMatch && statusMatch && typeMatch
  })

  const getStatusBadge = (status: Vehicle['status']) => {
    const statusMap = {
      AVAILABLE: { label: '可用', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      IN_TRANSIT: { label: '运输中', color: 'bg-blue-100 text-blue-800', icon: Map },
      MAINTENANCE: { label: '维护中', color: 'bg-yellow-100 text-yellow-800', icon: Wrench },
      OUT_OF_SERVICE: { label: '停运', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    }
    const config = statusMap[status]
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getFuelBadge = (fuelLevel: number) => {
    let color = 'bg-green-100 text-green-800'
    if (fuelLevel < 20) color = 'bg-red-100 text-red-800'
    else if (fuelLevel < 50) color = 'bg-yellow-100 text-yellow-800'

    return (
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
          <div
            className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
            style={{ width: `${fuelLevel}%` }}
          ></div>
        </div>
        <span className="text-sm">{fuelLevel}%</span>
      </div>
    )
  }

  const getUtilizationBadge = (utilization: number) => {
    let color = 'bg-gray-100 text-gray-800'
    if (utilization >= 80) color = 'bg-green-100 text-green-800'
    else if (utilization >= 50) color = 'bg-blue-100 text-blue-800'
    else if (utilization >= 20) color = 'bg-yellow-100 text-yellow-800'
    else color = 'bg-red-100 text-red-800'

    return <Badge className={color}>{utilization}%</Badge>
  }

  const getVehicleStats = () => {
    const total = vehicles.length
    const available = vehicles.filter(v => v.status === 'AVAILABLE').length
    const inTransit = vehicles.filter(v => v.status === 'IN_TRANSIT').length
    const maintenance = vehicles.filter(v => v.status === 'MAINTENANCE').length
    const outOfService = vehicles.filter(v => v.status === 'OUT_OF_SERVICE').length
    const avgUtilization = vehicles.reduce((sum, v) => sum + v.utilization, 0) / total || 0
    const totalDistance = vehicles.reduce((sum, v) => sum + v.totalDistance, 0)

    return { total, available, inTransit, maintenance, outOfService, avgUtilization, totalDistance }
  }

  const stats = getVehicleStats()

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">车辆管理</h1>
            <p className="text-gray-600">管理车队车辆信息和实时状态</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            添加车辆
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">车辆总数</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Settings className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">可用</p>
                  <p className="text-2xl font-bold">{stats.available}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">运输中</p>
                  <p className="text-2xl font-bold">{stats.inTransit}</p>
                </div>
                <Map className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">维护中</p>
                  <p className="text-2xl font-bold">{stats.maintenance}</p>
                </div>
                <Wrench className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">停运</p>
                  <p className="text-2xl font-bold">{stats.outOfService}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均利用率</p>
                  <p className="text-2xl font-bold">{Math.round(stats.avgUtilization)}%</p>
                </div>
                <Gauge className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总里程</p>
                  <p className="text-2xl font-bold">{(stats.totalDistance / 1000).toFixed(0)}K</p>
                </div>
                <MapPin className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">车辆列表</TabsTrigger>
            <TabsTrigger value="map">车辆地图</TabsTrigger>
            <TabsTrigger value="maintenance">维护记录</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜索车牌号、型号或司机..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="车辆状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="AVAILABLE">可用</SelectItem>
                      <SelectItem value="IN_TRANSIT">运输中</SelectItem>
                      <SelectItem value="MAINTENANCE">维护中</SelectItem>
                      <SelectItem value="OUT_OF_SERVICE">停运</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="车辆类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="卡车">卡车</SelectItem>
                      <SelectItem value="厢式货车">厢式货车</SelectItem>
                      <SelectItem value="冷藏车">冷藏车</SelectItem>
                      <SelectItem value="牵引车">牵引车</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    高级筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vehicles Table */}
            <Card>
              <CardHeader>
                <CardTitle>车辆列表</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>车牌号</TableHead>
                      <TableHead>车型</TableHead>
                      <TableHead>载重(吨)</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>当前司机</TableHead>
                      <TableHead>燃油</TableHead>
                      <TableHead>利用率</TableHead>
                      <TableHead>里程</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{vehicle.type}</div>
                            <div className="text-sm text-gray-500">{vehicle.model} ({vehicle.year})</div>
                          </div>
                        </TableCell>
                        <TableCell>{vehicle.capacity}</TableCell>
                        <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                        <TableCell>
                          {vehicle.driver ? (
                            <div>
                              <div className="font-medium">{vehicle.driver.name}</div>
                              <div className="text-sm text-gray-500">{vehicle.driver.phone}</div>
                            </div>
                          ) : (
                            <span className="text-gray-500">未分配</span>
                          )}
                        </TableCell>
                        <TableCell>{getFuelBadge(vehicle.fuelLevel)}</TableCell>
                        <TableCell>{getUtilizationBadge(vehicle.utilization)}</TableCell>
                        <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVehicle(vehicle)
                                setShowDetailDialog(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>实时车辆位置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">地图功能将在后续版本中实现</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>维护计划</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles
                    .filter(v => v.nextMaintenance)
                    .sort((a, b) => new Date(a.nextMaintenance!).getTime() - new Date(b.nextMaintenance!).getTime())
                    .map((vehicle) => {
                      const daysUntilMaintenance = Math.ceil(
                        (new Date(vehicle.nextMaintenance!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      )

                      let urgency = 'normal'
                      if (daysUntilMaintenance <= 7) urgency = 'urgent'
                      else if (daysUntilMaintenance <= 30) urgency = 'warning'

                      return (
                        <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              urgency === 'urgent' ? 'bg-red-500' :
                              urgency === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <div className="font-medium">{vehicle.licensePlate} - {vehicle.model}</div>
                              <div className="text-sm text-gray-500">
                                下次维护: {new Date(vehicle.nextMaintenance!).toLocaleDateString('zh-CN')}
                                {daysUntilMaintenance > 0 && ` (${daysUntilMaintenance}天后)`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              urgency === 'urgent' ? 'destructive' :
                              urgency === 'warning' ? 'default' : 'secondary'
                            }>
                              {urgency === 'urgent' ? '紧急' :
                               urgency === 'warning' ? '即将到期' : '正常'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              安排维护
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Vehicle Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加车辆</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              车辆添加表单将在后续版本中实现
            </p>
            <Button onClick={() => setShowCreateDialog(false)} className="w-full">
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vehicle Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>车辆详情</DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">基本信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>车牌号</span>
                    <span className="font-medium">{selectedVehicle.licensePlate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>车辆类型</span>
                    <span className="font-medium">{selectedVehicle.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>型号</span>
                    <span className="font-medium">{selectedVehicle.model}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>年份</span>
                    <span className="font-medium">{selectedVehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>载重</span>
                    <span className="font-medium">{selectedVehicle.capacity} 吨</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>状态</span>
                    {getStatusBadge(selectedVehicle.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">运行信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Fuel className="w-4 h-4 mr-2" />
                      燃油水平
                    </span>
                    {getFuelBadge(selectedVehicle.fuelLevel)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      里程数
                    </span>
                    <span className="font-medium">{selectedVehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>总行程数</span>
                    <span className="font-medium">{selectedVehicle.totalTrips}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>总行驶距离</span>
                    <span className="font-medium">{selectedVehicle.totalDistance.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>利用率</span>
                    {getUtilizationBadge(selectedVehicle.utilization)}
                  </div>
                  {selectedVehicle.driver && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-500 mb-2">当前司机</p>
                      <div className="font-medium">{selectedVehicle.driver.name}</div>
                      <div className="text-sm text-gray-500">{selectedVehicle.driver.phone}</div>
                    </div>
                  )}
                </div>
              </div>

              {(selectedVehicle.lastMaintenance || selectedVehicle.nextMaintenance) && (
                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-semibold text-lg">维护记录</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedVehicle.lastMaintenance && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-500">上次维护</p>
                          <p className="font-medium">
                            {new Date(selectedVehicle.lastMaintenance).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                        <Wrench className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                    {selectedVehicle.nextMaintenance && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-500">下次维护</p>
                          <p className="font-medium">
                            {new Date(selectedVehicle.nextMaintenance).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
