<script setup lang="ts">
import {type Component, ref, watch} from "vue";
import {IconHome, IconUser } from "@arco-design/web-vue/es/icon";
import { collapsed } from "@/components/admin/f-menu.ts"
import { useRouter, useRoute } from "vue-router";
import FMenuItem from '@/components/admin/f-menu-item.vue'

const router = useRouter();
const route = useRoute();

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
  role?: number
}

const menuList: MenuType[] = [
  {title: "首页", name: "home", icon: IconHome},
  {
    title: "个人中心",
    name: "userCenter",
    icon: "iconfont icon-gerenzhongxin",
    children: [
      { title: "个人信息", name: "userInfo" },
    ]
  },
  {
    title: "用户管理",
    name: "userManage",
    icon: "iconfont icon-yonghuguanli",
    role: 1,
    children: [
      { title: "用户列表", name: "userList" },
    ]
  },
  {
    title: "系统设置",
    name: "settingsManage",
    icon: "iconfont icon-xitongshezhi",
    role: 1,
    children: [
      { title: "系统信息", name: "settings" },
    ]
  },
]

function menuItemClick(key: string) {
  router.push({
    name: key
  })
}

watch(() => route.name, () => {
  initRoutes()
}, {
  immediate: true,
})

function initRoutes() {
  const matched = route.matched
  if (matched.length === 3) {
    const targetSubmenuKey = (matched[1]?.name as string) + "-sub-menu"
    openKeys.value = [targetSubmenuKey]
  }
  const selectedKey = matched[matched.length - 1]?.name as string
  selectedKeys.value = [selectedKey]
}

</script>

<template>
  <div class="f-menu scroll-bar">
    <a-menu
      show-collapse-button
      v-model:collapsed="collapsed"
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKeys"
      @menuItemClick="menuItemClick"
    >
      <f-menu-item :list="menuList"></f-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less">
.f-menu {
  height: calc(100vh - 90px);
  overflow-y: auto;
  overflow-x: hidden;
  .arco-menu {
    height: 100%;
    .arco-menu-inner {
      overflow: initial;
    }
  }
}
</style>