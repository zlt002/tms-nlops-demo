'use client'

import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Truck,
  Package,
  Users,
  MapPin,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface DashboardStats {
  totalOrders: number
  activeVehicles: number
  pendingDeliveries: number
  totalCustomers: number
  revenue: number
  avgDeliveryTime: number
}

interface RecentActivity {
  id: string
  type: 'order' | 'delivery' | 'vehicle' | 'issue'
  message: string
  time: string
  status: 'success' | 'warning' | 'error'
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeVehicles: 0,
    pendingDeliveries: 0,
    totalCustomers: 0,
    revenue: 0,
    avgDeliveryTime: 0
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载
    const loadDashboardData = async () => {
      // 这里应该调用实际的API
      setTimeout(() => {
        setStats({
          totalOrders: 1250,
          activeVehicles: 45,
          pendingDeliveries: 23,
          totalCustomers: 180,
          revenue: 256000,
          avgDeliveryTime: 2.5
        })

        setRecentActivities([
          {
            id: '1',
            type: 'order',
            message: '新订单 #ORD-20240120-0123 已创建',
            time: '2分钟前',
            status: 'success'
          },
          {
            id: '2',
            type: 'delivery',
            message: '车辆 A-1234 已完成交货',
            time: '5分钟前',
            status: 'success'
          },
          {
            id: '3',
            type: 'vehicle',
            message: '车辆 B-5678 需要维护',
            time: '10分钟前',
            status: 'warning'
          },
          {
            id: '4',
            type: 'issue',
            message: '订单 #ORD-20240120-0120 交货延迟',
            time: '15分钟前',
            status: 'error'
          }
        ])
        setLoading(false)
      }, 1000)
    }

    loadDashboardData()
  }, [])

  const getStatusIcon = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount)
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
          <p className="text-gray-600">系统概览和关键指标</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总订单数</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">活跃车辆</p>
                  <p className="text-2xl font-bold">{stats.activeVehicles}</p>
                </div>
                <Truck className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">待交货</p>
                  <p className="text-2xl font-bold">{stats.pendingDeliveries}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">客户总数</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总收入</p>
                  <p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均交货时间</p>
                  <p className="text-2xl font-bold">{stats.avgDeliveryTime}天</p>
                </div>
                <MapPin className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Package className="h-6 w-6 text-blue-500 mb-2" />
                  <p className="font-medium">创建订单</p>
                  <p className="text-xs text-gray-500">添加新的运输订单</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Truck className="h-6 w-6 text-green-500 mb-2" />
                  <p className="font-medium">调度车辆</p>
                  <p className="text-xs text-gray-500">安排车辆任务</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <MapPin className="h-6 w-6 text-indigo-500 mb-2" />
                  <p className="font-medium">实时跟踪</p>
                  <p className="text-xs text-gray-500">查看运输状态</p>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mb-2" />
                  <p className="font-medium">回单管理</p>
                  <p className="text-xs text-gray-500">处理交货回单</p>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
