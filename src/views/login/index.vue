<script setup lang="ts">
import { ref } from 'vue'
import PwdLogin from './pwd-login.vue'
import EmailRegister from '@/views/login/email-register.vue'

const category = ref<'login' | 'register'>('login')
</script>

<template>
    <div class="login-register">
        <div class="form-mask">
            <pwd-login v-model:category="category"></pwd-login>
            <email-register v-model:category="category"></email-register>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-register {
    position: relative;
    height: 100vh;
    background: url('http://cdn.limingru.com/web/bg.png') no-repeat;
    background-size: cover;
    .form-mask {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 100vh;
        padding: 0 30px;
        background: var(--login-bg);
        position: absolute;
        right: 0;
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
