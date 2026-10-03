<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import type { listResponse, paramsType } from '@/api'
import { textSearchApi, type TextSearchListItem } from '@/api/search-api.ts'
import { Message } from '@arco-design/web-vue'

interface Props {
    visible: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'update:visible', val: boolean): void
}>()

const form = reactive<paramsType>({
    page: 1,
    limit: 999,
    keyword: '',
})
const data = reactive<listResponse<TextSearchListItem>>({
    count: 0,
    list: [],
})

const hasSearch = ref(false)
const search = async () => {
    hasSearch.value = false
    const res = await textSearchApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
    hasSearch.value = true
}

const cancel = () => {
    form.keyword = ''
    data.count = 0
    data.list = []
    emits('update:visible', false)
}

const setSearch = (keyword: string) => {
    form.keyword = keyword
    search()
}

const inputRef = ref()

const beforeOpen = () => {
    if (form.keyword === '') {
        nextTick(() => {
            inputRef.value.focus()
        })
    }
}

const goItem = (item: TextSearchListItem) => {
    const url = `/article/${item.articleID}?id=${item.flag}`
    window.open(url, '_blank')
}

defineExpose({
    setSearch,
})
</script>

<template>
    <a-modal
        title="全文搜索"
        body-class="f-article-search-modal-body scroll-bar"
        :visible="visible"
        :footer="false"
        @before-open="beforeOpen"
        @cancel="cancel"
    >
        <div class="head">
            <a-input
                ref="inputRef"
                v-model="form.keyword"
                placeholder="请输入搜索内容"
                @keydown.enter="search"
            ></a-input>
            <a-button type="primary" @click="search">搜索</a-button>
        </div>
        <div class="body">
            <div class="list scroll-bar">
                <div class="item" v-for="item in data.list" @click="goItem(item)">
                    <div class="title" v-html="item.head"></div>
                    <div class="abs" v-html="item.body"></div>
                </div>
            </div>
            <div class="page" v-if="hasSearch">共搜索到{{ data.count }}条结果</div>
        </div>
    </a-modal>
</template>

<style lang="less">
.f-article-search-modal-body {
    padding: 0;
    .head {
        padding: 10px 20px;
        display: flex;
        .arco-btn {
            margin-left: 10px;
        }
    }
    .body {
        padding: 10px 0;
        .list {
            max-height: 60vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .item {
            padding: 10px 20px;
            cursor: pointer;
            .title {
                font-size: 16px;
            }
            .abs {
                margin-top: 5px;
                font-size: 12px;
            }
            em {
                color: red;
                text-decoration: none;
            }
            &:hover {
                background-color: var(--color-fill-1);
            }
        }
        .page {
            padding: 10px 20px;
            text-align: center;
            color: var(--color-text-2);
        }
    }
}
</style>
