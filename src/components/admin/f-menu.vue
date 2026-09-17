<script setup lang="ts">
import { type Component, ref, watch } from 'vue'
import {
    IconHome,
    IconSettings,
    IconUser,
    IconEmail,
    IconQq,
    IconRobot,
    IconCloud,
    IconImage,
    IconFile,
} from '@arco-design/web-vue/es/icon'
import { collapsed } from '@/components/admin/f-menu.ts'
import { useRouter, useRoute } from 'vue-router'
import FMenuItem from '@/components/admin/f-menu-item.vue'

const router = useRouter()
const route = useRoute()

const openKeys = ref<string[]>([])
const defaultOpenKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

interface MenuType {
    title: string
    name: string
    icon?: string | Component
    children?: MenuType[]
    role?: number
}

const menuList: MenuType[] = [
    { title: '首页', name: 'home', icon: IconHome },
    {
        title: '个人中心',
        name: 'userCenter',
        icon: 'iconfont icon-gerenzhongxin',
        children: [{ title: '个人信息', name: 'userInfo' }],
    },
    {
        title: '用户管理',
        name: 'userManage',
        icon: 'iconfont icon-yonghuguanli',
        role: 1,
        children: [{ title: '用户列表', name: 'userList' }],
    },
    {
        title: '文章管理',
        name: 'articleManage',
        icon: IconFile,
        role: 1,
        children: [{ title: '文章列表', name: 'articleList' }],
    },
    {
        title: '系统管理',
        name: 'settingsManage',
        icon: 'iconfont icon-xitongshezhi',
        role: 1,
        children: [
            {
                title: '站点配置',
                name: 'siteManage',
                icon: IconSettings,
                children: [
                    {
                        title: '网站设置',
                        name: 'siteManageSite',
                        icon: IconSettings,
                    },
                    {
                        title: '邮箱设置',
                        name: 'siteManageEmail',
                        icon: IconEmail,
                    },
                    {
                        title: 'QQ设置',
                        name: 'siteManageQQ',
                        icon: IconQq,
                    },
                    {
                        title: 'AI设置',
                        name: 'siteManageAI',
                        icon: IconRobot,
                    },
                    {
                        title: '七牛云设置',
                        name: 'siteManageQiNiu',
                        icon: IconCloud,
                    },
                ],
            },
            {
                title: 'Banner列表',
                name: 'bannerList',
                icon: IconImage,
            },
            {
                title: '日志列表',
                name: 'logList',
                icon: IconSettings,
            },
        ],
    },
]

function menuItemClick(key: string) {
    router.push({
        name: key,
    })
}

const initRoutes = () => {
    console.log('init routes')
    const matched = route.matched
    if (matched.length >= 3) {
        for (let i = 1; i < matched.length - 1; i++) {
            const targetSubmenuKey = matched[i]?.name as string
            const obj = openKeys.value.find((item) => item === targetSubmenuKey)
            if (!obj) {
                openKeys.value.push(targetSubmenuKey)
            }
        }
    }
    const selectedKey = matched[matched.length - 1]?.name as string
    selectedKeys.value = [selectedKey]
}

watch(
    () => route.name,
    () => {
        initRoutes()
    },
    {
        immediate: true,
    },
)
</script>

<template>
    <div class="f-menu scroll-bar">
        <a-menu
            show-collapse-button
            v-model:collapsed="collapsed"
            v-model:open-keys="openKeys"
            v-model:selected-keys="selectedKeys"
            :default-open-keys="defaultOpenKeys"
            @menuItemClick="menuItemClick"
        >
            <f-menu-item :list="menuList"></f-menu-item>
        </a-menu>
    </div>
</template>

<style lang="less">
.f-menu {
    height: calc(100vh - 60px);
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
