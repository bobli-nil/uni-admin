<script setup lang="ts">
import { loadTheme } from '@/components/common/f-theme.ts'
import { useUserStore } from '@/stores/userStore.ts'
loadTheme()

const userStore = useUserStore()
userStore.getSiteInfo()
</script>

<template>
    <router-view></router-view>
</template>

<style scoped></style>
