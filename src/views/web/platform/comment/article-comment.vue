<script setup lang="ts">
import { ref } from 'vue'
import { type CommentListType } from '@/api/comment-api.ts'
import FA from '@/components/common/f-a.vue'
import FLabel from '@/components/common/f-label.vue'
import CommentList from '@/components/web/article/comment-list.vue'
import { dateTimeFormat } from '@/utils/date.ts'
import { relationOptions } from '@/options/options.ts'
import { reactive } from 'vue'
import { commentCreateApi, type CommentCreateRequest } from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'

const form = reactive<CommentCreateRequest>({
    articleID: 0,
    parentID: 0,
    content: '',
})

const commentListRef = ref()
const textareaRef = ref()

const apply = async (item: CommentListType) => {
    form.articleID = item.articleID
    form.parentID = item.id
    if (form.content.trim() === '') {
        Message.warning('请输入内容')
        return
    }
    const res = await commentCreateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    item.visible = false
    console.log('1', JSON.parse(JSON.stringify(item)))
    commentListRef.value.getData()
}

const show = () => {
    textareaRef.value?.focus()
}

const hide = () => {
    form.articleID = 0
    form.parentID = 0
    form.content = ''
}
</script>

<template>
    <div class="article-comment-view">
        <comment-list
            ref="commentListRef"
            :type="1"
            v-slot="{ data: item }: { data: CommentListType }"
        >
            <div class="user">
                <a-avatar :image-url="item.userAvatar"></a-avatar>
            </div>
            <div class="info">
                <div class="nickname">
                    <span class="nick">{{ item.userNickname }}</span>
                    <span v-if="!item.isMe">
                        <f-label :options="relationOptions" :value="item.relation || 0"></f-label>
                    </span>
                    <span class="article" v-if="!item.articleCover">
                        评论了文章:
                        <router-link to="">{{ item.articleTitle }}</router-link>
                    </span>
                </div>
                <div class="content">
                    <a-typography-text :ellipsis="{ rows: 2, css: true }">
                        {{ item.content }}
                    </a-typography-text>
                </div>
                <div class="data">
                    <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
                    <span class="digg">
                        <icon-thumb-up></icon-thumb-up>
                        <span>{{ item.diggCount }}</span>
                    </span>
                    <a-trigger
                        v-model:popup-visible="item.visible"
                        trigger="click"
                        content-class="apply-comment-trigger"
                        @show="show"
                        @hide="hide"
                        :unmount-on-close="false"
                    >
                        <f-a class="apply">回复</f-a>
                        <template #content>
                            <a-textarea
                                ref="textareaRef"
                                v-model="form.content"
                                placeholder="请输入回复内容"
                                :auto-size="{ minRows: 3 }"
                                @keydown.enter="apply(item)"
                            ></a-textarea>
                            <a-button type="primary" size="mini" @click="apply(item)">
                                回复
                            </a-button>
                        </template>
                    </a-trigger>
                </div>
            </div>
            <div v-if="item.articleCover" class="cover">
                <img :src="item.articleCover" alt="" />
                <a-typography-text :ellipsis="{ rows: 1, css: true }">
                    {{ item.articleTitle }}
                </a-typography-text>
            </div>
        </comment-list>
    </div>
</template>

<style scoped lang="less">
.article-comment-view {
    .user {
        width: 50px;
    }
    .info {
        width: calc(100% - 215px);
        .nickname {
            color: var(--color-text-2);
            span:nth-child(1) {
                color: var(--color-text-2);
                margin-right: 10px;
            }
            .article {
                :deep(a) {
                    color: rgb(var(--arcoblue-6));
                }
            }
        }
        .content {
            padding-right: 10px;
            margin: 5px 0;
        }
        .data {
            color: var(--color-text-2);
            display: flex;
            align-items: center;
            .date {
                font-size: 12px;
            }
            .digg {
                margin: 0 10px;
                i {
                    cursor: pointer;
                    font-size: 12px;
                    margin-right: 5px;
                }
            }
            a {
                color: var(--color-text-2);
            }
        }
    }
    .cover {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        span {
            color: var(--color-text-2);
        }
    }
}
</style>
