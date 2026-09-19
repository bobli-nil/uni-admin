<script setup lang="ts">
import FPoint from '@/components/common/f-point.vue'

const select = (val?: string | number | Record<string, any>) => {
    console.log(val)
}
</script>

<template>
    <div class="f-nav-msg-com">
        <f-point :count="9">
            <a-dropdown @select="select">
                <span class="message">消息</span>
                <template #content>
                    <a-doption value="msgComment"><f-point :count="1">评论和@</f-point></a-doption>
                    <a-doption value="msgDigg"><f-point :count="10">赞和收藏</f-point></a-doption>
                    <a-doption value="msgChat"><f-point :count="0">用户私信</f-point></a-doption>
                    <a-doption value="msgSystem"><f-point :count="5">系统通知</f-point></a-doption>
                </template>
            </a-dropdown>
        </f-point>
    </div>
</template>

<style scoped lang="less">
.f-nav-msg-com {
    .message {
        cursor: pointer;
    }
}
</style>
