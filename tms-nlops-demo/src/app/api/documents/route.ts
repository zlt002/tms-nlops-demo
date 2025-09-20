import { NextRequest, NextResponse } from 'next/server'
import { DocumentService } from '@/services/documentService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { createDocumentSchema, documentQuerySchema } from '@/lib/validators/document'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const query = {
    type: searchParams.get('type') || undefined,
    status: searchParams.get('status') || undefined,
    entityType: searchParams.get('entityType') || undefined,
    entityId: searchParams.get('entityId') || undefined,
    search: searchParams.get('search') || undefined,
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
    expirySoon: searchParams.get('expirySoon') === 'true',
    requiresSignature: searchParams.get('requiresSignature') === 'true',
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = documentQuerySchema.parse(query)

  const result = await DocumentService.getDocumentsWithStats(validatedQuery)

  return NextResponse.json({
    success: true,
    data: result.documents,
    pagination: result.pagination
  })
})

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json()
  const validatedData = createDocumentSchema.parse(body)

  const document = await DocumentService.createDocument(validatedData)

  return ApiResponseBuilder.success(document, '文档创建成功', 201)
})
