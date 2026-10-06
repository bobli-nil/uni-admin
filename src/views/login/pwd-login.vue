<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type userLoginRequest } from '@/api/user-api'
import { useUserStore } from '@/stores/userStore'
import FCaptcha from '@/components/web/f-captcha.vue'

const userStore = useUserStore()
const formRef = ref()

interface Props {
    category: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:category', val: string): void
}>()

const model = reactive<userLoginRequest>({
    val: '',
    password: '',
    captchaId: '',
    captchaCode: '',
})

const login = async () => {
    const val = await formRef.value.validate()
    if (val) {
        return
    }
    await userStore.login(model)
}

// 点击去注册
const goRegister = () => {
    emits('update:category', 'register')
}
</script>

<template>
    <a-form
        v-if="category === 'login'"
        ref="formRef"
        :model="model"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <div class="title">用户登录</div>
        <a-form-item field="val" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input placeholder="用户名" v-model="model.val">
                <template #prefix>
                    <icon-user />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item field="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input placeholder="密码" type="password" v-model="model.password">
                <template #prefix>
                    <icon-lock />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item
            v-if="userStore.siteInfo?.login.captcha"
            content-class="captcha-item"
            field="captchaCode"
            :rules="[{ required: true, message: '请输入验证码' }]"
        >
            <a-input v-model="model.captchaCode" placeholder="图形验证码"></a-input>
            <f-captcha ref="captchaRef" v-model="model.captchaId"></f-captcha>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" long @click="login">登录</a-button>
        </a-form-item>
        <div class="goRegister">
            没有账号，<span class="registerTxt" @click="goRegister">去注册</span>
        </div>
    </a-form>
</template>

<style scoped lang="less">
.title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 600;
    color: @primary-6;
}
.goRegister {
    text-align: center;
    .registerTxt {
        text-decoration: underline;
        color: rgb(var(--arcoblue-6));
        cursor: pointer;
    }
}
</style>

<style lang="less">
.captcha-item {
    img {
        height: 30px;
        width: 94px;
        margin-left: 10px;
    }
}
</style>
