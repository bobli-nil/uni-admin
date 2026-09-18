<script setup lang="ts">
import { useRouter } from 'vue-router'
import FCard from '@/components/common/f-card.vue'
import type { Component } from 'vue'
import FComponent from '@/components/common/f-component.vue'
import {
    IconFile,
    IconImage,
    IconRobot,
    IconSettings,
    IconUser,
} from '@arco-design/web-vue/es/icon'
export interface entranceItem {
    label: string
    icon: string | Component
    name: string
}

const entranceList: entranceItem[] = [
    { label: '用户列表', icon: IconUser, name: 'userList' },
    { label: '文章列表', icon: IconFile, name: 'articleList' },
    { label: '网站设置', icon: IconSettings, name: 'siteManageSite' },
    { label: 'AI设置', icon: IconRobot, name: 'siteManageAI' },
    { label: 'Banner设置', icon: IconImage, name: 'bannerList' },
]

const router = useRouter()

const jump = (name: string) => {
    router.push({ name })
}
</script>

<template>
    <f-card title="快捷入口">
        <div class="body">
            <div class="item" v-for="item in entranceList" @click="jump(item.name)">
                <div class="icon">
                    <f-component :is="item.icon" />
                </div>
                <div class="label">{{ item.label }}</div>
            </div>
        </div>
    </f-card>
</template>

<style scoped lang="less">
.body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 20px;
}
.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
    .icon {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        background-color: var(--color-fill-2);
        transition: all 0.3s;
        &:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.08);
        }
    }
    .label {
        margin-top: 8px;
    }
}
</style>
