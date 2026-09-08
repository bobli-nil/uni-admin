import axios from 'axios'
import { Message } from '@arco-design/web-vue'

export interface baseResponse<T> {
  code: number
  data: T
  msg: string
}

export const useAxios = axios.create({
  timeout: 10 * 1000,
  baseURL: '',
})

useAxios.interceptors.request.use((config) => {
  config.headers.set('token', 'xxx')
  return config
})

useAxios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  }
  return res
}, (error) => {
  Message.error(error)
})