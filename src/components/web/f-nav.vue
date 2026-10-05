<script setup lang="ts">
import { reactive, ref } from 'vue'
import FNavMsg from '@/components/web/f-nav-msg.vue'
import FNavAvatar from '@/components/web/f-nav-avatar.vue'
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'
import FTextSearchModal from '@/components/web/f-text-search-modal.vue'

const userStore = useUserStore()
const router = useRouter()

interface Props {
    noScroll?: boolean
    scrollTop?: number
}
const props = defineProps<Props>()
const { noScroll = false, scrollTop = 60 } = props

const isShow = ref(false)

if (!noScroll) {
    window.onscroll = () => {
        const top = document.documentElement.scrollTop
        isShow.value = top > scrollTop
    }
}

const release = () => {
    router.push({ name: 'platformArticleAdd' })
}

const visible = ref(false)

const textSearchRef = ref()
const keyword = ref('')
const search = () => {
    visible.value = true
    if (keyword.value) {
        textSearchRef.value.setSearch(keyword.value)
    }
}

const goHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="f-nav" :class="{ isShow }">
        <div class="container">
            <div class="logo" @click="goHome">拾遗笔记</div>
            <f-text-search-modal
                ref="textSearchRef"
                v-model:visible="visible"
            ></f-text-search-modal>
            <div class="center">
                <icon-robot></icon-robot>
                <a-input-search
                    v-model="keyword"
                    placeholder="搜索你喜欢的文章"
                    @search="search"
                    @keydown.enter="search"
                ></a-input-search>
            </div>
            <div class="right">
                <f-nav-avatar></f-nav-avatar>
                <f-nav-msg></f-nav-msg>
                <span class="history">历史</span>
                <a-button type="primary" @click="release">
                    <icon-plus-circle></icon-plus-circle>
                    发布
                </a-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-nav {
    width: 100vw;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.06);
    background-color: var(--color-bg-1);
    transition: all 0.3s;
    .container {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo {
            width: 20%;
            font-size: 22px;
            font-weight: 600;
            color: var(--color-text-1);
            cursor: pointer;
        }
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            :deep(.arco-icon-robot) {
                font-size: 22px;
                cursor: pointer;
            }
            :deep(.arco-input-wrapper) {
                width: 400px;
                margin-left: 10px;
                border-radius: 20px;
            }
        }
        .right {
            display: flex;
            align-items: center;
            justify-content: end;
            width: 30%;
            .f-nav-avatar {
                margin-right: 20px;
            }
            .f-nav-msg-com {
                margin-right: 20px;
            }
            .history {
                margin-right: 20px;
            }
            :deep(.arco-btn) {
                font-size: 12px;
                border-radius: 100px;
                .arco-icon {
                    font-size: 16px;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>
