<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { listResponse } from '@/api'
import {
    commentListApi,
    type CommentListRequest,
    type CommentListType,
    commentRemoveApi,
} from '@/api/comment-api.ts'
import { Message } from '@arco-design/web-vue'
import FA from '@/components/common/f-a.vue'
import FLabel from '@/components/common/f-label.vue'
import { dateTimeFormat } from '@/utils/date.ts'
import { relationOptions } from '@/options/options.ts'

const checkIdList = ref<number[]>([])

const params = reactive<CommentListRequest>({
    type: 1,
})

const data = reactive<listResponse<CommentListType>>({
    count: 0,
    list: [],
})

const getData = async () => {
    const res = await commentListApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}

getData()

const removeComment = async () => {
    const resList = await Promise.all(checkIdList.value.map((id) => commentRemoveApi(id)))
    resList.forEach((res) => {
        if (res.code) {
            Message.error(res.msg)
            return
        }
        Message.success(res.msg)
    })
    getData()
}

const isCheckAll = ref(false)
const checkAll = (value: boolean | (string | number | boolean)[]) => {
    if (value) {
        checkIdList.value = data.list.map((item) => item.id)
    } else {
        checkIdList.value = []
    }
}
</script>

<template>
    <div class="article-comment-view">
        <div class="actions">
            <a-checkbox v-model="isCheckAll" @change="checkAll">全选</a-checkbox>
            <a-button v-if="checkIdList.length" size="small" status="danger" @click="removeComment">
                删除
            </a-button>
        </div>

        <a-checkbox-group v-model="checkIdList">
            <div class="comment-list">
                <template v-for="item in data.list">
                    <div class="item">
                        <div class="check">
                            <a-checkbox :value="item.id"></a-checkbox>
                        </div>
                        <div class="user">
                            <a-avatar :image-url="item.userAvatar"></a-avatar>
                        </div>
                        <div class="info">
                            <div class="nickname">
                                <span class="nick">{{ item.userNickname }}</span>
                                <span v-if="!item.isMe">
                                    <f-label
                                        :options="relationOptions"
                                        :value="item.relation || 0"
                                    ></f-label>
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
                                <f-a class="apply">回复</f-a>
                            </div>
                        </div>
                        <div v-if="item.articleCover" class="cover">
                            <img :src="item.articleCover" alt="" />
                            <a-typography-text :ellipsis="{ rows: 1, css: true }">
                                {{ item.articleTitle }}
                            </a-typography-text>
                        </div>
                    </div>
                </template>
            </div>
        </a-checkbox-group>

        <div class="page" v-if="data.count > 0">
            <a-pagination
                :total="data.count"
                show-total
                v-model:current="params.page"
                v-model:page-size="params.limit"
                @change="getData"
            ></a-pagination>
        </div>
    </div>
</template>

<style scoped lang="less">
.article-comment-view {
    :deep(.arco-checkbox-group) {
        width: 100%;
    }
    .actions {
        display: flex;
        align-items: center;
        height: 30px;
        .arco-btn {
            margin-left: 10px;
        }
    }
    .comment-list {
        .item {
            display: flex;
            align-items: center;
            margin-top: 10px;
            padding-bottom: 10px;
            border-bottom: @f_border;
            &:last-child {
                border-bottom: none;
            }
            .check {
                width: 25px;
                margin-right: 10px;
            }
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
    }
    .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>
