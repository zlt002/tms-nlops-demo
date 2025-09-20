"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// 系统设置类型
const settingTypes = {
  GENERAL: { label: '通用设置', icon: '⚙️' },
  SECURITY: { label: '安全设置', icon: '🔒' },
  NOTIFICATION: { label: '通知设置', icon: '🔔' },
  INTEGRATION: { label: '集成设置', icon: '🔗' },
  BACKUP: { label: '备份设置', icon: '💾' },
  API: { label: 'API设置', icon: '📡' },
}

// 模拟系统配置
const systemConfig = {
  general: {
    siteName: 'TMS NL-Ops 演示系统',
    siteUrl: 'https://tms-demo.example.com',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: '24',
    defaultCurrency: 'CNY',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expireDays: 90,
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorAuth: true,
    ipWhitelist: ['192.168.1.*', '10.0.0.*'],
  },
  notifications: {
    email: {
      enabled: true,
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      username: 'noreply@example.com',
      password: '********',
      encryption: 'TLS',
    },
    sms: {
      enabled: false,
      provider: '阿里云短信',
      apiKey: '********',
      apiSecret: '********',
    },
    webhook: {
      enabled: true,
      url: 'https://api.example.com/webhook',
      secret: '********',
    },
    events: [
      { name: '新订单创建', email: true, sms: false, webhook: true },
      { name: '订单状态更新', email: true, sms: false, webhook: true },
      { name: '配送异常', email: true, sms: true, webhook: true },
      { name: '文档过期提醒', email: true, sms: false, webhook: false },
      { name: '系统告警', email: true, sms: true, webhook: true },
    ],
  },
  integrations: {
    map: {
      provider: '高德地图',
      apiKey: '********',
      enabled: true,
    },
    weather: {
      provider: '和风天气',
      apiKey: '********',
      enabled: true,
    },
    payment: {
      provider: '支付宝',
      appId: '********',
      privateKey: '********',
      publicKey: '********',
      enabled: true,
    },
    thirdPartyLogistics: [
      {
        name: '顺丰速运',
        enabled: true,
        apiKey: '********',
        endpoints: {
          query: 'https://api.sf-express.com/query',
          create: 'https://api.sf-express.com/create',
        },
      },
      {
        name: '京东物流',
        enabled: false,
        apiKey: '********',
        endpoints: {
          query: 'https://api.jdwl.com/query',
          create: 'https://api.jdwl.com/create',
        },
      },
    ],
  },
  backup: {
    schedule: '0 2 * * *', // 每天凌晨2点
    retention: 30, // 保留30天
    location: 's3://tms-backup/',
    compression: true,
    encryption: true,
    lastBackup: '2024-01-20 02:00:00',
    status: 'SUCCESS',
    size: '2.3GB',
  },
  api: {
    rateLimit: {
      enabled: true,
      requests: 1000,
      per: 'hour',
    },
    cors: {
      enabled: true,
      origins: ['http://localhost:3000', 'https://tms-demo.example.com'],
    },
    keys: [
      {
        name: 'Web前端',
        key: 'pk_live_********',
        secret: 'sk_live_********',
        permissions: ['read', 'write'],
        expires: null,
      },
      {
        name: '移动端APP',
        key: 'pk_live_********',
        secret: 'sk_live_********',
        permissions: ['read'],
        expires: '2024-12-31',
      },
    ],
  },
}

// 用户权限角色
const userRoles = [
  {
    id: 'ADMIN',
    name: '系统管理员',
    description: '拥有所有权限',
    permissions: ['*'],
    userCount: 2,
    color: 'bg-red-100 text-red-800',
  },
  {
    id: 'MANAGER',
    name: '管理员',
    description: '管理部门业务',
    permissions: ['order:read', 'order:write', 'user:read', 'report:read'],
    userCount: 5,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'OPERATOR',
    name: '操作员',
    description: '日常业务操作',
    permissions: ['order:read', 'order:write', 'vehicle:read'],
    userCount: 12,
    color: 'bg-green-100 text-green-800',
  },
  {
    id: 'VIEWER',
    name: '查看者',
    description: '只读权限',
    permissions: ['order:read', 'report:read'],
    userCount: 8,
    color: 'bg-gray-100 text-gray-800',
  },
]

