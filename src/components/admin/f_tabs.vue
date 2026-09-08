<script setup lang="ts">
import {ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import {Swiper, SwiperSlide} from "swiper/vue"

const route = useRoute()
const router = useRouter()

console.log("route.name", route.name)

interface TabType {
  name: string
  title: string
}

const tabs = ref<TabType[]>([
  { name: "home", title: "首页" },
  { name: "userInfo", title: "个人信息" },
  { name: "userList", title: "用户列表" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
  { name: "settings", title: "系统信息" },
])

// 点击
const check = (item: TabType) => {
  router.push({name: item.name})
}

// 删除某一项
const removeItem = (item: TabType) => {
  if (item.name === "home") return
  const index = tabs.value.findIndex(ele => ele.name === item.name)
  if (index > -1) {
    if (item.name === route.name) {
      router.push({name: tabs.value[index-1]?.name})
    }
    tabs.value.splice(index, 1)
    saveTabs()
  }
}

// 删除全部
const removeAll = () => {
  tabs.value = [
    { name: "home", title: "首页" },
  ]
  saveTabs()
  router.push({name: "home"})
}

// 将tabs保存在本地
const saveTabs = () => {
  console.log("saveTabs")
  window.localStorage.setItem("tabs", JSON.stringify(tabs.value))
}

// 初始加载tabs
const loadTabs = () => {
  const str = window.localStorage.getItem("tabs") as string
  try {
    tabs.value = JSON.parse(str) || [{ name: "home", title: "首页" }]
  } catch(e) {
    console.log(e)
  }
}

// loadTabs()

watch(() => route.name, () => {
  const index = tabs.value.findIndex(ele => ele.name === route.name)
  if (index === -1) {
    tabs.value.push({
      name: route.name as string,
      title: route.meta.title,
    })
    saveTabs()
  }
}, {
  immediate: true,
})

</script>

<template>
  <div class="f-tabs">
    <swiper :slides-per-view="1">
      <swiper-slide v-for="item in tabs" :key="item.name">
        <div
            class="item"
            :class="{active: item.name === route.name}"
            @click="check(item)"
            @mousedown.middle="removeItem(item)"
        >
          {{item.title}}
          <span v-if="item.name !== 'home'" title="删除" @click.stop="removeItem(item)">
            <IconClose />
          </span>
        </div>
      </swiper-slide>
    </swiper>
    <div class="item" @click="removeAll">删除全部</div>
  </div>
</template>

<style lang="less">
.f-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 10px;
  .swiper {
    display: flex;
    align-items: center;
    width: calc(100% - 100px);
    overflow: hidden;
    .swiper-wrapper {
      display: flex;
      align-items: center;
      .swiper-slide {
        flex-shrink: 0;
        width: fit-content !important;
      }
    }
  }
  .item {
    flex-shrink: 0;
    padding: 2px 8px;
    margin-right: 10px;
    background-color: var(--color-bg-1);
    border: @f_border;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-fill-1);
    }
    &.active {
      background-color: @primary-6;
      color: #fff;
      border: 1px solid @primary-6;
    }
  }
}
</style>