<script setup lang="ts">
import FCard from '@/components/web/f-card.vue'
import { useUserCenterStore } from '@/stores/userCenterStore.ts'
import { type UserDetailUpdateRequest, userUpdateApi } from '@/api/user-api.ts'
import { Message } from '@arco-design/web-vue'

const userCenterStore = useUserCenterStore()

const userUpdateColumn = async (
    column: 'openCollect' | 'openFollow' | 'openFans',
    value: boolean,
) => {
    const data: UserDetailUpdateRequest = {}
    data[column] = value

    const res = await userUpdateApi(data)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
}
</script>

<template>
    <div class="user-center-privacy-view">
        <f-card title="隐私设置">
            <a-form
                v-if="userCenterStore.userDetail"
                :model="userCenterStore.userDetail"
                :label-col-props="{ span: 4 }"
                label-align="left"
            >
                <a-form-item label="公开我的收藏夹">
                    <a-switch
                        v-model="userCenterStore.userDetail.userConf.openCollect"
                        @change="userUpdateColumn('openCollect', $event as boolean)"
                    ></a-switch>
                </a-form-item>
                <a-form-item label="公开我的关注列表">
                    <a-switch
                        v-model="userCenterStore.userDetail.userConf.openFollow"
                        @change="userUpdateColumn('openFollow', $event as boolean)"
                    ></a-switch>
                </a-form-item>
                <a-form-item label="公开我的关注列表">
                    <a-switch
                        v-model="userCenterStore.userDetail.userConf.openFans"
                        @change="userUpdateColumn('openFans', $event as boolean)"
                    ></a-switch>
                </a-form-item>
            </a-form>
        </f-card>
    </div>
</template>

<style scoped lang="less"></style>
