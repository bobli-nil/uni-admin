import { useAxios } from '@/api/index.ts'
import type { baseResponse, paramsType, listResponse } from '@/api/index.ts'

export interface CommentCreateRequest {
    content: string
    articleID: number
    parentID?: number
}

export const commentCreateApi = (data: CommentCreateRequest): Promise<baseResponse<string>> => {
    return useAxios.post('/api/comment', data)
}

export interface CategoryListItem {
    id: number
    createdAt: string
    updatedAt: string
    title: string
    userID: number
    articleCount: number
}

export interface CategoryListRequest extends paramsType {
    type: 1 | 2 | 3
    userID: number
}

export const categoryListApi = (
    params: CategoryListRequest,
): Promise<baseResponse<listResponse<CategoryListItem>>> => {
    return useAxios.get('/api/article/category', { params })
}

export interface CategoryCreateUpdateRequest {
    id?: number
    title: string
}

export const categoryCreateUpdateApi = (
    data: CategoryCreateUpdateRequest,
): Promise<baseResponse<string>> => {
    return useAxios.post('/api/article/category', data)
}

export const categoryRemoveApi = (idList: number[]): Promise<baseResponse<string>> => {
    return useAxios.delete('/api/article/category', { data: { idList } })
}
