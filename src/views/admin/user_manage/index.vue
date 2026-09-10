<script setup lang="ts">
import { ref } from 'vue'
import FList, {type filterGroupType} from '@/components/admin/f-list.vue'
import FModalForm from '@/components/admin/f-modal-form.vue'
import { userListApi } from '@/api/user-api.ts'
import {type columnType} from "@/components/admin/f-list.vue";
import {type formListType} from '@/components/admin/f-modal-form.vue'

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
const add = () => {
    visible.value = true
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

const visible = ref(false)
const formList: formListType[] = [
    {
        label: '昵称',
        field: 'nickname',
        type: 'input',
        rules: [{ required: true }],
        validateTrigger: 'blur',
    },
    {
        label: '角色',
        field: 'role',
        type: 'select',
        multiple: true,
        rules: [{ required: true }],
        validateTrigger: 'blur',
        source: [
            { label: '管理员', value: 1 },
            { label: '用户', value: 2 },
        ]
    },
    {
        label: '角色',
        field: 'role1',
        type: 'switch',
        source: [
            { label: '管理员', value: 1 },
            { label: '用户', value: 2 },
        ]
    },
    {
        label: '角色3',
        field: 'role2',
    },
]
const ok = (form: Record<string, any>) => {
    console.log('ok', form)
}

</script>

<template>
    <div>
        <f-modal-form
            v-model:visible="visible"
            title="创建用户"
            :form-list="formList"
            @ok="ok"
        >
            <template #role2="{form}">
                <a-select
                    v-model="form['role2']"
                    placeholder="角色3"
                    :options="[{ label: '管理员', value: 1 }, { label: '用户', value: 2 }]"
                ></a-select>
            </template>
        </f-modal-form>
        <f-list
            ref="fListRef"
            :url="userListApi"
            :columns="columns"
            :actionGroup="actionGroup"
            :filter-group="filters"
            no-batch-delete
            @delete="remove"
            @add="add"
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
