<script setup lang="ts">
interface Props {
    title: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="f-card">
        <div class="head">{{ title }}</div>
        <div class="body">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-card {
    background: var(--color-bg-1);
    border-radius: 5px;
    .head {
        padding: 20px;
        border-bottom: @f_border;
        font-size: 16px;
        font-weight: bold;
    }
    .body {
        padding: 20px;
    }
}
</style>
