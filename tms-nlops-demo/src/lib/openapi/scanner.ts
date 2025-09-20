import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'
import { apiDocGenerator } from './generator'
import { z } from 'zod'

interface RouteMetadata {
  path: string
  method: string
  summary: string
  description?: string
  tags: string[]
  security: boolean
  schema?: z.ZodSchema<any>
  parameters?: Array<{
    name: string
    in: 'path' | 'query' | 'header'
    required: boolean
    schema: any
    description: string
  }>
  examples?: {
    request: string
    response: string
  }
}

export class ApiRouteScanner {
  private readonly apiDir: string
  private readonly routeHandlers = new Map<string, RouteMetadata>()

  constructor(apiDir: string = join(process.cwd(), 'src', 'app', 'api')) {
    this.apiDir = apiDir
  }

  async scanAndGenerate(): Promise<void> {
    await this.scanRoutes()
    this.generateApiDocs()
  }

  private async scanRoutes(): Promise<void> {
    this.scanDirectory(this.apiDir)
  }

  private scanDirectory(dirPath: string): void {
    const items = readdirSync(dirPath)

    for (const item of items) {
      const fullPath = join(dirPath, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        this.scanDirectory(fullPath)
      } else if (extname(item) === '.ts' && item !== 'route.ts') {
        this.processRouteFile(fullPath)
      }
    }
  }

  private processRouteFile(filePath: string): void {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const relativePath = filePath.replace(this.apiDir, '').replace(/\\/g, '/')

      // 解析路由路径
      const routePath = this.parseRoutePath(relativePath)

      // 从文件内容中提取元数据
      const metadata = this.extractMetadata(content, routePath)

      if (metadata) {
        this.routeHandlers.set(metadata.method + ':' + metadata.path, metadata)
      }
    } catch (error) {
      console.warn(`无法扫描路由文件: ${filePath}`, error)
    }
  }

  private parseRoutePath(relativePath: string): string {
    // 移除文件扩展名和/route.ts
    let path = relativePath
      .replace(/\.ts$/, '')
      .replace(/\/route$/, '')
      .replace(/\/\[(.+?)\]/g, '/:$1') // 将 [id] 转换为 :id

    // 确保路径以 /api 开头
    if (!path.startsWith('/api')) {
      path = '/api' + path
    }

    return path
  }

  private extractMetadata(content: string, routePath: string): RouteMetadata | null {
    // 从注释中提取元数据
    const metadata = this.extractMetadataFromComments(content)

    if (!metadata) return null

    // 根据文件路径推断方法
    const method = this.inferMethodFromContent(content)

    return {
      path: routePath,
      method,
      ...metadata
    }
  }

  private extractMetadataFromComments(content: string): Partial<RouteMetadata> | null {
    // 提取 JSDoc 注释
    const jsdocMatch = content.match(/\/\*\*[\s\S]*?\*\//)
    if (!jsdocMatch) return null

    const jsdoc = jsdocMatch[0]
    const metadata: Partial<RouteMetadata> = {
      tags: [],
      security: false
    }

    // 提取 @summary
    const summaryMatch = jsdoc.match(/@summary\s+(.+)/)
    if (summaryMatch) {
      metadata.summary = summaryMatch[1].trim()
    }

    // 提取 @description
    const descriptionMatch = jsdoc.match(/@description\s+(.+)/)
    if (descriptionMatch) {
      metadata.description = descriptionMatch[1].trim()
    }

    // 提取 @tags
    const tagsMatch = jsdoc.match(/@tags?\s+(.+)/)
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].split(',').map(tag => tag.trim())
    }

    // 提取 @security
    const securityMatch = jsdoc.match(/@security\s+(true|false)/)
    if (securityMatch) {
      metadata.security = securityMatch[1] === 'true'
    }

    // 提取 @example
    const exampleMatch = jsdoc.match(/@example\s+request:\s*([\s\S]*?)response:\s*([\s\S]*?)(?=\*\//|$)/)
    if (exampleMatch) {
      metadata.examples = {
        request: exampleMatch[1].trim(),
        response: exampleMatch[2].trim()
      }
    }

    return metadata
  }

  private inferMethodFromContent(content: string): string {
    // 根据函数名或注释推断HTTP方法
    if (content.includes('GET') || content.includes('get')) {
      return 'GET'
    }
    if (content.includes('POST') || content.includes('post')) {
      return 'POST'
    }
    if (content.includes('PUT') || content.includes('put')) {
      return 'PUT'
    }
    if (content.includes('DELETE') || content.includes('delete')) {
      return 'DELETE'
    }
    if (content.includes('PATCH') || content.includes('patch')) {
      return 'PATCH'
    }

    // 默认返回 GET
    return 'GET'
  }

  private generateApiDocs(): void {
    for (const metadata of this.routeHandlers.values()) {
      const config = this.generatePathConfig(metadata)
      apiDocGenerator.addPath(metadata.path, metadata.method, config)
    }

    apiDocGenerator.generateDocs()
  }

  private generatePathConfig(metadata: RouteMetadata): any {
    const responses: Record<string, any> = {
      '200': {
        description: '成功响应',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ApiResponse'
            }
          }
        }
      },
      '400': {
        description: '请求参数错误',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            }
          }
        }
      },
      '401': {
        description: '未授权访问',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            }
          }
        }
      },
      '500': {
        description: '服务器内部错误',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            }
          }
        }
      }
    }

    const config: any = {
      summary: metadata.summary,
      description: metadata.description,
      tags: metadata.tags,
      responses
    }

    if (metadata.security) {
      config.security = [{ BearerAuth: [] }]
    }

    if (metadata.parameters) {
      config.parameters = metadata.parameters
    }

    if (metadata.examples) {
      config.examples = metadata.examples
    }

    return config
  }
}

// 全局实例
export const apiRouteScanner = new ApiRouteScanner()