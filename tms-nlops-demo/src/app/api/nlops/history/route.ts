import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { z } from 'zod'

const historyQuerySchema = z.object({
  userId: z.string().optional(),
  intent: z.string().optional(),
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const query = {
    userId: searchParams.get('userId') || undefined,
    intent: searchParams.get('intent') || undefined,
    status: searchParams.get('status') || undefined,
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
    search: searchParams.get('search') || undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = historyQuerySchema.parse(query)

  const where: any = {}

  if (validatedQuery.userId) where.userId = validatedQuery.userId
  if (validatedQuery.intent) where.intent = validatedQuery.intent
  if (validatedQuery.status) where.status = validatedQuery.status

  if (validatedQuery.startDate || validatedQuery.endDate) {
    where.createdAt = {}
    if (validatedQuery.startDate) where.createdAt.gte = new Date(validatedQuery.startDate)
    if (validatedQuery.endDate) where.createdAt.lte = new Date(validatedQuery.endDate)
  }

  if (validatedQuery.search) {
    where.OR = [
      { command: { contains: validatedQuery.search, mode: 'insensitive' } },
      { intent: { contains: validatedQuery.search, mode: 'insensitive' } }
    ]
  }

  const [commands, total] = await Promise.all([
    prisma.nLCommand.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      skip: (validatedQuery.page - 1) * validatedQuery.limit,
      take: validatedQuery.limit,
      orderBy: {
        [validatedQuery.sortBy]: validatedQuery.sortOrder
      }
    }),
    prisma.nLCommand.count({ where })
  ])

  // 统计分析
  const stats = await prisma.nLCommand.groupBy({
    by: ['intent'],
    where,
    _count: true,
    _sum: {
      confidence: true
    }
  })

  const statusStats = await prisma.nLCommand.groupBy({
    by: ['status'],
    where,
    _count: true
  })

  return ApiResponseBuilder.success({
    commands,
    pagination: {
      page: validatedQuery.page,
      limit: validatedQuery.limit,
      total,
      pages: Math.ceil(total / validatedQuery.limit)
    },
    statistics: {
      byIntent: stats,
      byStatus: statusStats,
      totalCommands: total,
      successRate: total > 0 ? (statusStats.find(s => s.status === 'COMPLETED')?._count.count || 0) / total * 100 : 0
    }
  }, '获取命令历史成功')
})