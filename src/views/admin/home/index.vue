<script setup lang="ts">
import FCard from '@/components/common/f-card.vue'
import FWelcome from '@/components/admin/f-welcome.vue'
import FQuickEntrance from '@/components/admin/f-quick-entrance.vue'
import FVersion from '@/components/common/f-version.vue'
import FTitle from '@/components/common/f-title.vue'
import { IconUser } from '@arco-design/web-vue/es/icon'
import UserLoginEcharts from '@/components/echarts/user-login-echarts.vue'

const entranceList = [
    { label: '个人信息', icon: IconUser, name: 'userInfo' },
    { label: '个人信息', icon: IconUser, name: 'userInfo' },
]
</script>

<template>
    <div class="home-view">
        <div class="left">
            <f-welcome></f-welcome>
            <div class="charts charts-3">
                <div class="item">
                    <f-title :type="2">访问人数</f-title>
                </div>
                <div class="item">
                    <f-title :type="2">发布文章</f-title>
                </div>
                <div class="item">
                    <f-title :type="2">新增用户</f-title>
                </div>
            </div>
            <div class="charts charts-2">
                <div class="item">
                    <f-title :type="2">发布文章</f-title>
                </div>
                <div class="item">
                    <f-title :type="2">系统资源</f-title>
                </div>
            </div>
        </div>
        <div class="right">
            <f-quick-entrance :list="entranceList"></f-quick-entrance>
            <f-version></f-version>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-view {
    display: flex;
    background: inherit !important;
    .left {
        width: 70%;
        .charts {
            display: grid;
            margin-bottom: 20px;
            column-gap: 20px;
            .item {
                background: var(--color-bg-1);
                border-radius: 5px;
                padding: 20px 10px;
            }
        }
        .charts-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .charts-2 {
            grid-template-columns: 7fr 3fr;
        }
    }
    .right {
        margin-left: 20px;
        .f-quick-entrance {
            margin-bottom: 20px;
        }
    }
}
</style>
