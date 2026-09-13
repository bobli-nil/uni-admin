<script setup lang="ts">
import { useRouter } from 'vue-router'
import img404 from '@/assets/img/404.png'

const router = useRouter()
const back = () => {
    router.push('/')
}
</script>

<template>
    <div class="not-found">
        <img :src="img404" width="400" alt="" />
        <div>
            <a-button type="primary" @click="back">回到首页</a-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding-top: 10%;
}
</style>
