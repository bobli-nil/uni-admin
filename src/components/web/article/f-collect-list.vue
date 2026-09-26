<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
    categoryCreateUpdateApi,
    type CategoryCreateUpdateRequest,
    type CategoryListItem,
    categoryRemoveApi,
} from '@/api/category-api.ts'
import { type listResponse } from '@/api'
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import FA from '@/components/common/f-a.vue'
import { useRouter } from 'vue-router'
import {
    collectListApi,
    type CollectListRequest,
    type CollectCreateUpdateRequest,
    type CollectListItem,
    collectCreateUpdateApi,
    collectRemoveApi,
} from '@/api/collect-api.ts'

const router = useRouter()

interface Props {
    userId: number
    isMe: boolean
}
const props = defineProps<Props>()
const route = useRoute()

const collectData = reactive<listResponse<CollectListItem>>({
    count: 0,
    list: [],
})

const getCollectData = async () => {
    const res = await collectListApi({
        userID: props.userId,
        type: 2,
    })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(collectData, res.data)
}

getCollectData()

const form = reactive<CollectCreateUpdateRequest>({
    id: 0,
    title: '',
    abstract: '',
})

const visible = ref(false)

const addCollect = () => {
    form.id = 0
    form.title = ''
    form.abstract = ''
    visible.value = true
}

const formRef = ref()

const addCollectHandler = async () => {
    const val = await formRef.value.validate()
    if (val) return
    let res = await collectCreateUpdateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getCollectData()
}

const showEdit = (item: CollectListItem) => {
    form.id = item.id
    form.title = item.title
    form.abstract = item.abstract
    visible.value = true
}

const remove = async (item: CollectListItem) => {
    const res = await collectRemoveApi([item.id])
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getCollectData()
}

const go = (item: CollectListItem) => {
    if (Number(route.query.collectID) === item.id) {
        // const { collectID, ...rest } = route.query
        // router.replace({ query: rest })
        router.push({
            name: route.name,
            query: {
                ...route.query,
                collectID: -1,
            },
        })
        return
    }

    router.push({
        name: route.name,
        params: {
            ...route.params,
        },
        query: {
            ...route.query,
            collectID: item.id,
        },
    })
}
</script>

<template>
    <div class="f-collect-com">
        <div v-if="isMe" class="add">
            <a-button long type="outline" @click="addCollect">
                <template #icon><icon-plus></icon-plus></template>
                创建
            </a-button>
        </div>
        <a-modal
            v-if="isMe"
            :title="form.id ? '编辑收藏夹' : '创建收藏夹'"
            width="25%"
            v-model:visible="visible"
            :on-before-ok="addCollectHandler"
        >
            <a-form
                ref="formRef"
                :model="form"
                :label-col-props="{ span: 6 }"
                :wrapper-col-props="{ span: 16 }"
            >
                <a-form-item
                    label="收藏夹标题"
                    field="title"
                    validate-trigger="blur"
                    :rules="[{ required: true, message: '请输入收藏夹标题' }]"
                >
                    <a-input v-model="form.title" placeholder="收藏夹标题"></a-input>
                </a-form-item>
                <a-form-item label="收藏夹简介">
                    <a-textarea
                        v-model="form.abstract"
                        placeholder="收藏夹简介"
                        :auto-size="{ minRows: 2, maxRows: 4 }"
                    ></a-textarea>
                </a-form-item>
            </a-form>
        </a-modal>
        <div class="list">
            <div
                class="item"
                v-for="item in collectData.list"
                :class="{ active: item.id === Number(route.query.collectID) }"
            >
                <a-trigger
                    v-if="isMe"
                    content-class="category-trigger"
                    position="br"
                    trigger="contextMenu"
                >
                    <f-a @click="go(item)">
                        <a-typography-text :ellipsis="{ css: true, rows: 1 }">
                            <span>{{ item.title }}</span>
                        </a-typography-text>
                        <span>{{ item.articleCount }}</span>
                    </f-a>
                    <template #content>
                        <div class="item" @click="showEdit(item)">编辑</div>
                        <div class="item delete" @click="remove(item)">删除</div>
                    </template>
                </a-trigger>

                <f-a v-else @click="go(item)">
                    <a-typography-text :ellipsis="{ css: true, rows: 1 }">
                        <span>{{ item.title }}</span>
                    </a-typography-text>
                    <span>{{ item.articleCount }}</span>
                </f-a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-collect-com {
    width: 150px;
    padding: 10px;
    border-right: @f_border;
    :deep(.arco-btn) {
        border-radius: 100px;
    }
    .list {
        margin-top: 20px;
        .item {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            border-radius: 5px;
            cursor: pointer;
            :deep(a) {
                text-decoration: none;
                color: rgb(var(--arcoblue-6));
            }
            &:hover {
                background: var(--color-fill-1);
            }
            &.active {
                a {
                    color: rgb(var(--arcoblue-6));
                }
                :deep(.arco-typography) {
                    color: rgb(var(--arcoblue-6));
                }
            }
            a {
                height: 100%;
                display: flex;
                align-items: center;
                color: var(--color-text-2);
                width: 100%;
                justify-content: space-between;
                :deep(.arco-typography) {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
