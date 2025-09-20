import { NextRequest } from 'next/server'
import { DocumentService } from '@/services/documentService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { updateDocumentSchema } from '@/lib/validators/document'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    // TODO: 添加权限验证
    const document = await DocumentService.getDocumentsByEntity(
      params.id.split('_')[0], // entityType
      params.id.split('_')[1]   // entityId
    )

    return ApiResponseBuilder.success(document)
  })()
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()
    const validatedData = updateDocumentSchema.parse(body)

    const document = await DocumentService.updateDocument(params.id, validatedData)

    return ApiResponseBuilder.success(document, '文档更新成功')
  })()
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    // 软删除
    await DocumentService.updateDocument(params.id, {
      status: 'DELETED'
    })

    return ApiResponseBuilder.success(null, '文档删除成功')
  })()
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandler(async () => {
    const body = await request.json()

    if (body.action === 'sign') {
      // 签名文档
      const { signerId, signatureData } = body
      const document = await DocumentService.signDocument(params.id, signerId, signatureData)
      return ApiResponseBuilder.success(document, '文档签名成功')
    }

    // 默认更新操作
    const validatedData = updateDocumentSchema.parse(body)
    const document = await DocumentService.updateDocument(params.id, validatedData)

    return ApiResponseBuilder.success(document, '文档更新成功')
  })()
}
