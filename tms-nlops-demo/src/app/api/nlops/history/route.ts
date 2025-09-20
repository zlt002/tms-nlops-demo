import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const filters = {
    userId: searchParams.get('userId') || undefined,
    intent: searchParams.get('intent') || undefined,
    limit: parseInt(searchParams.get('limit') || '50')
  }

  const commands = await prisma.nLCommand.findMany({
    where: {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.intent && { intent: filters.intent })
    },
    include: {
      user: true,
      order: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: filters.limit
  })

  return ApiResponseBuilder.success(commands, '获取命令历史成功')
})