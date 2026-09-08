<script setup lang="ts">
import type {Component} from "vue"
import { useUserStore } from '@/stores/userStore'
import FComponent from '@/components/common/f-component.vue'

const userStore = useUserStore()

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}

interface Props {
  list: MenuType[]
}

const props = defineProps<Props>()

</script>

<template>
  <template v-for="menu in props.list">
    <template v-if="!menu.children">
      <a-menu-item :key="menu.name" v-if="menu.role === undefined || menu.role === userStore?.userInfo?.role">
        <template #icon>
          <f-component :is="menu.icon"></f-component>
        </template>
        {{menu.title}}
      </a-menu-item>
    </template>
    <template v-else>
      <a-sub-menu :key="menu.name" v-if="menu.role === undefined || menu.role === userStore?.userInfo?.role" :title="menu.title">
        <template #icon>
          <f-component :is="menu.icon"></f-component>
        </template>
        <f-menu-item :list="menu.children"></f-menu-item>
      </a-sub-menu>
    </template>
  </template>
</template>

<style scoped>

</style>