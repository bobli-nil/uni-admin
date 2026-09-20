<script setup lang="ts">
import { useUserCenterStore } from '@/stores/userCenterStore.ts'
import { dateTimeFormat } from '@/utils/date.ts'
import { registerResourceOptions } from '@/options/options.ts'
import FLabel from '@/components/common/f-label.vue'
const userCenterStore = useUserCenterStore()

userCenterStore.getUserDetail()
</script>

<template>
    <div class="user-center-info-view">
        <div class="top">
            <div class="avatar">
                <a-avatar :image-url="userCenterStore.userDetail?.avatar" :size="60"></a-avatar>
            </div>
            <div class="info">
                <div class="title">{{ userCenterStore.userDetail?.nickname }}</div>
                <div class="code-age">
                    <a-tag>码龄{{ userCenterStore.userDetail?.codeAge || 0 }}年</a-tag>
                </div>
            </div>
        </div>

        <div class="base-info">
            <div class="head">基本信息</div>
            <div class="body">
                <a-form
                    :model="{}"
                    :label-col-props="{ span: 2 }"
                    :wrapper-col-props="{ span: 22 }"
                >
                    <a-form-item label="用户昵称">
                        {{ userCenterStore.userDetail?.nickname }}
                    </a-form-item>
                    <a-form-item label="用户名">
                        {{ userCenterStore.userDetail?.username }}
                        <a href="javascript:void 0"> <icon-edit></icon-edit> 编辑 </a>
                        <template #help> 登录的唯一标识，30天内可以修改一次 </template>
                    </a-form-item>
                    <a-form-item label="简介">
                        <span>{{ userCenterStore.userDetail?.abstract }}</span>
                        <a href="javascript:void 0"> <icon-edit></icon-edit> 编辑 </a>
                    </a-form-item>
                    <a-form-item label="注册时间">
                        {{ dateTimeFormat(userCenterStore.userDetail?.createdAt || '') }}
                    </a-form-item>
                    <a-form-item label="注册来源">
                        <f-label
                            :options="registerResourceOptions"
                            :value="userCenterStore.userDetail?.registerSource as number"
                        ></f-label>
                    </a-form-item>
                </a-form>
            </div>
        </div>

        <div class="tags">
            <div class="head">
                <div class="title">兴趣标签</div>
                <div class="abs">
                    请您选择感兴趣的技术领域，BlogX会根据你的标签帮您找到更适合您的内容
                </div>
            </div>
            <div class="body">
                <a-tag>后端开发</a-tag>
                <a-tag>前端开发</a-tag>
                <a-tag>gorm</a-tag>
                <a-tag>mysql</a-tag>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.user-center-info-view {
    > div {
        background: var(--color-bg-1);
        border-radius: 5px;
    }
    .top {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 20px;
        .avatar {
            width: 80px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .title {
                font-size: 20px;
                color: var(--color-text-1);
                margin-bottom: 10px;
            }
        }
    }
    .base-info {
        margin-bottom: 20px;
        .head {
            padding: 20px;
            border-bottom: @f_border;
            font-weight: bold;
            font-size: 16px;
            color: var(--color-text-1);
        }
        .body {
            padding: 10px 20px 20px 20px;
            color: var(--color-text-2);
        }
    }
    .tags {
        .head {
            display: flex;
            align-items: center;
            padding: 20px;
            border-bottom: @f_border;
            .title {
                margin-right: 10px;
                font-size: 16px;
                font-weight: bold;
                color: var(--color-text-1);
            }
            .abs {
                color: var(--color-text-2);
            }
        }
        .body {
            padding: 20px;
            span {
                margin-right: 10px;
            }
        }
    }
}
</style>
