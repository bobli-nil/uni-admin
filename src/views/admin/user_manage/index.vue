<script setup lang="ts">
import FList from '@/components/admin/f-list.vue'
import { userListApi } from '@/api/user-api.ts'
import {type columnType} from "@/components/admin/f-list.vue";

const columns: columnType[] = [
    { title: 'ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '头像', slotName: 'avatar' },
    { title: '角色', dataIndex: 'role' },
    { title: '时间', slotName: 'createdAt', dateFormat: 'current' },
    { title: '操作', slotName: 'action' },
]
</script>

<template>
    <div>
        <f-list :url="userListApi" :columns="columns">
            <template #avatar="data">{{data.avatar}}</template>
            <template #action-left>
                <a-button>预览</a-button>
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less">
</style>
