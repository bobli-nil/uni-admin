<script setup lang="ts">
import FTitle from '@/components/common/f-title.vue'
import { reactive } from 'vue'

const form = reactive({
    qiNiu: {
        enable: false,
    },
    ai: {
        enable: false,
    },
    siteInfo: {
        title: '',
        logo: '',
        beian: '',
        mode: 1,
    },
    project: {
        title: '',
        icon: '',
        webPath: '',
    },
    seo: {
        keywords: '',
        description: '',
    },
    about: {
        version: '',
        siteAbout: '',
        qq: '',
        wechat: '',
        gitee: '',
        bilibili: '',
        github: '',
    },
    login: {
        qqLogin: false,
        usernamePwdLogin: false,
        emailPwdLogin: false,
        captcha: false,
    },
    indexRight: {
        list: [],
    },
    article: {
        noExamine: true,
        commentLine: 3,
    },
})
</script>

<template>
    <div class="site-view">
        <a-form :model="form">
            <a-row>
                <a-col :span="8">
                    <div class="form site-form">
                        <f-title>网站设置</f-title>
                        <div class="body">
                            <a-form-item
                                label="网站标题"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.siteInfo.title"
                                    placeholder="网站标题"
                                ></a-input>
                            </a-form-item>
                            <a-form-item
                                label="logo"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                            </a-form-item>
                            <a-form-item
                                label="备案号"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.siteInfo.beian"
                                    placeholder="备案号"
                                ></a-input>
                            </a-form-item>
                            <a-form-item
                                label="运行模式"
                                :label-col-props="{ span: 4 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-radio-group v-model="form.siteInfo.mode">
                                    <a-radio :value="1">社区模式</a-radio>
                                    <a-radio :value="2">博客模式</a-radio>
                                </a-radio-group>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="form project-form">
                        <f-title>项目设置</f-title>
                    </div>
                    <div class="form seo-form">
                        <f-title>SEO设置</f-title>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="form about-form">
                        <f-title>关于我们</f-title>
                    </div>
                    <div class="form login-form">
                        <f-title>登录设置</f-title>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="form index-right-form">
                        <f-title>首页右侧组件展示</f-title>
                    </div>
                    <div class="form article-form">
                        <f-title>文章设置</f-title>
                    </div>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.site-view {
    padding: 20px;
    .form {
        margin-bottom: 20px;
        .body {
            margin-top: 20px;
        }
    }
}
</style>
