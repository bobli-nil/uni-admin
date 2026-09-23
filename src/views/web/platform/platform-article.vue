<script setup lang="ts">
import { reactive } from 'vue'
import FA from '@/components/common/f-a.vue'
import { Message } from '@arco-design/web-vue'
import type { baseResponse, listResponse } from '@/api'
import {
    type ArticleListItem,
    type ArticleListRequest,
    articleListApi,
    articleRemoveApi,
    userArticleTopApi,
} from '@/api/article-api.ts'
import { dateCurrentFormat } from '@/utils/date.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive<listResponse<ArticleListItem>>({
    count: 0,
    list: [],
})

const params = reactive<ArticleListRequest>({
    keyword: '',
    type: 2,
    status: 3,
    page: 1,
    limit: 10,
})

const getData = async () => {
    const res = await articleListApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}

getData()

const checkStatus = (status: number) => {
    params.status = status
    getData()
}

const goArticle = (id: number) => {}

const handleSelect = async (id: number, val?: string | number | Record<string, any>) => {
    console.log(id, val)
    if (val === 'platformArticleEdit') {
        router.push({ name: val as string, params: { id } })
        return
    }

    let res: baseResponse<string> = { code: 0, data: '', msg: '' }
    if (val === 'delete') {
        res = await articleRemoveApi(id)
    } else {
        res = await userArticleTopApi({
            type: 1,
            articleID: id,
        })
    }
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
}
</script>

<template>
    <div class="platform-article-view">
        <div class="head">
            <div class="left">
                <div class="title">我的文章</div>
                <router-link :to="{ name: 'platformArticleAdd' }">
                    <a-button type="primary">发布文章</a-button>
                </router-link>
            </div>
            <div class="right">
                <a-input-search
                    v-model="params.keyword"
                    allow-clear
                    placeholder="搜索文章"
                    @search="getData"
                    @press-enter="getData"
                    @clear="getData"
                ></a-input-search>
            </div>
        </div>
        <div class="body">
            <div class="menu">
                <f-a :class="{ active: params.status == 3 }" @click="checkStatus(3)">已发布</f-a>
                <f-a :class="{ active: params.status == 2 }" @click="checkStatus(2)">审核中</f-a>
                <f-a :class="{ active: params.status == 1 }" @click="checkStatus(1)">草稿箱</f-a>
            </div>
            <div class="articleList">
                <div class="item" v-for="item in data.list" @click="goArticle(item.id)">
                    <div class="cover">
                        <img v-if="item.cover" :src="item.cover" alt="" />
                    </div>
                    <div class="info">
                        <div class="title">{{ item.title }}</div>
                        <div class="abs">
                            <a-typography-text :ellipsis="{ rows: 2, css: true }">
                                {{ item.abstract }}
                            </a-typography-text>
                        </div>
                        <div class="data">
                            <div class="look">
                                <icon-eye></icon-eye>
                                <span>{{ item.lookCount }}</span>
                            </div>
                            <div class="comment">
                                <icon-message></icon-message>
                                {{ item.commentCount }}
                            </div>
                            <div class="tags">
                                <a-tag v-for="tag in item.tagList">{{ tag }}</a-tag>
                            </div>
                            <div class="date">
                                最后更新于{{ dateCurrentFormat(item.updatedAt) }}
                            </div>
                        </div>
                    </div>
                    <div class="more">
                        <a-dropdown trigger="hover" @select="handleSelect(item.id, $event)">
                            <icon-more size="20"></icon-more>
                            <template #content>
                                <a-doption v-if="item.status === 3 && !item.userTop" value="top">
                                    置顶文章
                                </a-doption>
                                <a-doption
                                    v-if="item.status === 3 && item.userTop"
                                    value="cancelTop"
                                >
                                    取消置顶
                                </a-doption>
                                <a-doption value="platformArticleEdit">编辑文章</a-doption>
                                <a-doption value="platformArticleDelete" style="color: red">
                                    删除文章
                                </a-doption>
                            </template>
                        </a-dropdown>
                    </div>
                    <div v-if="item.userTop" class="user-top">
                        <a-tag color="blue">置顶</a-tag>
                    </div>
                </div>

                <div v-if="data.count === 0" class="no-data">
                    <a-empty></a-empty>
                </div>

                <div v-else class="page">
                    <a-pagination
                        v-model:current="params.page"
                        v-model:page-size="params.limit"
                        :total="data.count"
                        show-total
                    ></a-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.platform-article-view {
    background: var(--color-bg-1);
    border-radius: 5px;

    .head {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: @f_border;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            .title {
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            .arco-btn {
                border-radius: 100px;
            }
        }
        :deep(.arco-input-wrapper) {
            border-radius: 100px;
        }
    }
    .body {
        .menu {
            padding: 20px 20px 10px 20px;
            :deep(a) {
                color: var(--color-text-2);
                margin-right: 20px;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: rgb(var(--arcoblue-6));
                }
            }
        }
        .articleList {
            padding: 10px 0 20px 0;
            .item {
                display: flex;
                position: relative;
                padding: 20px;
                border-bottom: @f_border;
                cursor: pointer;
                &:hover {
                    background: var(--color-fill-1);
                }
                .cover {
                    img {
                        width: 160px;
                        border-radius: 5px;
                        margin-right: 10px;
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
                    .abs {
                        padding-right: 20px;
                        margin: 5px 0;
                    }
                    .data {
                        display: flex;
                        align-items: center;
                        color: var(--color-text-2);
                        .look,
                        .comment {
                            margin-right: 10px;
                            span {
                                margin-left: 5px;
                            }
                        }
                        .tags {
                            margin-right: 10px;
                            :deep(.arco-tag) {
                                margin-right: 5px;
                            }
                        }
                        .date {
                            font-size: 12px;
                            color: var(--color-text-2);
                        }
                    }
                }
                .more {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .user-top {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                }
            }

            .page {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
        }
    }
}
</style>
