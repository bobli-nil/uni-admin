<script setup lang="ts">
import type { FileItem } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'

interface Props {
    modelValue: string
    placeholder?: string
    circle?: boolean
}

defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const inputHandler = (val: string) => {
    emits('update:modelValue', val)
}

const token = window.localStorage.getItem('token') as string

// 上传的回调
const fileUploadCallback = (file: FileItem) => {
    const res = file.response
    console.log('res', res)
    if (res.code === 0) {
        emits('update:modelValue', res.data)
        Message.success('上传成功')
    } else {
        Message.error(res.msg || '上传失败')
    }
}
</script>

<template>
    <div class="f-image-upload">
        <a-input
            :placeholder="placeholder"
            :model-value="modelValue"
            @input="inputHandler"
        ></a-input>
        <a-upload
            action="/api/image/upload"
            name="file"
            :multiple="false"
            :show-file-list="false"
            :headers="{ token: token }"
            @success="fileUploadCallback"
        >
            <template #upload-button>
                <a-image
                    :src="modelValue"
                    :preview="false"
                    width="70"
                    height="70"
                    fit="cover"
                    :style="{ radius: circle ? '50%' : 0 }"
                ></a-image>
            </template>
        </a-upload>
    </div>
</template>

<style scoped lang="less">
.f-image-upload {
    width: 100%;
    /deep/.arco-input-wrapper {
        margin-bottom: 10px;
    }
}
</style>
