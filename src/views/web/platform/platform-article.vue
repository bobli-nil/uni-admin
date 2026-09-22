<script setup lang="ts">
import FA from '@/components/common/f-a.vue'
</script>

<template>
    <div class="platform-article-view">
        <div class="head">
            <div class="left">
                <div class="title">我的文章</div>
                <a-button type="primary">发布文章</a-button>
            </div>
            <div class="right">
                <a-input-search placeholder="搜索文章"></a-input-search>
            </div>
        </div>
        <div class="body">
            <div class="menu">
                <f-a>已发布</f-a>
                <f-a>审核中</f-a>
                <f-a>草稿箱</f-a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.platform-article-view {
    background: var(--color-bg-1);
    border-radius: 5px;

    .head {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: @f_border;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            .title {
                font-size: 16px;
                font-weight: bold;
                margin-right: 10px;
            }
            .arco-btn {
                border-radius: 100px;
            }
        }
        :deep(.arco-input-wrapper) {
            border-radius: 100px;
        }
    }
    .body {
        padding: 20px;
        .menu {
            :deep(a) {
                color: var(--color-text-2);
                margin-right: 20px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
