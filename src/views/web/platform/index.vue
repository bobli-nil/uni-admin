<script setup lang="ts">
import FNav from '@/components/web/f-nav.vue'
import FMain from '@/components/web/f-main.vue'
import { useUserCenterStore } from '@/stores/userCenterStore.ts'

const userCenterStore = useUserCenterStore()
userCenterStore.getUserDetail()
</script>

<template>
    <div class="user-center-view">
        <f-nav></f-nav>
        <f-main>
            <div class="container-menu">
                <router-link :to="{ name: 'platformArticle' }">文章管理</router-link>
                <router-link :to="{ name: 'platformComment' }">评论管理</router-link>
            </div>
            <div class="view">
                <router-view></router-view>
            </div>
        </f-main>
    </div>
</template>

<style scoped lang="less">
.user-center-view {
    padding-top: 60px;
    :deep(.f-main) {
        height: calc(100vh - 60px);
        .f-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .container-menu {
                display: flex;
                flex-direction: column;
                width: 180px;
                max-height: 400px;
                padding: 20px 0;
                background: var(--color-bg-1);
                border-radius: 5px;
                a {
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: var(--color-text-2);
                    &:hover {
                        background: var(--color-fill-1);
                    }
                    &.router-link-active {
                        background: var(--color-fill-1);
                        color: rgb(var(--arcoblue-6));
                    }
                }
            }
            .view {
                flex: 1;
                margin-left: 20px;
            }
        }
    }
}
</style>
