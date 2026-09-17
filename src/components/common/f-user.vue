<script setup lang="ts">
interface Props {
    avatar: string
    nickname: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="f-user-com">
        <a-avatar :image-url="avatar"></a-avatar>
        <span style="margin-left: 8px">{{ nickname }}</span>
    </div>
</template>

<style scoped lang="less"></style>
