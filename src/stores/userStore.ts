import { ref, type Ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { userLoginApi, userInfoApi, logoutApi, type userLoginRequest } from '@/api/user-api'
import { Message } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import { siteApi, type SiteResponse } from '@/api/site-api.ts'
import type { baseResponse } from '@/api'
import { useUserBaseStore } from '@/stores/userBaseStore.ts'

export interface userInfoType {
    userID: number
    username: string
    nickName: string
    avatar: string
    role: number
    lookCount: number
    articleCount: number
    fansCount: number
    followCount: number
    place: string
    codeAge: number
    openCollect: boolean
    openFollow: boolean
    openFans: boolean
    homeStyleID: number
    relation: 0 | 1 | 2 | 3 | 4
}

interface userStore {
    userInfo: Ref<userInfoType | null>
    siteInfo: Ref<SiteResponse | null>
    isLogin: ComputedRef<boolean>
    isAdmin: ComputedRef<boolean>
    isMe: ComputedRef<boolean>
    login: (data: userLoginRequest) => Promise<baseResponse<string>>
    getUserInfo: () => Promise<null | userInfoType>
    logout: () => Promise<void>
    getSiteInfo: () => Promise<void>
}

export const useUserStore = defineStore('user', (): userStore => {
    const userBaseStore = useUserBaseStore()

    const router = useRouter()
    const route = useRoute()
    const userInfo = ref<userInfoType | null>(null)
    const siteInfo = ref<SiteResponse | null>(null)
    const isLogin = computed(() => !!userInfo.value)
    const isAdmin = computed(() => userInfo.value?.role === 1)
    const isMe = computed(() => {
        return userInfo.value?.userID === userBaseStore.userBase.userID
    })

    // 登录
    const login = async (data: userLoginRequest): Promise<baseResponse<string>> => {
        const res = await userLoginApi(data)
        if (res.code) {
            Message.error(res.msg)
            return res
        }
        window.localStorage.setItem('token', res.data)
        Message.success('登录成功')

        await getUserInfo()

        let target = '/'
        if (route.query.redirect) {
            target = decodeURIComponent(route.query.redirect as string)
        }
        router.push(target)

        return res
    }

    // 获取用户信息
    const getUserInfo = async () => {
        const res = await userInfoApi()
        if (res.code) {
            Message.error(res.msg)
            return null
        }
        const {
            userID,
            username,
            nickName,
            avatar,
            role,
            lookCount,
            articleCount,
            fansCount,
            followCount,
            place,
            codeAge,
            openCollect,
            openFollow,
            openFans,
            homeStyleID,
            relation,
        } = res.data
        const info = {
            userID,
            username,
            nickName,
            avatar,
            role,
            lookCount,
            articleCount,
            fansCount,
            followCount,
            place,
            codeAge,
            openCollect,
            openFollow,
            openFans,
            homeStyleID,
            relation,
        }
        userInfo.value = info
        console.log('userInfo.value', userInfo.value)
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
        isMe,
        login,
        getUserInfo,
        logout,
        getSiteInfo,
    }
})
