<script setup lang="ts">
import { reactive } from 'vue'
import { type SiteBaseResponse, siteApi, siteUpdateApi } from '@/api/site-api.ts'
import { Message } from '@arco-design/web-vue'
interface Props {
    name: keyof SiteBaseResponse
}

const props = defineProps<Props>()

const data = reactive<SiteBaseResponse[typeof props.name]>({})

const getData = async () => {
    const res = await siteApi(props.name)
    if (res.code) {
        Message.success(res.msg)
        return
    }
    Object.assign(data, res.data)
}
getData()

const updateData = async (data: SiteBaseResponse[typeof props.name]) => {
    const res = await siteUpdateApi(props.name, data)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success('更新成功')
}
</script>

<template>
    <div class="f-site">
        <slot :data="data"></slot>
    </div>
</template>

<style scoped lang="less"></style>
