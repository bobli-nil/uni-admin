<script setup lang="ts">
import { theme, setTheme, loadTheme } from '@/components/common/f-theme.ts'
loadTheme()
</script>

<template>
  <span v-if="theme === 'dark'" title="白天模式">
    <icon-sun-fill @click="setTheme('light')" />
  </span>
  <span v-if="theme === 'light'" title="黑夜模式">
    <icon-moon-fill @click="setTheme('dark')" />
  </span>
</template>

<style scoped></style>
