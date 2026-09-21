<script setup lang="ts">
import ImgCutter from 'vue-img-cutter'
import 'vue-img-cutter/vue-img-cutter.css'
import { imageUploadApi } from '@/api/image-api.ts'
import { Message } from '@arco-design/web-vue'

const emits = defineEmits<{
    (e: 'ok', val: string): void
}>()

const cutDown = async (e: any) => {
    const res = await imageUploadApi(e.file)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    emits('ok', res.data)
}
</script>

<template>
    <ImgCutter rate="1:1" @cutDown="cutDown">
        <template #open>
            <slot></slot>
        </template>
    </ImgCutter>
</template>

<style scoped lang="less"></style>
