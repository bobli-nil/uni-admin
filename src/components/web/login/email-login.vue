<script setup lang="ts">
import { ref } from 'vue'
import SendEmail from '@/components/web/login/send-email.vue'
import EmailRegister from '@/components/web/login/email-register.vue'
import type { SendEmailResponse } from '@/api/user-api.ts'

const step = ref<1 | 2>(1)

const emailID = ref<string>('')

const emits = defineEmits<{
    (e: 'registerOk', value: string): void
}>()

const sendEmailOk = (data: SendEmailResponse): void => {
    emailID.value = data.emailID
    step.value = 2
}

const registerOk = (token: string): void => {
    emits('registerOk', token)
}
</script>

<template>
    <send-email v-if="step === 1" @ok="sendEmailOk"></send-email>
    <email-register v-else :emailID="emailID" @ok="registerOk"></email-register>
</template>

<style scoped lang="less"></style>
