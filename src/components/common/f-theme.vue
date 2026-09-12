<script setup lang="ts">
import { theme, setTheme, loadTheme } from '@/components/common/f-theme.ts'
</script>

<template>
    <div class="f-theme">
        <span v-if="theme === 'dark'" title="白天模式">
            <icon-sun-fill @click="setTheme('light')" />
        </span>
            <span v-if="theme === 'light'" title="黑夜模式">
            <icon-moon-fill @click="setTheme('dark')" />
        </span>
    </div>
</template>

<style scoped lang="less">
</style>
