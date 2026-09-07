<script setup lang="ts">
import {type Component, ref} from "vue";
import {IconHome, IconUser } from "@arco-design/web-vue/es/icon";
import FComponent from "@/components/common/f-component.vue";
import { collapsed } from "@/components/admin/f-menu.ts"
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

interface MenuType {
  title: string
  name: string
  icon?: string | Component
  children?: MenuType[]
}

const menuList: MenuType[] = [
  {title: "首页", name: "home", icon: IconHome},
  {
    title: "个人中心",
    name: "userCenter",
    icon: IconUser,
    children: [
      { title: "用户信息", name: "userInfo" },
    ]
  },
  {
    title: "用户管理",
    name: "userManage",
    icon: IconUser,
    children: [
      { title: "用户列表", name: "userList" },
    ]
  },
  {
    title: "系统设置",
    name: "settingsManage",
    icon: IconUser,
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

function initRoutes() {
  const matched = route.matched
  if (matched.length === 3) {
    const targetSubmenuKey = (matched[1]?.name as string) + "-sub-menu"
    openKeys.value = [targetSubmenuKey]
  }
  const selectedKey = matched[matched.length - 1]?.name as string
  selectedKeys.value = [selectedKey]
}
initRoutes()

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
      <template v-for="menu in menuList">
        <a-menu-item v-if="!menu.children" :key="menu.name">
          <template #icon>
            <f-component :is="menu.icon" />
          </template>
          {{menu.title}}
        </a-menu-item>
        <a-sub-menu v-else :key="menu.name + '-sub-menu'">
          <template #icon>
            <f-component :is="menu.icon" />
          </template>
          <template #title>{{menu.title}}</template>
          <a-menu-item v-for="sub in menu.children" :key="sub.name">
            <template #icon>
              <f-component :is="sub.icon" />
            </template>
            {{sub.title}}
          </a-menu-item>
        </a-sub-menu>
      </template>
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