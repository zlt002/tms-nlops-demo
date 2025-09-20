const { PrismaClient } = require('@prisma/client')
const { execSync } = require('child_process')

const prisma = new PrismaClient()

async function initDatabase() {
  try {
    console.log('开始初始化数据库...')

    // 检查数据库是否存在
    const databaseName = process.env.DATABASE_URL?.match(/\/([^/?]+)/)?.[1]
    if (!databaseName) {
      throw new Error('无法从DATABASE_URL中提取数据库名称')
    }

    console.log(`使用数据库: ${databaseName}`)

    // 生成Prisma客户端
    console.log('生成Prisma客户端...')
    execSync('npx prisma generate', { stdio: 'inherit' })

    // 推送数据库结构
    console.log('推送数据库结构...')
    execSync('npx prisma db push', { stdio: 'inherit' })

    // 测试数据库连接
    console.log('测试数据库连接...')
    await prisma.$queryRaw`SELECT 1`

    console.log('数据库初始化完成！')
  } catch (error) {
    console.error('数据库初始化失败:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

initDatabase()