'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface HealthData {
  status: string
  timestamp: string
  uptime: number
  version: string
  environment: string
  database: {
    status: string
    responseTime: number
  }
  memory: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
  }
  system: {
    platform: string
    arch: string
    nodeVersion: string
    cpuUsage: any
  }
}

interface StatsData {
  period: string
  summary: {
    totalOrders: number
    totalCustomers: number
    totalVehicles: number
    totalShipments: number
    activeShipments: number
    completedDeliveries: number
    revenue: number
  }
  statusDistribution: Record<string, number>
  dailyOrders: Array<{ date: string; count: number }>
  performance: {
    completionRate: number
    averageOrderValue: number
  }
}

export default function APIDashboardPage() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // 获取健康状态
      const healthResponse = await fetch('/api/health')
      if (healthResponse.ok) {
        const healthData = await healthResponse.json()
        setHealth(healthData.data)
      }

      // 获取统计数据
      const statsResponse = await fetch('/api/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // 每30秒刷新一次数据
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500">健康</Badge>
      case 'warning':
        return <Badge className="bg-yellow-500">警告</Badge>
      case 'error':
        return <Badge className="bg-red-500">错误</Badge>
      default:
        return <Badge className="bg-gray-500">未知</Badge>
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">加载API监控数据...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">加载失败</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchData} variant="outline">
            重试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API监控仪表板</h1>
        <p className="text-gray-600">实时监控系统状态和API性能</p>
        <Button onClick={fetchData} className="mt-4">
          刷新数据
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">系统概览</TabsTrigger>
          <TabsTrigger value="performance">性能指标</TabsTrigger>
          <TabsTrigger value="health">健康状态</TabsTrigger>
          <TabsTrigger value="usage">使用统计</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">系统状态</CardTitle>
                {health && getStatusBadge(health.status)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{health?.status.toUpperCase()}</div>
                <p className="text-xs text-muted-foreground">
                  运行时间: {health ? Math.floor(health.uptime / 3600) : 0}小时
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">数据库状态</CardTitle>
                {health && getStatusBadge(health.database.status)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{health?.database.responseTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  响应时间
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">内存使用</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {health ? Math.round(health.memory.heapUsed) : 0}MB
                </div>
                <p className="text-xs text-muted-foreground">
                  堆内存使用量
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">活跃运单</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.activeShipments || 0}</div>
                <p className="text-xs text-muted-foreground">
                  当前运输中
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>订单状态分布</CardTitle>
                <CardDescription>各状态订单数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats && Object.entries(stats.statusDistribution).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{status}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能指标</CardTitle>
                <CardDescription>系统运行效率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">完成率</span>
                    <Badge className="bg-green-500">{stats?.performance.completionRate || 0}%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">平均订单价值</span>
                    <Badge variant="outline">¥{stats?.performance.averageOrderValue || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>系统资源</CardTitle>
                <CardDescription>内存使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                {health && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>RSS内存</span>
                      <span>{health.memory.rss}MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>堆内存总量</span>
                      <span>{health.memory.heapTotal}MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>堆内存使用</span>
                      <span>{health.memory.heapUsed}MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>外部内存</span>
                      <span>{health.memory.external}MB</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>系统信息</CardTitle>
                <CardDescription>运行环境信息</CardDescription>
              </CardHeader>
              <CardContent>
                {health && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>平台</span>
                      <span>{health.system.platform} ({health.system.arch})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Node版本</span>
                      <span>{health.system.nodeVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>环境</span>
                      <Badge variant="outline">{health.environment}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>版本</span>
                      <span>{health.version}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>健康检查详情</CardTitle>
              <CardDescription>各组件健康状态</CardDescription>
            </CardHeader>
            <CardContent>
              {health && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>组件</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>响应时间</TableHead>
                      <TableHead>最后检查</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>数据库</TableCell>
                      <TableCell>{getStatusBadge(health.database.status)}</TableCell>
                      <TableCell>{health.database.responseTime}ms</TableCell>
                      <TableCell>{new Date(health.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">总订单数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.totalOrders || 0}</div>
                <p className="text-xs text-muted-foreground">过去{stats?.period || '7天'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">客户数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.totalCustomers || 0}</div>
                <p className="text-xs text-muted-foreground">活跃客户</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">车辆数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.totalVehicles || 0}</div>
                <p className="text-xs text-muted-foreground">可用车辆</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">运单数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.totalShipments || 0}</div>
                <p className="text-xs text-muted-foreground">运输中</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">完成配送</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.summary.completedDeliveries || 0}</div>
                <p className="text-xs text-muted-foreground">成功送达</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">总收入</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥{stats?.summary.revenue || 0}</div>
                <p className="text-xs text-muted-foreground">已完成订单</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>每日订单趋势</CardTitle>
              <CardDescription>订单数量变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="space-y-2">
                  {stats.dailyOrders.slice(-7).map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{day.date}</span>
                      <Badge variant="outline">{day.count}单</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}