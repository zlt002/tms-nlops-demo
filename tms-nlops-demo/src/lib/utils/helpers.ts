import _ from 'lodash'

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  return _.debounce(func, wait)
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  return _.throttle(func, wait)
}

// 深拷贝
export const deepClone = <T>(obj: T): T => {
  return _.cloneDeep(obj)
}

// 获取嵌套对象属性
export const getNestedValue = (obj: any, path: string, defaultValue?: any) => {
  return _.get(obj, path, defaultValue)
}

// 设置嵌套对象属性
export const setNestedValue = (obj: any, path: string, value: any) => {
  return _.set(obj, path, value)
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化货币
export const formatCurrency = (amount: number, currency = 'CNY'): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
  }).format(amount)
}

// 生成唯一ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

// 错误处理包装器
export const withErrorHandling = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: Error) => void
): Promise<T | null> => {
  try {
    return await fn()
  } catch (error) {
    console.error('Error:', error)
    if (errorHandler) {
      errorHandler(error as Error)
    }
    return null
  }
}
