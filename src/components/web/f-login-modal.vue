<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@arco-design/web-vue'
import PwdLogin from '@/components/web/login/pwd-login.vue'
import EmailLogin from '@/components/web/login/email-login.vue'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()

interface Props {
    visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>()

const cancel = () => {
    emits('update:visible', false)
}

const ok = () => {
    emits('update:visible', false)
}

const registerOk = (token: string): void => {
    console.log('registerOk', token)
    localStorage.setItem('token', token)
    emits('update:visible', false)
    userStore.getUserInfo()
}

const type = ref(1) // 1pwd 2邮箱
</script>

<template>
    <Modal
        class="f-login-modal"
        :width="380"
        :visible="visible"
        @cancel="cancel"
        @ok="ok"
        :footer="false"
    >
        <div class="banner">
            <div class="title">登录</div>
        </div>
        <pwd-login
            v-if="userStore.siteInfo?.login.usernamePwdLogin && type === 1"
            @ok="ok"
        ></pwd-login>
        <email-login
            v-if="userStore.siteInfo?.login.emailPwdLogin && type === 2"
            @register-ok="registerOk"
        ></email-login>
        <div v-if="userStore.siteInfo?.login.emailPwdLogin" class="tip">
            <span v-if="type === 1">
                还没有账号？<a href="javascript:void 0" @click="type = 2">去注册</a>
            </span>
            <span v-else @click="type = 1"> 已有账号？<a href="javascript:void 0">去登录</a> </span>
        </div>
    </Modal>
</template>

<style lang="less">
.f-login-modal {
    .arco-modal-header {
        display: none;
    }
    .arco-modal-body {
        padding: 0;
    }
    .banner {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: rgb(var(--primary-6));
    }
    .arco-form {
        padding: 10px 20px 0px 20px;
    }
    .tip {
        padding: 0 20px 30px;
    }
}
</style>
