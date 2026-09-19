<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type userLoginRequest } from '@/api/user-api.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { Form, FormItem, Input, Button } from '@arco-design/web-vue'
import { base64Img } from './xxx.ts'

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

const pwdLogin = async () => {
    const val = await formRef.value.validate()
    if (val) return
    await userStore.login(form)
    await userStore.getUserInfo()

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
            <img :src="base64Img" alt="" />
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
