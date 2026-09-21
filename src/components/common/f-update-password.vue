<script setup lang="ts">
import { Modal, Form, FormItem, Input, Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { userPasswordUpdateApi, type UserPwdUpdateRequest, userUpdateApi } from '@/api/user-api.ts'

interface Props {
    visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>()

const formRef = ref()

const form = reactive<UserPwdUpdateRequest>({
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
})

const cancel = () => {
    emits('update:visible', false)
}

const ok = async () => {
    const val = await formRef.value.validate()
    if (val) {
        return false
    }

    const res = await userPasswordUpdateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return false
    }
    Message.success(res.msg)
    emits('update:visible', false)
    return true
}

const rePwdValidate = (value: string | undefined, callback: (error?: string) => void) => {
    if (value !== form.newPassword) {
        callback('两次密码不一致')
    }
}
</script>

<template>
    <Modal title="修改密码" :width="400" :visible="visible" @cancel="cancel" :on-before-ok="ok">
        <Form
            ref="formRef"
            :model="form"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
        >
            <FormItem
                label="原密码"
                field="oldPassword"
                validate-trigger="blur"
                :rules="[{ required: true, message: '请输入原密码' }]"
            >
                <Input v-model="form.oldPassword" type="password" placeholder="原密码"></Input>
            </FormItem>
            <FormItem
                label="新密码"
                field="newPassword"
                validate-trigger="blur"
                :rules="[{ required: true, message: '请输入新密码' }]"
            >
                <Input v-model="form.newPassword" type="password" placeholder="新密码"></Input>
            </FormItem>
            <FormItem
                label="确认密码"
                field="reNewPassword"
                validate-trigger="blur"
                :rules="[{ required: true, message: '请确认密码' }, { validator: rePwdValidate }]"
            >
                <Input v-model="form.reNewPassword" type="password" placeholder="确认密码"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<style scoped lang="less"></style>
