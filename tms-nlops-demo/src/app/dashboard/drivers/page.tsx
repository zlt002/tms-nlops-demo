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
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  Car,
  User,
  Award,
  TrendingUp
} from 'lucide-react'

interface Driver {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  province: string
  licenseNumber: string
  licenseType: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  licenseExpiry: string
  status: 'AVAILABLE' | 'ON_TRIP' | 'OFF_DUTY' | 'SUSPENDED'
  currentVehicle?: {
    id: string
    licensePlate: string
    type: string
  }
  totalTrips: number
  totalDistance: number
  averageRating: number
  safetyScore: number
  efficiency: number
  onTimeRate: number
  experience: number // years
  monthlySalary?: number
  bankAccount?: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  documents: {
    idCard: {
      number: string
      expiry: string
      status: 'VALID' | 'EXPIRING' | 'EXPIRED'
    }
    license: {
      number: string
      expiry: string
      status: 'VALID' | 'EXPIRING' | 'EXPIRED'
    }
    medical: {
      expiry: string
      status: 'VALID' | 'EXPIRING' | 'EXPIRED'
    }
  }
  createdAt: string
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [licenseTypeFilter, setLicenseTypeFilter] = useState<string>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setDrivers([
        {
          id: '1',
          employeeId: 'EMP001',
          firstName: '张',
          lastName: '伟',
          phone: '13812345678',
          email: 'zhangwei@tms.com',
          address: '浦东新区张江路100号',
          city: '上海',
          province: '上海市',
          licenseNumber: '310101199001011234',
          licenseType: 'A2',
          licenseExpiry: '2025-06-30T00:00:00Z',
          status: 'ON_TRIP',
          currentVehicle: {
            id: '1',
            licensePlate: '沪A12345',
            type: '卡车'
          },
          totalTrips: 234,
          totalDistance: 56780,
          averageRating: 4.8,
          safetyScore: 95,
          efficiency: 92,
          onTimeRate: 98,
          experience: 8,
          monthlySalary: 8000,
          bankAccount: '6225880212345678',
          emergencyContact: {
            name: '张小红',
            relationship: '配偶',
            phone: '13987654321'
          },
          documents: {
            idCard: {
              number: '310101199001011234',
              expiry: '2030-01-01T00:00:00Z',
              status: 'VALID'
            },
            license: {
              number: '310101199001011234',
              expiry: '2025-06-30T00:00:00Z',
              status: 'VALID'
            },
            medical: {
              expiry: '2024-12-31T00:00:00Z',
              status: 'EXPIRING'
            }
          },
          createdAt: '2022-01-15T00:00:00Z'
        },
        {
          id: '2',
          employeeId: 'EMP002',
          firstName: '李',
          lastName: '强',
          phone: '13987654321',
          email: 'liqiang@tms.com',
          address: '朝阳区建国路88号',
          city: '北京',
          province: '北京市',
          licenseNumber: '110101199002022345',
          licenseType: 'B2',
          licenseExpiry: '2026-03-31T00:00:00Z',
          status: 'AVAILABLE',
          totalTrips: 156,
          totalDistance: 34560,
          averageRating: 4.5,
          safetyScore: 88,
          efficiency: 85,
          onTimeRate: 95,
          experience: 5,
          monthlySalary: 6000,
          emergencyContact: {
            name: '李小芳',
            relationship: '母亲',
            phone: '13765432109'
          },
          documents: {
            idCard: {
              number: '110101199002022345',
              expiry: '2035-02-02T00:00:00Z',
              status: 'VALID'
            },
            license: {
              number: '110101199002022345',
              expiry: '2026-03-31T00:00:00Z',
              status: 'VALID'
            },
            medical: {
              expiry: '2025-06-30T00:00:00Z',
              status: 'VALID'
            }
          },
          createdAt: '2023-03-20T00:00:00Z'
        },
        {
          id: '3',
          employeeId: 'EMP003',
          firstName: '王',
          lastName: '明',
          phone: '13666666666',
          email: 'wangming@tms.com',
          address: '天河区珠江新城200号',
          city: '广州',
          province: '广东省',
          licenseNumber: '440101199003033456',
          licenseType: 'A1',
          licenseExpiry: '2024-08-31T00:00:00Z',
          status: 'OFF_DUTY',
          totalTrips: 89,
          totalDistance: 12340,
          averageRating: 4.2,
          safetyScore: 82,
          efficiency: 78,
          onTimeRate: 90,
          experience: 3,
          monthlySalary: 5500,
          emergencyContact: {
            name: '王大明',
            relationship: '父亲',
            phone: '13555555555'
          },
          documents: {
            idCard: {
              number: '440101199003033456',
              expiry: '2040-03-03T00:00:00Z',
              status: 'VALID'
            },
            license: {
              number: '440101199003033456',
              expiry: '2024-08-31T00:00:00Z',
              status: 'EXPIRING'
            },
            medical: {
              expiry: '2024-10-31T00:00:00Z',
              status: 'EXPIRING'
            }
          },
          createdAt: '2023-06-15T00:00:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredDrivers = drivers.filter(driver => {
    const searchMatch = driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        `${driver.lastName}${driver.firstName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        driver.phone.includes(searchTerm) ||
                        driver.email.toLowerCase().includes(searchTerm.toLowerCase())

    const statusMatch = statusFilter === 'all' || driver.status === statusFilter
    const licenseTypeMatch = licenseTypeFilter === 'all' || driver.licenseType === licenseTypeFilter

    return searchMatch && statusMatch && licenseTypeMatch
  })

  const getStatusBadge = (status: Driver['status']) => {
    const statusMap = {
      AVAILABLE: { label: '可用', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      ON_TRIP: { label: '出车中', color: 'bg-blue-100 text-blue-800', icon: Car },
      OFF_DUTY: { label: '休息', color: 'bg-gray-100 text-gray-800', icon: Clock },
      SUSPENDED: { label: '停职', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
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

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const getDocumentStatusBadge = (status: string) => {
    const statusMap = {
      VALID: { label: '有效', color: 'bg-green-100 text-green-800' },
      EXPIRING: { label: '即将到期', color: 'bg-yellow-100 text-yellow-800' },
      EXPIRED: { label: '已过期', color: 'bg-red-100 text-red-800' }
    }
    const config = statusMap[status as keyof typeof statusMap]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getDriverStats = () => {
    const total = drivers.length
    const available = drivers.filter(d => d.status === 'AVAILABLE').length
    const onTrip = drivers.filter(d => d.status === 'ON_TRIP').length
    const offDuty = drivers.filter(d => d.status === 'OFF_DUTY').length
    const suspended = drivers.filter(d => d.status === 'SUSPENDED').length
    const avgRating = drivers.reduce((sum, d) => sum + d.averageRating, 0) / total || 0
    const avgExperience = drivers.reduce((sum, d) => sum + d.experience, 0) / total || 0

    return { total, available, onTrip, offDuty, suspended, avgRating, avgExperience }
  }

  const stats = getDriverStats()

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
            <h1 className="text-2xl font-bold text-gray-900">司机管理</h1>
            <p className="text-gray-600">管理司机信息和绩效表现</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            添加司机
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">司机总数</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
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
                  <p className="text-sm font-medium text-gray-600">出车中</p>
                  <p className="text-2xl font-bold">{stats.onTrip}</p>
                </div>
                <Car className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">休息</p>
                  <p className="text-2xl font-bold">{stats.offDuty}</p>
                </div>
                <Clock className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">停职</p>
                  <p className="text-2xl font-bold">{stats.suspended}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均评分</p>
                  <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均经验</p>
                  <p className="text-2xl font-bold">{Math.round(stats.avgExperience)}年</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">司机列表</TabsTrigger>
            <TabsTrigger value="performance">绩效分析</TabsTrigger>
            <TabsTrigger value="documents">证件管理</TabsTrigger>
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
                        placeholder="搜索工号、姓名或联系方式..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="工作状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="AVAILABLE">可用</SelectItem>
                      <SelectItem value="ON_TRIP">出车中</SelectItem>
                      <SelectItem value="OFF_DUTY">休息</SelectItem>
                      <SelectItem value="SUSPENDED">停职</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={licenseTypeFilter} onValueChange={setLicenseTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="驾照类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="A1">A1</SelectItem>
                      <SelectItem value="A2">A2</SelectItem>
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                      <SelectItem value="C1">C1</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    高级筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Drivers Table */}
            <Card>
              <CardHeader>
                <CardTitle>司机列表</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>工号</TableHead>
                      <TableHead>姓名</TableHead>
                      <TableHead>驾照类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>当前车辆</TableHead>
                      <TableHead>评分</TableHead>
                      <TableHead>行程数</TableHead>
                      <TableHead>经验</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.employeeId}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{driver.lastName}{driver.firstName}</div>
                            <div className="text-sm text-gray-500">{driver.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{driver.licenseType}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(driver.status)}</TableCell>
                        <TableCell>
                          {driver.currentVehicle ? (
                            <div>
                              <div className="font-medium">{driver.currentVehicle.licensePlate}</div>
                              <div className="text-sm text-gray-500">{driver.currentVehicle.type}</div>
                            </div>
                          ) : (
                            <span className="text-gray-500">未分配</span>
                          )}
                        </TableCell>
                        <TableCell>{getRatingStars(driver.averageRating)}</TableCell>
                        <TableCell>{driver.totalTrips}</TableCell>
                        <TableCell>{driver.experience}年</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedDriver(driver)
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

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 司机（按评分）</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drivers
                      .sort((a, b) => b.averageRating - a.averageRating)
                      .slice(0, 5)
                      .map((driver, index) => (
                        <div key={driver.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <div className="font-medium">{driver.lastName}{driver.firstName}</div>
                              <div className="text-sm text-gray-500">{driver.totalTrips} 次行程</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{getRatingStars(driver.averageRating)}</div>
                            <div className="text-sm text-gray-500">
                              安全分: {driver.safetyScore} | 效率: {driver.efficiency}%
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>绩效指标分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">安全评分分布</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>90+ 分</span>
                          <span>{drivers.filter(d => d.safetyScore >= 90).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>80-89 分</span>
                          <span>{drivers.filter(d => d.safetyScore >= 80 && d.safetyScore < 90).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>70-79 分</span>
                          <span>{drivers.filter(d => d.safetyScore >= 70 && d.safetyScore < 80).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>&lt;70 分</span>
                          <span>{drivers.filter(d => d.safetyScore < 70).length} 人</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">准时率分布</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>95%+</span>
                          <span>{drivers.filter(d => d.onTimeRate >= 95).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>90-94%</span>
                          <span>{drivers.filter(d => d.onTimeRate >= 90 && d.onTimeRate < 95).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>85-89%</span>
                          <span>{drivers.filter(d => d.onTimeRate >= 85 && d.onTimeRate < 90).length} 人</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>&lt;85%</span>
                          <span>{drivers.filter(d => d.onTimeRate < 85).length} 人</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>证件到期提醒</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map(driver => {
                    const expiringDocs = []
                    if (driver.documents.license.status === 'EXPIRING') {
                      expiringDocs.push({ type: '驾驶证', expiry: driver.documents.license.expiry })
                    }
                    if (driver.documents.medical.status === 'EXPIRING') {
                      expiringDocs.push({ type: '体检证明', expiry: driver.documents.medical.expiry })
                    }

                    return expiringDocs.length > 0 ? (
                      <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                        <div>
                          <div className="font-medium">{driver.lastName}{driver.firstName} ({driver.employeeId})</div>
                          <div className="text-sm text-gray-600">
                            {expiringDocs.map((doc, index) => (
                              <span key={index}>
                                {doc.type}: {new Date(doc.expiry).toLocaleDateString('zh-CN')}
                                {index < expiringDocs.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          提醒续期
                        </Button>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Driver Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加司机</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              司机添加表单将在后续版本中实现
            </p>
            <Button onClick={() => setShowCreateDialog(false)} className="w-full">
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Driver Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>司机详情</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">基本信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>工号</span>
                    <span className="font-medium">{selectedDriver.employeeId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>姓名</span>
                    <span className="font-medium">{selectedDriver.lastName}{selectedDriver.firstName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      电话
                    </span>
                    <span className="font-medium">{selectedDriver.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      邮箱
                    </span>
                    <span className="font-medium">{selectedDriver.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      地址
                    </span>
                    <span className="font-medium text-right">
                      {selectedDriver.address}<br />
                      {selectedDriver.city}, {selectedDriver.province}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>工作状态</span>
                    {getStatusBadge(selectedDriver.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">驾驶证信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>驾驶证号</span>
                    <span className="font-medium">{selectedDriver.licenseNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>驾照类型</span>
                    <Badge variant="outline">{selectedDriver.licenseType}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>有效期至</span>
                    <span className="font-medium">
                      {new Date(selectedDriver.licenseExpiry).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg pt-4">工作表现</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>总行程数</span>
                    <span className="font-medium">{selectedDriver.totalTrips}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>总行驶距离</span>
                    <span className="font-medium">{selectedDriver.totalDistance.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>工作年限</span>
                    <span className="font-medium">{selectedDriver.experience} 年</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>平均评分</span>
                    {getRatingStars(selectedDriver.averageRating)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>安全评分</span>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            selectedDriver.safetyScore >= 90 ? 'bg-green-500' :
                            selectedDriver.safetyScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedDriver.safetyScore}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{selectedDriver.safetyScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {(selectedDriver.currentVehicle || selectedDriver.emergencyContact) && (
                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-semibold text-lg">其他信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDriver.currentVehicle && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">当前车辆</p>
                        <p className="font-medium">{selectedDriver.currentVehicle.licensePlate}</p>
                        <p className="text-sm text-gray-500">{selectedDriver.currentVehicle.type}</p>
                      </div>
                    )}
                    {selectedDriver.emergencyContact && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">紧急联系人</p>
                        <p className="font-medium">{selectedDriver.emergencyContact.name}</p>
                        <p className="text-sm text-gray-500">
                          {selectedDriver.emergencyContact.relationship} - {selectedDriver.emergencyContact.phone}
                        </p>
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
