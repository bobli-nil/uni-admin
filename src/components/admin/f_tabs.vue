<script setup lang="ts">
import {onMounted, ref, watch} from "vue"
import {useRoute, useRouter} from "vue-router"
import {Swiper, SwiperSlide} from "swiper/vue"

const route = useRoute()
const router = useRouter()

interface TabType {
  name: string
  title: string
}

const tabs = ref<TabType[]>([
  { name: "home", title: "首页" },
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

loadTabs()

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

const slidesCount = ref(100)

onMounted(() => {
  const swiperDom = document.querySelector(".f-tabs-swiper") as HTMLDivElement
  const swiperWidth = swiperDom.clientWidth
  const wrapperDom = document.querySelector(".f-tabs-swiper .swiper-wrapper") as HTMLDivElement
  const wrapperScrollWith = wrapperDom.scrollWidth
  if (swiperWidth > wrapperScrollWith) {
    return
  }

  let allWidth = 0
  let index = 0
  const slidesList = document.querySelectorAll(".f-tabs-swiper .swiper-slide") as NodeListOf<HTMLElement>
  for (const slidesListElement of slidesList) {
    allWidth += (slidesListElement.clientWidth)
    if (allWidth >= swiperWidth) {
      break
    }
    // slidesCount的实际值应该小于超出的元素总数，所以放到后面++
    index++
  }
  slidesCount.value = index

  // 将高亮tab滚动到视口里
  const activeSlide = document.querySelector(".f-tabs-swiper .swiper-slide.active") as HTMLDivElement
  if (activeSlide.offsetLeft > swiperWidth) {
    const left = swiperWidth - activeSlide.offsetLeft
    window.setTimeout(() => {
      wrapperDom.style.transform = `translateX(${left}px)`
    })
  }
})

</script>

<template>
  <div class="f-tabs">
    <swiper class="f-tabs-swiper" :slides-per-view="slidesCount">
      <swiper-slide v-for="item in tabs" :key="item.name" :class="{active: item.name === route.name}">
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