import { NextRequest } from 'next/server'
import { PODService } from '@/services/podService'
import { ApiResponseBuilder, withErrorHandler } from '@/lib/api/response'
import { podQuerySchema } from '@/lib/validators/pod'

export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const query = {
    orderId: searchParams.get('orderId') || undefined,
    documentType: searchParams.get('documentType') || undefined,
    status: searchParams.get('status') || undefined,
    receiverName: searchParams.get('receiverName') || undefined,
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || undefined,
    search: searchParams.get('search') || undefined,
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  }

  const validatedQuery = podQuerySchema.parse(query)

  const result = await PODService.getPODs(validatedQuery)

  return ApiResponseBuilder.paginated(
    result.pods,
    result.pagination,
    'POD列表获取成功'
  )
})