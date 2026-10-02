<script setup lang="ts">
import FNav from '@/components/web/f-nav.vue'
import FFooter from '@/components/web/f-footer.vue'
import FMain from '@/components/web/f-main.vue'
import About from '@/components/web/index/about.vue'
import BannerList from '@/components/web/index/banner-list.vue'
import ArticleSearchList from '@/components/web/index/article-search-list.vue'
import TagList from '@/components/web/index/tag-list.vue'
</script>

<template>
    <div class="web-home">
        <f-nav></f-nav>
        <f-main>
            <div class="left">
                <banner-list></banner-list>
                <article-search-list></article-search-list>
            </div>
            <div class="right">
                <tag-list></tag-list>
                <about></about>
            </div>
        </f-main>
        <f-footer></f-footer>
    </div>
</template>

<style lang="less">
.web-home {
    padding-top: 60px;
    color: var(--color-text-1);
    .f-container {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        .left {
            width: calc(100% - 280px);
            .article-search-list-com {
                margin-top: 20px;
            }
        }
        .right {
            width: 260px;
        }
    }
}
</style>
