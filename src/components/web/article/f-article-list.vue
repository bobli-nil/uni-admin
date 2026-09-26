<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import type { listResponse } from '@/api'
import { articleListApi, type ArticleListItem, type ArticleListRequest } from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'
import { dateCurrentFormat } from '@/utils/date.ts'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

interface Props {
    isCheck?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'dispatchDelete', val: number[]): void
}>()

const checkIDList = ref<number[]>([])
const isCheckShow = ref(false)

const data = reactive<listResponse<ArticleListItem>>({
    count: 0,
    list: [],
})

const params = reactive<ArticleListRequest>({
    type: 1,
    userID: Number(route.params.id),
    status: 3,
})

const getData = async () => {
    const res = await articleListApi(params)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
    checkIDList.value = []
}

const goArticle = (id: number) => {}

const isCheckHandler = () => {
    isCheckShow.value = !isCheckShow.value
}

const dispatchDelete = () => {
    emits('dispatchDelete', checkIDList.value)
}

defineExpose({
    getData,
})

watch(
    () => route.query,
    () => {
        // 注意这里，categoryID 也可能是空字符串
        if (route.query?.categoryID !== undefined) {
            params.categoryID = Number(route.query.categoryID)
        } else {
            params.categoryID = undefined
        }

        if (route.query?.collectID !== undefined) {
            params.collectID = Number(route.query.collectID)
        } else {
            params.collectID = undefined
        }

        if (route.query?.keyword !== undefined) {
            params.keyword = route.query.keyword as string
        }
        getData()
    },
    {
        immediate: true,
    },
)
</script>

<template>
    <div class="f-article-list-parent-com">
        <div v-if="isCheck && userStore.isMe" class="actions">
            <span class="dispatch-span" @click="isCheckHandler">批量操作</span>
            <a-button v-if="checkIDList.length" size="mini" status="danger" @click="dispatchDelete">
                删除
            </a-button>
        </div>
        <div class="f-article-list-com">
            <a-checkbox-group v-model="checkIDList">
                <div
                    class="item"
                    v-for="item in data.list"
                    :key="item.id"
                    @click="goArticle(item.id)"
                >
                    <div v-if="isCheck && isCheckShow" class="check">
                        <a-checkbox :value="item.id"></a-checkbox>
                    </div>
                    <div v-if="item.cover" class="cover">
                        <img :src="item.cover" alt="" />
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
                    <div v-if="item.userTop" class="user-top">
                        <a-tag color="blue">置顶</a-tag>
                    </div>
                </div>
            </a-checkbox-group>

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
</template>

<style scoped lang="less">
.f-article-list-parent-com {
    width: calc(100% - 150px);
    .actions {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .dispatch-span {
            color: var(--color-text-1);
            margin-right: 20px;
            cursor: pointer;
        }
    }
    .f-article-list-com {
        width: 100%;
        height: calc(100% - 40px);
        overflow-y: auto;
        overflow-x: hidden;
        :deep(.arco-checkbox-group) {
            width: 100%;
        }
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
                    object-fit: cover;
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
</style>
