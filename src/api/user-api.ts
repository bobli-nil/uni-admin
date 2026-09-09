import { useAxios, type baseResponse } from './index.ts'
import { type userInfoType } from '@/stores/userStore'

export interface userLoginRequest {
    val: string
    password: string
}

// 登录
export const userLoginApi = (data: userLoginRequest): Promise<baseResponse<string>> => {
    return useAxios({
        method: 'post',
        url: '/api/user/pwd_login',
        data,
    })
}

// 获取用户信息
export const userInfoApi = (): Promise<baseResponse<userInfoType>> => {
    return useAxios({
        url: '/api/user/detail',
        method: 'get',
    })
}

// 退出登录
export const logoutApi = (): Promise<baseResponse<Record<string, never>>> => {
    return useAxios({
        url: '/api/user/logout',
        method: 'delete',
    })
}
