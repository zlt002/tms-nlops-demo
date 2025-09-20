'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: '仪表板', href: '/dashboard', icon: '📊' },
  { name: '订单管理', href: '/dashboard/orders', icon: '📦' },
  { name: '车辆调度', href: '/dashboard/vehicles', icon: '🚚' },
  { name: '实时跟踪', href: '/dashboard/tracking', icon: '📍' },
  { name: '回单管理', href: '/dashboard/receipts', icon: '📄' },
  { name: 'NL-Ops', href: '/dashboard/nlops', icon: '🤖' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50">
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-xl font-semibold">TMS NL-Ops</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
