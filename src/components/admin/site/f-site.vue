<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type SiteBaseResponse, siteApi, siteUpdateApi } from '@/api/site-api.ts'
import { Message } from '@arco-design/web-vue'
interface Props {
    name: keyof SiteBaseResponse
}

const props = defineProps<Props>()

const data = reactive<any>({})
const isShow = ref(false)

const getData = async () => {
    const res = await siteApi(props.name)
    isShow.value = true
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
        <slot v-if="isShow" :data="data"></slot>
        <teleport v-if="isShow" to=".site-update-btn">
            <a-button type="primary" @click="updateData(data)">更新</a-button>
        </teleport>
    </div>
</template>

<style scoped lang="less">
.f-site {
    /deep/.form {
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
        .body {
            margin-top: 20px;
        }
    }
}
</style>
