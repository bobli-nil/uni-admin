<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const goRouter = (name: string) => {
    if (name === 'exit') {
        return
    }
    router.push({ name })
}
</script>

<template>
    <div class="f-nav-avatar">
        <a-trigger
            animation-name="fade"
            class="f-nav-avatar-trigger"
            trigger="hover"
            :unmount-on-close="false"
        >
            <a-avatar :image-url="userStore?.userInfo?.avatar" :size="30"></a-avatar>
            <template #content>
                <div class="f-nav-avatar-com">
                    <div class="avatar">
                        <a-avatar :image-url="userStore?.userInfo?.avatar" :size="60"></a-avatar>
                    </div>
                    <div class="nickname">zhangsan</div>
                    <div class="data">
                        <a-statistic extra="粉丝" :value="99"></a-statistic>
                        <a-statistic extra="关注" :value="99"></a-statistic>
                        <a-statistic extra="文章" :value="99"></a-statistic>
                    </div>
                    <div class="menu">
                        <div class="item" @click="goRouter('userCenter')">
                            <icon-user /><span>个人中心</span>
                        </div>
                        <div class="item" @click="goRouter('articleManage')">
                            <icon-file /><span>文章管理</span>
                        </div>
                        <div class="item" @click="goRouter('msgChat')">
                            <icon-message /><span>我的消息</span>
                        </div>
                    </div>
                    <div class="exit">
                        <div class="item" @click="goRouter('exit')">
                            <icon-to-right /><span>退出</span>
                        </div>
                    </div>
                </div>
            </template>
        </a-trigger>
    </div>
</template>

<style lang="less">
.f-nav-avatar {
    .arco-avatar {
        cursor: pointer;
    }
}

.f-nav-avatar-com {
    position: relative;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
    background: var(--color-bg-1);
    color: var(--color-text-2);
    .avatar {
        position: absolute;
        left: 50%;
        top: -30px;
        transform: translateX(-50%);
    }
    .nickname {
        text-align: center;
        padding: 40px 20px 10px 20px;
    }
    .data {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 10px 20px;
        border-top: @f_border;
        border-bottom: @f_border;
        .arco-statistic-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            .arco-statistic-value-integer {
                font-size: 20px;
                color: var(--color-text-1);
            }
            .arco-statistic-extra {
                margin-top: 0;
            }
        }
    }
    .item {
        display: flex;
        align-items: center;
        height: 35px;
        padding: 0 20px;
        cursor: pointer;
        &:hover {
            background-color: var(--color-fill-1);
        }
        .arco-icon {
            margin-right: 10px;
        }
    }
    .menu {
        border-bottom: @f_border;
        padding: 10px 0;
    }
    .exit {
        padding: 10px 0;
    }
}

.f-nav-avatar-trigger {
    .arco-trigger-popup-wrapper {
        transition: all 0.3s;
    }
    .fade-enter-active {
        transform: scale(0);
        transform-origin: top center;
        opacity: 0;
    }
    .fade-enter-to {
        transform: scale(1);
        transform-origin: top center;
        opacity: 1;
    }
    .fade-leave-active {
    }
    .fade-leave-to {
        transform: scale(0.8);
        transform-origin: top center;
        opacity: 0;
    }
}
</style>
