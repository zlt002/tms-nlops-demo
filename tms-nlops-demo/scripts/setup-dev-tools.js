const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 设置开发工具...')

try {
  // 检查是否已初始化Git仓库
  if (!fs.existsSync('.git')) {
    console.log('❌ 错误: 请先初始化Git仓库 (git init)')
    process.exit(1)
  }

  // 初始化Husky
  console.log('📦 初始化Husky...')
  execSync('npx husky install', { stdio: 'inherit' })

  // 添加prepare脚本
  console.log('📝 配置package.json...')
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  packageJson.scripts.prepare = 'husky install'
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n')

  // 创建提交信息模板
  console.log('📋 创建提交模板...')
  const commitTemplate = `# type(scope): subject

## Body (optional)

## Breaking Changes (optional)

## Issue References (optional)
`
  fs.writeFileSync('.git/commit_template', commitTemplate)

  // 配置Git使用提交模板
  execSync('git config commit.template .git/commit_template', { stdio: 'inherit' })

  console.log('✅ 开发工具设置完成!')
  console.log('')
  console.log('📖 使用指南:')
  console.log('  - 提交代码: git commit (会自动触发检查)')
  console.log('  - 手动格式化: npm run format')
  console.log('  - 检查格式: npm run format:check')
  console.log('  - 类型检查: npm run type-check')
  console.log('  - 代码检查: npm run lint')

} catch (error) {
  console.error('❌ 设置失败:', error.message)
  process.exit(1)
}