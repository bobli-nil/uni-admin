<script setup lang="ts">
import { reactive, ref } from 'vue'
import FList, { type columnType } from '@/components/admin/f-list.vue'
import { Message } from '@arco-design/web-vue'
import {
    articleDetailApi,
    type ArticleDetailType,
    articleExamineApi,
    type ArticleExamineRequest,
    articleListApi,
    type ArticleListItem,
    userArticleTopApi,
} from '@/api/article-api.ts'
import FUser from '@/components/common/f-user.vue'
import { ArticleStatusOptions } from '@/options/options.ts'

const columns: columnType[] = [
    { title: 'ID', dataIndex: 'id' },
    { title: '文章标题', dataIndex: 'title' },
    { title: '发布用户', slotName: 'user' },
    { title: '文章封面', slotName: 'cover' },
    { title: '浏览量', dataIndex: 'lookCount' },
    { title: '是否开启评论', slotName: 'openComment', type: 'switch' },
    { title: '评论数', dataIndex: 'commentCount' },
    { title: '点赞', dataIndex: 'diggCount' },
    { title: '收藏', dataIndex: 'collectCount' },
    { title: '状态', dataIndex: 'status', type: 'options', options: ArticleStatusOptions },
    { title: '分类', slotName: 'category' },
    { title: '文章置顶', slotName: 'adminTop' },
    { title: '发布时间', dataIndex: 'createdAt', type: 'date', dateFormat: 'current' },
    { title: '更新时间', dataIndex: 'updatedAt', type: 'date', dateFormat: 'current' },
    { title: '操作', slotName: 'action' },
]
const fListRef = ref()
const visible = ref(false)

const deleteArticle = async (keys: (string | number)[]) => {
    console.log('delete keys', keys)
    fListRef.value?.getList()
}

const data = reactive<ArticleDetailType>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    title: '',
    abstract: '',
    content: '',
    categoryId: 0,
    tagList: [],
    cover: '',
    userId: 0,
    lookCount: 0,
    diggCount: 0,
    commentCount: 0,
    collectCount: 0,
    openComment: false,
    status: 1,
    username: '',
    nickname: '',
    avatar: '',
    categoryTitle: '',
    isCollect: false,
    isDigg: false,
})

const update = async (record: ArticleDetailType) => {
    if (record.id !== data.id) {
        const res = await articleDetailApi(record.id)
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Object.assign(data, res.data)
    }
    visible.value = true
}

const examine = reactive<ArticleExamineRequest>({
    articleID: 0,
    status: 3,
    msg: '',
})

const handler = async () => {
    console.log('handler', examine)
    if (data.status !== 2) {
        return
    }
    examine.articleID = data.id
    const res = await articleExamineApi(examine)
    if (res.code) {
        Message.error(res.msg)
        return false
    }
    Message.success(res.msg || '成功')
    fListRef.value?.getList()
    return true
}

// 管理员置顶
const adminArticleTop = async (data: ArticleListItem) => {
    console.log(data.id, data.adminTop)
    if (data.status !== 3) {
        Message.warning('只能置顶已经发布的文章')
        data.adminTop = !data.adminTop
        return
    }
    const res = await userArticleTopApi({ articleID: data.id, type: 2 })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
}
</script>

<template>
    <div class="article-list">
        <a-modal
            v-model:visible="visible"
            title="文章审核"
            modal-class="article-examine-modal"
            :on-before-ok="handler"
        >
            <a-form :model="data">
                <a-form-item label="文章标题">{{ data.title }}</a-form-item>
                <a-form-item label="文章简介">{{ data.abstract }}</a-form-item>
                <a-form-item label="发布用户">
                    <f-user :avatar="data.avatar" :nickname="data.nickname"></f-user>
                </a-form-item>
                <a-form-item label="文章分类">{{ data.categoryTitle }}</a-form-item>
                <a-form-item label="文章标签">
                    <a-tag v-for="tag in data.tagList" color="blue" style="margin-right: 8px">
                        {{ tag }}
                    </a-tag>
                </a-form-item>
                <a-form-item label="文章正文">
                    {{ data.content }}
                </a-form-item>
                <a-form-item v-if="data.status === 2" label="审核意见">
                    <a-radio-group v-model="examine.status">
                        <a-radio :value="3">通过</a-radio>
                        <a-radio :value="4">不通过</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item v-if="examine.status === 4" label="拒绝原因">
                    <a-textarea
                        v-model="examine.msg"
                        :auto-size="{ minRows: 2, maxRows: 4 }"
                        placeholder="拒绝原因"
                    ></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
        <f-list
            ref="fListRef"
            :url="articleListApi as any"
            :columns="columns"
            :default-params="{ type: 3, status: 3 }"
            no-add
            @update="update"
            @delete="deleteArticle"
        >
            <template #cover="{ record }: { record: ArticleListItem }">
                <a-image v-if="record.cover" :src="record.cover" width="70"></a-image>
                <span v-else>-</span>
            </template>
            <template #user="{ record }: { record: ArticleListItem }">
                <f-user :avatar="record.userAvatar" :nickname="record.userNickname"></f-user>
            </template>
            <template #category="{ record }: { record: ArticleListItem }">
                {{ record.categoryTitle || '-' }}
            </template>
            <template #openComment="{ record }: { record: ArticleListItem }">
                {{ record.openComment ? '是' : '否' }}
            </template>
            <template #adminTop="{ record }: { record: ArticleListItem }">
                <a-switch v-model="record.adminTop" @change="adminArticleTop(record)"></a-switch>
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less"></style>
