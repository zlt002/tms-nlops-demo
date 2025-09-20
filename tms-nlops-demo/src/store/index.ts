import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// 用户状态
interface UserState {
  user: any | null
  isAuthenticated: boolean
  setUser: (user: any) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false })
      }),
      {
        name: 'user-storage'
      }
    )
  )
)

// 应用状态
interface AppState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  notifications: any[]
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
    })
  )
)