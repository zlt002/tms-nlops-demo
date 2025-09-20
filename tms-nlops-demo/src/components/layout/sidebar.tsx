'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: '仪表板', href: '/dashboard', icon: '📊' },
  { name: '订单管理', href: '/dashboard/orders', icon: '📦' },
  { name: '客户管理', href: '/dashboard/customers', icon: '👥' },
  { name: '车辆管理', href: '/dashboard/vehicles', icon: '🚚' },
  { name: '司机管理', href: '/dashboard/drivers', icon: '👨‍✈️' },
  { name: '调度管理', href: '/dashboard/dispatch', icon: '📋' },
  { name: '实时跟踪', href: '/dashboard/tracking', icon: '📍' },
  { name: '回单管理', href: '/dashboard/pod', icon: '📄' },
  { name: '文档管理', href: '/dashboard/documents', icon: '📁' },
  { name: 'NL-Ops', href: '/dashboard/nlops', icon: '🤖' },
  { name: '系统设置', href: '/dashboard/settings', icon: '⚙️' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      'fixed left-0 top-16 h-full bg-gray-50 border-r transition-all duration-300 z-30',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {navigation.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mb-1',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-100',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">管理员</p>
              <p className="text-xs text-gray-500">admin@tms.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
