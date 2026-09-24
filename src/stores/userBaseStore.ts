import { defineStore } from 'pinia'
import { reactive, type Reactive } from 'vue'
import { type userInfoType } from '@/stores/userStore.ts'
import { userInfoApi } from '@/api/user-api.ts'
import { Message } from '@arco-design/web-vue'

interface UserBaseStore {
    userBase: Reactive<userInfoType>
    getUserBaseInfo: (id: number) => Promise<void>
}

export const useUserBaseStore = defineStore('userBaseStore', (): UserBaseStore => {
    const userBase = reactive<userInfoType>({
        userID: 0,
        username: '',
        nickName: '',
        avatar: '',
        role: 0,
        lookCount: 0,
        articleCount: 0,
        fansCount: 0,
        followCount: 0,
        place: '',
        codeAge: 0,
        openFollow: false,
        openCollect: false,
        openFans: false,
        homeStyleID: 0,
    })

    const getUserBaseInfo = async (id: number) => {
        const res = await userInfoApi({ id })
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Object.assign(userBase, res.data)
    }
    return {
        userBase,
        getUserBaseInfo,
    }
})
