<script setup lang="ts">
import { ref } from 'vue'
import FList, {type filterGroupType} from '@/components/admin/f-list.vue'
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

const remove = (keys: number[] | string[]): void => {
    console.log('delete', keys)
}
const update = (record: any) => {
    console.log('update', record)
}

const fListRef = ref()

const actionGroup = [
    {
        label: '批量升级',
        callback: (keys: number[] | string[]) => {
            console.log('批量升级', keys)
        }
    }
]

const filters: filterGroupType[] = [
    {
        label: '角色过滤',
        source: [
            { label: '管理员', value: 1 },
            { label: '用户', value: 2 },
        ],
        column: 'role',
        // callback: (value: number | string) => {
        //     console.log('父', value)
        // }
    },
    {
        label: 'ip过滤',
        source: [
            { label: '内网', value: 1 },
            { label: '外网', value: 2 },
        ],
        column: 'ip',
        callback: async (value: number | string) => {
            console.log('父', value)
            await fListRef.value?.getList({
                ip: value
            })
            console.log('延迟的data', fListRef.value?.data)
        }
    }
]

</script>

<template>
    <div>
        <f-list
            ref="fListRef"
            :url="userListApi"
            :columns="columns"
            :actionGroup="actionGroup"
            :filter-group="filters"
            no-batch-delete
            @delete="remove"
        >
            <template #avatar="data">{{data.avatar}}</template>
            <template #action-left>
                <a-button>预览</a-button>
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less">
</style>
