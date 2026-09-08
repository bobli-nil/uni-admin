import {ref, type Ref} from 'vue'
import { defineStore } from 'pinia'
import {userLoginApi, userInfoApi, type userLoginRequest} from '@/api/user-api'
import {Message} from "@arco-design/web-vue"
import {useRouter} from 'vue-router'

export interface userInfoType {
  id: number
  email: string
  username: string
  nickname: string
  avatar: string
  role: number
}

interface userStore {
  userInfo: Ref<userInfoType | null>
  token: Ref<string | null>
  login: (data: userLoginRequest) => Promise<void>
  getUserInfo: () => Promise<void | userInfoType>
}

export const useUserStore = defineStore('user', (): userStore => {
  const router = useRouter()
  const userInfo = ref<userInfoType | null>(null)
  const token = ref<string | null>(null)

  // 登录
  const login = async (data: userLoginRequest) => {
    const res = await userLoginApi(data)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    token.value = res.data
    window.localStorage.setItem('token', token.value)
    Message.success('登录成功')
    router.push({name: 'home'})
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await userInfoApi()
    if (res.code) {
      Message.error(res.msg)
      return
    }
    const { id, email, username, nickname, avatar, role } = res.data
    userInfo.value = { id, email, username, nickname, avatar, role }
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    return userInfo.value
  }

  return {
    userInfo,
    token,
    login,
    getUserInfo,
  }
})
