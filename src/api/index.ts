import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores/userStore'

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
}

export interface listResponse<T> {
    list: T[]
    count: number
}

export interface paramsType {
    keyword?: string
    page?: number
    limit?: number
    sort?: string
    [key: string]: any
}

export interface optionsType {
    label: string
    value: number | string
}

export type optionsFunc = (params?: paramsType) => Promise<baseResponse<optionsType[]>>

export const useAxios = axios.create({
    // timeout: 10 * 1000,
    baseURL: '',
})

useAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.set('token', token)
    return config
})

useAxios.interceptors.response.use(
    (res) => {
        if (res.status === 200) {
            return res.data
        }
        return res
    },
    (error) => {
        Message.error(error)
    },
)
