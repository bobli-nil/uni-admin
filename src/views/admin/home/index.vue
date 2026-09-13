<script setup lang="ts">
import FCard from '@/components/common/f-card.vue'
import FWelcome from '@/components/admin/f-welcome.vue'
import FQuickEntrance from '@/components/admin/f-quick-entrance.vue'
import FVersion from '@/components/common/f-version.vue'
import { IconUser } from '@arco-design/web-vue/es/icon'
import UserLoginEcharts from '@/components/echarts/user-login-echarts.vue'

const entranceList = [
    { label: '个人信息', icon: IconUser, name: 'userInfo' },
    { label: '个人信息', icon: IconUser, name: 'userInfo' },
]
</script>

<template>
    <div class="home-view">
        <f-welcome></f-welcome>
        <div class="bottom">
            <div class="left">
                <f-quick-entrance :list="entranceList"></f-quick-entrance>
                <f-card title="数据统计" class="statistics">
                    <user-login-echarts></user-login-echarts>
                </f-card>
            </div>
            <div class="right">
                <f-version></f-version>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-view {
    background: inherit !important;
    .bottom {
        display: flex;
        justify-content: space-between;
        .left {
            width: 70%;
        }
        .right {
            margin-left: 20px;
            width: 30%;
        }
    }
}
</style>
