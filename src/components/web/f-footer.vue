<script setup lang="ts">
import beian from '@/assets/img/beian.png'
</script>

<template>
    <div class="f-footer">
        <div class="bei-an">
            <img :src="beian" alt="" />
            <a href="https://beian.miit.gov.cn">备案号：苏ICP备2025163885号-1</a>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-footer {
    display: flex;
    justify-content: center;
    background-color: var(--color-bg-1);
    .bei-an {
        display: flex;
        align-items: center;
        padding: 20px 0;
        a {
            margin-left: 5px;
            color: var(--color-text-2);
            text-decoration: none;
        }
    }
}
</style>
