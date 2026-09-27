<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { baseResponse, listResponse } from '@/api'
import {
    type FansFocusListItem,
    type FansFocusListRequest,
    fansListApi,
    focusListApi,
    focusUserApi,
    focusUserRemoveApi,
} from '@/api/focus-api.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { Message } from '@arco-design/web-vue'
import defaultAvatar from '@/assets/img/default-avatar.png'
import { relationOptions } from '@/options/options.ts'
import FLabel from '@/components/common/f-label.vue'
import { useRoute } from 'vue-router'
import { goUser } from '@/utils/go-router.ts'

const userStore = useUserStore()
const route = useRoute()

interface Props {
    userId: number
    type: 'focus' | 'fans'
}
const props = defineProps<Props>()

const data = reactive<listResponse<FansFocusListItem>>({
    count: 0,
    list: [],
})

const params = reactive<FansFocusListRequest>({
    userID: props.userId,
    isMe: false,
    keyword: '',
    page: 1,
    limit: 20,
})

const getData = async () => {
    params.isMe = userStore.userInfo?.userID === props.userId
    let res: baseResponse<listResponse<FansFocusListItem>>
    if (props.type === 'focus') {
        res = await focusListApi(params)
    } else {
        res = await fansListApi(params)
    }
    if (res.code) {
        Message.error(res.msg)
        return
    }
    data.count = res.data.count
    data.list = res.data.list
}

getData()

const focus = async (userID: number, isFocus: boolean) => {
    if (!userStore.isLogin) {
        Message.warning('请登录')
        return
    }
    let res: baseResponse<string>
    if (isFocus) {
        res = await focusUserApi({ focusUserID: userID })
    } else {
        res = await focusUserRemoveApi({ focusUserID: userID })
    }
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    getData()
}

watch(
    () => route.query.keyword,
    () => {
        params.keyword = route.query.keyword as string
        getData()
    },
)
</script>

<template>
    <div class="f-focus-list-com">
        <div class="user-list">
            <div class="item" v-for="item in data.list" :key="item.userID">
                <a-avatar
                    @click="goUser(item.userID)"
                    :image-url="item.userAvatar || defaultAvatar"
                    :size="60"
                ></a-avatar>
                <div class="info">
                    <div class="nick">
                        <span class="nickname" @click="goUser(item.userID)">
                            <a-typography-text :ellipsis="{ rows: 1, css: true }">
                                {{ item.userNickname }}
                            </a-typography-text>
                        </span>
                        <f-label
                            v-if="item.relation !== 1 && item.relation !== 0"
                            :options="relationOptions"
                            :value="item.relation"
                        ></f-label>
                    </div>
                    <div class="abs">
                        <a-typography-text :ellipsis="{ rows: 1, css: true }">
                            {{ item.userAbstract }}
                        </a-typography-text>
                    </div>
                    <div class="action">
                        <a-button
                            v-if="item.relation === 2 || item.relation === 4"
                            type="primary"
                            size="mini"
                            @click="focus(item.userID, false)"
                        >
                            已关注
                        </a-button>
                        <a-button
                            v-else
                            type="outline"
                            size="mini"
                            @click="focus(item.userID, true)"
                            >关注</a-button
                        >
                    </div>
                </div>
            </div>
        </div>

        <div v-if="data.count === 0" class="no-data">
            <a-empty></a-empty>
        </div>

        <div v-if="data.count > 0" class="page">
            <a-pagination
                v-model:page-size="params.limit"
                v-model:current="params.page"
                show-total
                :total="data.count"
                @change="getData"
            ></a-pagination>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-focus-list-com {
    padding: 20px;
    .user-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 20px;
        row-gap: 20px;
        .item {
            width: 100%;
            display: flex;
            :deep(.arco-avatar-circle) {
                flex-shrink: 0;
                cursor: pointer;
            }
            .info {
                margin-left: 10px;
                .nick {
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    .nickname {
                        max-width: 6rem;
                        cursor: pointer;
                    }
                }
                :deep(.arco-tag) {
                    margin-left: 10px;
                    transform: scale(0.9);
                }
                .abs {
                    height: 1.5rem;
                }
            }
        }
    }
    .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
}
</style>
