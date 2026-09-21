<script setup lang="ts">
import { Message, Modal, Form, FormItem, Button, Input } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import SendEmail from '@/components/web/login/send-email.vue'
import {
    type SendEmailResponse,
    userEmailUpdateApi,
    type UserEmailUpdateRequest,
} from '@/api/user-api.ts'

interface Props {
    visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>()

const step = ref<1 | 2>(1)

const formRef = ref()

const form = reactive<UserEmailUpdateRequest>({
    emailID: '',
    code: '',
})

const sendEmailOk = (data: SendEmailResponse) => {
    form.emailID = data.emailID
    step.value = 2
}

const cancel = () => {
    emits('update:visible', false)
}

const handler = async () => {
    const val = await formRef.value.validate()
    if (val) return

    const res = await userEmailUpdateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    emits('update:visible', false)
}
</script>

<template>
    <Modal :visible="visible" title="修改邮箱" :width="400" :footer="false" @cancel="cancel">
        <send-email v-if="step === 1" :type="3" @ok="sendEmailOk"></send-email>
        <Form
            v-if="step === 2"
            ref="formRef"
            :model="form"
            :label-col-props="{ span: 0 }"
            :wrapper-col-props="{ span: 24 }"
        >
            <FormItem
                field="code"
                validate-trigger="blur"
                :rules="[{ required: true, message: '请输入邮箱验证码' }]"
            >
                <Input v-model="form.code" placeholder="邮箱验证码" />
            </FormItem>
            <Button type="primary" long @click="handler">确认</Button>
        </Form>
    </Modal>
</template>

<style scoped lang="less"></style>
