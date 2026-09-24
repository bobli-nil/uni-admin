<script setup lang="ts">
import { type CommentListType } from '@/api/comment-api.ts'
import CommentList from '@/components/web/article/comment-list.vue'
import { dateTimeFormat } from '@/utils/date.ts'
</script>

<template>
    <div class="my-comment-view">
        <comment-list :type="2" v-slot="{ data: item }: { data: CommentListType }">
            <div class="user">
                <a-avatar :image-url="item.userAvatar"></a-avatar>
            </div>
            <div class="info">
                <div class="article">
                    评论了文章:
                    <router-link to="">{{ item.articleTitle }}</router-link>
                </div>
                <div class="content">
                    <a-typography-text :ellipsis="{ rows: 2, css: true }">
                        {{ item.content }}
                    </a-typography-text>
                </div>
                <div class="data">
                    <span class="date">{{ dateTimeFormat(item.createdAt) }}</span>
                    <span class="digg">
                        <icon-thumb-up></icon-thumb-up>
                        <span>{{ item.diggCount }}</span>
                    </span>
                </div>
            </div>
        </comment-list>
    </div>
</template>

<style scoped lang="less">
.my-comment-view {
    .user {
        width: 50px;
    }
    .info {
        .article {
            color: var(--color-text-2);
            :deep(a) {
                color: rgb(var(--arcoblue-6));
            }
        }
        .content {
            padding-right: 10px;
            margin: 5px 0;
        }
        .data {
            color: var(--color-text-2);
            display: flex;
            align-items: center;
            .date {
                font-size: 12px;
            }
            .digg {
                margin: 0 10px;
                i {
                    cursor: pointer;
                    font-size: 12px;
                    margin-right: 5px;
                }
            }
            a {
                color: var(--color-text-2);
            }
        }
    }
    .cover {
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        span {
            color: var(--color-text-2);
        }
    }
}
</style>
