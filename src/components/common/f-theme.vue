<script setup lang="ts">
import { theme, setTheme, loadTheme } from '@/components/common/f-theme.ts'
loadTheme()
</script>

<template>
  <icon-sun-fill v-if="theme === 'dark'" @click="setTheme('light')" />
  <icon-moon-fill v-if="theme === 'light'" @click="setTheme('dark')" />
</template>

<style scoped></style>
