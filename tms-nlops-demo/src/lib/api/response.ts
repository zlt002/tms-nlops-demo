import { NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  metadata?: {
    timestamp: string
    requestId: string
  }
}

export class ApiResponseBuilder {
  static success<T>(
    data: T,
    message?: string,
    status: number = 200
  ): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }
    return NextResponse.json(response, { status })
  }

  static error(
    error: string,
    status: number = 500,
    _details?: any
  ): NextResponse<ApiResponse> {
    const response: ApiResponse = {
      success: false,
      error,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }
    return NextResponse.json(response, { status })
  }

  static paginated<T>(
    data: T[],
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    },
    message?: string
  ): NextResponse {
    const response: ApiResponse<T[]> = {
      success: true,
      data,
      message,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      }
    }
    return NextResponse.json({
      ...response,
      pagination
    })
  }

  private static generateRequestId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}

export function withErrorHandler(handler: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof Error) {
        return ApiResponseBuilder.error(error.message, 500)
      }

      return ApiResponseBuilder.error('Internal server error', 500)
    }
  }
}
