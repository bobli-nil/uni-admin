<script setup lang="ts">
interface Props {
    count: number
}
const props = defineProps<Props>()
</script>

<template>
    <div class="f-point">
        <a-badge :count="count" dot :dotStyle="{ width: '5px', height: '5px' }">
            <slot></slot>
        </a-badge>
    </div>
</template>

<style lang="less">
.f-point {
    .arco-badge-dot {
        top: 1px;
        right: -3px;
    }
}
.arco-dropdown-option-content {
    padding: 0 8px;
}
</style>
