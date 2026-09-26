<script setup lang="ts">
import FCategoryList from '@/components/web/article/f-category-list.vue'
import FArticleList from '@/components/web/article/f-article-list.vue'
import { useRoute } from 'vue-router'
import { useUserBaseStore } from '@/stores/userBaseStore.ts'
import { useUserStore } from '@/stores/userStore.ts'

const route = useRoute()
const userBaseStore = useUserBaseStore()
const userStore = useUserStore()
</script>

<template>
    <div class="user-article-list-view">
        <f-category-list
            :user-id="Number(route.params.id)"
            :is-me="userBaseStore.userBase.userID === userStore.userInfo?.userID"
        ></f-category-list>
        <f-article-list ref="fArticleListRef" :is-check="true"></f-article-list>
    </div>
</template>

<style scoped lang="less">
.user-article-list-view {
    display: flex;
    height: 100%;
}
</style>
