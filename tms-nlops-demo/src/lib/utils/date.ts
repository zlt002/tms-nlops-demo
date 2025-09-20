import { format, formatDistanceToNow, parseISO, isAfter, differenceInDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const formatDate = (date: Date | string, formatStr = 'yyyy-MM-dd HH:mm:ss') => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: zhCN })
}

export const formatRelativeTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: zhCN
  })
}

export const isOverdue = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isAfter(new Date(), dateObj)
}

export const getDaysUntil = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return differenceInDays(dateObj, new Date())
}

export const formatDateTime = {
  short: (date: Date | string) => formatDate(date, 'MM-dd HH:mm'),
  long: (date: Date | string) => formatDate(date, 'yyyy-MM-dd HH:mm:ss'),
  date: (date: Date | string) => formatDate(date, 'yyyy-MM-dd'),
  time: (date: Date | string) => formatDate(date, 'HH:mm:ss')
}