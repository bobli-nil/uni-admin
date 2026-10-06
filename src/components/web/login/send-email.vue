<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, FormItem, Input, Button, Message } from '@arco-design/web-vue'
import { sendEmailApi, type SendEmailRequest, type SendEmailResponse } from '@/api/user-api.ts'
import { useUserStore } from '@/stores/userStore.ts'
import FCaptcha from '@/components/web/f-captcha.vue'

const userStore = useUserStore()

interface Props {
    type?: number
}
const props = defineProps<Props>()

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

const loading = ref(false)

const captchaRef = ref()

const handler = async () => {
    const value = await formRef.value.validate()
    if (value) return

    if (props.type) {
        form.type = props.type
    }
    loading.value = true
    const res = await sendEmailApi(form)
    if (res.code) {
        Message.error(res.msg)
        captchaRef.value?.getData()
        return
    }
    loading.value = false
    emits('ok', res.data)
}
</script>

<template>
    <a-form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <a-form-item field="email" :rules="[{ required: true, message: '请输入邮箱' }]">
            <a-input v-model="form.email" placeholder="邮箱"></a-input>
        </a-form-item>
        <a-form-item
            v-if="userStore.siteInfo?.login.captcha"
            content-class="captcha-item"
            field="captchaCode"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
            <a-input v-model="form.captchaCode" placeholder="图形验证码"></a-input>
            <f-captcha ref="captchaRef" v-model="form.captchaId"></f-captcha>
        </a-form-item>
        <a-form-item>
            <a-button :loading="loading" type="primary" long @click="handler">验证邮箱</a-button>
        </a-form-item>
    </a-form>
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
