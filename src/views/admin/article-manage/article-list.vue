<script setup lang="ts">
import { reactive, ref } from 'vue'
import FList, { type columnType } from '@/components/admin/f-list.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import { Message } from '@arco-design/web-vue'
import { articleListApi, type ArticleListItem } from '@/api/article-api.ts'
import FLabel from '@/components/common/f-label.vue'
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
    { title: '发布时间', dataIndex: 'createdAt', type: 'date', dateFormat: 'current' },
    { title: '更新时间', dataIndex: 'updatedAt', type: 'date', dateFormat: 'current' },
    { title: '操作', slotName: 'action' },
]
const fListRef = ref()

const deleteArticle = async (keys: (string | number)[]) => {
    console.log('delete keys', keys)
    fListRef.value?.getList()
}
</script>

<template>
    <div class="article-list">
        <f-list
            ref="fListRef"
            :url="articleListApi as any"
            :columns="columns"
            :default-params="{ type: 3, status: 3 }"
            @delete="deleteArticle"
        >
            <template #cover="{ record }: { record: ArticleListItem }">
                <a-image v-if="record.cover" :src="record.cover" width="70"></a-image>
                <span v-else>-</span>
            </template>
            <template #user="{ record }: { record: ArticleListItem }">
                <a-avatar :image-url="record.userAvatar" width="30"></a-avatar>
                <span style="margin-left: 8px">{{ record.userNickname }}</span>
            </template>
            <template #category="{ record }: { record: ArticleListItem }">
                {{ record.categoryTitle || '-' }}
            </template>
            <template #openComment="{ record }: { record: ArticleListItem }">
                {{ record.openComment ? '是' : '否' }}
            </template>
        </f-list>
    </div>
</template>

<style scoped lang="less"></style>
