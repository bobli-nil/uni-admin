<script setup lang="ts">
import { reactive } from 'vue'
import FCard from '@/components/web/f-card.vue'
import type { listResponse } from '@/api'
import type { TagListItem } from '@/api/search-api.ts'
import { useRoute, useRouter } from 'vue-router'
import { tagListApi } from '@/api/search-api.ts'

const route = useRoute()
const router = useRouter()

const data = reactive<listResponse<TagListItem>>({
    count: 0,
    list: [],
})

const getData = async () => {
    const res = await tagListApi({ page: 1, limit: 10 })
    data.list = res.data.list
}

getData()

const goTag = (item: TagListItem) => {
    if (item.tag === route.query.tag) {
        const { tag, ...rest } = route.query
        router.replace({
            name: route.name as string,
            query: rest,
        })
    } else {
        router.push({
            name: route.name as string,
            query: {
                tag: item.tag,
            },
        })
    }
}
</script>

<template>
    <f-card title="标签云" class="tag-list-com">
        <div class="tag-list">
            <div
                class="item"
                v-for="item in data.list"
                :class="{ active: item.tag === route.query.tag }"
                @click="goTag(item)"
            >
                <span>{{ item.tag }}</span>
                <span>{{ item.articleCount }}</span>
            </div>
        </div>
    </f-card>
</template>

<style scoped lang="less">
.tag-list {
    display: flex;
    flex-wrap: wrap;
    .item {
        width: 50%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-text-1);
        cursor: pointer;
        &.active {
            color: rgb(var(--arcoblue-6));
        }
        &:nth-child(4n + 1),
        &:nth-child(4n + 2) {
            background: var(--color-fill-2);
        }
        &:nth-child(4n + 3),
        &:nth-child(4n + 4) {
            background: var(--color-fill-1);
        }
    }
}
</style>

<style lang="less">
@keyframes move {
    0% {
        left: 0;
        top: 0;
    }
    25% {
        left: calc(100% - 20px);
        top: 0;
    }
    50% {
        left: calc(100% - 20px);
        top: calc(100% - 20px);
    }
    75% {
        top: calc(100% - 20px);
        left: 0;
    }
    to {
        left: 0;
        top: 0;
    }
}
.tag-list-com {
    .body {
        position: relative;
        &:before {
            display: block;
            content: '';
            width: 20px;
            height: 20px;
            background: rgb(var(--arcoblue-6));
            position: absolute;
            left: 0;
            top: 0;
            animation: move 5s infinite;
        }
    }
}
</style>
