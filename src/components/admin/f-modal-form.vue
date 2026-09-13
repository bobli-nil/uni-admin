<script setup lang="ts">
import { ref } from 'vue'
import type { FieldRule } from '@arco-design/web-vue'
import type { optionsType, optionsFunc } from '@/api'
import { Message } from '@arco-design/web-vue'

export interface formListType {
    label: string
    field: string
    type?: 'input' | 'textarea' | 'select' | 'switch' | 'radio' | 'password'
    validateTrigger?:
        | 'focus'
        | 'input'
        | 'blur'
        | 'change'
        | ('focus' | 'input' | 'blur' | 'change')[]
    rules?: FieldRule<any> | FieldRule<any>[]
    source?: optionsType[] | optionsFunc
    options?: optionsType[]
    autoSize?: boolean | { minRows?: number | undefined; maxRows?: number | undefined }
    multiple?: boolean
}

interface Props {
    title: string
    visible: boolean
    formList: formListType[]
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void
    (e: 'ok', form: Record<string, any>): void
}>()

const formRef = ref()
const form = ref<Record<string, any>>({})

const cancel = () => {
    emits('update:visible', false)
}
const beforeOk = async () => {
    const val = await formRef.value.validate()
    if (val) return
    emits('ok', form.value)
}

const usedFormList = ref<formListType[]>([])
const initUsedFormList = async () => {
    usedFormList.value = []
    for (const f of props.formList) {
        if (typeof f.source === 'function') {
            const res = await f.source()
            if (res.code) {
                Message.error(res.msg)
                return
            }
            f.source = res.data
        } else {
            f.options = f.source
        }
        usedFormList.value.push(f)
    }
}
initUsedFormList()

const setForm = (obj: Record<string, any>) => {
    form.value = obj
}

defineExpose({
    setForm,
    formRef,
})
</script>

<template>
    <a-modal :title="title" :visible="visible" :on-before-ok="beforeOk" @cancel="cancel">
        <a-form ref="formRef" :model="form">
            <a-form-item
                v-for="item in formList"
                :field="item.field"
                :label="item.label"
                :rules="item.rules"
                :validate-trigger="item.validateTrigger"
            >
                <template v-if="item.type === 'input' || item.type === 'password'">
                    <a-input
                        v-model="form[item.field]"
                        :type="item.type === 'input' ? 'text' : 'password'"
                        :placeholder="item.label"
                    ></a-input>
                </template>
                <template v-else-if="item.type === 'select'">
                    <a-select
                        :multiple="item.multiple"
                        v-model="form[item.field]"
                        allow-clear
                        :placeholder="item.label"
                        :options="item.options"
                    ></a-select>
                </template>
                <template v-else-if="item.type === 'switch'">
                    <a-switch v-model="form[item.field]"></a-switch>
                </template>
                <template v-else-if="item.type === 'radio'">
                    <a-radio-group
                        v-model="form[item.field]"
                        :options="item.options"
                    ></a-radio-group>
                </template>
                <template v-else-if="item.type === 'textarea'">
                    <a-textarea
                        v-model="form[item.field]"
                        :placeholder="item.label"
                        allow-clear
                        :auto-size="item.autoSize"
                    ></a-textarea>
                </template>
                <template v-else>
                    <slot :name="item.field" :form="form"></slot>
                </template>
                <template #help>
                    <slot :name="`${item.field}-help`" v-bind="item"></slot>
                </template>
            </a-form-item>
        </a-form>

        <template #footer>
            <slot name="footer" :form="form"></slot>
        </template>
    </a-modal>
</template>

<style scoped></style>
