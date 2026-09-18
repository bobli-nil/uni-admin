<script setup lang="ts">
import FWelcome from '@/components/admin/f-welcome.vue'
import FQuickEntrance from '@/components/admin/f-quick-entrance.vue'
import FVersion from '@/components/common/f-version.vue'
import FTitle from '@/components/common/f-title.vue'
import FHomeChartsV1 from '@/components/admin/f-home-charts-v1.vue'
import EchartsV2 from '@/components/echarts/echarts-v2.vue'
import EchartsV3 from '@/components/echarts/echarts-v3.vue'
import { IconUser } from '@arco-design/web-vue/es/icon'

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
                    <f-home-charts-v1 :type="1"></f-home-charts-v1>
                </div>
                <div class="item">
                    <f-title :type="2">发布文章</f-title>
                    <f-home-charts-v1 :type="2"></f-home-charts-v1>
                </div>
                <div class="item">
                    <f-title :type="2">新增用户</f-title>
                    <f-home-charts-v1 :type="3"></f-home-charts-v1>
                </div>
            </div>
            <div class="charts charts-2">
                <div class="item">
                    <f-title :type="2">发布文章</f-title>
                    <echarts-v2></echarts-v2>
                </div>
                <div class="item">
                    <f-title :type="2">系统资源</f-title>
                    <echarts-v3></echarts-v3>
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
