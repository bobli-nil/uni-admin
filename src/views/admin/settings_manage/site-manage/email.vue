<script setup lang="ts">
import FSite from '@/components/admin/site/f-site.vue'
import FTitle from '@/components/common/f-title.vue'
import type { EmailResponse } from '@/api/site-api.ts'
</script>

<template>
    <div class="email-view">
        <a-row>
            <a-col :span="10">
                <f-site name="email" v-slot="{ data }: { data: EmailResponse }">
                    <f-title>邮箱设置</f-title>
                    <div class="body">
                        <a-alert type="info">邮箱配置之后，系统的邮箱注册功能才能正常使用</a-alert>
                        <a-form
                            :model="data"
                            :label-col-props="{ span: 4 }"
                            :wrapper-col-props="{ span: 20 }"
                        >
                            <a-form-item label="邮箱域名">
                                <a-input v-model="data.domain" placeholder="邮箱域名"></a-input>
                            </a-form-item>
                            <a-form-item label="邮箱端口">
                                <a-input-number
                                    v-model="data.port"
                                    placeholder="邮箱端口"
                                ></a-input-number>
                            </a-form-item>
                            <a-form-item label="发信邮箱">
                                <a-input v-model="data.sendEmail" placeholder="发信邮箱"></a-input>
                            </a-form-item>
                            <a-form-item label="授权码">
                                <a-input v-model="data.authCode" placeholder="授权码"></a-input>
                            </a-form-item>
                            <a-form-item label="发信名称">
                                <a-input
                                    v-model="data.sendNickname"
                                    placeholder="发信名称"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="ssl">
                                <a-switch v-model="data.ssl" placeholder="ssl"></a-switch>
                            </a-form-item>
                            <a-form-item label="tls">
                                <a-switch v-model="data.tls" placeholder="tls"></a-switch>
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
.email-view {
    padding: 20px;
    .arco-alert {
        margin-bottom: 20px;
    }
}
.body {
    margin-top: 20px;
}
</style>
