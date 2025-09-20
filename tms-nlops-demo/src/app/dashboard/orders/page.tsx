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
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  origin: string
  destination: string
  status: 'PENDING' | 'CONFIRMED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
  totalAmount: number
  createdAt: string
  estimatedDelivery?: string
}

const statusMap = {
  PENDING: { label: '待处理', color: 'bg-gray-100 text-gray-800', icon: Clock },
  CONFIRMED: { label: '已确认', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  IN_TRANSIT: { label: '运输中', color: 'bg-yellow-100 text-yellow-800', icon: Truck },
  DELIVERED: { label: '已送达', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  CANCELLED: { label: '已取消', color: 'bg-red-100 text-red-800', icon: XCircle },
}

const priorityMap = {
  LOW: { label: '低', color: 'bg-gray-100 text-gray-800' },
  NORMAL: { label: '普通', color: 'bg-blue-100 text-blue-800' },
  HIGH: { label: '高', color: 'bg-orange-100 text-orange-800' },
  URGENT: { label: '紧急', color: 'bg-red-100 text-red-800' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  useEffect(() => {
    // 模拟数据加载
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          orderNumber: 'ORD-20240120-0001',
          customerName: '上海贸易有限公司',
          origin: '上海市浦东新区',
          destination: '北京市朝阳区',
          status: 'IN_TRANSIT',
          priority: 'HIGH',
          totalAmount: 2500,
          createdAt: '2024-01-20T08:00:00Z',
          estimatedDelivery: '2024-01-22T18:00:00Z'
        },
        {
          id: '2',
          orderNumber: 'ORD-20240120-0002',
          customerName: '广州物流公司',
          origin: '广州市天河区',
          destination: '深圳市南山区',
          status: 'PENDING',
          priority: 'NORMAL',
          totalAmount: 800,
          createdAt: '2024-01-20T09:30:00Z'
        },
        {
          id: '3',
          orderNumber: 'ORD-20240119-0003',
          customerName: '北京科技发展有限公司',
          origin: '北京市海淀区',
          destination: '成都市高新区',
          status: 'DELIVERED',
          priority: 'URGENT',
          totalAmount: 3500,
          createdAt: '2024-01-19T14:00:00Z',
          estimatedDelivery: '2024-01-20T16:00:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: Order['status']) => {
    const config = statusMap[status]
    const Icon = config.icon
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: Order['priority']) => {
    const config = priorityMap[priority]
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

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
            <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
            <p className="text-gray-600">管理和跟踪所有运输订单</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                创建订单
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新订单</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  订单创建表单将在后续版本中实现
                </p>
                <Button onClick={() => setShowCreateDialog(false)} className="w-full">
                  关闭
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索订单号或客户名称..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有状态</SelectItem>
                  <SelectItem value="PENDING">待处理</SelectItem>
                  <SelectItem value="CONFIRMED">已确认</SelectItem>
                  <SelectItem value="IN_TRANSIT">运输中</SelectItem>
                  <SelectItem value="DELIVERED">已送达</SelectItem>
                  <SelectItem value="CANCELLED">已取消</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有优先级</SelectItem>
                  <SelectItem value="LOW">低</SelectItem>
                  <SelectItem value="NORMAL">普通</SelectItem>
                  <SelectItem value="HIGH">高</SelectItem>
                  <SelectItem value="URGENT">紧急</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                更多筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>订单列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>路线</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>优先级</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{order.origin}</div>
                        <div className="text-gray-500">↓</div>
                        <div>{order.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
