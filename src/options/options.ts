import type { optionsType } from '@/api'

export interface OptionColorType extends optionsType {
    color: string
}

export const ArticleStatusOptions = [
    { label: '草稿', value: 1, color: 'green' },
    { label: '审核中', value: 2, color: 'red' },
    { label: '已发布', value: 3, color: 'blue' },
]
