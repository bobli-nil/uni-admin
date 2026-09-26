<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
    categoryCreateUpdateApi,
    categoryListApi,
    type CategoryCreateUpdateRequest,
    type CategoryListItem,
    categoryRemoveApi,
} from '@/api/category-api.ts'
import { type baseResponse, type listResponse } from '@/api'
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'

interface Props {
    userId: number
}
const props = defineProps<Props>()
const route = useRoute()

const categoryData = reactive<listResponse<CategoryListItem>>({
    count: 0,
    list: [],
})

const getCategoryData = async () => {
    const res = await categoryListApi({
        userID: props.userId,
        type: 2,
    })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(categoryData, res.data)
}

getCategoryData()

const form = reactive<CategoryCreateUpdateRequest>({
    id: 0,
    title: '',
})

const visible = ref(false)

const addCategory = () => {
    form.id = 0
    form.title = ''
    visible.value = true
}

const addCategoryHandler = async () => {
    if (form.title.trim() === '') {
        Message.warning('请输入分类名称')
        return
    }
    let res = await categoryCreateUpdateApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getCategoryData()
}

const showEdit = (item: CategoryListItem) => {
    form.id = item.id
    form.title = item.title
    visible.value = true
}

const remove = async (item: CategoryListItem) => {
    const res = await categoryRemoveApi([item.id])
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getCategoryData()
}
</script>

<template>
    <div class="f-category-com">
        <div class="add">
            <a-button long type="outline" @click="addCategory">
                <template #icon><icon-plus></icon-plus></template>
                创建
            </a-button>
        </div>
        <a-modal
            :title="form.id ? '编辑分类' : '创建分类'"
            width="25%"
            v-model:visible="visible"
            :on-before-ok="addCategoryHandler"
        >
            <a-input v-model="form.title" placeholder="请输入分类名称"></a-input>
        </a-modal>
        <div class="list">
            <div
                class="item"
                v-for="item in categoryData.list"
                :class="{ active: item.id === Number(route.query.categoryID) }"
            >
                <a-trigger content-class="category-trigger" position="br" trigger="contextMenu">
                    <router-link
                        :to="{
                            name: 'userArticle',
                            params: { id: userId },
                            query: {
                                categoryID: item.id,
                            },
                        }"
                    >
                        <a-typography-text :ellipsis="{ css: true, rows: 1 }">
                            <span>{{ item.title }}</span>
                        </a-typography-text>
                        <span>{{ item.articleCount }}</span>
                    </router-link>
                    <template #content>
                        <div class="item" @click="showEdit(item)">编辑</div>
                        <div class="item delete" @click="remove(item)">删除</div>
                    </template>
                </a-trigger>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-category-com {
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
