import {
    type baseResponse,
    type listResponse,
    type optionsType,
    type paramsType,
    useAxios,
} from '@/api/index'

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

// 置顶入参类型
interface UserArticleTopRequest {
    articleID: number
    type: number
}

// 置顶接口
export const userArticleTopApi = (data: UserArticleTopRequest): Promise<baseResponse<string>> => {
    return useAxios.post('/api/user/article/top', data)
}

export interface ArticleHistoryType {
    id: number
    createAt: string
    articleID: number
    title: string
    cover: string
    nickname: string
    avatar: string
    userID: number
}

export interface ArticleHistoryListRequest extends paramsType {
    type: 1 | 2
}

// 浏览历史
export const articleHistoryApi = (
    params: ArticleHistoryListRequest,
): Promise<baseResponse<listResponse<ArticleHistoryType>>> => {
    return useAxios.get('/api/article/history', { params })
}

// 足迹删除
export const articleHistoryRemoveApi = (idList: number[]): Promise<baseResponse<string>> => {
    return useAxios.delete('/api/article/history', { data: { idList } })
}

export interface ArticleAddType {
    title: string
    abstract: string
    content: string
    status: 1 | 2
    categoryID?: number
    cover: string
    tagList: string[]
    openComment: boolean
}

// 文章发布
export const articleAddApi = (data: ArticleAddType): Promise<baseResponse<string>> => {
    return useAxios.post('/api/article', data)
}

// 获取文章分类
export const articleCategoryOptionApi = (): Promise<baseResponse<optionsType[]>> => {
    return useAxios.get('/api/article/category/options')
}

// 获取tag
export const articleTagOptionApi = (): Promise<baseResponse<optionsType[]>> => {
    return useAxios.get('/api/article/tag/options')
}

interface ArticleUpdateRequest extends ArticleAddType {
    id: number
}

// 更新文章
export const articleUpdateApi = (data: ArticleUpdateRequest): Promise<baseResponse<string>> => {
    return useAxios.put('/api/article', data)
}

// 删除文章
export const articleRemoveApi = (id: number): Promise<baseResponse<string>> => {
    return useAxios.delete(`/api/article/${id}`)
}
