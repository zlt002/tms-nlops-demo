const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function setupDevEnvironment() {
  console.log('🚀 设置开发环境...')

  try {
    // 1. 安装依赖
    console.log('📦 安装依赖包...')
    execSync('npm install', { stdio: 'inherit' })

    // 2. 生成Prisma客户端
    console.log('🗄️  生成Prisma客户端...')
    execSync('npm run db:generate', { stdio: 'inherit' })

    // 3. 初始化Git hooks
    console.log('🪝 初始化Git hooks...')
    execSync('npm run prepare', { stdio: 'inherit' })

    // 4. 运行代码质量检查
    console.log('🔍 运行代码质量检查...')
    try {
      execSync('npm run quality', { stdio: 'inherit' })
    } catch (error) {
      console.warn('⚠️  代码质量检查发现问题，但继续设置过程')
    }

    console.log('✅ 开发环境设置完成!')

  } catch (error) {
    console.error('❌ 开发环境设置失败:', error.message)
    process.exit(1)
  }
}

function runDevServer() {
  console.log('🚀 启动开发服务器...')
  execSync('npm run dev', { stdio: 'inherit' })
}

function checkCodeQuality() {
  console.log('🔍 开始代码质量检查...')

  try {
    // 1. ESLint检查
    console.log('📋 运行ESLint检查...')
    execSync('npm run lint', { stdio: 'inherit' })

    // 2. Prettier格式检查
    console.log('✨ 检查代码格式...')
    execSync('npm run format:check', { stdio: 'inherit' })

    // 3. TypeScript类型检查
    console.log('🔧 运行TypeScript类型检查...')
    execSync('npm run type-check', { stdio: 'inherit' })

    // 4. 检查大文件
    console.log('📦 检查文件大小...')
    const largeFiles = findLargeFiles('.', 1024 * 1024) // 1MB
    if (largeFiles.length > 0) {
      console.warn('⚠️  发现大文件:')
      largeFiles.forEach(file => {
        console.warn(`   ${file.path} (${file.size} bytes)`)
      })
    }

    // 5. 检查未使用的依赖
    console.log('📦 检查未使用的依赖...')
    try {
      execSync('npx depcheck', { stdio: 'inherit' })
    } catch (error) {
      console.warn('⚠️  跳过依赖检查 (depcheck未安装)')
    }

    console.log('✅ 所有代码质量检查通过!')

  } catch (error) {
    console.error('❌ 代码质量检查失败:', error.message)
    process.exit(1)
  }
}

function findLargeFiles(dir, maxSize) {
  const largeFiles = []

  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const filePath = path.join(currentDir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // 跳过node_modules和.next目录
        if (!['node_modules', '.next', 'dist', 'build'].includes(file)) {
          scanDirectory(filePath)
        }
      } else if (stat.size > maxSize) {
        largeFiles.push({
          path: filePath,
          size: stat.size
        })
      }
    }
  }

  scanDirectory(dir)
  return largeFiles
}

if (require.main === module) {
  const command = process.argv[2]

  switch (command) {
    case 'setup':
      setupDevEnvironment()
      break
    case 'start':
      runDevServer()
      break
    case 'quality':
      checkCodeQuality()
      break
    default:
      console.log('可用命令:')
      console.log('  setup   - 设置开发环境')
      console.log('  start   - 启动开发服务器')
      console.log('  quality - 运行代码质量检查')
      process.exit(1)
  }
}

module.exports = { setupDevEnvironment, runDevServer, checkCodeQuality, findLargeFiles }