<script setup lang="ts">
interface Props {
    title: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="form-title">{{ title }}</div>
</template>

<style scoped lang="less">
.form-title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 600;
    color: @primary-6;
}
</style>
