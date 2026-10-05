<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { listResponse } from '@/api'
import {
    type ArticleListItem,
    articleSearchApi,
    type ArticleSearchRequest,
} from '@/api/search-api.ts'
import { Message } from '@arco-design/web-vue'
import { dateCurrentFormat } from '@/utils/date.ts'
import { goArticleDetail, goUser } from '@/utils/go-router.ts'

const data = reactive<listResponse<ArticleListItem>>({
    count: 0,
    list: [],
})

const params = reactive<ArticleSearchRequest>({
    type: 1,
    page: 1,
    limit: 10,
})

const getData = async () => {
    const res = await articleSearchApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.list = res.data.list
    data.count = res.data.count
}

getData()

const setType = (type: number) => {
    params.type = type
    getData()
}
</script>

<template>
    <div class="article-search-list-com">
        <div class="list">
            <div class="item" v-for="item in data.list">
                <div v-if="item.adminTop" class="admin-top"></div>
                <div class="top-info" @click="goUser(item.userId)">
                    <a-avatar :image-url="item.userAvatar" :size="30"></a-avatar>
                    <span class="nick">{{ item.userNickname }}</span>
                    <span class="date">最后更新于{{ dateCurrentFormat(item.updatedAt) }}</span>
                </div>
                <div class="article-info">
                    <div v-if="item.cover" class="cover" @click="goArticleDetail(item.id)">
                        <img :src="item.cover" alt="" />
                    </div>
                    <div class="info">
                        <div
                            class="title"
                            v-html="item.title"
                            @click="goArticleDetail(item.id)"
                        ></div>
                        <div class="abs">
                            <a-typography-text :ellipsis="{ rows: 2, css: true }">
                                <span v-html="item.abstract"></span>
                            </a-typography-text>
                        </div>
                        <div class="data">
                            <span> <icon-eye></icon-eye>{{ item.lookCount }} </span>
                            <span> <icon-message></icon-message>{{ item.commentCount }} </span>
                            <div class="tags">
                                <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="data.count" class="page">
            <a-pagination
                show-total
                v-model:current="params.page"
                v-model:page-size="params.limit"
                :total="data.count"
                @change="getData"
            ></a-pagination>
        </div>
    </div>
</template>

<style scoped lang="less">
.article-search-list-com {
    .list {
        .item {
            padding: 12px 20px 20px 20px;
            margin-bottom: 20px;
            background-color: var(--color-bg-1);
            border-radius: 5px;
            cursor: pointer;
            .top-info {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                .nick {
                    margin-left: 10px;
                }
                .date {
                    margin-left: 20px;
                    font-size: 12px;
                    color: var(--color-text-2);
                }
            }
            .article-info {
                display: flex;
                margin-top: 5px;
                .cover {
                    height: 100px;
                    width: 177px;
                    flex-shrink: 0;
                    margin-right: 16px;
                    border-radius: 5px;
                    overflow: hidden;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .info {
                    .title {
                        font-size: 17px;
                        font-weight: bold;
                        color: var(--color-text-1);
                        cursor: pointer;
                    }
                    .abs {
                        margin: 5px 0;
                    }
                    .data {
                        display: flex;
                        align-items: center;
                        span {
                            margin-right: 10px;

                            :deep(.arco-icon) {
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 0;
        background: var(--color-bg-1);
        border-radius: 5px;
    }
}
</style>
