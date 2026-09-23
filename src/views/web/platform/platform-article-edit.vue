<script setup lang="ts">
import FCard from '@/components/web/f-card.vue'
import FArticleForm from '@/components/web/article/f-article-form.vue'
import { articleAddApi, type ArticleAddType, articleUpdateApi } from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const edit = async (form: ArticleAddType) => {
    console.log('form', form)
    form.status = 2
    const res = await articleUpdateApi({
        ...form,
        id: Number(route.params.id),
    })
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    router.push({ name: 'platformArticle' })
}
</script>

<template>
    <div class="platform-article-edit">
        <f-card title="编辑文章">
            <f-article-form :article-id="Number(route.params.id)" @ok="edit"></f-article-form>
        </f-card>
    </div>
</template>

<style scoped lang="less"></style>
