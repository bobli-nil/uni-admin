import type { baseResponse, listResponse, paramsType } from '@/api/index.ts'
import { useAxios } from '@/api/index.ts'

export interface ArticleListItem {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    abstract: string
    categoryId: number
    tagList: string[]
    cover: string
    userId: number
    lookCount: number
    diggCount: number
    commentCount: number
    collectCount: number
    openComment: boolean
    status: number
    adminTop: boolean
    categoryTitle: string
    userNickname: string
    userAvatar: string
}

export interface ArticleSearchRequest extends paramsType {
    tag?: string
}

export const articleSearchApi = (
    params: ArticleSearchRequest,
): Promise<baseResponse<listResponse<ArticleListItem>>> => {
    return useAxios.get('/api/article/search', { params })
}

export interface TagListItem {
    tag: string
    articleCount: 0
}

export interface TagListRequest extends paramsType {}

export const tagListApi = (
    params: TagListRequest,
): Promise<baseResponse<listResponse<TagListItem>>> => {
    return useAxios.get('/api/article/tags', { params })
}
