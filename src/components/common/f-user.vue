<script setup lang="ts">
interface Props {
    avatar: string
    nickname: string
    size?: number
}
const props = defineProps<Props>()
</script>

<template>
    <div class="f-user-com">
        <a-avatar :image-url="avatar" :size="size || 40"></a-avatar>
        <span class="txt">{{ nickname }}</span>
    </div>
</template>

<style scoped lang="less">
.f-user-com {
    .txt {
        margin-left: 8px;
    }
}
</style>
