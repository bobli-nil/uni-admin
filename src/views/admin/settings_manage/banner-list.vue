<script setup lang="ts">
import { reactive, ref } from 'vue'
import FList from '@/components/admin/f-list.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import { Message } from '@arco-design/web-vue'
import {
    type BannerListItem,
    bannerListApi,
    type BannerType,
    bannerCreateUpdateApi,
    bannerDeleteApi,
} from '@/api/banner-api.ts'

const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '图片', slotName: 'cover' },
    { title: '跳转地址', slotName: 'href' },
    { title: '是否显示', slotName: 'show' },
    { title: '时间', slotName: 'createdAt' },
    { title: '操作', slotName: 'action' },
]
const fListRef = ref()
const visible = ref(false)
const data = reactive<BannerType>({
    cover: '',
    href: '',
    show: true,
    type: 1,
})
const handler = async () => {
    const res = await bannerCreateUpdateApi(data)
    if (res.code) {
        Message.error(res.msg)
        return false
    }
    Message.success('操作成功')
    fListRef.value?.getList()
    return true
}
const add = () => {
    Object.assign(data, {
        id: undefined,
        cover: '',
        href: '',
        show: true,
        type: 1,
    })
    visible.value = true
}
const update = (record: BannerType) => {
    data.id = record.id
    data.cover = record.cover
    data.href = record.href
    data.show = record.show
    data.type = record.type
    visible.value = true
}
const deleteBanner = async (keys: (string | number)[]) => {
    console.log('delete keys', keys)
    const res = await bannerDeleteApi(keys)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success('删除成功')
    fListRef.value?.getList()
}
</script>
`

<template>
    <div class="banner-list">
        <a-modal
            v-model:visible="visible"
            :title="data.id ? '更新banner' : '创建banner'"
            :on-before-ok="handler"
        >
            <a-form :model="data">
                <a-form-item label="封面">
                    <f-image-upload
                        v-model="data.cover"
                        height="60"
                        placeholder="封面"
                    ></f-image-upload>
                </a-form-item>
                <a-form-item label="跳转地址">
                    <a-input v-model="data.href" placeholder="跳转地址"></a-input>
                </a-form-item>
                <a-form-item label="是否显示">
                    <a-switch v-model="data.show"></a-switch>
                </a-form-item>
                <a-form-item label="类型">
                    <a-radio-group v-model="data.type">
                        <a-radio :value="1">普通</a-radio>
                        <a-radio :value="2">独家</a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
        <f-list
            ref="fListRef"
            :url="bannerListApi"
            :columns="columns"
            @add="add"
            @update="update"
            @delete="deleteBanner"
        >
            <template #cover="{ record }: { record: BannerListItem }">
                <a-image :src="record.cover" width="70"></a-image>
            </template>
            <template #href="{ record }: { record: BannerListItem }">
                <a :href="record.href" v-if="record.href" target="_blank">{{ record.href }}</a>
            </template>
            <template #show="{ record }: { record: BannerListItem }">
                <a-switch v-model="record.show" disabled></a-switch>
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less">
.banner-list {
}
</style>
