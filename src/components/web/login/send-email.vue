<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Button, Message } from '@arco-design/web-vue'
import { sendEmailApi, type SendEmailRequest, type SendEmailResponse } from '@/api/user-api.ts'
import { useUserStore } from '@/stores/userStore.ts'
import FCaptcha from '@/components/web/f-captcha.vue'

const userStore = useUserStore()

const emits = defineEmits<{
    (e: 'ok', value: SendEmailResponse): void
}>()

const formRef = ref()

const form = reactive<SendEmailRequest>({
    type: 1,
    email: '',
    captchaId: '',
    captchaCode: '',
})

const captchaRef = ref()

const handler = async () => {
    const value = await formRef.value.validate()
    console.log('value', value)
    if (value) return

    const res = await sendEmailApi(form)
    if (res.code) {
        Message.error(res.msg)
        captchaRef.value?.getData()
        return
    }
    emits('ok', res.data)
}
</script>

<template>
    <Form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <FormItem field="email" :rules="[{ required: true, message: '请输入邮箱' }]">
            <Input v-model="form.email" placeholder="邮箱"></Input>
        </FormItem>
        <FormItem
            v-if="userStore.siteInfo?.login.captcha"
            content-class="captcha-item"
            field="captchaCode"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
            <Input v-model="form.captchaCode" placeholder="图形验证码"></Input>
            <f-captcha ref="captchaRef" v-model="form.captchaId"></f-captcha>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="handler">验证邮箱</Button>
        </FormItem>
    </Form>
</template>

<style scoped lang="less">
.captcha-item {
    img {
        height: 30px;
        width: 94px;
        margin-left: 10px;
    }
}
</style>
