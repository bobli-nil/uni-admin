import { useAxios, type baseResponse, type paramsType, type listResponse } from './index.ts'
import { type userInfoType } from '@/stores/userStore'

export interface userLoginRequest {
    val: string
    password: string
    captchaId: string
    captchaCode: string
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

// 用户列表类型
export interface UserListItem {
    id: number
    nickname: string
    username: string
    avatar: string
    abstract: string
    ip: string
    addr: string
    articleCount: number
    indexCount: number
    createdAt: string
    lastLoginDate: string
    role: number
}

// 用户列表接口
export const userListApi = (
    params?: paramsType,
): Promise<baseResponse<listResponse<UserListItem>>> => {
    return useAxios.get('/api/user', { params })
}

export interface UserUpdateAdminRequest {
    userId: number
    username: string
    nickname: string
    avatar: string
    abstract: string
    role: number
}

// 管理员更新用户信息接口
export const userUpdateAdminApi = (data: UserUpdateAdminRequest): Promise<baseResponse<string>> => {
    return useAxios.put('/api/user/admin', data)
}

export interface SendEmailRequest {
    type: number
    email: string
    captchaId: string
    captchaCode: string
}

export interface SendEmailResponse {
    emailID: string
}

export const sendEmailApi = (data: SendEmailRequest): Promise<baseResponse<SendEmailResponse>> => {
    return useAxios.post('/api/user/send_email', data)
}

export interface EmailRegisterRequest {
    emailID: string
    code: string
    pwd: string
    rePwd: string
}

export const emailRegisterApi = (
    data: EmailRegisterRequest,
): Promise<baseResponse<{ token: string }>> => {
    return useAxios.post('/api/user/email', data)
}
