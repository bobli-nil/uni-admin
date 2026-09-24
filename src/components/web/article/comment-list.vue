<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { baseResponse, listResponse } from '@/api'
import {
    commentListApi,
    type CommentListRequest,
    type CommentListType,
    commentRemoveApi,
} from '@/api/comment-api.ts'
import { Message } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'

interface Props {
    type: 1 | 2
}
const props = defineProps<Props>()

const route = useRoute()

const checkIdList = ref<number[]>([])

const params = reactive<CommentListRequest>({
    type: props.type,
})

watch(
    () => route.query,
    () => {
        params.keyword = route.query.key as string
        getData()
    },
)

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
    res.data.list = res.data.list.map((item) => {
        item.visible = false
        return item
    })
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
    checkIdList.value = []
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

defineExpose({
    getData,
})
</script>

<template>
    <div class="comment-list-com">
        <div class="actions" v-if="data.count > 0">
            <a-checkbox v-model="isCheckAll" @change="checkAll">全选</a-checkbox>
            <a-button v-if="checkIdList.length" size="small" status="danger" @click="removeComment">
                删除
            </a-button>
        </div>

        <a-checkbox-group v-model="checkIdList">
            <div class="comment-list">
                <template v-for="item in data.list" :key="item.id">
                    <div class="item">
                        <div class="check">
                            <a-checkbox :value="item.id"></a-checkbox>
                        </div>
                        <slot :data="item"></slot>
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

        <div v-else class="empty">
            <a-empty></a-empty>
        </div>
    </div>
</template>

<style scoped lang="less">
.comment-list-com {
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
        }
    }
    .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
}
</style>
