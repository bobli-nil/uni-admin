<script setup lang="ts">
import FSite from '@/components/admin/site/f-site.vue'
import FTitle from '@/components/common/f-title.vue'
import type { QQResponse } from '@/api/site-api.ts'
</script>

<template>
    <div class="qq-view">
        <a-row>
            <a-col :span="10">
                <f-site name="qq" v-slot="{ data }: { data: QQResponse }">
                    <f-title>邮箱设置</f-title>
                    <div class="body">
                        <a-form
                            :model="data"
                            :label-col-props="{ span: 4 }"
                            :wrapper-col-props="{ span: 20 }"
                        >
                            <a-form-item label="appID">
                                <a-input v-model="data.appID" placeholder="appID"></a-input>
                            </a-form-item>
                            <a-form-item label="appKey">
                                <a-input v-model="data.appKey" placeholder="appKey"></a-input>
                            </a-form-item>
                            <a-form-item label="回调地址">
                                <a-input v-model="data.redirect" placeholder="回调地址"></a-input>
                            </a-form-item>
                            <div class="site-update-btn"></div>
                        </a-form>
                    </div>
                </f-site>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped lang="less">
.qq-view {
    padding: 20px;
    .body {
        margin-top: 20px;
    }
}
</style>
