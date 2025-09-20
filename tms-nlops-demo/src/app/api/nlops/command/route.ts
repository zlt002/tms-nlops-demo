import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

const commandSchema = z.object({
  command: z.string().min(1, '命令不能为空'),
  userId: z.string().uuid().optional()
})

// 简化的意图识别（实际项目中应该使用AI服务）
function identifyIntent(command: string) {
  const lowerCommand = command.toLowerCase()

  if (lowerCommand.includes('创建') || lowerCommand.includes('新增') || lowerCommand.includes('添加')) {
    return {
      intent: 'create_order',
      confidence: 0.8,
      parameters: {}
    }
  }

  if (lowerCommand.includes('查询') || lowerCommand.includes('查看') || lowerCommand.includes('状态')) {
    return {
      intent: 'track_order',
      confidence: 0.8,
      parameters: {}
    }
  }

  if (lowerCommand.includes('分配') || lowerCommand.includes('安排') || lowerCommand.includes('调度')) {
    return {
      intent: 'assign_vehicle',
      confidence: 0.8,
      parameters: {}
    }
  }

  return {
    intent: 'unknown',
    confidence: 0.3,
    parameters: {}
  }
}

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = commandSchema.parse(body)

  // 意图识别
  const intentResult = identifyIntent(validatedData.command)

  // 创建命令记录
  const nlCommand = await prisma.nLCommand.create({
    data: {
      command: validatedData.command,
      intent: intentResult.intent,
      parameters: intentResult.parameters,
      confidence: intentResult.confidence,
      userId: validatedData.userId
    }
  })

  // 执行命令（简化版）
  let result = null
  let error = null

  try {
    // 这里应该根据不同的intent执行不同的业务逻辑
    result = {
      action: intentResult.intent,
      message: '命令已接收，正在处理中...'
    }

    // 更新命令状态
    await prisma.nLCommand.update({
      where: { id: nlCommand.id },
      data: {
        status: 'COMPLETED',
        executed: true,
        result,
        executedAt: new Date()
      }
    })
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'

    await prisma.nLCommand.update({
      where: { id: nlCommand.id },
      data: {
        status: 'FAILED',
        error
      }
    })
  }

  return ApiResponseBuilder.success({
    command: nlCommand,
    result,
    error
  }, '命令处理完成')
})