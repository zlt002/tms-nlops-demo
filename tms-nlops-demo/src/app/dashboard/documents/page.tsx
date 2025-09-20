"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 文档类型
const documentTypeMap = {
  CONTRACT: { label: '合同', icon: '📄', color: 'bg-blue-100 text-blue-800' },
  INVOICE: { label: '发票', icon: '🧾', color: 'bg-green-100 text-green-800' },
  RECEIPT: { label: '收据', icon: '📃', color: 'bg-yellow-100 text-yellow-800' },
  LICENSE: { label: '证照', icon: '🪪', color: 'bg-purple-100 text-purple-800' },
  CERTIFICATE: { label: '证书', icon: '📜', color: 'bg-indigo-100 text-indigo-800' },
  PERMIT: { label: '许可证', icon: '📋', color: 'bg-pink-100 text-pink-800' },
  INSURANCE: { label: '保险', icon: '🛡️', color: 'bg-orange-100 text-orange-800' },
  REPORT: { label: '报告', icon: '📊', color: 'bg-teal-100 text-teal-800' },
  OTHER: { label: '其他', icon: '📁', color: 'bg-gray-100 text-gray-800' },
}

// 文档状态
const documentStatusMap = {
  DRAFT: { label: '草稿', color: 'bg-gray-100 text-gray-800' },
  PENDING: { label: '待审核', color: 'bg-yellow-100 text-yellow-800' },
  APPROVED: { label: '已批准', color: 'bg-green-100 text-green-800' },
  REJECTED: { label: '已拒绝', color: 'bg-red-100 text-red-800' },
  EXPIRED: { label: '已过期', color: 'bg-orange-100 text-orange-800' },
  ARCHIVED: { label: '已归档', color: 'bg-gray-100 text-gray-800' },
}

// 文档分类
const documentCategories = [
  { id: 'legal', name: '法律文件', icon: '⚖️' },
  { id: 'finance', name: '财务文件', icon: '💰' },
  { id: 'vehicle', name: '车辆文件', icon: '🚛' },
  { id: 'driver', name: '司机文件', icon: '👤' },
  { id: 'safety', name: '安全文件', icon: '🛡️' },
  { id: 'operation', name: '运营文件', icon: '📋' },
  { id: 'compliance', name: '合规文件', icon: '✅' },
]

