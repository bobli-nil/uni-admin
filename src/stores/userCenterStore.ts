import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Message } from '@arco-design/web-vue'
import { userDetailApi, type UserDetailType } from '@/api/user-api.ts'

interface userCenterStore {
    userDetail: Ref<UserDetailType | null>
    getUserDetail: () => Promise<void>
}

export const useUserCenterStore = defineStore('userCenter', (): userCenterStore => {
    const userDetail = ref<UserDetailType | null>(null)

    const getUserDetail = async () => {
        const res = await userDetailApi()
        if (res.code) {
            Message.error(res.msg)
            return
        }
        userDetail.value = res.data
    }

    return {
        userDetail,
        getUserDetail,
    }
})
