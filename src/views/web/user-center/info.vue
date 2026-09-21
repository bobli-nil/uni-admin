<script setup lang="ts">
import { useUserCenterStore } from '@/stores/userCenterStore.ts'
import { dateTimeFormat } from '@/utils/date.ts'
import { registerResourceOptions } from '@/options/options.ts'
import FLabel from '@/components/common/f-label.vue'
import FEditInput from '@/components/common/input/f-edit-input.vue'
import FAvatarCutter from '@/components/web/f-avatar-cutter.vue'
import FTagsInput from '@/components/common/input/f-tags-input.vue'
import { Message } from '@arco-design/web-vue'
import { type UserDetailUpdateRequest, userUpdateApi } from '@/api/user-api.ts'
const userCenterStore = useUserCenterStore()

userCenterStore.getUserDetail()

const userUpdateColumn = async (
    column: 'username' | 'nickname' | 'avatar' | 'abstract' | 'likeTags',
    value: string | string[],
) => {
    const data: UserDetailUpdateRequest = {}
    if (column === 'likeTags') {
        data.likeTags = value as string[]
    } else {
        data[column] = value as string
    }

    const res = await userUpdateApi(data)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success(res.msg)
    userCenterStore.getUserDetail()
}

const isUpdateUsername = (updateTime?: string) => {
    if (!updateTime) {
        return true
    }
    const t1 = new Date(updateTime).getTime()
    const t2 = new Date().getTime()
    const subDay = (t2 - t1) / (24 * 60 * 60 * 1000)
    return subDay > 30
}
</script>

<template>
    <div class="user-center-info-view">
        <div class="top">
            <div class="avatar">
                <a-avatar
                    v-if="userCenterStore.userDetail?.registerSource === 2"
                    :image-url="userCenterStore.userDetail?.avatar"
                    :size="60"
                ></a-avatar>

                <f-avatar-cutter v-else @ok="userUpdateColumn('avatar', $event)">
                    <div class="avatar-inner">
                        <icon-camera class="camera"></icon-camera>
                        <a-avatar
                            :image-url="userCenterStore.userDetail?.avatar"
                            :size="60"
                        ></a-avatar>
                    </div>
                </f-avatar-cutter>
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
                    <a-form-item label="用户名">
                        <f-edit-input
                            :value="userCenterStore.userDetail?.username || ''"
                            :no-edit="
                                userCenterStore.userDetail?.registerSource === 2 ||
                                !isUpdateUsername(
                                    userCenterStore.userDetail?.userConf.updateUsernameDate,
                                )
                            "
                            placeholder="用户名"
                            @ok="userUpdateColumn('username', $event)"
                        ></f-edit-input>
                        <template #help> 登录的唯一标识，30天内可以修改一次 </template>
                    </a-form-item>
                    <a-form-item label="昵称">
                        <f-edit-input
                            :value="userCenterStore.userDetail?.nickname || ''"
                            :no-edit="userCenterStore.userDetail?.registerSource === 2"
                            placeholder="用户名"
                            @ok="userUpdateColumn('nickname', $event)"
                        ></f-edit-input>
                    </a-form-item>
                    <a-form-item label="简介">
                        <f-edit-input
                            :value="userCenterStore.userDetail?.abstract || ''"
                            placeholder="简介"
                            type="textarea"
                            @ok="userUpdateColumn('abstract', $event)"
                        ></f-edit-input>
                    </a-form-item>
                    <a-form-item label="注册时间">
                        {{ dateTimeFormat(userCenterStore.userDetail?.createdAt || '') }}
                    </a-form-item>
                    <a-form-item label="注册来源">
                        <f-label
                            :options="registerResourceOptions"
                            :value="userCenterStore.userDetail?.registerSource || ''"
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
                <f-tags-input
                    :value="userCenterStore.userDetail?.userConf.likeTags || []"
                    @ok="userUpdateColumn('likeTags', $event)"
                ></f-tags-input>
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
            margin-right: 20px;
            .avatar-inner {
                position: relative;
                cursor: pointer;
                .camera {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 20px;
                    color: #fff;
                    z-index: 2;
                }
                &:hover {
                    .camera {
                        display: block;
                    }
                }
            }
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
