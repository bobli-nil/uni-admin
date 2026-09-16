<script setup lang="ts">
import FSite from '@/components/admin/site/f-site.vue'
import FTitle from '@/components/common/f-title.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import type { AiResponse, QQResponse } from '@/api/site-api.ts'
</script>

<template>
    <div class="ai-view">
        <a-row>
            <a-col :span="10">
                <f-site name="ai" v-slot="{ data }: { data: AiResponse }">
                    <f-title>AI设置</f-title>
                    <div class="body">
                        <a-form
                            :model="data"
                            :label-col-props="{ span: 4 }"
                            :wrapper-col-props="{ span: 20 }"
                        >
                            <a-form-item label="是否启用">
                                <a-switch v-model="data.enable" placeholder="appID"></a-switch>
                            </a-form-item>
                            <a-form-item label="secretKey">
                                <a-input
                                    v-model="data.secretKey"
                                    type="password"
                                    placeholder="secretKey"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="AI昵称">
                                <a-input v-model="data.nickname" placeholder="AI昵称"></a-input>
                            </a-form-item>
                            <a-form-item label="AI头像">
                                <f-image-upload
                                    v-model="data.avatar"
                                    placeholder="AI头像"
                                ></f-image-upload>
                            </a-form-item>
                            <a-form-item label="开场白">
                                <a-textarea
                                    :auto-size="{ minRows: 2, maxRows: 5 }"
                                    v-model="data.abstract"
                                    placeholder="开场白"
                                ></a-textarea>
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
.ai-view {
    padding: 20px;
    .body {
        margin-top: 20px;
    }
}
</style>
