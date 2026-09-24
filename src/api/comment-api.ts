import { type baseResponse, type listResponse, type paramsType, useAxios } from '@/api/index.ts'

export interface CommentListType {
    id: number
    content: string
    userID: number
    userNickname: string
    userAvatar: string
    articleID: number
    articleTitle: string
    articleCover: string
    diggCount: number
    relation?: 1 | 2 | 3 | 4
    isMe: boolean
    createdAt: string
    visible: boolean
}

export interface CommentListRequest extends paramsType {
    type: 1 | 2 | 3
}

export const commentListApi = (
    params: CommentListRequest,
): Promise<baseResponse<listResponse<CommentListType>>> => {
    return useAxios.get('/api/comment', { params })
}

// 单个评论删除
export const commentRemoveApi = (id: number): Promise<baseResponse<string>> => {
    return useAxios.delete(`/api/comment/${id}`)
}
