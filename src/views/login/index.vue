<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type userLoginRequest } from '@/api/user-api'
import { useUserStore } from '@/stores/userStore'
import FCaptcha from '@/components/web/f-captcha.vue'

const userStore = useUserStore()
const formRef = ref()

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
</script>

<template>
    <div class="login-view">
        <div class="login-mask">
            <a-form
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
            </a-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-view {
    position: relative;
    height: 100vh;
    background: url('http://cdn.limingru.com/web/bg.png') no-repeat;
    background-size: cover;
    .login-mask {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 100vh;
        padding: 0 30px;
        background: var(--login-bg);
        position: absolute;
        right: 0;
        .title {
            text-align: center;
            margin-bottom: 25px;
            font-size: 20px;
            font-weight: 600;
            color: @primary-6;
        }
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
