<script setup lang="ts">
import { ref, reactive } from 'vue'
import FList from '@/components/admin/f-list.vue'
import FUser from '@/components/common/f-user.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import { Message } from '@arco-design/web-vue'
import { userListApi, userUpdateAdminApi, type UserUpdateAdminRequest } from '@/api/user-api.ts'
import { type columnType } from '@/components/admin/f-list.vue'
import { type UserListItem } from '@/api/user-api.ts'
import { RoleOptions } from '@/options/options.ts'

const columns: columnType[] = [
    { title: 'ID', dataIndex: 'id' },
    { title: '头像', slotName: 'avatar' },
    { title: '简介', dataIndex: 'abstract' },
    { title: '地址', slotName: 'addr' },
    { title: '发文数', dataIndex: 'articleCount' },
    { title: '角色', slotName: 'role' },
    { title: '注册时间', dataIndex: 'createdAt', type: 'date', dateFormat: 'current' },
    { title: '最后登录时间', dataIndex: 'lastLoginDate', type: 'date', dateFormat: 'current' },
    { title: '操作', slotName: 'action' },
]

const visible = ref(false)
const form = reactive<UserUpdateAdminRequest>({
    userId: 0,
    username: '',
    nickname: '',
    avatar: '',
    abstract: '',
    role: 2,
})

const fListRef = ref()

const remove = (keys: number[] | string[]): void => {
    console.log('delete', keys)
}

const update = (record: UserListItem): void => {
    console.log('update', record)
    form.userId = record.id
    form.username = record.username
    form.avatar = record.avatar
    form.abstract = record.abstract
    form.role = record.role

    visible.value = true
}

const handler = async () => {
    const res = await userUpdateAdminApi(form)
    if (res.code) {
        Message.error(res.msg)
        return false
    }
    Message.success(res.msg)
    fListRef.value.getList()
    return true
}

const getRole = (roleID: number) => {
    const obj = RoleOptions.find((item) => item.value === roleID)
    if (obj) {
        return obj.label
    }
    return '-'
}
</script>

<template>
    <div>
        <a-modal title="编辑用户" ref="modalRef" v-model:visible="visible" :on-before-ok="handler">
            <a-form :model="form">
                <a-form-item label="用户名">
                    <a-input v-model="form.username" placeholder="用户名"></a-input>
                </a-form-item>
                <a-form-item label="昵称">
                    <a-input v-model="form.nickname" placeholder="昵称"></a-input>
                </a-form-item>
                <a-form-item label="头像">
                    <f-image-upload v-model="form.avatar"></f-image-upload>
                </a-form-item>
                <a-form-item label="角色">
                    <a-radio-group v-model="form.role">
                        <a-radio v-for="r in RoleOptions" :value="r.value" :key="r.value">
                            {{ r.label }}
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
        <f-list
            ref="fListRef"
            :url="userListApi"
            :columns="columns"
            no-batch-delete
            no-add
            @update="update"
            @delete="remove"
        >
            <template #avatar="{ record }: { record: UserListItem }">
                <f-user :avatar="record.avatar" :nickname="record.nickname"></f-user>
            </template>
            <template #addr="{ record }: { record: UserListItem }">
                {{ record.ip + '/' + record.addr }}
            </template>
            <template #role="{ record }: { record: UserListItem }">
                {{ getRole(record.role) }}
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less"></style>
