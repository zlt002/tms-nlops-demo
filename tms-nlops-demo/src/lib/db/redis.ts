// Redis配置文件 - 简化版本，实际项目中应该配置真实的Redis连接
export const redis = {
  ping: async (): Promise<string> => {
    // 简化版本：直接返回PONG，实际项目中应该连接真实的Redis
    return 'PONG'
  },

  // 其他Redis操作方法可以在这里添加
  get: async (key: string): Promise<string | null> => {
    // 简化版本：返回null
    return null
  },

  set: async (key: string, value: string, ttl?: number): Promise<void> => {
    // 简化版本：不做任何操作
    return
  },

  del: async (key: string): Promise<number> => {
    // 简化版本：返回0
    return 0
  }
}