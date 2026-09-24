<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const key = ref('')

const search = () => {
    router.push({
        name: route.name,
        query: {
            key: key.value,
        },
    })
}
</script>

<template>
    <div class="comment-view">
        <div class="head">
            <div class="title">评论管理</div>
            <a-input-search
                v-model="key"
                @search="search"
                @keydown.enter="search"
                placeholder="搜索文章评论"
            ></a-input-search>
        </div>
        <div class="body">
            <div class="menu">
                <router-link :to="{ name: 'platformCommentArticle' }">文章评论</router-link>
                <router-link :to="{ name: 'platformCommentMy' }">我的评论</router-link>
            </div>
            <div class="sub-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.comment-view {
    background: var(--color-bg-1);
    border-radius: 5px;
    > .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 10px 20px;
        border-bottom: @f_border;
        .title {
            font-size: 16px;
            font-weight: bold;
        }
        .arco-input-wrapper {
            width: 200px;
            border-radius: 100px;
        }
    }
    > .body {
        padding: 10px 20px 20px 20px;
        .menu {
            :deep(a) {
                margin-right: 20px;
                text-decoration: none;
                color: var(--color-text-2);
                &.router-link-active {
                    color: rgb(var(--arcoblue-6));
                }
            }
        }
        .sub-view {
            margin-top: 10px;
        }
    }
}
</style>
