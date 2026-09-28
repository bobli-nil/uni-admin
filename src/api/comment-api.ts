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

// 评论列表
export const commentListApi = (
    params: CommentListRequest,
): Promise<baseResponse<listResponse<CommentListType>>> => {
    return useAxios.get('/api/comment', { params })
}

// 单个评论删除
export const commentRemoveApi = (id: number): Promise<baseResponse<string>> => {
    return useAxios.delete(`/api/comment/${id}`)
}

export interface CommentTreeType {
    id: number
    createdAt: string
    content: string
    userID: number
    userNickname: string
    userAvatar: string
    articleID: number
    parentID: number
    diggCount: number
    applyCount: number
    subComments: CommentTreeType[]
    isDigg: boolean
    relation: 0 | 1 | 2 | 3 | 4
    isApply?: boolean
    applyContent?: string
}

// 评论树
export const commentTreeApi = (id: number): Promise<baseResponse<CommentTreeType[]>> => {
    return useAxios.get('/api/comment/tree/' + id)
}

// 评论点赞
export const commentDiggApi = (id: number): Promise<baseResponse<string>> => {
    return useAxios.get('/api/comment/digg/' + id)
}
