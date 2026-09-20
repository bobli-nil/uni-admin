import { ref, type Ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { userLoginApi, userInfoApi, logoutApi, type userLoginRequest } from '@/api/user-api'
import { Message } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import { siteApi, type SiteResponse } from '@/api/site-api.ts'

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
    siteInfo: Ref<SiteResponse | null>
    isLogin: ComputedRef<boolean>
    isAdmin: ComputedRef<boolean>
    login: (data: userLoginRequest) => Promise<void>
    getUserInfo: () => Promise<null | userInfoType>
    logout: () => Promise<void>
    getSiteInfo: () => Promise<void>
}

export const useUserStore = defineStore('user', (): userStore => {
    const router = useRouter()
    const route = useRoute()
    const userInfo = ref<userInfoType | null>(null)
    const siteInfo = ref<SiteResponse | null>(null)
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
        let target = '/'
        if (route.query.redirect) {
            target = decodeURIComponent(route.query.redirect as string)
        }
        router.push(target)
    }

    // 获取用户信息
    const getUserInfo = async () => {
        const res = await userInfoApi()
        if (res.code) {
            Message.error(res.msg)
            return null
        }
        const { id, email, username, nickname, avatar, role } = res.data
        const info = { id, email, username, nickname, avatar, role }
        userInfo.value = info
        return info
    }

    // 退出登录
    const logout = async () => {
        await logoutApi()
        userInfo.value = null
        window.localStorage.removeItem('token')
        Message.success('退出登录成功')
        router.push({ path: '/' })
    }

    // 获取siteInfo
    const getSiteInfo = async () => {
        const res = await siteApi('site')
        if (res.code) {
            Message.error(res.msg)
            return
        }
        siteInfo.value = res.data
    }

    return {
        userInfo,
        siteInfo,
        isLogin,
        isAdmin,
        login,
        getUserInfo,
        logout,
        getSiteInfo,
    }
})
