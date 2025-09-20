const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function validateDependencies() {
  console.log('开始验证依赖包安装...')

  try {
    // 检查package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const dependencies = Object.keys(packageJson.dependencies || {})
    const devDependencies = Object.keys(packageJson.devDependencies || {})

    console.log(`生产依赖: ${dependencies.length}个`)
    console.log(`开发依赖: ${devDependencies.length}个`)

    // 验证安装
    console.log('验证依赖包安装...')
    execSync('npm list --depth=0', { stdio: 'inherit' })

    // 类型检查
    console.log('运行TypeScript类型检查...')
    execSync('npm run type-check', { stdio: 'inherit' })

    // ESLint检查
    console.log('运行ESLint检查...')
    execSync('npm run lint', { stdio: 'inherit' })

    // 构建测试
    console.log('测试构建...')
    execSync('npm run build', { stdio: 'inherit' })

    console.log('✅ 所有依赖包验证通过!')

  } catch (error) {
    console.error('❌ 依赖包验证失败:', error.message)
    process.exit(1)
  }
}

validateDependencies()