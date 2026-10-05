<script setup lang="ts">
import { computed } from 'vue'
import FCard from '@/components/web/f-card.vue'
import { useUserStore } from '@/stores/userStore.ts'
import type { SiteResponse } from '@/api/site-api.ts'

const userStore = useUserStore()

const about = computed(() => {
    return userStore.siteInfo?.about || ({} as SiteResponse['about'])
})
</script>

<template>
    <f-card title="关于本站" class="about-com">
        <div class="item" v-if="about.siteDate">
            <span>建站日期</span>
            <span>{{ about.siteDate }}</span>
        </div>
        <div class="item" v-if="about.version">
            <span>网站版本</span>
            <span>{{ about.version }}</span>
        </div>
        <div class="item">联系作者</div>
        <div class="item icons">
            <div class="icon qq-wrapper">
                <img src="@/assets/img/qq-code.png" class="qq" alt="" />
                <img src="@/assets/img/qq.png" alt="" />
            </div>
            <div class="icon wechat-wrapper">
                <img src="@/assets/img/wechat-code.png" class="wechat" alt="" />
                <img src="@/assets/img/wechat.png" alt="" />
            </div>
            <div class="icon">
                <a :href="about.gitee" v-if="about.gitee">
                    <img src="@/assets/img/gitee.png" alt="" />
                </a>
            </div>
            <div class="icon" v-if="about.github">
                <a :href="about.github">
                    <img src="@/assets/img/github.png" alt="" />
                </a>
            </div>
        </div>
    </f-card>
</template>

<style scoped lang="less">
.about-com {
    margin-top: 20px;
    :deep(.body) {
        overflow: visible;
    }
    .item {
        display: flex;
        align-items: center;
        color: var(--color-text-2);
        font-size: 15px;
        margin-bottom: 10px;
        span:nth-child(2) {
            margin-left: 5px;
        }
    }
    .icons {
        margin-top: 20px;
        .icon {
            display: flex;
            justify-content: space-around;
            position: relative;
            width: 100%;
            img {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
        }
        .qq-wrapper {
            &:hover {
                .qq {
                    display: block;
                }
            }
        }
        .wechat-wrapper {
            &:hover {
                .wechat {
                    display: block;
                }
            }
        }
        .qq,
        .wechat {
            display: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 40px;
            width: 200px !important;
            height: 200px !important;
            object-fit: cover;
            background: var(--color-bg-1);
        }
    }
}
</style>
