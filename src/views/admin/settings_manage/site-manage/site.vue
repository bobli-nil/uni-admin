<script setup lang="ts">
import FTitle from '@/components/common/f-title.vue'
import FImageUpload from '@/components/common/f-image-upload.vue'
import { reactive } from 'vue'
import FIndexRight from '@/components/admin/site/f-index-right.vue'
import { siteApi, siteUpdateApi, type SiteResponse } from '@/api/site-api.ts'
import { Message } from '@arco-design/web-vue'

const form = reactive<SiteResponse>({
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
        list: [
            { title: '标签云', enable: true },
            { title: '作者推荐', enable: false },
            { title: '关于我们', enable: true },
            { title: '独家推广', enable: true },
            { title: '意见反馈', enable: true },
            { title: '文章推荐', enable: true },
        ],
    },
    article: {
        noExamine: true,
        commentLine: 3,
    },
})

const initForm = async () => {
    const res = await siteApi('site')
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(form, res.data)
}
initForm()

const updateHandler = async () => {
    console.log('form', form)
    const res = await siteUpdateApi('site', form)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Message.success('更新成功')
}
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
                                <f-image-upload
                                    v-model="form.siteInfo.logo"
                                    placeholder="logo地址"
                                ></f-image-upload>
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
                        <div class="body">
                            <a-form-item
                                label="网站title"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.project.title"
                                    placeholder="网站标题"
                                ></a-input>
                            </a-form-item>
                            <a-form-item
                                label="网站icon"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <f-image-upload
                                    v-model="form.project.icon"
                                    placeholder="网站icon"
                                ></f-image-upload>
                            </a-form-item>
                            <a-form-item
                                label="前端地址"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.project.webPath"
                                    placeholder="前端地址"
                                ></a-input>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="form seo-form">
                        <f-title>SEO设置</f-title>
                        <div class="body">
                            <a-form-item
                                label="keywords"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.seo.keywords"
                                    placeholder="keywords"
                                ></a-input>
                            </a-form-item>
                            <a-form-item
                                label="description"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-textarea
                                    v-model="form.seo.description"
                                    placeholder="description"
                                    :auto-size="{ minRows: 2, maxRows: 3 }"
                                ></a-textarea>
                            </a-form-item>
                        </div>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="form about-form">
                        <f-title>关于我们</f-title>
                        <div class="body">
                            <a-form-item
                                label="QQ二维码"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <f-image-upload
                                    v-model="form.about.qq"
                                    placeholder="QQ二维码"
                                ></f-image-upload>
                            </a-form-item>
                            <a-form-item
                                label="微信二维码"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <f-image-upload
                                    v-model="form.about.wechat"
                                    placeholder="微信二维码"
                                ></f-image-upload>
                            </a-form-item>
                            <a-form-item
                                label="bilibili"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input
                                    v-model="form.about.bilibili"
                                    placeholder="bilibili"
                                ></a-input>
                            </a-form-item>
                            <a-form-item
                                label="gitee"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input v-model="form.about.gitee" placeholder="gitee"></a-input>
                            </a-form-item>
                            <a-form-item
                                label="github"
                                :label-col-props="{ span: 5 }"
                                :wrapper-col-props="{ span: 18 }"
                            >
                                <a-input v-model="form.about.gitee" placeholder="github"></a-input>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="form login-form">
                        <f-title>登录设置</f-title>
                        <div class="body">
                            <a-form-item
                                label="启用QQ登录"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-switch v-model="form.login.qqLogin"></a-switch>
                            </a-form-item>
                            <a-form-item
                                label="用户名密码登录"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-switch v-model="form.login.usernamePwdLogin"></a-switch>
                            </a-form-item>
                            <a-form-item
                                label="启用邮箱注册"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-switch v-model="form.login.emailPwdLogin"></a-switch>
                            </a-form-item>
                            <a-form-item
                                label="启用图片验证码"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-switch v-model="form.login.captcha"></a-switch>
                            </a-form-item>
                        </div>
                    </div>
                </a-col>
                <a-col :span="8">
                    <div class="form index-right-form">
                        <f-title>首页右侧组件展示</f-title>
                        <f-index-right class="body" v-model="form.indexRight.list"></f-index-right>
                    </div>
                    <div class="form article-form">
                        <f-title>文章设置</f-title>
                        <div class="body">
                            <a-form-item
                                label="文章免审核"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-switch v-model="form.article.noExamine"></a-switch>
                            </a-form-item>
                            <a-form-item
                                label="评论层数"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 17 }"
                            >
                                <a-input-number
                                    v-model="form.article.commentLine"
                                    placeholder="评论层数"
                                ></a-input-number>
                            </a-form-item>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </a-form>

        <a-button type="primary" @click="updateHandler">更新配置</a-button>
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
