import {ref, type Ref, computed, type ComputedRef} from 'vue'
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
  login: (data: userLoginRequest) => Promise<void>
  getUserInfo: () => Promise<void | userInfoType>
  isLogin: ComputedRef<boolean>
  isAdmin: ComputedRef<boolean>
}

export const useUserStore = defineStore('user', (): userStore => {
  const router = useRouter()
  const userInfo = ref<userInfoType | null>(null)
  const isLogin = computed(() => !!userInfo.value)
  const isAdmin = computed(() => userInfo.value?.role === 1)

  // 登录
  const login = async (data: userLoginRequest) => {
    const res = await userLoginApi(data)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    window.localStorage.setItem('token', res.data)
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
    return userInfo.value
  }

  return {
    userInfo,
    isLogin,
    isAdmin,
    login,
    getUserInfo,
  }
})
