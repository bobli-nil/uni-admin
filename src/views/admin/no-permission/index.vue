<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="no-permission-container">
        <a-result status="403" title="抱歉，您没有权限访问此页面">
            <template #extra>
                <a-space>
                    <a-button @click="router.back()">返回上一页</a-button>
                    <a-button type="primary" @click="router.push('/')">回到首页</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>

<style scoped>
.no-permission-container {
    display: flex;
    justify-content: center;
    height: 100vh;
    padding-top: 10%;
    background: var(--color-bg-1);
}
</style>
