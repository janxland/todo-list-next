// Prisma 错误类型定义
export interface PrismaError extends Error {
  code?: string
  meta?: {
    target?: string[]
    cause?: string
  }
}

// 检查是否为 Prisma 错误
export function isPrismaError(error: unknown): error is PrismaError {
  return error instanceof Error && 'code' in error
}

// 获取错误消息
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
