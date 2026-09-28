<script setup lang="ts">
import FNav from '@/components/web/f-nav.vue'
import FFooter from '@/components/web/f-footer.vue'
import FMain from '@/components/web/f-main.vue'
</script>

<template>
    <div class="web-home">
        <f-nav></f-nav>
        <f-main>
            <div class="left">
                <div class="article-list"></div>
            </div>
            <div class="right"></div>
        </f-main>
        <f-footer></f-footer>
    </div>
</template>

<style scoped>
.web-home {
    padding-top: 60px;
    color: var(--color-text-1);
}
</style>
