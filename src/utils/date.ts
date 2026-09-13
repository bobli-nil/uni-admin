import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export type dateTemType = 'date' | 'time' | 'datetime' | 'current' | undefined

export const dateTimeFormat = (date: string): string => {
    if (!date) {
        return ''
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export const dateFormat = (date: string): string => {
    if (!date) {
        return ''
    }
    return dayjs(date).format('YYYY-MM-DD')
}

export const timeFormat = (date: string): string => {
    if (!date) {
        return ''
    }
    return dayjs(date).format('HH:mm:ss')
}

export const dateCurrentFormat = (date: string) => {
    return dayjs().to(dayjs(date))
}

export const dateTemFormat = (date: string, name: dateTemType) => {
    if (name === 'date') {
        return dateFormat(date)
    }
    if (name === 'time') {
        return timeFormat(date)
    }
    if (name === 'current') {
        return dateCurrentFormat(date)
    }
    return dateTimeFormat(date)
}
