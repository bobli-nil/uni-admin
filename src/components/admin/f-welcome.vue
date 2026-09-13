<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
const userStore = useUserStore()

const welcomeTitle = computed(() => {
    const now = new Date()
    const hour = now.getHours()
    if (hour < 9 && hour >= 6) {
        return '早安'
    }
    if (hour > 9 && hour <= 12) {
        return '上午好'
    }
    if (hour < 12 && hour <= 14) {
        return '中午好'
    }
    if (hour < 14 && hour <= 16) {
        return '傍晚好'
    }
    if (hour > 16 && hour <= 24) {
        return '晚上好'
    }
    return '早安'
})
</script>

<template>
    <div class="f-welcome">
        <div class="title">
            {{ welcomeTitle }}，{{ userStore?.userInfo?.nickname }}，请开始一天的工作吧
        </div>
        <div class="weather">上海 · 上海市 今日 阴，25℃，天气温和，适合户外运动</div>
        <div class="statistics">
            <a-statistic
                animation
                title="在线流量"
                :value="1234"
                show-group-separator
            ></a-statistic>
            <a-statistic animation title="消息总数" :value="134" show-group-separator></a-statistic>
            <a-statistic animation title="用户总数" :value="34" show-group-separator></a-statistic>
            <a-statistic animation title="文章总数" :value="72" show-group-separator></a-statistic>
            <a-statistic animation title="今日登录" :value="20" show-group-separator></a-statistic>
            <a-statistic animation title="今日注册" :value="9" show-group-separator></a-statistic>
        </div>
        <div class="extra">欢迎使用UniAdmin后台系统，可查看 <a href="">系统帮助</a></div>
    </div>
</template>

<style scoped lang="less">
.f-welcome {
    border-radius: 5px;
    margin-bottom: 20px;
    background: var(--color-bg-1) url('@/assets/img/welcome.png') no-repeat right center;
    background-size: contain;
    padding: 36px 20px;
    color: var(--color-text-2);
    .title {
        font-size: 22px;
        color: var(--color-text-1);
    }
    .weather {
        margin-top: 20px;
    }
    .statistics {
        margin-top: 20px;
        .arco-statistic {
            margin-right: 30px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .extra {
        margin-top: 20px;
        a {
            text-decoration: none;
            color: @primary-6;
        }
    }
}
</style>
