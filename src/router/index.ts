import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore, type userInfoType } from '@/stores/userStore'
import NProgress from 'nprogress'
import { showLogin } from '@/components/web/f-login.ts'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'web',
            path: '/',
            meta: { title: '首页', role: [] },
            component: () => import('@/views/web/index.vue'),
            children: [
                {
                    name: 'web-home',
                    path: '',
                    component: () => import('@/views/web/web-home.vue'),
                },
                {
                    name: 'userCenter',
                    path: 'center',
                    meta: {
                        title: '个人中心',
                        role: [1, 2],
                    },
                    component: () => import('@/views/web/user-center/index.vue'),
                    children: [
                        {
                            name: 'userCenterInfo',
                            path: 'info',
                            component: () => import('@/views/web/user-center/info.vue'),
                        },
                        {
                            name: 'userCenterAccount',
                            path: 'account',
                            component: () => import('@/views/web/user-center/account.vue'),
                        },
                        {
                            name: 'userCenterLoginRecord',
                            path: 'loginRecord',
                            component: () =>
                                import('@/views/web/user-center/user-center-login-record-view.vue'),
                        },
                        {
                            name: 'userCenterPrivacy',
                            path: 'privacy',
                            component: () => import('@/views/web/user-center/privacy.vue'),
                        },
                        {
                            name: 'userCenterHistory',
                            path: 'history',
                            component: () => import('@/views/web/user-center/history.vue'),
                        },
                    ],
                },
                {
                    name: 'platform',
                    path: 'platform',
                    meta: {
                        title: '文章',
                        role: [1, 2],
                    },
                    component: () => import('@/views/web/platform/index.vue'),
                    children: [
                        {
                            name: 'platformArticle',
                            path: 'article',
                            component: () => import('@/views/web/platform/platform-article.vue'),
                        },
                        {
                            name: 'platformArticleAdd',
                            path: 'articleAdd',
                            component: () =>
                                import('@/views/web/platform/platform-article-add.vue'),
                        },
                        {
                            name: 'platformArticleEdit',
                            path: 'articleEdit/:id',
                            component: () =>
                                import('@/views/web/platform/platform-article-edit.vue'),
                        },
                        {
                            name: 'platformComment',
                            path: 'comment',
                            redirect: '/platform/comment/article',
                            component: () => import('@/views/web/platform/comment/index.vue'),
                            children: [
                                {
                                    name: 'platformCommentArticle',
                                    path: 'article',
                                    component: () =>
                                        import('@/views/web/platform/comment/article-comment.vue'),
                                },
                                {
                                    name: 'platformCommentMy',
                                    path: 'me',
                                    component: () =>
                                        import('@/views/web/platform/comment/my-comment.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'user',
                    path: 'user/:id',
                    meta: {
                        title: '用户信息',
                    },
                    component: () => import('@/views/web/user/index.vue'),
                    children: [
                        {
                            name: 'userArticle',
                            path: 'article',
                            component: () => import('@/views/web/user/article-list.vue'),
                        },
                        {
                            name: 'userArticleCollect',
                            path: 'collect',
                            component: () => import('@/views/web/user/collect-list.vue'),
                        },
                    ],
                },
            ],
        },
        // {
        //     name: 'login',
        //     path: '/login',
        //     meta: {
        //         title: '首页',
        //         role: [1, 2, 3],
        //     },
        //     component: () => import('@/views/login/index.vue'),
        // },
        {
            name: 'noPermission',
            path: '/noPermission',
            meta: {
                title: '没有权限',
                role: [1, 2, 3],
            },
            component: () => import('@/views/admin/no-permission/index.vue'),
        },
        {
            name: 'admin',
            path: '/admin',
            meta: {
                title: '首页',
                role: [1],
            },
            component: () => import('@/views/admin/index.vue'),
            children: [
                {
                    name: 'home',
                    path: '',
                    meta: {
                        title: '首页',
                    },
                    component: () => import('@/views/admin/home/index.vue'),
                },
                {
                    name: 'userManage',
                    path: 'user_manage',
                    meta: {
                        title: '用户管理',
                        role: [1],
                    },
                    children: [
                        {
                            name: 'userList',
                            path: 'user_list',
                            meta: {
                                title: '用户列表',
                            },
                            component: () => import('@/views/admin/user_manage/user-list.vue'),
                        },
                    ],
                },
                {
                    name: 'articleManage',
                    path: 'article',
                    meta: {
                        title: '文章管理',
                        role: [1],
                    },
                    children: [
                        {
                            name: 'articleList',
                            path: 'article-list',
                            meta: {
                                title: '文章列表',
                            },
                            component: () =>
                                import('@/views/admin/article-manage/article-list.vue'),
                        },
                    ],
                },
                {
                    name: 'settingsManage',
                    path: 'settings',
                    meta: {
                        title: '系统管理',
                        role: [1],
                    },
                    children: [
                        {
                            name: 'siteManage',
                            path: 'site',
                            meta: {
                                title: '站点配置',
                            },
                            children: [
                                {
                                    name: 'siteManageSite',
                                    path: 'site',
                                    meta: {
                                        title: '网站设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/site.vue'),
                                },
                                {
                                    name: 'siteManageEmail',
                                    path: 'email',
                                    meta: {
                                        title: '邮箱设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/email.vue'),
                                },
                                {
                                    name: 'siteManageQQ',
                                    path: 'qq',
                                    meta: {
                                        title: 'qq设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/qq.vue'),
                                },
                                {
                                    name: 'siteManageAI',
                                    path: 'ai',
                                    meta: {
                                        title: 'AI设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/ai.vue'),
                                },
                                {
                                    name: 'siteManageQiNiu',
                                    path: 'qiniu',
                                    meta: {
                                        title: '七牛云设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/qiniu.vue'),
                                },
                            ],
                        },
                        {
                            name: 'bannerList',
                            path: 'banners',
                            meta: {
                                title: 'Banner列表',
                            },
                            component: () =>
                                import('@/views/admin/settings_manage/banner-list.vue'),
                        },
                        {
                            name: 'logList',
                            path: 'logs',
                            meta: {
                                title: '日志列表',
                            },
                            component: () => import('@/views/admin/settings_manage/index.vue'),
                        },
                    ],
                },
            ],
        },
        {
            name: 'notfound',
            path: '/:pathMatch(.*)*',
            meta: {
                title: '404',
                role: [1, 2, 3],
            },
            component: () => import('@/views/web/404.vue'),
        },
    ],
})

export const getToken = (): string | null => {
    return localStorage.getItem('token')
}

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    let userInfo = userStore.userInfo
    console.log('路由拦截里的userInfo', userInfo)
    console.log('to.meta', to.meta)
    if (to.meta.role?.length === 0) {
        if (getToken() && !userInfo) {
            await userStore.getUserInfo()
        }
        next()
    } else if (!getToken()) {
        await showLogin()
        next(to.path)
    } else if (getToken() && !userInfo) {
        // 获取用户信息
        userInfo = await userStore.getUserInfo()
        console.log('userInfo', userInfo)
        if (!userInfo) {
            window.localStorage.removeItem('token')
            next('/login')
        }
    }

    if (to.meta?.role?.includes(userInfo?.role as number)) {
        next()
    } else {
        next('/noPermission')
    }
})

router.afterEach((to, from, next) => {
    NProgress.done()
})

export default router
