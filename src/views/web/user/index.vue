<script setup lang="ts">
import FNav from '@/components/web/f-nav.vue'
import FMain from '@/components/web/f-main.vue'
import FA from '@/components/common/f-a.vue'
import { useRoute } from 'vue-router'

import { useUserBaseStore } from '@/stores/userBaseStore.ts'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const route = useRoute()
const userBaseStore = useUserBaseStore()
const userStore = useUserStore()
userBaseStore.getUserBaseInfo(Number(route.params.id))

const isMe = computed(() => userBaseStore.userBase.userID === userStore.userInfo?.userID)
</script>

<template>
    <div class="user-view">
        <f-nav></f-nav>
        <f-main>
            <div class="user-info">
                <div class="avatar">
                    <a-avatar :image-url="userBaseStore.userBase.avatar" :size="65"></a-avatar>
                </div>
                <div class="info">
                    <div class="nick">
                        <span>{{ userBaseStore.userBase.nickName }}</span>
                        <span>码龄{{ userBaseStore.userBase.codeAge }}年</span>
                    </div>
                    <div class="data">
                        <span>
                            <span>{{ userBaseStore.userBase.lookCount }}</span>
                            <span>总访问量</span>
                        </span>
                        <span>
                            <span>{{ userBaseStore.userBase.articleCount }}</span>
                            <span>文章</span>
                        </span>
                        <span>
                            <span>{{ userBaseStore.userBase.fansCount }}</span>
                            <span>粉丝</span>
                        </span>
                        <span>
                            <span>{{ userBaseStore.userBase.followCount }}</span>
                            <span>关注</span>
                        </span>
                    </div>
                    <div class="place">ip归属：{{ userBaseStore.userBase.place || '-' }}</div>
                </div>
                <div class="actions">
                    <template v-if="!isMe">
                        <f-a>
                            <a-button type="outline" size="small">
                                <template #icon><icon-plus /></template>
                                关注
                            </a-button>
                        </f-a>
                        <router-link to="">
                            <a-button type="outline" size="small">
                                <template #icon><icon-message /></template>
                                私信
                            </a-button>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link :to="{ name: 'userCenterInfo' }">
                            <a-button type="outline" size="small">编辑资料</a-button>
                        </router-link>
                        <router-link :to="{ name: 'platformArticle' }">
                            <a-button type="outline" size="small">管理博文</a-button>
                        </router-link>
                    </template>
                </div>
            </div>
            <div class="user-sub-view">
                <div class="head">
                    <div class="left">
                        <router-link :to="{ name: 'userArticle' }">
                            {{ isMe ? '我的文章' : '他的文章' }}
                        </router-link>
                        <router-link v-if="isMe || userBaseStore.userBase.openCollect" to="">
                            {{ isMe ? '我的收藏' : '他的收藏' }}
                        </router-link>
                        <router-link v-if="isMe || userBaseStore.userBase.openFollow" to="">
                            {{ isMe ? '我的关注' : '他的关注' }}
                        </router-link>
                        <router-link v-if="isMe || userBaseStore.userBase.openFans" to="">
                            {{ isMe ? '我的粉丝' : '他的粉丝' }}
                        </router-link>
                    </div>
                    <a-input-search placeholder="搜TA的内容"></a-input-search>
                </div>
                <div class="body">
                    <router-view></router-view>
                </div>
            </div>
        </f-main>
    </div>
</template>

<style scoped lang="less">
.user-view {
    height: calc(100vh - 60px);
    padding-top: 60px;
    .user-info {
        display: flex;
        background: var(--color-bg-1);
        border-radius: 5px;
        padding: 10px;
        margin-top: 20px;
        position: relative;
        .avatar {
            width: 100px;
            :deep(.arco-avatar) {
                position: absolute;
                left: 20px;
                top: -10px;
            }
        }
        .info {
            width: calc(100% - 100px);
            .nick {
                display: flex;
                align-items: center;
                span:nth-child(1) {
                    color: var(--color-text-2);
                    margin-right: 10px;
                }
            }
            .data {
                margin: 5px 0;
                > span {
                    margin-right: 20px;
                    span:nth-child(1) {
                        font-size: 18px;
                        color: var(--color-text-1);
                    }
                    span:nth-child(2) {
                        color: var(--color-text-2);
                    }
                }
            }
            .place {
                color: var(--color-text-2);
                margin-top: 10px;
                font-size: 12px;
            }
        }
    }
    .actions {
        position: absolute;
        right: 10px;
        a {
            margin-left: 10px;
            :deep(.arco-btn) {
                border-radius: 100px;
            }
        }
    }

    .user-sub-view {
        margin-top: 20px;
        border-radius: 5px;
        background: var(--color-bg-1);
        .head {
            border-bottom: @f_border;
            padding: 20px 20px 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            :deep(.arco-input-wrapper) {
                width: 200px;
                border-radius: 100px;
            }
            .left {
                a {
                    text-decoration: none;
                    color: var(--color-text-1);
                    font-size: 15px;
                    margin-right: 30px;
                }
                a.router-link-active {
                    color: rgb(var(--arcoblue-6));
                }
            }
        }
        .body {
            height: calc(100vh - 270px);
        }
    }
}
</style>
