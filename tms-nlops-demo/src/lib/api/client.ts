import axios from 'axios'
import { useUserStore } from '@/store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 从store获取token
    const userStore = useUserStore.getState()
    if (userStore.user?.token) {
      config.headers.Authorization = `Bearer ${userStore.user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，清除用户状态
      useUserStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 类型化API函数
export const api = {
  // 订单相关
  orders: {
    list: (params?: any) => apiClient.get('/orders', { params }),
    create: (data: any) => apiClient.post('/orders', data),
    update: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),
    delete: (id: string) => apiClient.delete(`/orders/${id}`),
    get: (id: string) => apiClient.get(`/orders/${id}`),
    track: (id: string) => apiClient.get(`/orders/${id}/track`)
  },

  // 车辆相关
  vehicles: {
    list: (params?: any) => apiClient.get('/vehicles', { params }),
    create: (data: any) => apiClient.post('/vehicles', data),
    update: (id: string, data: any) => apiClient.post(`/vehicles/${id}`, data),
    delete: (id: string) => apiClient.delete(`/vehicles/${id}`),
    get: (id: string) => apiClient.get(`/vehicles/${id}`)
  },

  // NL-Ops相关
  nlops: {
    command: (command: string) => apiClient.post('/nlops/command', { command }),
    history: (params?: any) => apiClient.get('/nlops/history', { params }),
    intents: () => apiClient.get('/nlops/intents')
  },

  // 认证相关
  auth: {
    login: (credentials: any) => apiClient.post('/auth/login', credentials),
    logout: () => apiClient.post('/auth/logout'),
    profile: () => apiClient.get('/auth/profile')
  }
}