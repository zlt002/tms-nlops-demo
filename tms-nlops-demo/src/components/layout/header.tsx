'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Menu
} from 'lucide-react'

interface HeaderProps {
  className?: string
  onMenuClick?: () => void
}

export function Header({ className, onMenuClick }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-16 border-b bg-white z-40 shadow-sm',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">TMS NL-Ops</h1>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索订单、客户、车辆..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                A
              </div>
              <span className="hidden md:inline text-sm font-medium">管理员</span>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">管理员</p>
                  <p className="text-xs text-gray-500">admin@tms.com</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>账户设置</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>退出登录</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
