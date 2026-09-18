<script setup lang="ts">
interface Props {
    type?: 1 | 2
}
const { type = 1 } = defineProps<Props>()
</script>

<template>
    <div class="f-title" :class="'type-' + type">
        <slot></slot>
    </div>
</template>

<style scoped lang="less">
.f-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    &::before {
        display: inline-block;
        content: '';
        margin-right: 8px;
        background-color: rgb(var(--primary-6));
    }
    &.type-1 {
        &::before {
            width: 5px;
            height: 1.5rem;
        }
    }
    &.type-2 {
        &::before {
            width: 5px;
            height: 5px;
            border-radius: 50%;
        }
    }
}
</style>
