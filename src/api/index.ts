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
}

export const useAxios = axios.create({
    // timeout: 10 * 1000,
    baseURL: '',
})

useAxios.interceptors.request.use((config) => {
    const userStore = useUserStore()
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
