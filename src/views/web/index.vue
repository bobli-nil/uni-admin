<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const cacheViews = computed(() => {
    const routes = router.getRoutes()
    return routes.filter((r) => r.meta?.keepAlive && r.name).map((r) => r.name as string)
})
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive :include="cacheViews">
            <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
    </router-view>
</template>

<style scoped></style>
