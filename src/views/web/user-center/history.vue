<script setup lang="ts">
import FCard from '@/components/web/f-card.vue'
import FUser from '@/components/common/f-user.vue'
import { Message } from '@arco-design/web-vue'
import { reactive } from 'vue'
import {
    articleHistoryApi,
    type ArticleHistoryListRequest,
    type ArticleHistoryType,
} from '@/api/article-api.ts'
import type { listResponse } from '@/api'
import { dateFormat } from '@/utils/date.ts'
import { goArticleDetail } from '@/utils/go-router.ts'

interface DayArticleType {
    date: string
    articleList: ArticleHistoryType[]
}

const data = reactive<listResponse<DayArticleType>>({
    count: 0,
    list: [],
})

const params = reactive<ArticleHistoryListRequest>({
    type: 1,
    page: 1,
    limit: 10,
})

const getData = async () => {
    const res = await articleHistoryApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.count = res.data.count
    data.list = []

    const dateMap: Record<string, ArticleHistoryType[]> = {}
    for (const item of res.data.list) {
        const date = dateFormat(item.createAt)
        const ele = dateMap[date]
        if (ele) {
            ele.push(item)
        } else {
            dateMap[date] = [item]
        }
    }
    for (const key in dateMap) {
        const value = dateMap[key] as ArticleHistoryType[]
        data.list.push({
            date: key,
            articleList: value,
        })
    }

    data.list.sort((a: DayArticleType, b: DayArticleType): number => {
        const t1 = new Date(a.date).getTime()
        const t2 = new Date(b.date).getTime()
        return t2 - t1
    })
}
getData()

const removeHistory = async (article: ArticleHistoryType) => {}
</script>

<template>
    <div class="user-center-history">
        <f-card title="足迹">
            <a-timeline>
                <a-timeline-item v-for="item in data.list">
                    {{ item.date }}
                    <template #label>
                        <div class="article-list">
                            <div
                                class="item"
                                v-for="article in item.articleList"
                                @click="goArticleDetail(article.articleID)"
                            >
                                <div class="cover">
                                    <img v-if="article.cover" :src="article.cover" alt="banner" />
                                </div>
                                <div class="info">
                                    <div class="title">{{ article.title }}</div>
                                    <div class="user">
                                        <f-user
                                            :nickname="article.nickname"
                                            :avatar="article.avatar"
                                            :size="30"
                                        ></f-user>
                                    </div>
                                </div>
                                <div class="action">
                                    <a-button
                                        status="danger"
                                        size="mini"
                                        @click.stop="removeHistory(article)"
                                    >
                                        删除
                                    </a-button>
                                </div>
                            </div>
                        </div>
                    </template>
                </a-timeline-item>
            </a-timeline>

            <div class="page">
                <a-pagination
                    show-total
                    show-page-size
                    v-model:current="params.page"
                    v-model:page-size="params.limit"
                    :total="data.count"
                    @change="getData"
                ></a-pagination>
            </div>
        </f-card>
    </div>
</template>

<style scoped lang="less">
.user-center-history {
    .article-list {
        .item {
            display: flex;
            position: relative;
            padding: 10px;
            margin-bottom: 10px;
            transition: all 0.3s;
            cursor: pointer;
            .action {
                display: none;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
            &:hover {
                background: var(--color-fill-2);
                .action {
                    display: block;
                }
            }
            .cover {
                img {
                    width: 90px;
                    object-fit: cover;
                    border-radius: 5px;
                    margin-right: 20px;
                }
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title {
                    font-size: 15px;
                    font-weight: bold;
                    color: var(--color-text-1);
                }
                :deep(.f-user-com) {
                    color: var(--color-text-2);
                    .txt {
                        margin-left: 8px;
                    }
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
