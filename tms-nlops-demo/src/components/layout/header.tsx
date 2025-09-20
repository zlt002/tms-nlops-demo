'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('flex h-16 items-center justify-between border-b bg-white px-6', className)}>
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">运输管理系统</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          帮助
        </Button>
        <Button variant="outline" size="sm">
          设置
        </Button>
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium">用户</span>
        </div>
      </div>
    </header>
  )
}