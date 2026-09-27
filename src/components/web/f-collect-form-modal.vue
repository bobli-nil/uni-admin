<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
import { collectCreateUpdateApi, type CollectCreateUpdateRequest } from '@/api/collect-api.ts'

interface Props {
    id?: number
    visible: boolean
    title?: string
    abstract?: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', val: boolean): void
    (e: 'ok'): void
}>()

const form = reactive<CollectCreateUpdateRequest>({
    id: 0,
    title: '',
    abstract: '',
})

watch(
    () => props.visible,
    () => {
        form.id = props.id
        form.title = props.title ?? ''
        form.abstract = props.abstract as string
    },
)

const addCollectHandler = async () => {
    const res = await collectCreateUpdateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return false
    }
    emits('ok')
    cancel()
    return true
}

const cancel = () => {
    emits('update:visible', false)
}
</script>

<template>
    <a-modal
        width="25%"
        :visible="visible"
        :title="id ? '编辑收藏夹' : '创建收藏夹'"
        :on-before-ok="addCollectHandler"
        @cancel="cancel"
    >
        <a-form
            ref="formRef"
            :model="form"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 16 }"
        >
            <a-form-item label="收藏夹标题">
                <a-input
                    v-model="form.title"
                    placeholder="收藏夹标题"
                    field="title"
                    :rules="[{ required: true, message: '请输入标题' }]"
                ></a-input>
            </a-form-item>
            <a-form-item v-if="abstract !== undefined" label="收藏夹简介">
                <a-textarea
                    v-model="form.abstract"
                    placeholder="收藏夹简介"
                    :auto-size="{ minRows: 2, maxRows: 4 }"
                ></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped lang="less"></style>
