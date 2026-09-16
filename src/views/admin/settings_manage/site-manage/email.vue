<script setup lang="ts">
import FSite from '@/components/admin/site/f-site.vue'
</script>

<template>
    <div class="email-view">
        <f-site name="email" v-slot="{ data }">
            {{ data }}
        </f-site>
    </div>
</template>

<style scoped lang="less"></style>
