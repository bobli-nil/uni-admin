<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
    <a-breadcrumb>
        <template v-for="item in route.matched" :key="item.path">
            <a-breadcrumb-item v-if="item.name !== 'home'">{{
                item.meta?.title
            }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<style scoped></style>
