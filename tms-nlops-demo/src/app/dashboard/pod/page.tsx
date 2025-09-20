"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// POD状态
const podStatusMap = {
  PENDING: { label: '待提交', color: 'bg-yellow-100 text-yellow-800' },
  SUBMITTED: { label: '已提交', color: 'bg-blue-100 text-blue-800' },
  VERIFIED: { label: '已验证', color: 'bg-green-100 text-green-800' },
  REJECTED: { label: '已拒绝', color: 'bg-red-100 text-red-800' },
  DISPUTED: { label: '争议中', color: 'bg-orange-100 text-orange-800' },
}

// POD类型
const podTypeMap = {
  SIGNATURE: { label: '签名', icon: '✍️' },
  PHOTO: { label: '照片', icon: '📷' },
  SEAL: { label: '封条', icon: '🔒' },
  QR_CODE: { label: '二维码', icon: '📱' },
  ELECTRONIC: { label: '电子', icon: '💻' },
}

// 模拟POD数据
const podRecords = [
  {
    id: 'POD001',
    orderId: 'O001',
    orderRef: 'ORD-2024-001',
    vehicleId: 'V001',
    vehiclePlate: '沪A12345',
    driverId: 'D001',
    driverName: '张三',
    customerId: 'C001',
    customerName: '上海华东商贸有限公司',
    deliveryDate: '2024-01-19',
    deliveryTime: '14:30',
    actualDeliveryTime: '2024-01-19 14:25',
    status: 'VERIFIED',
    podType: ['SIGNATURE', 'PHOTO'],
    receiverName: '李经理',
    receiverContact: '13800138001',
    receiverIdType: '身份证',
    receiverIdNumber: '310***********1234',
    deliveryLocation: '上海市浦东新区张江高科技园区',
    notes: '货物完好，客户满意',
    verificationNotes: '签名清晰，照片完整',
    verifiedBy: '王审核',
    verifiedAt: '2024-01-19 15:00',
    attachments: [
      { id: 'A001', type: 'PHOTO', url: '/api/files/pod/photo-001.jpg', name: '货物照片.jpg', size: '2.3MB', uploadedAt: '2024-01-19 14:28' },
      { id: 'A002', type: 'SIGNATURE', url: '/api/files/pod/sig-001.jpg', name: '签收单.jpg', size: '1.8MB', uploadedAt: '2024-01-19 14:30' },
    ],
    discrepancies: [],
    rating: 5,
    feedback: '服务很专业，准时送达',
  },
  {
    id: 'POD002',
    orderId: 'O002',
    orderRef: 'ORD-2024-002',
    vehicleId: 'V002',
    vehiclePlate: '粤B23456',
    driverId: 'D002',
    driverName: '李四',
    customerId: 'C002',
    customerName: '广州华南物流集团',
    deliveryDate: '2024-01-19',
    deliveryTime: '16:00',
    actualDeliveryTime: '2024-01-19 16:15',
    status: 'DISPUTED',
    podType: ['SIGNATURE', 'SEAL'],
    receiverName: '陈主管',
    receiverContact: '13900139001',
    receiverIdType: '工牌',
    receiverIdNumber: 'GZ2024****',
    deliveryLocation: '广州市天河区珠江新城',
    notes: '客户反映货物外包装有轻微破损',
    verificationNotes: '确实发现包装破损，已拍照记录',
    verifiedBy: '张审核',
    verifiedAt: '2024-01-19 17:00',
    attachments: [
      { id: 'A003', type: 'PHOTO', url: '/api/files/pod/photo-002.jpg', name: '货物照片.jpg', size: '3.1MB', uploadedAt: '2024-01-19 16:18' },
      { id: 'A004', type: 'SIGNATURE', url: '/api/files/pod/sig-002.jpg', name: '签收单.jpg', size: '2.0MB', uploadedAt: '2024-01-19 16:20' },
    ],
    discrepancies: [
      { type: 'PACKAGE_DAMAGE', description: '外包装破损', severity: 'MINOR', photos: ['A003'] },
    ],
    rating: 3,
    feedback: '包装需要加强，其他还好',
    disputeReason: '货物包装破损，要求赔偿',
    disputeStatus: 'UNDER_REVIEW',
    disputeRaisedAt: '2024-01-19 18:00',
  },
  {
    id: 'POD003',
    orderId: 'O003',
    orderRef: 'ORD-2024-003',
    vehicleId: 'V003',
    vehiclePlate: '京C34567',
    driverId: 'D003',
    driverName: '王五',
    customerId: 'C003',
    customerName: '北京北方供应链',
    deliveryDate: '2024-01-20',
    deliveryTime: '10:00',
    actualDeliveryTime: null,
    status: 'PENDING',
    podType: ['ELECTRONIC'],
    receiverName: '',
    receiverContact: '',
    receiverIdType: '',
    receiverIdNumber: '',
    deliveryLocation: '北京市朝阳区CBD',
    notes: '',
    verificationNotes: '',
    verifiedBy: '',
    verifiedAt: '',
    attachments: [],
    discrepancies: [],
    rating: 0,
    feedback: '',
  },
]

