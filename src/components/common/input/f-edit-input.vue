<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
interface Props {
    value: string
    placeholder?: string
    type?: 'input' | 'textarea'
}
const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'ok', val: string): void
}>()

const text = ref('')

watch(
    () => props.value,
    () => {
        text.value = props.value
    },
    { immediate: true },
)

const inputRef = ref()
const isEdit = ref(false)

const inputBlur = (e: FocusEvent) => {
    isEdit.value = false
}

const edit = async () => {
    isEdit.value = true
    await nextTick()
    inputRef.value.focus()
}

const changeText = (value: string): void => {
    text.value = value
    emits('ok', value)
}
</script>

<template>
    <div class="f-input-edit">
        <span :class="[type]" v-if="!isEdit">
            {{ value }}
        </span>
        <template v-else>
            <a-input
                v-if="type !== 'textarea'"
                ref="inputRef"
                v-model="text"
                :placeholder="placeholder"
                @change="changeText"
                @blur="inputBlur"
            ></a-input>
            <a-textarea
                v-else
                ref="inputRef"
                v-model="text"
                :placeholder="placeholder"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                @change="changeText"
                @blur="inputBlur"
            ></a-textarea>
        </template>
        <a href="javascript:void 0" @click="edit"> <icon-edit></icon-edit> 编辑 </a>
    </div>
</template>

<style scoped lang="less">
.f-input-edit {
    display: flex;
    align-items: center;
    span.textarea {
        display: inline-block;
        max-width: 500px;
        word-break: break-all;
    }
    a {
        color: rgb(var(--primary-6));
        text-decoration: none;
        :deep(.arco-icon) {
            margin-left: 10px;
        }
    }
    :deep(.arco-input-wrapper) {
        width: fit-content;
    }
    :deep(.arco-textarea-wrapper) {
        width: 300px;
    }
}
</style>
