<script setup lang="ts">
import FCard from '@/components/common/f-card.vue'
import {dateCurrentFormat} from "@/utils/date.ts";

interface versionType {
    title: string
    date: string
    items?: string[]
}

const list: versionType[] = [
    {
        title: '第一次上线',
        date: '2020-01-01',
        items: [
            '权限设置，可以根据不同的角色进行不同的配置，同时增加了新的特色',
            '主题定制',
            '用户管理'
        ]
    }
]
</script>

<template>
    <f-card title="更新日志" class="f-version">
        <div class="item" v-for="(item, index) in list">
            <div class="version-head">
                <span class="index">{{index + 1}}.</span>
                <span class="label">{{item.title}}</span>
                <span class="date">{{dateCurrentFormat(item.date)}}</span>
            </div>
            <ul class="version-content" v-if="item.items?.length">
                <li v-for="li in item.items">{{li}}</li>
            </ul>
        </div>
    </f-card>
</template>

<style scoped lang="less">
.f-version {
    .item {
        margin-bottom: 20px;
        .version-head {
            position: relative;
            .index {
                margin-right: 5px;
            }
            .date {
                position: absolute;
                right: 0;
                color: var(--color-text-2);
            }
        }
        .version-content {
            padding-left: 30px;
            margin-top: 10px;
            line-height: 1.7rem;
            color: var(--color-text-2);
        }
    }
}
</style>