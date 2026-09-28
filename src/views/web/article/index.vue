<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, watch, ref } from 'vue'
import FNav from '@/components/web/f-nav.vue'
import FMain from '@/components/web/f-main.vue'
import FArticleCollectModal from '@/components/web/article/f-article-collect-modal.vue'
import ArticleComment from '@/components/web/comment/article-comment.vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { articleDetailApi, articleDiggApi, articleLookApi } from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'
import { type ArticleDetailType, articleCollectApi } from '@/api/article-api.ts'
import { useRoute } from 'vue-router'
import { dateTimeFormat } from '@/utils/date.ts'
import { goArticleEdit, goUser } from '@/utils/go-router.ts'
import { useUserStore } from '@/stores/userStore.ts'

const route = useRoute()
const userStore = useUserStore()

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
    status: 0,
    username: '',
    nickname: '',
    avatar: '',
    categoryTitle: '',
    isCollect: false,
    isDigg: false,
})

const look = async () => {
    const res = await articleLookApi(data.id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
}

const getData = async (articleId: number) => {
    const res = await articleDetailApi(articleId)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)

    setTimeout(look, 5000)
}

watch(
    () => route.params.id,
    () => {
        getData(Number(route.params.id))
    },
    {
        immediate: true,
    },
)

const scrollElement = document.documentElement as HTMLElement

const isFixed = ref(false)
const scroll = () => {
    const top = document.documentElement.scrollTop
    isFixed.value = top > 210
}
onMounted(() => {
    window.addEventListener('scroll', scroll)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', scroll)
})

