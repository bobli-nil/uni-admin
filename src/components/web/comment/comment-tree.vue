<script setup lang="ts">
import { commentDiggApi, commentRemoveApi, type CommentTreeType } from '@/api/comment-api.ts'
import { dateCurrentFormat } from '@/utils/date.ts'
import { commentCreateApi } from '@/api/category-api.ts'
import { Message } from '@arco-design/web-vue'
import { nextTick } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
import { relationOptions } from '@/options/options.ts'
import FLabel from '@/components/common/f-label.vue'
import { goUser } from '@/utils/go-router.ts'

const userStore = useUserStore()

interface Props {
    data: CommentTreeType[]
    level: number
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'ok'): void
}>()

const apply = (item: CommentTreeType) => {
    item.applyContent = ''
    item.isApply = !item.isApply
    nextTick(() => {
        const input = document.querySelector(`.apply-comment-${item.id} input`) as HTMLInputElement
        input.focus()
    })
}

const applyComment = async (item: CommentTreeType) => {
    if (item.applyContent?.trim() === '') {
        Message.warning('回复内容不能为空')
        return
    }
    const res = await commentCreateApi({
        content: item.applyContent as string,
        articleID: item.articleID,
        parentID: item.id,
    })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    emits('ok')
}

const digg = async (item: CommentTreeType) => {
    const res = await commentDiggApi(item.id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)

    item.isDigg = !item.isDigg
    if (item.isDigg) {
        item.diggCount++
    } else {
        item.diggCount--
    }
}

const remove = async (item: CommentTreeType) => {
    const res = await commentRemoveApi(item.id)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    emits('ok')
}
</script>

<template>
    <a-comment
        v-for="item in data"
        align="left"
        class="comment-tree-com"
        :content="item.content"
        :datetime="dateCurrentFormat(item.createdAt)"
    >
        <template #avatar>
            <a-avatar :image-url="item.userAvatar" @click="goUser(item.userID)"></a-avatar>
        </template>
        <template #author>
            <span class="nickname" @click="goUser(item.userID)">{{ item.userNickname }}</span>
            <f-label
                v-if="item.userID !== userStore.userInfo?.userID && item.relation !== 0"
                style="margin-left: 10px"
                :options="relationOptions"
                :value="item.relation"
            ></f-label>
        </template>
        <template #actions>
            <span class="action" :class="{ active: item.isDigg }" @click="digg(item)">
                <span>
                    <icon-thumb-up-fill></icon-thumb-up-fill>
                    点赞({{ item.diggCount }})
                </span>
            </span>
            <span
                v-if="(userStore.siteInfo?.article?.commentLine ?? 0) > level"
                class="action"
                @click="apply(item)"
            >
                <span>
                    <icon-message></icon-message>
                    回复({{ item.applyCount }})
                </span>
            </span>

            <a-popconfirm content="确定删除该评论吗？" @ok="remove(item)">
                <span v-if="item.userID === userStore.userInfo?.userID" class="action">
                    <span>
                        <icon-delete></icon-delete>
                        删除
                    </span>
                </span>
            </a-popconfirm>
            <div v-if="item.isApply" class="apply-comment">
                <a-input
                    v-model="item.applyContent"
                    :class="`apply-comment-${item.id}`"
                    :placeholder="`回复${item.userNickname}`"
                    size="mini"
                ></a-input>
                <a-button type="primary" size="mini" @click="applyComment(item)">回复</a-button>
            </div>
        </template>
        <comment-tree
            v-if="item.subComments?.length > 0"
            :data="item.subComments"
            :level="level + 1"
            @ok="emits('ok')"
        ></comment-tree>
    </a-comment>
</template>

<style lang="less">
.comment-tree-com {
    .action {
        cursor: pointer;
        &.active {
            color: rgb(var(--arcoblue-6));
        }
    }
    .nickname {
        cursor: pointer;
    }
    .apply-comment {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .arco-btn {
            margin-left: 10px;
        }
    }
}
</style>
