// 导出所有OpenAPI相关功能
export * from './spec'
export * from './generator'
export * from './scanner'
export * from './endpoints'

// 初始化API文档
import { defineApiEndpoints } from './endpoints'

// 定义默认的API端点
defineApiEndpoints()

/**
 * 生成完整的OpenAPI文档
 */
export function generateOpenAPIDocument() {
  const { apiDocGenerator } = require('./generator')
  return apiDocGenerator.getSpec()
}

/**
 * 扫描并生成API文档
 */
export async function generateApiDocumentation() {
  const { apiRouteScanner } = require('./scanner')
  await apiRouteScanner.scanAndGenerate()
}
