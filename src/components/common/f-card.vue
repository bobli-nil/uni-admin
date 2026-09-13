<script setup lang="ts">
interface Props {
    title: string
}
defineProps<Props>()
</script>

<template>
    <div class="f-card">
        <div class="title">{{ title }}</div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-card {
    background: var(--color-bg-1);
    border-radius: 5px;
    margin-bottom: 20px;
    .title {
        padding: 20px;
        font-size: 18px;
        font-weight: bold;
        border-bottom: @f_border;
    }
    .body {
        padding: 20px;
    }
}
</style>
