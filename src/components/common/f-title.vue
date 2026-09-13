<script setup lang="ts"></script>

<template>
    <div class="f-title">
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
        width: 5px;
        height: 1.5rem;
        margin-right: 8px;
        background-color: rgb(var(--primary-6));
    }
}
</style>
