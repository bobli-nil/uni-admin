<script setup lang="ts">
import { captchaApi, type CaptchaResponse } from '@/api/captcha-api.ts'
import { reactive } from 'vue'
import { Message } from '@arco-design/web-vue'

interface Props {
    modelValue: string
}
const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const data = reactive<CaptchaResponse>({
    captchaId: '',
    captcha: '',
})

const getData = async () => {
    const res = await captchaApi()
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
    emits('update:modelValue', data.captchaId)
}

getData()

defineExpose({
    getData,
})
</script>

<template>
    <img :src="data.captcha" @click="getData" alt="验证码" />
</template>

<style scoped lang="less">
img {
    cursor: pointer;
}
</style>
