<script setup lang="ts">
import FCollectList from '@/components/web/article/f-collect-list.vue'
import FArticleList from '@/components/web/article/f-article-list.vue'
import { useRoute } from 'vue-router'
import { useUserBaseStore } from '@/stores/userBaseStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { computed, ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { collectArticleRemoveApi } from '@/api/collect-api.ts'

const route = useRoute()
const userBaseStore = useUserBaseStore()
const userStore = useUserStore()

const isMe = computed(() => {
    return userBaseStore.userBase.userID === userStore.userInfo?.userID
})

const fArticleListRef = ref()

const dispatchDelete = async (idList: number[]) => {
    console.log('idList', idList)
    const res = await collectArticleRemoveApi(idList)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    fArticleListRef.value.getData()
}
</script>

<template>
    <div class="user-article-list-view">
        <f-collect-list :user-id="Number(route.params.id)" :is-me="isMe"></f-collect-list>
        <f-article-list
            ref="fArticleListRef"
            :is-check="isMe"
            @dispatch-delete="dispatchDelete"
        ></f-article-list>
    </div>
</template>

<style scoped lang="less">
.user-article-list-view {
    display: flex;
    height: 100%;
}
</style>
