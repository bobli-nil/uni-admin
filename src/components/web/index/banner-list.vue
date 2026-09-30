<script setup lang="ts">
import { reactive } from 'vue'
import type { listResponse } from '@/api'
import { bannerListApi, type BannerListItem } from '@/api/banner-api.ts'
import { Message } from '@arco-design/web-vue'

const data = reactive<listResponse<BannerListItem>>({
    count: 0,
    list: [],
})

const getData = async () => {
    const res = await bannerListApi()
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.count = res.data.count
    data.list = res.data.list.filter((item) => item.show)
}

getData()

const goItem = (item: BannerListItem) => {
    if (!item.href) {
        return
    }
    window.open(item.href, '_blank')
}
</script>

<template>
    <a-carousel v-if="data.list.length > 0" class="f-banner-com">
        <a-carousel-item v-for="item in data.list" @click="goItem(item)">
            <img :src="item.cover" :class="{ isHref: !!item.href }" alt="" />
        </a-carousel-item>
    </a-carousel>
</template>

<style lang="less">
.f-banner-com {
    height: 300px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        &.isHref {
            cursor: pointer;
        }
    }
}
</style>
