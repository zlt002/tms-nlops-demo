import {
  PrismaClient,
  OrderStatus,
  VehicleStatus,
  ScheduleStatus,
  VehicleType,
} from '../../../prisma/generated/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { OrderStatus, VehicleStatus, ScheduleStatus, VehicleType }
export default prisma
