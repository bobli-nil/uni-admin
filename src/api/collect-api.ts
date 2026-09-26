import { type baseResponse, type listResponse, type paramsType, useAxios } from '@/api/index.ts'

export interface CollectListItem {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    abstract: string
    cover: string
    userID: number
    isDefault: boolean
    articleCount: number
}

export interface CollectListRequest extends paramsType {
    type: 1 | 2 | 3
    userID?: number
}

// 收藏夹列表
export const collectListApi = (
    params: CollectListRequest,
): Promise<baseResponse<listResponse<CollectListItem>>> => {
    return useAxios.get('/api/article/collect/list', { params })
}

export interface CollectCreateUpdateRequest {
    id?: number
    title: string
    abstract: string
}

// 创建/更新收藏夹
export const collectCreateUpdateApi = (
    data: CollectCreateUpdateRequest,
): Promise<baseResponse<string>> => {
    return useAxios.post('/api/article/collect/create', data)
}

// 删除收藏夹
export const collectRemoveApi = (idList: number[]): Promise<baseResponse<string>> => {
    return useAxios.delete('/api/article/collect/delete', { data: { idList } })
}

// 从收藏夹批量移除文章
export const collectArticleRemoveApi = (idList: number[]): Promise<baseResponse<string>> => {
    return useAxios.delete('/api/article/collect', { data: { idList } })
}