// 系统日志
const systemLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 15:30:25',
    level: 'INFO',
    module: 'AUTH',
    message: '用户 张经理 登录系统',
    user: '张经理',
    ip: '192.168.1.100',
  },
  {
    id: 2,
    timestamp: '2024-01-20 15:28:12',
    level: 'WARNING',
    module: 'API',
    message: 'API请求频率超限',
    user: 'system',
    ip: '192.168.1.50',
  },
  {
    id: 3,
    timestamp: '2024-01-20 15:25:45',
    level: 'ERROR',
    module: 'DATABASE',
    message: '数据库连接超时',
    user: 'system',
    ip: 'localhost',
  },
  {
    id: 4,
    timestamp: '2024-01-20 15:20:33',
    level: 'INFO',
    module: 'ORDER',
    message: '创建新订单 ORD-2024-001',
    user: '李主管',
    ip: '192.168.1.101',
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)

  // 模拟保存设置
  const handleSave = () => {
    // 这里应该调用API保存设置
    alert('设置已保存')
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-600 mt-2">配置系统参数、安全设置和集成选项</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <Button onClick={handleSave}>
              <span className="mr-2">💾</span>
              保存更改
            </Button>
          )}
          <Button variant="outline">
            <span className="mr-2">🔄</span>
            重置
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">通用设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notification">通知设置</TabsTrigger>
          <TabsTrigger value="integration">集成设置</TabsTrigger>
          <TabsTrigger value="backup">备份设置</TabsTrigger>
          <TabsTrigger value="api">API设置</TabsTrigger>
          <TabsTrigger value="users">用户权限</TabsTrigger>
          <TabsTrigger value="logs">系统日志</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>基础信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">系统名称</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.siteName}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">系统URL</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.siteUrl}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">时区</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.timezone}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                    <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
                    <option value="America/New_York">纽约时间 (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">语言</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.language}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日期格式</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.dateFormat}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">时间格式</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.timeFormat}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="24">24小时制</option>
                    <option value="12">12小时制</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">默认货币</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.general.defaultCurrency}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="CNY">人民币 (¥)</option>
                    <option value="USD">美元 ($)</option>
                    <option value="EUR">欧元 (€)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>品牌设置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-2xl">🚛</span>
                    </div>
                    <Button size="sm" variant="outline">更换Logo</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">网站图标</label>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-lg">📄</span>
                    </div>
                    <Button size="sm" variant="outline">更换图标</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>密码策略</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">最小长度</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.security.passwordPolicy.minLength}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密码过期天数</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.security.passwordPolicy.expireDays}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.security.passwordPolicy.requireUppercase}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">要求包含大写字母</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.security.passwordPolicy.requireLowercase}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">要求包含小写字母</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.security.passwordPolicy.requireNumbers}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">要求包含数字</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.security.passwordPolicy.requireSpecialChars}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">要求包含特殊字符</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>登录设置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">会话超时（分钟）</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.security.sessionTimeout}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">最大登录尝试次数</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.security.maxLoginAttempts}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">锁定时长（分钟）</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.security.lockoutDuration}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.security.twoFactorAuth}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm font-medium">启用双因素认证</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>IP白名单</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemConfig.security.ipWhitelist.map((ip, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      value={ip}
                      onChange={(e) => setHasChanges(true)}
                    />
                    <Button size="sm" variant="outline">删除</Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="mt-2">
                  添加IP地址
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>邮件设置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={systemConfig.notifications.email.enabled}
                      onChange={(e) => setHasChanges(true)}
                    />
                    <span className="text-sm font-medium">启用邮件通知</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SMTP服务器</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.notifications.email.smtpHost}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SMTP端口</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.notifications.email.smtpPort}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.notifications.email.username}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">加密方式</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.notifications.email.encryption}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="TLS">TLS</option>
                    <option value="SSL">SSL</option>
                    <option value="NONE">无</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>事件通知配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">事件类型</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">邮件</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">短信</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Webhook</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {systemConfig.notifications.events.map((event, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm">{event.name}</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={event.email}
                            onChange={(e) => setHasChanges(true)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={event.sms}
                            onChange={(e) => setHasChanges(true)}
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={event.webhook}
                            onChange={(e) => setHasChanges(true)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>地图服务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">服务提供商</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.integrations.map.provider}
                    onChange={(e) => setHasChanges(true)}
                  >
                    <option value="高德地图">高德地图</option>
                    <option value="百度地图">百度地图</option>
                    <option value="谷歌地图">谷歌地图</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.integrations.map.apiKey}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.integrations.map.enabled}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm font-medium">启用地图服务</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>第三方物流集成</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemConfig.integrations.thirdPartyLogistics.map((tpl, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={tpl.enabled}
                          onChange={(e) => setHasChanges(true)}
                        />
                        <span className="font-medium">{tpl.name}</span>
                      </div>
                      <Button size="sm" variant="outline">配置</Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>API Key: {tpl.apiKey}</div>
                      <div>状态: {tpl.enabled ? '已启用' : '已禁用'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>备份配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">备份计划 (Cron)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.backup.schedule}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <div className="text-xs text-gray-500 mt-1">格式: 分 时 日 月 周</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">保留天数</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.backup.retention}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">备份位置</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={systemConfig.backup.location}
                    onChange={(e) => setHasChanges(true)}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.backup.compression}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">启用压缩</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={systemConfig.backup.encryption}
                    onChange={(e) => setHasChanges(true)}
                  />
                  <span className="text-sm">启用加密</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>备份状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">成功</div>
                  <div className="text-sm text-gray-500">上次备份状态</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{systemConfig.backup.lastBackup}</div>
                  <div className="text-sm text-gray-500">上次备份时间</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{systemConfig.backup.size}</div>
                  <div className="text-sm text-gray-500">备份大小</div>
                </div>
                <div className="text-center">
                  <Button size="sm">立即备份</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>访问控制</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={systemConfig.api.rateLimit.enabled}
                      onChange={(e) => setHasChanges(true)}
                    />
                    <span className="text-sm font-medium">启用速率限制</span>
                  </label>
                  {systemConfig.api.rateLimit.enabled && (
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">请求数量</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={systemConfig.api.rateLimit.requests}
                          onChange={(e) => setHasChanges(true)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">时间单位</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          value={systemConfig.api.rateLimit.per}
                          onChange={(e) => setHasChanges(true)}
                        >
                          <option value="minute">每分钟</option>
                          <option value="hour">每小时</option>
                          <option value="day">每天</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={systemConfig.api.cors.enabled}
                      onChange={(e) => setHasChanges(true)}
                    />
                    <span className="text-sm font-medium">启用CORS</span>
                  </label>
                  {systemConfig.api.cors.enabled && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">允许的源</label>
                      <div className="space-y-1">
                        {systemConfig.api.cors.origins.map((origin, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                              value={origin}
                              onChange={(e) => setHasChanges(true)}
                            />
                            <Button size="sm" variant="outline">删除</Button>
                          </div>
                        ))}
                        <Button size="sm" variant="outline">添加源</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API密钥</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemConfig.api.keys.map((key, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{key.name}</div>
                        <div className="text-sm text-gray-500">
                          权限: {key.permissions.join(', ')}
                          {key.expires && ` | 过期时间: ${key.expires}`}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">编辑</Button>
                        <Button size="sm" variant="outline">删除</Button>
                      </div>
                    </div>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                      Key: {key.key}
                    </div>
                  </div>
                ))}
                <Button>
                  <span className="mr-2">➕</span>
                  创建新密钥
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <Badge className={role.color}>{role.name}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">{role.description}</div>
                    <div className="flex justify-between">
                      <span>用户数:</span>
                      <span className="font-medium">{role.userCount}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1">
                    <Button size="sm" variant="outline" className="w-full">
                      编辑权限
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      查看用户
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>权限矩阵</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">功能模块</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">管理员</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">操作员</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">查看者</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { module: '订单管理', admin: '读写', operator: '读写', viewer: '只读' },
                      { module: '车辆管理', admin: '读写', operator: '只读', viewer: '只读' },
                      { module: '司机管理', admin: '读写', operator: '只读', viewer: '只读' },
                      { module: '客户管理', admin: '读写', operator: '读写', viewer: '只读' },
                      { module: '财务管理', admin: '读写', operator: '无', viewer: '无' },
                      { module: '系统设置', admin: '读写', operator: '无', viewer: '无' },
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm font-medium">{row.module}</td>
                        <td className="px-4 py-3 text-sm text-center">
                          <Badge className={row.admin === '读写' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {row.admin}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <Badge className={
                            row.operator === '读写' ? 'bg-green-100 text-green-800' :
                            row.operator === '只读' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {row.operator}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <Badge className={
                            row.viewer === '读写' ? 'bg-green-100 text-green-800' :
                            row.viewer === '只读' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {row.viewer}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>系统日志</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-full rounded-full ${
                      log.level === 'ERROR' ? 'bg-red-500' :
                      log.level === 'WARNING' ? 'bg-yellow-500' :
                      log.level === 'INFO' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{log.message}</div>
                        <div className="text-xs text-gray-500">{log.timestamp}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        模块: {log.module} | 用户: {log.user} | IP: {log.ip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
