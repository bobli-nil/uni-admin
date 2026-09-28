<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import CommentTree from '@/components/web/comment/comment-tree.vue'
import { Message } from '@arco-design/web-vue'
import type { listResponse } from '@/api'
import { commentTreeApi, type CommentTreeType } from '@/api/comment-api.ts'
import { commentCreateApi, type CommentCreateRequest } from '@/api/category-api.ts'

interface Props {
    articleId: number
}
const props = defineProps<Props>()

const data = reactive<listResponse<CommentTreeType>>({
    count: 0,
    list: [],
})

const getData = async () => {
    const res = await commentTreeApi(props.articleId)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.list = res.data
    data.count = res.data.length
}

const form = reactive<CommentCreateRequest>({
    content: '',
    articleID: props.articleId,
    parentID: undefined,
})

const create = async () => {
    form.articleID = props.articleId
    if (form.content.trim() === '') {
        Message.warning('请输入评论内容')
        return
    }
    const res = await commentCreateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    form.content = ''
    getData()
}

const textareaRef = ref()

defineExpose({
    focus() {
        textareaRef.value?.focus()
    },
})

watch(
    () => props.articleId,
    () => {
        getData()
    },
    {
        immediate: true,
    },
)
</script>

<template>
    <div class="article-comment-com">
        <div class="add-comment">
            <a-textarea
                v-model="form.content"
                ref="textareaRef"
                placeholder="请输入评论内容"
                :auto-size="{ minRows: 5, maxRows: 6 }"
                @keydown.enter="create"
            ></a-textarea>
            <a-button type="primary" size="mini" @click="create">发布评论</a-button>
        </div>

        <div class="comment-list">
            <comment-tree :data="data.list" :level="1" @ok="getData"></comment-tree>
        </div>
    </div>
</template>

<style scoped lang="less">
.article-comment-com {
    margin: 20px 0;
    border-radius: 5px;
    background: var(--color-bg-1);
    .add-comment {
        padding: 20px;
        position: relative;
        .arco-btn {
            position: absolute;
            right: 30px;
            bottom: 30px;
            z-index: 1;
        }
    }

    .comment-list {
        padding: 10px 20px 20px;
    }
}
</style>
