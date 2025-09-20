import { NextRequest, NextResponse } from 'next/server'
import { apiRouteScanner } from '@/lib/openapi/scanner'
import { apiDocGenerator } from '@/lib/openapi/generator'

/**
 * @summary 生成API文档
 * @description 扫描所有API路由并生成OpenAPI文档
 * @tags 系统管理
 * @security false
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const force = searchParams.get('force') === 'true'

    if (force) {
      // 强制重新扫描路由
      await apiRouteScanner.scanAndGenerate()
    }

    const spec = apiDocGenerator.getSpec()

    return NextResponse.json(spec, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  } catch (error) {
    console.error('生成API文档失败:', error)
    return NextResponse.json(
      { error: 'Failed to generate documentation' },
      { status: 500 }
    )
  }
}

/**
 * @summary 更新API文档
 * @description 手动触发API文档更新
 * @tags 系统管理
 * @security true
 */
export async function POST(request: NextRequest) {
  try {
    // 重新扫描路由并生成文档
    await apiRouteScanner.scanAndGenerate()

    return NextResponse.json({
      success: true,
      message: 'API文档更新成功'
    })
  } catch (error) {
    console.error('更新API文档失败:', error)
    return NextResponse.json({
      success: false,
      error: '更新API文档失败',
      code: 'DOC_UPDATE_FAILED',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
