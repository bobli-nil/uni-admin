import type { baseResponse, listResponse, paramsType } from '@/api/index.ts'
import { useAxios } from '@/api/index.ts'

export interface FansFocusListItem {
    userID: number
    userNickname: string
    userAvatar: string
    userAbstract: string
    relation: number
    createdAt: string
}

export interface FansFocusListRequest extends paramsType {
    userID?: number
    isMe: boolean
}

// 粉丝列表
export const fansListApi = (
    params: FansFocusListRequest,
): Promise<baseResponse<listResponse<FansFocusListItem>>> => {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get('/api/focus/my_fans', { params })
}

// 关注列表
export const focusListApi = (
    params: FansFocusListRequest,
): Promise<baseResponse<listResponse<FansFocusListItem>>> => {
    if (params.isMe) {
        params.userID = undefined
    }
    return useAxios.get('/api/focus/my_focus', { params })
}

export interface FocusType {
    focusUserID: number
}

// 关注
export const focusUserApi = (data: FocusType): Promise<baseResponse<string>> => {
    return useAxios.post('/api/focus', data)
}

// 取消关注
export const focusUserRemoveApi = (data: FocusType): Promise<baseResponse<string>> => {
    return useAxios.delete('/api/focus', { data })
}
