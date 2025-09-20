import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/db/redis'

export interface HealthCheck {
  status: 'OK' | 'ERROR' | 'DEGRADED'
  timestamp: string
  version: string
  uptime: number
  database: {
    status: 'connected' | 'disconnected'
    latency?: number
  }
  redis: {
    status: 'connected' | 'disconnected'
    latency?: number
  }
  services: Record<string, {
    status: 'OK' | 'ERROR' | 'DEGRADED'
    message?: string
  }>
}

export class HealthChecker {
  static async check(detailed: boolean = false): Promise<HealthCheck> {
    const startTime = Date.now()
    const version = process.env.npm_package_version || '1.0.0'
    const uptime = process.uptime()

    // 检查数据库连接
    const database = await this.checkDatabase()

    // 检查Redis连接
    const redis = await this.checkRedis()

    // 检查其他服务
    const services = detailed ? await this.checkServices() : {}

    // 确定整体状态
    let status: HealthCheck['status'] = 'OK'
    if (database.status === 'disconnected' || redis.status === 'disconnected') {
      status = 'ERROR'
    } else if (Object.values(services).some(s => s.status === 'ERROR')) {
      status = 'ERROR'
    } else if (Object.values(services).some(s => s.status === 'DEGRADED')) {
      status = 'DEGRADED'
    }

    return {
      status,
      timestamp: new Date().toISOString(),
      version,
      uptime,
      database,
      redis,
      services
    }
  }

  private static async checkDatabase() {
    try {
      const start = Date.now()
      await prisma.$queryRaw`SELECT 1`
      const latency = Date.now() - start

      return {
        status: 'connected' as const,
        latency
      }
    } catch (error) {
      console.error('Database health check failed:', error)
      return {
        status: 'disconnected' as const
      }
    }
  }

  private static async checkRedis() {
    try {
      const start = Date.now()
      await redis.ping()
      const latency = Date.now() - start

      return {
        status: 'connected' as const,
        latency
      }
    } catch (error) {
      console.error('Redis health check failed:', error)
      return {
        status: 'disconnected' as const
      }
    }
  }

  private static async checkServices() {
    const services: HealthCheck['services'] = {}

    // 检查文件存储服务
    try {
      // 这里应该检查实际的文件存储服务
      services.storage = {
        status: 'OK'
      }
    } catch (error) {
      services.storage = {
        status: 'ERROR',
        message: error instanceof Error ? error.message : 'Storage service unavailable'
      }
    }

    // 检查外部API服务
    try {
      // 这里应该检查外部API的可用性
      services.externalAPI = {
        status: 'OK'
      }
    } catch (error) {
      services.externalAPI = {
        status: 'DEGRADED',
        message: 'External API responding slowly'
      }
    }

    return services
  }

  static async ready(): Promise<boolean> {
    try {
      const health = await this.check()
      return health.status === 'OK'
    } catch {
      return false
    }
  }

  static async live(): Promise<boolean> {
    // Liveness probe - 只检查进程是否存活
    return true
  }
}
