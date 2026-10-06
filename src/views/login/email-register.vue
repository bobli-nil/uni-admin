<script setup lang="ts">
import { ref } from 'vue'
import SendEmail from '@/components/web/login/send-email.vue'
import FormTitle from '@/views/login/form-title.vue'
import type { SendEmailResponse } from '@/api/user-api.ts'
import EmailRegisterForm from '@/components/web/login/email-register.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
    category: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:category', val: string): void
}>()

const step = ref<1 | 2>(1)

const emailID = ref('')

const sendEmailOk = (val: SendEmailResponse) => {
    emailID.value = val.emailID
    step.value = 2
}

const goLogin = () => {
    emits('update:category', 'login')
}

const registerOk = (token: string) => {
    localStorage.setItem('token', token)
    router.push('/')
}
</script>

<template>
    <div v-if="category === 'register'" class="email-register">
        <form-title title="注册"></form-title>
        <send-email v-if="step === 1" @ok="sendEmailOk"></send-email>
        <email-register-form v-else :email-i-d="emailID" @ok="registerOk"></email-register-form>
        <div class="goLogin">已有账号，去<span class="goLoginTxt" @click="goLogin">登录</span></div>
    </div>
</template>

<style scoped lang="less">
.email-register {
    width: 100%;
    .goLogin {
        text-align: center;
        .goLoginTxt {
            text-decoration: underline;
            color: rgb(var(--arcoblue-6));
            cursor: pointer;
        }
    }
}
</style>