// 待处理的POD
const pendingPODs = podRecords.filter(pod => pod.status === 'PENDING')

// 争议中的POD
const disputedPODs = podRecords.filter(pod => pod.status === 'DISPUTED')

export default function PODPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPOD, setSelectedPOD] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // 筛选POD记录
  const filteredPODs = podRecords.filter(pod => {
    const matchesSearch =
      pod.orderRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pod.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'ALL' || pod.status === selectedStatus
    const matchesType = selectedType === 'ALL' || pod.podType.includes(selectedType)
    return matchesSearch && matchesStatus && matchesType
  })

  // 统计数据
  const getPODStats = () => {
    const total = podRecords.length
    const pending = podRecords.filter(p => p.status === 'PENDING').length
    const submitted = podRecords.filter(p => p.status === 'SUBMITTED').length
    const verified = podRecords.filter(p => p.status === 'VERIFIED').length
    const rejected = podRecords.filter(p => p.status === 'REJECTED').length
    const disputed = podRecords.filter(p => p.status === 'DISPUTED').length
    const avgRating = podRecords.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / podRecords.filter(p => p.rating > 0).length || 0

    return { total, pending, submitted, verified, rejected, disputed, avgRating: avgRating.toFixed(1) }
  }

  const stats = getPODStats()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">交付证明管理</h1>
          <p className="text-gray-600 mt-2">管理货物交付证明和客户签收</p>
        </div>
        <div className="flex gap-3">
          <Button>
            <span className="mr-2">📤</span>
            批量上传
          </Button>
          <Button variant="outline">
            <span className="mr-2">📋</span>
            模板下载
          </Button>
          <Button variant="outline">
            <span className="mr-2">📊</span>
            报表导出
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总POD数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待提交</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已提交</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已验证</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已拒绝</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">争议中</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.disputed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">平均评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">POD记录</TabsTrigger>
          <TabsTrigger value="pending">待处理</TabsTrigger>
          <TabsTrigger value="disputed">争议处理</TabsTrigger>
          <TabsTrigger value="templates">模板管理</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="搜索订单号、客户、车辆或司机..."
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
                  {Object.entries(podStatusMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="ALL">所有类型</option>
                  {Object.entries(podTypeMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.icon} {value.label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* POD列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交付信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POD类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收货人</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPODs.map((pod) => (
                    <tr key={pod.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <Link href={`/dashboard/orders/${pod.orderId}`} className="text-blue-600 hover:text-blue-800 font-medium">
                            {pod.orderRef}
                          </Link>
                          <div className="text-sm text-gray-600">{pod.customerName}</div>
                          <div className="text-sm text-gray-500">
                            {pod.vehiclePlate} | {pod.driverName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">计划: {pod.deliveryDate} {pod.deliveryTime}</div>
                          {pod.actualDeliveryTime && (
                            <div className="text-green-600">实际: {pod.actualDeliveryTime}</div>
                          )}
                          <div className="text-gray-500">{pod.deliveryLocation}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {pod.podType.map((type: string) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {podTypeMap[type as keyof typeof podTypeMap]?.icon} {podTypeMap[type as keyof typeof podTypeMap]?.label}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {pod.receiverName ? (
                            <>
                              <div className="font-medium">{pod.receiverName}</div>
                              <div className="text-gray-600">{pod.receiverContact}</div>
                            </>
                          ) : (
                            <span className="text-gray-500">未填写</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={podStatusMap[pod.status as keyof typeof podStatusMap].color}>
                          {podStatusMap[pod.status as keyof typeof podStatusMap].label}
                        </Badge>
                        {pod.rating > 0 && (
                          <div className="mt-1 text-sm">
                            {'⭐'.repeat(pod.rating)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPOD(pod)}
                          >
                            详情
                          </Button>
                          {pod.status === 'PENDING' && (
                            <Button size="sm">
                              上传POD
                            </Button>
                          )}
                          {pod.status === 'SUBMITTED' && (
                            <Button size="sm" variant="outline">
                              验证
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

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPODs.map((pod) => (
              <Card key={pod.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pod.orderRef}</span>
                    <Badge className="bg-yellow-100 text-yellow-800">待提交</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">客户:</span> {pod.customerName}</div>
                    <div><span className="text-gray-600">司机:</span> {pod.driverName}</div>
                    <div><span className="text-gray-600">车辆:</span> {pod.vehiclePlate}</div>
                    <div><span className="text-gray-600">交付时间:</span> {pod.deliveryDate} {pod.deliveryTime}</div>
                    <div><span className="text-gray-600">交付地点:</span> {pod.deliveryLocation}</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full" size="sm" onClick={() => {
                      setSelectedPOD(pod)
                      setShowUploadModal(true)
                    }}>
                      上传POD
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      联系司机
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pendingPODs.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                暂无待处理的POD
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="disputed" className="space-y-4">
          <div className="space-y-4">
            {disputedPODs.map((pod) => (
              <Card key={pod.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pod.orderRef} - 争议处理</span>
                    <Badge className="bg-orange-100 text-orange-800">争议中</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">争议信息</h4>
                      <div className="space-y-1 text-sm">
                        <div><span className="text-gray-600">争议原因:</span> {pod.disputeReason}</div>
                        <div><span className="text-gray-600">提出时间:</span> {pod.disputeRaisedAt}</div>
                        <div><span className="text-gray-600">处理状态:</span> {pod.disputeStatus === 'UNDER_REVIEW' ? '审核中' : pod.disputeStatus}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">异常情况</h4>
                      <div className="space-y-1">
                        {pod.discrepancies.map((disc: any, index: number) => (
                          <div key={index} className="text-sm">
                            <Badge className="bg-red-100 text-red-800 mr-2">{disc.type}</Badge>
                            <span>{disc.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">处理方案</h4>
                    <div className="flex gap-3">
                      <Button size="sm">接受赔偿</Button>
                      <Button size="sm" variant="outline">协商解决</Button>
                      <Button size="sm" variant="outline">拒绝赔偿</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {disputedPODs.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="text-gray-500">暂无争议中的POD</div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>POD模板管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">✍️</div>
                      <h3 className="font-semibold">签名模板</h3>
                      <p className="text-sm text-gray-600 mt-1">标准签收单模板</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full" size="sm">下载</Button>
                      <Button variant="outline" className="w-full" size="sm">预览</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <h3 className="font-semibold">照片模板</h3>
                      <p className="text-sm text-gray-600 mt-1">货物照片记录模板</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full" size="sm">下载</Button>
                      <Button variant="outline" className="w-full" size="sm">预览</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <h3 className="font-semibold">封条模板</h3>
                      <p className="text-sm text-gray-600 mt-1">封条号码记录模板</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full" size="sm">下载</Button>
                      <Button variant="outline" className="w-full" size="sm">预览</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* POD详情模态框 */}
      {selectedPOD && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">POD详情 - {selectedPOD.orderRef}</h3>
                <button
                  onClick={() => setSelectedPOD(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">POD编号:</span> {selectedPOD.id}</div>
                    <div><span className="text-gray-600">订单号:</span> {selectedPOD.orderRef}</div>
                    <div><span className="text-gray-600">客户:</span> {selectedPOD.customerName}</div>
                    <div><span className="text-gray-600">车辆:</span> {selectedPOD.vehiclePlate}</div>
                    <div><span className="text-gray-600">司机:</span> {selectedPOD.driverName}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">交付信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">计划交付:</span> {selectedPOD.deliveryDate} {selectedPOD.deliveryTime}</div>
                    {selectedPOD.actualDeliveryTime && (
                      <div><span className="text-gray-600">实际交付:</span> {selectedPOD.actualDeliveryTime}</div>
                    )}
                    <div><span className="text-gray-600">交付地点:</span> {selectedPOD.deliveryLocation}</div>
                    <div><span className="text-gray-600">状态:</span>
                      <Badge className={podStatusMap[selectedPOD.status as keyof typeof podStatusMap].color}>
                        {podStatusMap[selectedPOD.status as keyof typeof podStatusMap].label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedPOD.receiverName && (
                  <div>
                    <h4 className="font-semibold mb-3">收货人信息</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">姓名:</span> {selectedPOD.receiverName}</div>
                      <div><span className="text-gray-600">联系方式:</span> {selectedPOD.receiverContact}</div>
                      <div><span className="text-gray-600">证件类型:</span> {selectedPOD.receiverIdType}</div>
                      <div><span className="text-gray-600">证件号码:</span> {selectedPOD.receiverIdNumber}</div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">POD类型</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPOD.podType.map((type: string) => (
                      <Badge key={type} variant="outline">
                        {podTypeMap[type as keyof typeof podTypeMap]?.icon} {podTypeMap[type as keyof typeof podTypeMap]?.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedPOD.notes && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3">交付备注</h4>
                    <p className="text-sm text-gray-600">{selectedPOD.notes}</p>
                  </div>
                )}

                {selectedPOD.verificationNotes && (
                  <div>
                    <h4 className="font-semibold mb-3">验证备注</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">验证人:</span> {selectedPOD.verifiedBy}</div>
                      <div><span className="text-gray-600">验证时间:</span> {selectedPOD.verifiedAt}</div>
                      <div><span className="text-gray-600">验证意见:</span> {selectedPOD.verificationNotes}</div>
                    </div>
                  </div>
                )}

                {selectedPOD.rating > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">客户反馈</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">评分:</span> {'⭐'.repeat(selectedPOD.rating)}</div>
                      <div><span className="text-gray-600">反馈:</span> {selectedPOD.feedback}</div>
                    </div>
                  </div>
                )}

                {selectedPOD.attachments.length > 0 && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3">附件</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedPOD.attachments.map((attachment: any) => (
                        <div key={attachment.id} className="border rounded-lg p-3">
                          <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                            {attachment.type === 'PHOTO' && <span className="text-4xl">📷</span>}
                            {attachment.type === 'SIGNATURE' && <span className="text-4xl">✍️</span>}
                          </div>
                          <div className="text-sm font-medium truncate">{attachment.name}</div>
                          <div className="text-xs text-gray-500">{attachment.size}</div>
                          <div className="mt-2">
                            <Button size="sm" variant="outline" className="w-full">查看</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPOD.discrepancies.length > 0 && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-3 text-red-600">异常情况</h4>
                    <div className="space-y-2">
                      {selectedPOD.discrepancies.map((disc: any, index: number) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded">
                          <span className="text-red-600 mt-0.5">⚠️</span>
                          <div>
                            <div className="font-medium">{disc.type}</div>
                            <div className="text-sm text-gray-600">{disc.description}</div>
                            <div className="text-xs text-gray-500">严重程度: {disc.severity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                {selectedPOD.status === 'PENDING' && (
                  <Button onClick={() => setShowUploadModal(true)}>上传POD</Button>
                )}
                {selectedPOD.status === 'SUBMITTED' && (
                  <Button>验证POD</Button>
                )}
                <Button variant="outline" onClick={() => setSelectedPOD(null)}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 上传POD模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">上传POD</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">POD类型</label>
                  <div className="space-y-2">
                    {Object.entries(podTypeMap).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{value.icon} {value.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">上传文件</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-gray-600">点击或拖拽文件到此处</p>
                    <p className="text-xs text-gray-500 mt-1">支持 JPG、PNG、PDF 格式</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">收货人信息</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="收货人姓名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="联系电话"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
                  <textarea
                    placeholder="交付情况备注..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">提交</Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowUploadModal(false)}>
                    取消
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