// 点赞
const digg = async () => {
    const res = await articleDiggApi(data.id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    data.isDigg = !data.isDigg
    if (data.isDigg) {
        data.diggCount++
    } else {
        data.diggCount--
    }
}

const visible = ref(false)

// 点击收藏
const collect = () => {
    if (data.isCollect) {
        // 取消收藏
    }
    visible.value = true
}

const collectArticle = async (id: number) => {
    const res = await articleCollectApi({
        articleID: data.id,
        collectID: id,
    })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
}

const goTop = () => {
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const articleCommentRef = ref()

const goComment = () => {
    const dom = document.querySelector('.article-comment-com') as HTMLDivElement
    const top = dom.offsetTop || 0
    document.documentElement.scrollTo({
        top,
        behavior: 'smooth',
    })
    setTimeout(() => {
        articleCommentRef.value?.focus()
    }, 800)
}
</script>

<template>
    <div class="article-detail-view">
        <f-article-collect-modal
            v-model:visible="visible"
            @select="collectArticle"
        ></f-article-collect-modal>
        <f-nav></f-nav>
        <f-main>
            <div class="article-container">
                <div class="article-content">
                    <div class="head">
                        <div class="title">
                            <span>{{ data.title }}</span>
                            <icon-edit
                                v-if="data.userId === userStore.userInfo?.userID"
                                @click="goArticleEdit(data.id)"
                            ></icon-edit>
                        </div>
                        <div class="date">{{ dateTimeFormat(data.createdAt) }}</div>
                        <div class="tags">
                            <a-tag v-for="item in data.tagList">{{ item }}</a-tag>
                        </div>
                    </div>
                    <div class="body">
                        <MdPreview :model-value="data.content" :id="`id-${data.id}`"></MdPreview>
                    </div>
                </div>
                <article-comment
                    v-if="data.openComment"
                    ref="articleCommentRef"
                    :article-id="Number(route.params.id)"
                ></article-comment>
                <div v-else class="close-comment">作者已关闭文章评论</div>
            </div>
            <div class="article-info">
                <div class="user-info">
                    <div class="user" @click="goUser(data.userId)">
                        <a-avatar :image-url="data.avatar"></a-avatar>
                    </div>
                    <div class="nick" @click="goUser(data.userId)">{{ data.nickname }}</div>
                    <div class="data">
                        <div class="item">
                            <span>{{ data.lookCount }}</span>
                            <span>
                                <icon-eye />
                            </span>
                        </div>
                        <div class="item">
                            <span>{{ data.diggCount }}</span>
                            <span>
                                <icon-thumb-up />
                            </span>
                        </div>
                        <div class="item">
                            <span>{{ data.collectCount }}</span>
                            <span>
                                <icon-star />
                            </span>
                        </div>
                        <div class="item">
                            <span>{{ data.commentCount }}</span>
                            <span>
                                <icon-message />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="catalog-actions" :class="isFixed ? 'isFixed' : ''">
                    <div class="catalog">
                        <div class="head">目录</div>
                        <div class="body scroll-bar">
                            <MdCatalog
                                :scrollElementOffsetTop="60"
                                :offsetTop="61"
                                :editorId="`id-${data.id}`"
                                :scrollElement="scrollElement"
                            ></MdCatalog>
                        </div>
                    </div>
                    <div class="article-actions">
                        <span :class="{ active: data.isDigg }" title="点赞" @click="digg">
                            <icon-thumb-up-fill />
                        </span>
                        <span :class="{ active: data.isCollect }" title="收藏" @click="collect">
                            <icon-star-fill />
                        </span>
                        <span title="回到顶部" @click="goTop">
                            <icon-to-top />
                        </span>
                        <span title="去评论" @click="goComment">
                            <icon-message />
                        </span>
                    </div>
                </div>
            </div>
        </f-main>
    </div>
</template>

<style scoped lang="less">
.article-detail-view {
    height: calc(100vh - 60px);
    padding-top: 60px;
    :deep(.f-container) {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
    }
    .article-container {
        width: calc(100% - 280px);
        .article-content {
            background: var(--color-bg-1);
            border-radius: 5px;
            .head {
                padding: 20px 20px 10px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-bottom: @f_border;
                .title {
                    font-size: 20px;
                    font-weight: bold;
                    color: var(--color-text-1);
                }
                .date {
                    color: var(--color-text-2);
                    font-size: 12px;
                    margin: 10px 0;
                }
                .tags {
                    :deep(.arco-tag) {
                        margin-right: 10px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
            .body {
                padding: 10px 30px 20px 30px;
                .md-editor-preview-wrapper {
                    padding: 0;
                }
            }
        }
        .close-comment {
            margin: 20px 0;
            padding: 30px 20px;
            text-align: center;
            background: var(--color-bg-1);
            border-radius: 5px;
            color: var(--color-text-2);
        }
    }
    .article-info {
        width: 260px;
        .user-info {
            background: var(--color-bg-1);
            border-radius: 5px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .user {
                cursor: pointer;
            }
            .nick {
                margin: 10px 0 20px 0;
                color: var(--color-text-1);
                cursor: pointer;
            }
            .data {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 100%;
                .item {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    :deep(.arco-icon) {
                        font-size: 18px;
                        color: var(--color-text-2);
                    }
                    span:nth-child(1) {
                        font-size: 16px;
                        color: var(--color-text-1);
                        margin-bottom: 8px;
                    }
                }
            }
        }
        .catalog-actions {
            &.isFixed {
                position: fixed;
                width: 260px;
                top: 60px;
            }
            :deep(.md-editor-catalog) {
                position: relative;
            }
            .catalog {
                background: var(--color-bg-1);
                border-radius: 5px;
                margin-top: 20px;
                .head {
                    padding: 20px;
                    border-bottom: @f_border;
                    font-weight: bold;
                    color: var(--color-text-1);
                }
                .body {
                    padding: 10px 20px;
                    max-height: calc(100vh - 240px);
                    overflow-y: auto;
                    overflow-x: hidden;
                    :deep(.md-editor-catalog-active) {
                        > span {
                            color: rgb(var(--arcoblue-6));
                        }
                    }
                    :deep(.md-editor-catalog-link) {
                        > span:hover {
                            color: rgb(var(--arcoblue-6));
                        }
                    }
                    :deep(.md-editor-catalog-indicator) {
                        background: rgb(var(--arcoblue-6));
                    }
                }
            }
            .article-actions {
                background: var(--color-bg-1);
                border-radius: 5px;
                margin-top: 20px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                justify-items: center;
                align-items: center;
                padding: 10px 0;

                > span {
                    padding: 8px;
                    cursor: pointer;
                    &.active {
                        :deep(.arco-icon) {
                            color: rgb(var(--arcoblue-6));
                        }
                    }
                    &:hover {
                        background: var(--color-fill-1);
                    }
                }

                :deep(.arco-icon) {
                    border-radius: 5px;
                    font-size: 20px;
                    color: var(--color-text-2);
                }
            }
        }
    }
}
</style>

<style lang="less">
.article-detail-view {
    .article-content {
        .head {
            .arco-icon {
                margin-left: 10px;
                cursor: pointer;
            }
        }
    }
}
</style>
