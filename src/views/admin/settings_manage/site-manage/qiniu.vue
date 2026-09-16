<script setup lang="ts">
import FSite from '@/components/admin/site/f-site.vue'
import FTitle from '@/components/common/f-title.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import type { QiNiuResponse } from '@/api/site-api.ts'
</script>

<template>
    <div class="qiniu-view">
        <a-row>
            <a-col :span="10">
                <f-site name="qiNiu" v-slot="{ data }: { data: QiNiuResponse }">
                    <f-title>七牛云设置</f-title>
                    <div class="body">
                        <a-form
                            :model="data"
                            :label-col-props="{ span: 6 }"
                            :wrapper-col-props="{ span: 18 }"
                        >
                            <a-form-item label="是否启用">
                                <a-switch v-model="data.enable" placeholder="appID"></a-switch>
                            </a-form-item>
                            <a-form-item label="accessKey">
                                <a-input v-model="data.accessKey" placeholder="accessKey"></a-input>
                            </a-form-item>
                            <a-form-item label="存储桶">
                                <a-input v-model="data.bucket" placeholder="存储桶"></a-input>
                            </a-form-item>
                            <a-form-item label="访问URL">
                                <a-input v-model="data.uri" placeholder="访问URL"></a-input>
                            </a-form-item>
                            <a-form-item label="地区">
                                <a-input v-model="data.region" placeholder="地区"></a-input>
                            </a-form-item>
                            <a-form-item label="上传目录">
                                <a-input v-model="data.prefix" placeholder="上传目录"></a-input>
                            </a-form-item>
                            <a-form-item label="大小限制（MB）">
                                <a-input-number
                                    v-model="data.size"
                                    placeholder="大小限制"
                                ></a-input-number>
                            </a-form-item>
                            <a-form-item label="过期时间（秒）">
                                <a-input-number
                                    v-model="data.expiry"
                                    placeholder="过期时间"
                                ></a-input-number>
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
.qiniu-view {
    padding: 20px;
    .body {
        margin-top: 20px;
    }
}
</style>
