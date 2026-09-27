<script setup lang="ts">
import FFocusList from '@/components/web/f-focus-list.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <f-focus-list :user-id="Number(route.params.id)" type="focus"></f-focus-list>
</template>

<style scoped lang="less"></style>