// 模拟文档数据
const documents = [
  {
    id: 'DOC001',
    name: '货物运输合同_上海华东商贸_2024',
    type: 'CONTRACT',
    category: 'legal',
    status: 'APPROVED',
    relatedEntity: { type: 'CUSTOMER', id: 'C001', name: '上海华东商贸有限公司' },
    uploadedBy: '张经理',
    uploadedAt: '2024-01-01 10:00',
    fileSize: '2.5MB',
    fileFormat: 'PDF',
    version: '1.0',
    expiryDate: '2024-12-31',
    tags: ['合同', '2024', '上海华东商贸'],
    description: '与上海华东商贸有限公司签订的年度货物运输合同',
    approvalWorkflow: [
      { step: 1, role: 'LEGAL', user: '法务部', status: 'APPROVED', time: '2024-01-01 14:00', comments: '合同条款审核通过' },
      { step: 2, role: 'FINANCE', user: '财务部', status: 'APPROVED', time: '2024-01-01 15:30', comments: '价格条款确认' },
      { step: 3, role: 'MANAGEMENT', user: '总经理', status: 'APPROVED', time: '2024-01-02 09:00', comments: '批准执行' },
    ],
    accessControl: {
      view: ['ADMIN', 'MANAGER', 'LEGAL', 'FINANCE'],
      edit: ['ADMIN', 'LEGAL'],
      delete: ['ADMIN'],
    },
  },
  {
    id: 'DOC002',
    name: '车辆行驶证_沪A12345',
    type: 'LICENSE',
    category: 'vehicle',
    status: 'APPROVED',
    relatedEntity: { type: 'VEHICLE', id: 'V001', name: '沪A12345 (重型卡车)' },
    uploadedBy: '李管理员',
    uploadedAt: '2024-01-05 14:30',
    fileSize: '850KB',
    fileFormat: 'JPG',
    version: '1.0',
    expiryDate: '2024-12-31',
    tags: ['行驶证', '沪A12345', '车辆'],
    description: '车辆沪A12345的行驶证扫描件',
    approvalWorkflow: [
      { step: 1, role: 'ADMIN', user: '管理员', status: 'APPROVED', time: '2024-01-05 15:00', comments: '证件验证通过' },
    ],
    accessControl: {
      view: ['ADMIN', 'MANAGER', 'OPERATOR'],
      edit: ['ADMIN'],
      delete: ['ADMIN'],
    },
  },
  {
    id: 'DOC003',
    name: '司机驾驶证_张三',
    type: 'LICENSE',
    category: 'driver',
    status: 'EXPIRED',
    relatedEntity: { type: 'DRIVER', id: 'D001', name: '张三' },
    uploadedBy: '王管理员',
    uploadedAt: '2023-06-10 09:15',
    fileSize: '680KB',
    fileFormat: 'JPG',
    version: '1.0',
    expiryDate: '2024-01-15',
    tags: ['驾驶证', '张三', '司机'],
    description: '司机张三的驾驶证扫描件',
    approvalWorkflow: [
      { step: 1, role: 'ADMIN', user: '管理员', status: 'APPROVED', time: '2023-06-10 10:00', comments: '证件验证通过' },
    ],
    accessControl: {
      view: ['ADMIN', 'MANAGER', 'OPERATOR'],
      edit: ['ADMIN'],
      delete: ['ADMIN'],
    },
  },
  {
    id: 'DOC004',
    name: '道路运输经营许可证',
    type: 'PERMIT',
    category: 'compliance',
    status: 'APPROVED',
    relatedEntity: { type: 'COMPANY', id: 'COMP001', name: 'TMS物流有限公司' },
    uploadedBy: '赵合规专员',
    uploadedAt: '2024-01-10 16:45',
    fileSize: '1.2MB',
    fileFormat: 'PDF',
    version: '1.0',
    expiryDate: '2025-01-10',
    tags: ['许可证', '经营', '公司'],
    description: '公司道路运输经营许可证',
    approvalWorkflow: [
      { step: 1, role: 'COMPLIANCE', user: '合规部', status: 'APPROVED', time: '2024-01-10 17:30', comments: '许可证有效' },
      { step: 2, role: 'MANAGEMENT', user: '总经理', status: 'APPROVED', time: '2024-01-11 09:00', comments: '确认归档' },
    ],
    accessControl: {
      view: ['ALL'],
      edit: ['ADMIN', 'COMPLIANCE'],
      delete: ['ADMIN'],
    },
  },
  {
    id: 'DOC005',
    name: '车辆保险单_2024年度',
    type: 'INSURANCE',
    category: 'vehicle',
    status: 'PENDING',
    relatedEntity: { type: 'COMPANY', id: 'COMP001', name: 'TMS物流有限公司' },
    uploadedBy: '孙财务',
    uploadedAt: '2024-01-18 11:20',
    fileSize: '3.5MB',
    fileFormat: 'PDF',
    version: '1.0',
    expiryDate: '2025-01-18',
    tags: ['保险', '车辆', '2024'],
    description: '2024年度车辆综合保险单',
    approvalWorkflow: [
      { step: 1, role: 'FINANCE', user: '财务部', status: 'APPROVED', time: '2024-01-18 14:00', comments: '保费已支付确认' },
      { step: 2, role: 'MANAGEMENT', user: '总经理', status: 'PENDING', time: null, comments: null },
    ],
    accessControl: {
      view: ['ADMIN', 'MANAGER', 'FINANCE'],
      edit: ['ADMIN', 'FINANCE'],
      delete: ['ADMIN'],
    },
  },
  {
    id: 'DOC006',
    name: '安全生产责任书',
    type: 'CONTRACT',
    category: 'safety',
    status: 'DRAFT',
    relatedEntity: { type: 'COMPANY', id: 'COMP001', name: 'TMS物流有限公司' },
    uploadedBy: '周安全主管',
    uploadedAt: '2024-01-19 15:30',
    fileSize: '890KB',
    fileFormat: 'DOCX',
    version: '0.1',
    expiryDate: null,
    tags: ['安全', '责任书', '内部'],
    description: '2024年度安全生产责任书草案',
    approvalWorkflow: [],
    accessControl: {
      view: ['ADMIN', 'MANAGER', 'SAFETY'],
      edit: ['ADMIN', 'SAFETY'],
      delete: ['ADMIN', 'SAFETY'],
    },
  },
]

