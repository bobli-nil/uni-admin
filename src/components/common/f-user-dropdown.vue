<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

type DropdownValue = string | number | Record<string, any> | undefined
const handleSelect = (key: DropdownValue) => {
  if (key === "logout") {
    return
  }
  router.push({name: key as string})
}

interface OptionType {
  name: string
  title: string
}

const options: OptionType[] = [
  {title: "个人信息", name: "userInfo"},
  {title: "用户列表", name: "userList"},
  {title: "系统信息", name: "settings"},
  {title: "注销退出", name: "logout"},
]

</script>

<template>
  <a-dropdown @select="handleSelect" trigger="hover">
    <div class="user-info">
      <icon-user class="icon-user" />
      <span>张三</span>
      <icon-down class="icon-down" />
    </div>
    <template #content>
      <a-doption v-for="option in options" :key="option.name" :value="option.name">{{option.title}}</a-doption>
    </template>
  </a-dropdown>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon-user {
    margin-left: 10px;
    margin-right: 2px !important;
    font-size: 18px !important;
  }
  .icon-down {
    margin-left: 5px;
    font-size: 12px !important;
  }
}
</style>