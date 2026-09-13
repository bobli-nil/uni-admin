<script setup lang="ts">
import { ref } from 'vue'
import FTheme from '@/components/common/f-theme.vue'
import FUserDropdown from '@/components/common/f-user-dropdown.vue'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()

interface Props {
    noScroll?: boolean
    scrollTop?: number
}
const props = defineProps<Props>()
const { noScroll = false, scrollTop = 60 } = props

const isShow = ref(false)

if (!noScroll) {
    window.onscroll = () => {
        const top = document.documentElement.scrollTop
        isShow.value = top > scrollTop
    }
}
</script>

<template>
    <div class="f-nav" :class="{ isShow }">
        <div class="container">
            <div class="left">
                <router-link to="/">首页</router-link>
            </div>
            <div class="right">
                <router-link v-if="!userStore.userInfo" to="/login">登录</router-link>
                <f-user-dropdown v-else></f-user-dropdown>
                <f-theme class="theme"></f-theme>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-nav {
    width: 100vw;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
    background-color: var(--color-bg-1);
    transition: all 0.3s;
    .container {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
            color: var(--color-text-2);
            font-size: 16px;
            text-decoration: none;
            &.router-link-exact-active {
                color: @primary-6;
            }
        }
        .left {
            width: 70%;
        }
        .right {
            display: flex;
            align-items: center;
            .theme {
                margin-left: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>
