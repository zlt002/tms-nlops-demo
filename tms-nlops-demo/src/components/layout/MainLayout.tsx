'use client'

import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="ml-64 mt-16 p-6 transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
