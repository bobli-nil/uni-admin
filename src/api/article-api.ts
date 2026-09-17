import { type baseResponse, type listResponse, type paramsType, useAxios } from '@/api/index'
export interface ArticleListItem {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    abstract: string
    categoryId?: number
    categoryTitle?: string
    tagList: string[]
    cover: string
    userId: number
    lookCount: number
    diggCount: number
    commentCount: number
    collectCount: number
    openComment: boolean
    status: number // 1草稿 2审核中 3已发布
    userTop: boolean
    adminTop: boolean
    userNickname: string
    userAvatar: string
}

export interface ArticleListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
    collectID?: number
    status?: number
}

export const articleListApi = (
    params: ArticleListRequest,
): Promise<baseResponse<listResponse<ArticleListItem>>> => {
    return useAxios({
        url: '/api/article',
        params,
    })
}
