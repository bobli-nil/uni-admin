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

// 文章列表请求参数类型
export interface ArticleListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
    collectID?: number
    status?: number
}

// 文章列表接口
export const articleListApi = (
    params: ArticleListRequest,
): Promise<baseResponse<listResponse<ArticleListItem>>> => {
    return useAxios({
        url: '/api/article',
        params,
    })
}

// 文章详情类型
export interface ArticleDetailType {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    abstract: string
    content: string
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
    username: string
    nickname: string
    avatar: string
    categoryTitle: string
    isCollect: boolean
    isDigg: boolean
}

// 文章详情接口
export const articleDetailApi = (id: number): Promise<baseResponse<ArticleDetailType>> => {
    return useAxios.get('/api/article/' + id)
}

// 文章审核请求参数类型
export interface ArticleExamineRequest {
    articleID: number
    status: number
    msg?: string
}

// 文章审核接口
export const articleExamineApi = (data: ArticleExamineRequest): Promise<baseResponse<string>> => {
    return useAxios.post('/api/article/examine', data)
}
