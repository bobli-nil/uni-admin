<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Button, Message } from '@arco-design/web-vue'
import { emailRegisterApi, type EmailRegisterRequest } from '@/api/user-api.ts'

interface Props {
    emailID: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'ok', value: string): void
}>()

const formRef = ref()

const form = reactive<EmailRegisterRequest>({
    emailID: '',
    code: '',
    pwd: '',
    rePwd: '',
})

const rePwdValidate = (value: string | undefined, callback: (error?: string) => void) => {
    if (form.pwd !== value) {
        callback('密码不一致')
    }
}

const handler = async () => {
    const value = await formRef.value.validate()
    if (value) return

    form.emailID = props.emailID
    const res = await emailRegisterApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    emits('ok', res.data.token)
}
</script>

<template>
    <Form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <FormItem field="code" :rules="[{ required: true, message: '请输入邮箱验证码' }]">
            <Input v-model="form.code" placeholder="邮箱验证码"></Input>
        </FormItem>
        <FormItem field="pwd" :rules="[{ required: true, message: '请输入密码' }]">
            <Input v-model="form.pwd" type="password" placeholder="密码"></Input>
        </FormItem>
        <FormItem
            field="rePwd"
            :rules="[{ required: true, message: '请再次输入密码' }, { validator: rePwdValidate }]"
        >
            <Input v-model="form.rePwd" type="password" placeholder="确认密码"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="handler">注册</Button>
        </FormItem>
    </Form>
</template>

<style scoped lang="less"></style>
