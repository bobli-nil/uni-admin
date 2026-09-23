<script setup lang="ts">
import FCard from '@/components/web/f-card.vue'
import FArticleForm from '@/components/web/article/f-article-form.vue'
import { articleAddApi, type ArticleAddType } from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const create = async (form: ArticleAddType) => {
    const res = await articleAddApi(form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    router.push({ name: 'platformArticle' })
}
</script>

<template>
    <div class="platform-article-add">
        <f-card title="发布文章">
            <f-article-form @ok="create"></f-article-form>
        </f-card>
    </div>
</template>

<style scoped lang="less"></style>
