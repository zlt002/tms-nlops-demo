import { openApiSpec } from './spec'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { OpenAPIV3 } from 'openapi-types'
import { z } from 'zod'

export interface ApiPathConfig {
  summary: string
  description?: string
  tags?: string[]
  security?: boolean
  parameters?: OpenAPIV3.ParameterObject[]
  requestBody?: OpenAPIV3.RequestBodyObject
  responses: Record<string, OpenAPIV3.ResponseObject>
  examples?: {
    request: string
    response: string
  }
}

export class ApiDocumentationGenerator {
  private spec: any = { ...openApiSpec }

  constructor() {
    // 确保输出目录存在
    const publicDir = join(process.cwd(), 'public')
    const apiDocsDir = join(publicDir, 'api-docs')
    if (!existsSync(apiDocsDir)) {
      mkdirSync(apiDocsDir, { recursive: true })
    }
  }

  addPath(path: string, method: string, config: ApiPathConfig): void {
    if (!this.spec.paths[path]) {
      this.spec.paths[path] = {}
    }

    this.spec.paths[path][method.toLowerCase()] = {
      ...config,
      tags: config.tags || ['通用']
    }
  }

  addSchema(name: string, schema: any): void {
    if (!this.spec.components.schemas) {
      this.spec.components.schemas = {}
    }
    this.spec.components.schemas[name] = schema
  }

  generateFromZodSchema(name: string, zodSchema: z.ZodSchema<any>): void {
    const schema = this.convertZodToOpenAPI(zodSchema)
    this.addSchema(name, schema)
  }

  private convertZodToOpenAPI(zodSchema: z.ZodSchema<any>): any {
    if (zodSchema instanceof z.ZodObject) {
      const shape = zodSchema._def.shape()
      const properties: any = {}
      const required: string[] = []

      for (const [key, value] of Object.entries(shape)) {
        const schema = (value as any)._def
        const openAPIProp = this.convertZodTypeToOpenAPI(schema)
        properties[key] = openAPIProp

        if (!schema.isOptional()) {
          required.push(key)
        }
      }

      return {
        type: 'object',
        properties,
        required: required.length > 0 ? required : undefined
      }
    }

    if (zodSchema instanceof z.ZodArray) {
      return {
        type: 'array',
        items: this.convertZodTypeToOpenAPI(zodSchema._def.type)
      }
    }

    if (zodSchema instanceof z.ZodEnum) {
      return {
        type: 'string',
        enum: zodSchema._def.values
      }
    }

    return this.convertZodTypeToOpenAPI(zodSchema._def)
  }

  private convertZodTypeToOpenAPI(zodDef: any): any {
    if (zodDef.typeName === 'ZodString') {
      return { type: 'string' }
    }

    if (zodDef.typeName === 'ZodNumber') {
      return { type: 'number' }
    }

    if (zodDef.typeName === 'ZodBoolean') {
      return { type: 'boolean' }
    }

    if (zodDef.typeName === 'ZodDate') {
      return { type: 'string', format: 'date-time' }
    }

    if (zodDef.typeName === 'ZodOptional') {
      return this.convertZodTypeToOpenAPI(zodDef.innerType())
    }

    return { type: 'object' }
  }

  generateDocs(): void {
    // 生成OpenAPI JSON文件
    const outputPath = join(process.cwd(), 'public', 'api-docs', 'openapi.json')
    writeFileSync(outputPath, JSON.stringify(this.spec, null, 2))

    // 生成Markdown文档
    this.generateMarkdownDocs()

    // 生成Postman Collection
    this.generatePostmanCollection()
  }

  private generateMarkdownDocs(): void {
    const markdown = this.generateMarkdownContent()
    const outputPath = join(process.cwd(), 'API_DOCS.md')
    writeFileSync(outputPath, markdown)
  }

