<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
    value: string[]
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'ok', val: string[]): void
}>()

const tags = ref<string[]>([])

watch(
    () => props.value,
    (value: string[]) => {
        tags.value = JSON.parse(JSON.stringify(value))
    },
)

const showInput = ref<boolean>(false)

const inputVal = ref('')

const handleAdd = () => {
    if (inputVal.value) {
        tags.value.push(inputVal.value)
        inputVal.value = ''
        emits('ok', tags.value)
    }
    showInput.value = false
}

const handleEdit = () => {
    inputVal.value = ''
    showInput.value = true
}

const handleRemove = (key: string) => {
    tags.value = tags.value.filter((tag) => tag !== key)
    emits('ok', tags.value)
}
</script>

<template>
    <a-tag
        v-for="(tag, index) of tags"
        :key="tag"
        :closable="index !== 0"
        style="margin-right: 10px"
        @close="handleRemove(tag)"
    >
        {{ tag }}
    </a-tag>

    <a-input
        v-if="showInput"
        ref="inputRef"
        :style="{ width: '90px' }"
        size="mini"
        v-model.trim="inputVal"
        placeholder="标签"
        @keyup.enter="handleAdd"
        @blur="handleAdd"
    />
    <a-tag
        v-else
        :style="{
            width: '90px',
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
        }"
        @click="handleEdit"
    >
        <template #icon>
            <icon-plus />
        </template>
        添加标签
    </a-tag>
</template>

<style scoped lang="less"></style>
