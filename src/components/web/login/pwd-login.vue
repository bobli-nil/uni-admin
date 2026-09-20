<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type userLoginRequest } from '@/api/user-api.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { Form, FormItem, Input, Button } from '@arco-design/web-vue'
import FCaptcha from '@/components/web/f-captcha.vue'

const emits = defineEmits<{
    (e: 'ok'): void
}>()

const userStore = useUserStore()

const formRef = ref()

const form = reactive<userLoginRequest>({
    val: '',
    password: '',
    captchaId: '',
    captchaCode: '',
})

const captchaRef = ref()

const pwdLogin = async () => {
    const val = await formRef.value.validate()
    if (val) return
    const res = await userStore.login(form)
    if (res.code) {
        captchaRef.value?.getData()
        return
    }

    emits('ok')
}
</script>

<template>
    <Form
        ref="formRef"
        :model="form"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <FormItem field="val" :rules="[{ required: true, message: '请输入用户名' }]">
            <Input v-model="form.val" placeholder="用户名"></Input>
        </FormItem>
        <FormItem field="password" :rules="[{ required: true, message: '请输入密码' }]">
            <Input v-model="form.password" type="password" placeholder="密码"></Input>
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
            <Button type="primary" long @click="pwdLogin">登录</Button>
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
