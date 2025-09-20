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
  Building,
  User,
  Star,
  Package,
  TrendingUp
} from 'lucide-react'

interface Customer {
  id: string
  customerNumber: string
  type: 'COMPANY' | 'INDIVIDUAL'
  companyName?: string
  firstName?: string
  lastName?: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  creditLimit?: number
  totalOrders: number
  totalSpent: number
  createdAt: string
  lastOrderDate?: string
  rating?: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setCustomers([
        {
          id: '1',
          customerNumber: 'CUST-20240001',
          type: 'COMPANY',
          companyName: '上海国际贸易有限公司',
          email: 'contact@shanghai-trade.com',
          phone: '021-12345678',
          address: '浦东新区世纪大道100号',
          city: '上海',
          province: '上海市',
          status: 'ACTIVE',
          creditLimit: 500000,
          totalOrders: 156,
          totalSpent: 2560000,
          createdAt: '2023-01-15T08:00:00Z',
          lastOrderDate: '2024-01-19T14:30:00Z',
          rating: 4.5
        },
        {
          id: '2',
          customerNumber: 'CUST-20240002',
          type: 'INDIVIDUAL',
          firstName: '张',
          lastName: '三',
          email: 'zhangsan@email.com',
          phone: '13800138000',
          address: '朝阳区建国路88号',
          city: '北京',
          province: '北京市',
          status: 'ACTIVE',
          totalOrders: 23,
          totalSpent: 45600,
          createdAt: '2023-06-20T10:00:00Z',
          lastOrderDate: '2024-01-18T09:15:00Z',
          rating: 4.2
        },
        {
          id: '3',
          customerNumber: 'CUST-20240003',
          type: 'COMPANY',
          companyName: '广州物流配送中心',
          email: 'info@gz-logistics.com',
          phone: '020-87654321',
          address: '天河区珠江新城花城大道123号',
          city: '广州',
          province: '广东省',
          status: 'SUSPENDED',
          creditLimit: 200000,
          totalOrders: 89,
          totalSpent: 890000,
          createdAt: '2023-03-10T14:00:00Z',
          lastOrderDate: '2024-01-10T16:45:00Z',
          rating: 3.8
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const searchMatch = customer.customerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (customer.companyName && customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (customer.firstName && customer.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (customer.lastName && customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const typeMatch = typeFilter === 'all' || customer.type === typeFilter
    const statusMatch = statusFilter === 'all' || customer.status === statusFilter

    return searchMatch && typeMatch && statusMatch
  })

  const getStatusBadge = (status: Customer['status']) => {
    const statusMap = {
      ACTIVE: { label: '活跃', color: 'bg-green-100 text-green-800' },
      INACTIVE: { label: '未激活', color: 'bg-gray-100 text-gray-800' },
      SUSPENDED: { label: '暂停', color: 'bg-red-100 text-red-800' }
    }
    const config = statusMap[status]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getCustomerName = (customer: Customer) => {
    if (customer.type === 'COMPANY') {
      return customer.companyName
    } else {
      return `${customer.lastName}${customer.firstName}`
    }
  }

  const getCustomerStats = () => {
    const total = customers.length
    const active = customers.filter(c => c.status === 'ACTIVE').length
    const companies = customers.filter(c => c.type === 'COMPANY').length
    const individuals = customers.filter(c => c.type === 'INDIVIDUAL').length
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

    return { total, active, companies, individuals, totalRevenue }
  }

  const stats = getCustomerStats()

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
            <h1 className="text-2xl font-bold text-gray-900">客户管理</h1>
            <p className="text-gray-600">管理所有客户信息和订单历史</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新增客户
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">客户总数</p>
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
                  <p className="text-sm font-medium text-gray-600">活跃客户</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
                <Star className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">企业客户</p>
                  <p className="text-2xl font-bold">{stats.companies}</p>
                </div>
                <Building className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">个人客户</p>
                  <p className="text-2xl font-bold">{stats.individuals}</p>
                </div>
                <User className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总收入</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue).slice(0, -3)}K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">客户列表</TabsTrigger>
            <TabsTrigger value="analytics">客户分析</TabsTrigger>
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
                        placeholder="搜索客户编号、名称或邮箱..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="客户类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有类型</SelectItem>
                      <SelectItem value="COMPANY">企业客户</SelectItem>
                      <SelectItem value="INDIVIDUAL">个人客户</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="客户状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="ACTIVE">活跃</SelectItem>
                      <SelectItem value="INACTIVE">未激活</SelectItem>
                      <SelectItem value="SUSPENDED">暂停</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    高级筛选
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customers Table */}
            <Card>
              <CardHeader>
                <CardTitle>客户列表</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>客户编号</TableHead>
                      <TableHead>客户名称</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>联系方式</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>订单数</TableHead>
                      <TableHead>消费金额</TableHead>
                      <TableHead>最后订单</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.customerNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{getCustomerName(customer)}</div>
                            <div className="text-sm text-gray-500">{customer.city}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.type === 'COMPANY' ? 'default' : 'secondary'}>
                            {customer.type === 'COMPANY' ? '企业' : '个人'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {customer.phone}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Mail className="w-3 h-3 mr-1" />
                              {customer.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                        <TableCell>
                          {customer.lastOrderDate ? formatDate(customer.lastOrderDate) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedCustomer(customer)
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

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>客户类型分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        企业客户
                      </span>
                      <span className="font-medium">{stats.companies} ({Math.round(stats.companies / stats.total * 100)}%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        个人客户
                      </span>
                      <span className="font-medium">{stats.individuals} ({Math.round(stats.individuals / stats.total * 100)}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 客户（按消费金额）</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers
                      .sort((a, b) => b.totalSpent - a.totalSpent)
                      .slice(0, 5)
                      .map((customer, index) => (
                        <div key={customer.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <div className="font-medium">{getCustomerName(customer)}</div>
                              <div className="text-sm text-gray-500">{customer.totalOrders} 个订单</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(customer.totalSpent)}</div>
                            {customer.rating && (
                              <div className="text-sm text-gray-500 flex items-center justify-end">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                                {customer.rating}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Customer Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>新增客户</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              客户创建表单将在后续版本中实现
            </p>
            <Button onClick={() => setShowCreateDialog(false)} className="w-full">
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Customer Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>客户详情</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">基本信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{getCustomerName(selectedCustomer)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.province}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">业务信息</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>客户编号</span>
                    <span className="font-medium">{selectedCustomer.customerNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>客户类型</span>
                    <Badge variant={selectedCustomer.type === 'COMPANY' ? 'default' : 'secondary'}>
                      {selectedCustomer.type === 'COMPANY' ? '企业客户' : '个人客户'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>客户状态</span>
                    {getStatusBadge(selectedCustomer.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>信用额度</span>
                    <span className="font-medium">
                      {selectedCustomer.creditLimit ? formatCurrency(selectedCustomer.creditLimit) : '无限制'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>订单总数</span>
                    <span className="font-medium">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>总消费金额</span>
                    <span className="font-medium">{formatCurrency(selectedCustomer.totalSpent)}</span>
                  </div>
                  {selectedCustomer.rating && (
                    <div className="flex items-center justify-between">
                      <span>客户评分</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{selectedCustomer.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