// 即将过期的文档
const expiringDocuments = documents.filter(doc =>
  doc.expiryDate &&
  new Date(doc.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
  doc.status !== 'EXPIRED'
)

// 待审核的文档
const pendingDocuments = documents.filter(doc => doc.status === 'PENDING')

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // 筛选文档
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.relatedEntity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'ALL' || doc.category === selectedCategory
    const matchesType = selectedType === 'ALL' || doc.type === selectedType
    const matchesStatus = selectedStatus === 'ALL' || doc.status === selectedStatus
    return matchesSearch && matchesCategory && matchesType && matchesStatus
  })

  // 统计数据
  const getDocumentStats = () => {
    const total = documents.length
    const draft = documents.filter(d => d.status === 'DRAFT').length
    const pending = documents.filter(d => d.status === 'PENDING').length
    const approved = documents.filter(d => d.status === 'APPROVED').length
    const expired = documents.filter(d => d.status === 'EXPIRED').length
    const expiringSoon = expiringDocuments.length
    const totalSize = documents.reduce((sum, doc) => {
      const size = parseFloat(doc.fileSize)
      return sum + (isNaN(size) ? 0 : size)
    }, 0)

    return { total, draft, pending, approved, expired, expiringSoon, totalSize: totalSize.toFixed(1) }
  }

  const stats = getDocumentStats()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">文档管理</h1>
          <p className="text-gray-600 mt-2">管理公司各类证照、合同和文件</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowUploadModal(true)}>
            <span className="mr-2">📤</span>
            上传文档
          </Button>
          <Button variant="outline">
            <span className="mr-2">📂</span>
            批量导入
          </Button>
          <Button variant="outline">
            <span className="mr-2">🗂️</span>
            归档管理
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总文档数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">草稿</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">待审核</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已批准</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">已过期</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">即将过期</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">总大小</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSize}MB</div>
          </CardContent>
        </Card>
      </div>

      {/* 即将过期和待审核提醒 */}
      {(expiringDocuments.length > 0 || pendingDocuments.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expiringDocuments.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <span>⚠️</span>
                  即将过期的文档
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {expiringDocuments.slice(0, 3).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1 truncate">{doc.name}</div>
                      <div className="text-orange-600 ml-2">{doc.expiryDate}</div>
                    </div>
                  ))}
                  {expiringDocuments.length > 3 && (
                    <div className="text-xs text-orange-600">
                      还有 {expiringDocuments.length - 3} 个文档即将过期
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          {pendingDocuments.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <span>📋</span>
                  待审核的文档
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pendingDocuments.slice(0, 3).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1 truncate">{doc.name}</div>
                      <div className="text-yellow-600 ml-2">{doc.uploadedAt}</div>
                    </div>
                  ))}
                  {pendingDocuments.length > 3 && (
                    <div className="text-xs text-yellow-600">
                      还有 {pendingDocuments.length - 3} 个文档待审核
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">文档列表</TabsTrigger>
          <TabsTrigger value="categories">分类管理</TabsTrigger>
          <TabsTrigger value="approval">审批流程</TabsTrigger>
          <TabsTrigger value="retention">保留策略</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="搜索文档名称、描述、关联实体或标签..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="ALL">所有分类</option>
                  {documentCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="ALL">所有类型</option>
                  {Object.entries(documentTypeMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.icon} {value.label}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="ALL">所有状态</option>
                  {Object.entries(documentStatusMap).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 文档列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文档信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联实体</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有效期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{documentTypeMap[doc.type as keyof typeof documentTypeMap]?.icon}</div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-600">{doc.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={documentTypeMap[doc.type as keyof typeof documentTypeMap]?.color}>
                                {documentTypeMap[doc.type as keyof typeof documentTypeMap]?.label}
                              </Badge>
                              <span className="text-xs text-gray-500">{doc.fileFormat} · {doc.fileSize}</span>
                              {doc.version !== '1.0' && (
                                <Badge variant="outline" className="text-xs">v{doc.version}</Badge>
                              )}
                            </div>
                            {doc.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {doc.tags.slice(0, 3).map((tag: string) => (
                                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                                {doc.tags.length > 3 && (
                                  <span className="text-xs text-gray-500">+{doc.tags.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{doc.relatedEntity.name}</div>
                          <div className="text-gray-500">
                            {doc.relatedEntity.type === 'CUSTOMER' && '客户'}
                            {doc.relatedEntity.type === 'VEHICLE' && '车辆'}
                            {doc.relatedEntity.type === 'DRIVER' && '司机'}
                            {doc.relatedEntity.type === 'COMPANY' && '公司'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{doc.uploadedBy}</div>
                          <div className="text-gray-500">{doc.uploadedAt}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {doc.expiryDate ? (
                            <>
                              <div className={doc.status === 'EXPIRED' ? 'text-red-600' : ''}>
                                {doc.expiryDate}
                              </div>
                              {doc.status === 'EXPIRED' && (
                                <div className="text-red-500 text-xs">已过期</div>
                              )}
                              {doc.status !== 'EXPIRED' && new Date(doc.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                <div className="text-orange-500 text-xs">即将过期</div>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-500">永久有效</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={documentStatusMap[doc.status as keyof typeof documentStatusMap].color}>
                          {documentStatusMap[doc.status as keyof typeof documentStatusMap].label}
                        </Badge>
                        {doc.approvalWorkflow.length > 0 && doc.approvalWorkflow[doc.approvalWorkflow.length - 1].status === 'PENDING' && (
                          <div className="text-xs text-yellow-600 mt-1">
                            等待 {doc.approvalWorkflow[doc.approvalWorkflow.length - 1].role} 审批
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            查看
                          </Button>
                          {doc.status === 'DRAFT' && (
                            <Button size="sm" variant="outline">
                              编辑
                            </Button>
                          )}
                          {doc.status === 'PENDING' && (
                            <Button size="sm">
                              审核
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            下载
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

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documentCategories.map(category => {
              const categoryDocs = documents.filter(doc => doc.category === category.id)
              return (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl">{category.icon}</div>
                      <h3 className="font-semibold mt-2">{category.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">文档数量:</span>
                        <span className="font-medium">{categoryDocs.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">已批准:</span>
                        <span className="text-green-600">
                          {categoryDocs.filter(d => d.status === 'APPROVED').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">待审核:</span>
                        <span className="text-yellow-600">
                          {categoryDocs.filter(d => d.status === 'PENDING').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">已过期:</span>
                        <span className="text-red-600">
                          {categoryDocs.filter(d => d.status === 'EXPIRED').length}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" size="sm" variant="outline">
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>审批流程配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: '合同', workflow: ['法务部', '财务部', '总经理'] },
                  { type: '财务', workflow: ['财务部', '总经理'] },
                  { type: '人事', workflow: ['人事部', '总经理'] },
                  { type: '车辆证照', workflow: ['管理员'] },
                  { type: '合规文件', workflow: ['合规部', '总经理'] },
                ].map((config, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{config.type}文档</div>
                      <div className="text-sm text-gray-600">
                        审批流程: {config.workflow.join(' → ')}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">编辑</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>文档保留策略</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: '合同', retention: '10年', action: '永久归档' },
                  { type: '财务文件', retention: '7年', action: '销毁' },
                  { type: '人事文件', retention: '离职后5年', action: '销毁' },
                  { type: '车辆证照', retention: '车辆报废后3年', action: '销毁' },
                  { type: '合规文件', retention: '永久', action: '永久归档' },
                ].map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{policy.type}</div>
                      <div className="text-sm text-gray-600">
                        保留期限: {policy.retention}
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-blue-100 text-blue-800 mr-2">
                        {policy.action}
                      </Badge>
                      <Button size="sm" variant="outline">编辑</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 文档详情模态框 */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span>{documentTypeMap[selectedDocument.type as keyof typeof documentTypeMap]?.icon}</span>
                  {selectedDocument.name}
                </h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">基本信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">文档ID:</span> {selectedDocument.id}</div>
                    <div><span className="text-gray-600">类型:</span>
                      <Badge className={documentTypeMap[selectedDocument.type as keyof typeof documentTypeMap]?.color}>
                        {documentTypeMap[selectedDocument.type as keyof typeof documentTypeMap]?.label}
                      </Badge>
                    </div>
                    <div><span className="text-gray-600">分类:</span>
                      {documentCategories.find(c => c.id === selectedDocument.category)?.icon}{' '}
                      {documentCategories.find(c => c.id === selectedDocument.category)?.name}
                    </div>
                    <div><span className="text-gray-600">状态:</span>
                      <Badge className={documentStatusMap[selectedDocument.status as keyof typeof documentStatusMap].color}>
                        {documentStatusMap[selectedDocument.status as keyof typeof documentStatusMap].label}
                      </Badge>
                    </div>
                    <div><span className="text-gray-600">版本:</span> {selectedDocument.version}</div>
                    <div><span className="text-gray-600">格式:</span> {selectedDocument.fileFormat}</div>
                    <div><span className="text-gray-600">大小:</span> {selectedDocument.fileSize}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">关联信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">关联类型:</span>
                      {selectedDocument.relatedEntity.type === 'CUSTOMER' && '客户'}
                      {selectedDocument.relatedEntity.type === 'VEHICLE' && '车辆'}
                      {selectedDocument.relatedEntity.type === 'DRIVER' && '司机'}
                      {selectedDocument.relatedEntity.type === 'COMPANY' && '公司'}
                    </div>
                    <div><span className="text-gray-600">关联实体:</span> {selectedDocument.relatedEntity.name}</div>
                    {selectedDocument.expiryDate && (
                      <>
                        <div><span className="text-gray-600">有效期至:</span> {selectedDocument.expiryDate}</div>
                        {selectedDocument.status === 'EXPIRED' && (
                          <div className="text-red-600">已过期</div>
                        )}
                        {selectedDocument.status !== 'EXPIRED' && new Date(selectedDocument.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                          <div className="text-orange-600">即将过期</div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">上传信息</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">上传人:</span> {selectedDocument.uploadedBy}</div>
                    <div><span className="text-gray-600">上传时间:</span> {selectedDocument.uploadedAt}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">标签</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDocument.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">描述</h4>
                  <p className="text-sm text-gray-600">{selectedDocument.description}</p>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">审批流程</h4>
                  <div className="space-y-2">
                    {selectedDocument.approvalWorkflow.length > 0 ? (
                      selectedDocument.approvalWorkflow.map((step: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            step.status === 'APPROVED' ? 'bg-green-500' :
                            step.status === 'REJECTED' ? 'bg-red-500' : 'bg-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{step.user} ({step.role})</span>
                              <Badge className={
                                step.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                step.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                              }>
                                {step.status === 'APPROVED' ? '已批准' :
                                 step.status === 'REJECTED' ? '已拒绝' : '待处理'}
                              </Badge>
                            </div>
                            {step.time && (
                              <div className="text-xs text-gray-500">{step.time}</div>
                            )}
                            {step.comments && (
                              <div className="text-sm text-gray-600 mt-1">{step.comments}</div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        该文档无需审批流程
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-3">权限控制</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-600 mb-2">查看权限</div>
                      <div className="space-y-1">
                        {selectedDocument.accessControl.view.map((role: string) => (
                          <div key={role} className="text-gray-700">● {role}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600 mb-2">编辑权限</div>
                      <div className="space-y-1">
                        {selectedDocument.accessControl.edit.map((role: string) => (
                          <div key={role} className="text-gray-700">● {role}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-600 mb-2">删除权限</div>
                      <div className="space-y-1">
                        {selectedDocument.accessControl.delete.map((role: string) => (
                          <div key={role} className="text-gray-700">● {role}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button>下载文档</Button>
                {selectedDocument.status === 'PENDING' && (
                  <Button>开始审批</Button>
                )}
                {selectedDocument.status === 'DRAFT' && (
                  <Button variant="outline">编辑文档</Button>
                )}
                {selectedDocument.status === 'APPROVED' && (
                  <Button variant="outline">提交审核</Button>
                )}
                <Button variant="outline">查看历史版本</Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  关闭
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 上传文档模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">上传文档</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择文件</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-gray-600">点击或拖拽文件到此处</p>
                    <p className="text-xs text-gray-500 mt-1">支持 PDF、DOC、DOCX、JPG、PNG 格式，最大 50MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文档类型</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      {Object.entries(documentTypeMap).map(([key, value]) => (
                        <option key={key} value={key}>{value.icon} {value.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">文档分类</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      {documentCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">关联实体</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">选择关联实体...</option>
                    <option value="CUSTOMER">客户</option>
                    <option value="VEHICLE">车辆</option>
                    <option value="DRIVER">司机</option>
                    <option value="COMPANY">公司</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">文档名称</label>
                  <input
                    type="text"
                    placeholder="输入文档名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                  <textarea
                    placeholder="输入文档描述..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                  <input
                    type="text"
                    placeholder="输入标签，用逗号分隔"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">有效期（可选）</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">上传</Button>
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
