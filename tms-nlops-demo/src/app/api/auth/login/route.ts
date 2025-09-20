import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'

const loginSchema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位')
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()

  // 验证输入
  const validatedData = loginSchema.parse(body)

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      createdAt: true
    }
  })

  if (!user) {
    return ApiResponseBuilder.error('用户不存在', 401)
  }

  // 生成token（实际项目中应该使用JWT）
  const token = `token-${user.id}-${Date.now()}`

  // 返回用户信息和token
  return ApiResponseBuilder.success({
    user,
    token
  }, '登录成功')
})
