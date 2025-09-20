import { prisma } from './prisma'
import '../../../prisma/generated/client'

export class DatabaseConnection {
  static async testConnection(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error('Database connection test failed:', error)
      return false
    }
  }

  static async getHealthStatus() {
    try {
      const result = await prisma.$queryRaw`
        SELECT
          version() as version,
          current_database() as database,
          current_user as user,
          inet_server_addr() as server_address,
          inet_server_port() as server_port
      `
      return {
        status: 'healthy',
        database: result,
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  static async close(): Promise<void> {
    await prisma.$disconnect()
  }
}
