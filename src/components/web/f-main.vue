<script setup lang="ts">

</script>

<template>
    <div class="f-main">
        <div class="f-container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-main {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 122px);
    > .f-container {
        width: 1200px;
    }
}
</style>