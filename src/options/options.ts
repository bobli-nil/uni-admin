import type { optionsType } from '@/api'

export interface OptionColorType extends optionsType {
    color: string
}

export const ArticleStatusOptions = [
    { label: '草稿', value: 1, color: 'green' },
    { label: '审核中', value: 2, color: 'orange' },
    { label: '已发布', value: 3, color: 'blue' },
    { label: '审核不通过', value: 4, color: 'red' },
]

export const RoleOptions = [
    { label: '管理员', value: 1, color: 'green' },
    { label: '用户', value: 2, color: 'green' },
    { label: '访客', value: 3, color: 'green' },
]

export const registerResourceOptions = [
    { label: '邮箱注册', value: 1, color: 'green' },
    { label: 'QQ注册', value: 2, color: 'orange' },
    { label: '控制台注册', value: 3, color: 'red' },
]
