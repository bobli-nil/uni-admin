<script setup lang="ts">
import { useUserCenterStore } from '@/stores/userCenterStore.ts'
import { showUpdatePwd } from '@/components/common/f-update-password.ts'
import { showUpdateEmail } from '@/components/common/f-update-email.ts'

const userCenterStore = useUserCenterStore()

const changePwd = () => {
    showUpdatePwd()
}

const changeEmail = async () => {
    await showUpdateEmail()
    await userCenterStore.getUserDetail()
}
</script>

<template>
    <div class="user-center-account-view">
        <div class="head">账号设置</div>
        <div class="body">
            <a-form :model="{}" :label-col-props="{ span: 2 }">
                <a-form-item label="密码">
                    <span v-if="userCenterStore.userDetail?.usePassword">
                        <span class="txt">******</span>
                        <a href="javascript:void 0" @click="changePwd">修改密码</a>
                    </span>
                    <span v-else>未启用</span>
                </a-form-item>
                <a-form-item label="邮箱">
                    <span class="txt" v-if="userCenterStore.userDetail?.email">
                        {{ userCenterStore.userDetail?.email }}
                    </span>
                    <a href="javascript:void 0" @click="changeEmail">
                        {{ userCenterStore.userDetail?.email ? '修改邮箱' : '绑定邮箱' }}
                    </a>
                </a-form-item>
                <a-form-item label="登录记录">
                    <router-link to="/">查看记录</router-link>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.user-center-account-view {
    background: var(--color-bg-1);
    border-radius: 5px;
    .head {
        padding: 20px;
        border-bottom: @f_border;
        font-weight: bold;
        font-size: 16px;
    }
    .body {
        padding: 20px;
        :deep(.arco-row) {
            margin-bottom: 10px;
        }
        .txt {
            margin-left: 10px;
        }
        a {
            text-decoration: none;
            margin-left: 10px;
            color: rgb(var(--primary-6));
        }
    }
}
</style>
