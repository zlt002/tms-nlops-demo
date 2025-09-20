#!/usr/bin/env node

import { generateApiDocumentation } from '../src/lib/openapi'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

async function main() {
  console.log('🚀 开始生成API文档...')

  try {
    // 生成API文档
    await generateApiDocumentation()

    // 确保输出目录存在
    const outputDir = join(process.cwd(), 'public', 'api-docs')
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    // 生成README文件
    const readmeContent = `# TMS NL-Ops API文档

本目录包含TMS NL-Ops演示系统的API文档。

## 文件说明

- \`openapi.json\` - OpenAPI 3.0规范的JSON文件
- \`postman-collection.json\` - Postman测试集合
- \`API_DOCS.md\` - Markdown格式的API文档

## 如何使用

### 1. Swagger UI
访问 \`/api-docs\` 查看交互式API文档。

### 2. 下载OpenAPI规范
- 直接下载: [\`openapi.json\`](./openapi.json)
- 通过API: \`GET /api/docs\`

### 3. 导入到其他工具
- Postman: 导入 \`postman-collection.json\`
- Insomnia: 导入 \`openapi.json\`
- VS Code REST Client: 可以直接使用 \`API_DOCS.md\` 中的示例

## 认证方式

大部分API需要JWT Token认证：
\`\`\`bash
Authorization: Bearer <your-jwt-token>
\`\`\`

## 测试API

1. 启动开发服务器: \`npm run dev\`
2. 访问 \`http://localhost:3000/api-docs\`
3. 使用Swagger UI进行交互式测试

## 更新文档

运行以下命令重新生成文档：
\`\`\`bash
npm run generate:docs
\`\`\`

---

生成时间: ${new Date().toISOString()}
版本: ${process.env.npm_package_version || '1.0.0'}
`

    writeFileSync(join(outputDir, 'README.md'), readmeContent)

    console.log('✅ API文档生成成功!')
    console.log('📁 文件位置: public/api-docs/')
    console.log('🌐 访问地址: http://localhost:3000/api-docs')
    console.log('📄 查看文档: npm run docs:serve')

  } catch (error) {
    console.error('❌ 生成API文档失败:', error)
    process.exit(1)
  }
}

main()