'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocsPage() {
  const [spec, setSpec] = useState<any>(null)

  useEffect(() => {
    // 动态导入Swagger UI样式
    const loadSwaggerUI = async () => {
      try {
        const response = await fetch('/api-docs/openapi.json')
        const apiSpec = await response.json()
        setSpec(apiSpec)
      } catch (error) {
        console.error('加载API文档失败:', error)
        // 使用基础规范作为回退
        setSpec({
          openapi: '3.0.0',
          info: {
            title: 'TMS NL-Ops API文档',
            version: '1.0.0',
            description: '运输管理系统自然语言操作演示系统API文档'
          },
          paths: {},
          components: {
            schemas: {}
          }
        })
      }
    }

    loadSwaggerUI()
  }, [])

  if (!spec) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在加载API文档...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TMS NL-Ops API文档</h1>
              <p className="text-sm text-gray-600">运输管理系统自然语言操作演示系统</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/api-docs/openapi.json"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                download
              >
                下载OpenAPI规范
              </a>
              <a
                href="/api-docs/postman-collection.json"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                download
              >
                下载Postman集合
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <SwaggerUI spec={spec} />
      </div>
    </div>
  )
}