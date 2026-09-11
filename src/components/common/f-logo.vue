<script setup lang="ts">
import logo from '@/assets/img/logo.png'
import { collapsed } from '@/components/admin/f-menu'
</script>

<template>
    <div class="f_logo" :class="{ collapsed }">
        <img :src="logo" width="35" alt="" />
        <span class="txt">UniAdmin</span>
    </div>
</template>

<style scoped>
.f_logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid var(--color-neutral-2);
    &.collapsed {
        .txt {
            display: none;
        }
    }
    .txt {
        margin-left: 8px;
        color: #072ca6;
        font-weight: bold;
        font-size: 26px;
    }
}
</style>