  private generateMarkdownContent(): string {
    let content = `# TMS NL-Ops演示系统 API文档

## 概述

TMS NL-Ops演示系统提供完整的运输管理API接口，支持自然语言操作和传统API调用。

## 基础信息

- **基础URL**: \`${this.spec.servers[0].url}\`
- **版本**: ${this.spec.info.version}
- **认证方式**: Bearer Token, API Key

## 认证

### Bearer Token
\`\`\`bash
Authorization: Bearer <your-jwt-token>
\`\`\`

### API Key
\`\`\`bash
X-API-Key: <your-api-key>
\`\`\`

## 错误响应格式

所有API错误响应都遵循以下格式：

\`\`\`json
{
  "success": false,
  "error": "错误信息",
  "code": "ERROR_CODE",
  "details": {},
  "timestamp": "2024-01-01T00:00:00Z"
}
\`\`\`

## API端点

`

    // 生成各个端点的文档
    for (const [path, methods] of Object.entries(this.spec.paths)) {
      content += `### ${path}\n\n`

      for (const [method, config] of Object.entries(methods as any)) {
        const methodUpper = method.toUpperCase()
        content += `#### ${methodUpper} ${path}\n\n`

        if (config.summary) {
          content += `**摘要**: ${config.summary}\n\n`
        }

        if (config.description) {
          content += `**描述**: ${config.description}\n\n`
        }

        content += `**认证**: ${config.security ? '需要' : '不需要'}\n\n`

        if (config.parameters && config.parameters.length > 0) {
          content += `**参数**:\n\n`
          content += `| 参数名 | 位置 | 类型 | 必需 | 描述 |\n`
          content += `|--------|------|------|------|------|\n`

          for (const param of config.parameters) {
            content += `| ${param.name} | ${param.in} | ${param.schema?.type || param.type} | ${param.required ? '是' : '否'} | ${param.description || '-'} |\n`
          }
          content += '\n'
        }

        if (config.requestBody) {
          content += `**请求体**:\n\n`
          content += `\`\`\`json\n${JSON.stringify(config.requestBody.content['application/json'].schema, null, 2)}\n\`\`\`\n\n`
        }

        if (config.responses) {
          content += `**响应**:\n\n`
          for (const [statusCode, response] of Object.entries(config.responses)) {
            content += `**${statusCode}**:\n\n`
            if (response.description) {
              content += `${response.description}\n\n`
            }
            if (response.content && response.content['application/json']) {
              content += `\`\`\`json\n${JSON.stringify(response.content['application/json'].schema, null, 2)}\n\`\`\`\n\n`
            }
          }
        }

        if (config.examples) {
          content += `**示例**:\n\n`
          content += `\`\`\`bash\n${config.examples.request}\n\`\`\`\n\n`
          if (config.examples.response) {
            content += `\`\`\`json\n${JSON.stringify(JSON.parse(config.examples.response), null, 2)}\n\`\`\`\n\n`
          }
        }

        content += '---\n\n'
      }
    }

    return content
  }

  private generatePostmanCollection(): void {
    const collection = {
      info: {
        name: 'TMS NL-Ops API Collection',
        description: 'TMS NL-Ops演示系统API的Postman集合',
        version: this.spec.info.version
      },
      auth: {
        type: 'bearer',
        bearer: [
          {
            key: 'token',
            value: '{{jwt_token}}',
            type: 'string'
          }
        ]
      },
      variable: [
        {
          key: 'base_url',
          value: this.spec.servers[0].url,
          type: 'string'
        }
      ],
      item: this.generatePostmanItems()
    }

    const outputPath = join(process.cwd(), 'public', 'api-docs', 'postman-collection.json')
    writeFileSync(outputPath, JSON.stringify(collection, null, 2))
  }

  private generatePostmanItems(): any[] {
    const items: any[] = []

    for (const [path, methods] of Object.entries(this.spec.paths)) {
      for (const [method, config] of Object.entries(methods as any)) {
        items.push({
          name: config.summary || `${method.toUpperCase()} ${path}`,
          request: {
            method: method.toUpperCase(),
            header: [
              {
                key: 'Content-Type',
                value: 'application/json'
              }
            ],
            url: {
              raw: `{{base_url}}${path}`,
              host: ['{{base_url}}'],
              path: path.split('/').filter(Boolean)
            },
            description: config.description || ''
          }
        })
      }
    }

    return items
  }

  getSpec(): any {
    return this.spec
  }
}

// 全局实例
export const apiDocGenerator = new ApiDocumentationGenerator()