<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import type { listResponse } from '@/api'
import FCollectFormModal from '@/components/web/f-collect-form-modal.vue'
import { collectListApi, type CollectListItem } from '@/api/collect-api.ts'

interface Props {
    visible: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', val: boolean): void
    (e: 'select', val: number): void
}>()

const cancel = () => {
    emits('update:visible', false)
}

const data = reactive<listResponse<CollectListItem>>({
    count: 0,
    list: [],
})

const beforeOpen = async () => {
    data.count = 0
    data.list = []
    const res = await collectListApi({ type: 1 })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}

const collectVisible = ref(false)

// 点击新增收藏夹
const add = () => {
    collectVisible.value = true
}

// 点击收藏
const select = (item: CollectListItem) => {
    emits('select', item.id)
    cancel()
}
</script>

<template>
    <a-modal
        body-class="collect-modal-body"
        title="收藏文章"
        :visible="visible"
        :footer="false"
        @cancel="cancel"
        @before-open="beforeOpen"
    >
        <f-collect-form-modal
            v-model:visible="collectVisible"
            @ok="beforeOpen"
        ></f-collect-form-modal>
        <div class="add" @click="add">
            <div class="inner">
                <icon-plus-circle />
                <span>创建收藏夹</span>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="item in data.list">
                <div class="left">
                    <div class="title">{{ item.title }}</div>
                    <div class="count">{{ item.articleCount }}篇文章</div>
                </div>
                <a-button type="primary" size="small" @click="select(item)">收藏</a-button>
            </div>
        </div>
    </a-modal>
</template>

<style lang="less">
.collect-modal-body {
    padding: 0 0 10px 0;
    .add {
        padding: 10px 20px;
        .inner {
            border-radius: 5px;
            background-color: var(--color-fill-1);
            padding: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            color: var(--color-text-2);
            span {
                margin-left: 5px;
            }
        }
    }
    .list {
        margin-top: 20px;
        .item {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            &:hover {
                background: var(--color-fill-1);
            }
            .title {
                font-size: 16px;
            }
            .count {
                font-size: 12px;
                color: var(--color-text-2);
            }
            .arco-btn {
                border-radius: 100px;
            }
        }
    }
}
</style>
