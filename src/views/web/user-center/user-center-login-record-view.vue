<script setup lang="ts">
import FCard from '@/components/web/f-card.vue'
import { showUpdatePwd } from '@/components/common/f-update-password.ts'
import { Message } from '@arco-design/web-vue'
import { reactive } from 'vue'
import type { listResponse } from '@/api'
import { loginRecordApi, type LoginRecordRequest, type LoginRecordType } from '@/api/user-api.ts'
import { dateTimeFormat } from '@/utils/date.ts'

const data = reactive<listResponse<LoginRecordType>>({
    count: 0,
    list: [],
})

const getData = async () => {
    const res = await loginRecordApi({ type: 1 })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}

getData()
</script>

<template>
    <div class="user-center-login-record-view">
        <f-card title="登录日志">
            <div>
                若发现异常，请尽快 <a href="javascript:void 0" @click="showUpdatePwd()">修改密码</a>
            </div>

            <div class="login-list">
                <div class="item" v-for="item in data.list" :key="item.id">
                    <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
                    <span class="addr">{{ item.addr }}（{{ item.ip }}）</span>
                </div>
            </div>
        </f-card>
    </div>
</template>

<style scoped lang="less">
.user-center-login-record-view {
    a {
        text-decoration: none;
        color: rgb(var(--primary-6));
    }
    .login-list {
        margin-top: 10px;
        .item {
            background: var(--color-fill-1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            color: var(--color-text-1);
            &:nth-child(even) {
                background: var(--color-fill-2);
            }
        }
    }
}
</style>
