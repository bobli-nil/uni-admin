import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore, type userInfoType } from '@/stores/userStore'
import NProgress from 'nprogress'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'web',
            path: '/',
            meta: {
                title: '首页',
                role: [1, 2, 3],
            },
            component: () => import('@/views/web/index.vue'),
            children: [
                {
                    name: 'web-home',
                    path: '',
                    component: () => import('@/views/web/web-home.vue'),
                },
            ],
        },
        {
            name: 'login',
            path: '/login',
            meta: {
                title: '首页',
                role: [1, 2, 3],
            },
            component: () => import('@/views/login/index.vue'),
        },
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
                role: [1, 2, 3],
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
                    name: 'userCenter',
                    path: 'user_center',
                    meta: {
                        title: '个人中心',
                    },
                    children: [
                        {
                            name: 'userInfo',
                            path: 'user_info',
                            meta: {
                                title: '个人信息',
                            },
                            component: () => import('@/views/admin/user_center/index.vue'),
                        },
                    ],
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
                            component: () => import('@/views/admin/user_manage/index.vue'),
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
                                        title: '网站设置',
                                    },
                                    component: () =>
                                        import('@/views/admin/settings_manage/site-manage/email.vue'),
                                },
                            ],
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
    // 未登录
    if (!getToken()) {
        if (to.path === '/login') {
            next()
        } else {
            const redirect = encodeURIComponent(to.fullPath)
            next({
                path: '/login',
                query: { redirect },
            })
        }
    }
    if (getToken() && !userInfo) {
        // 获取用户信息
        userInfo = await userStore.getUserInfo()
        console.log('userInfo', userInfo)
        if (!userInfo) {
            window.localStorage.removeItem('token')
            next('/login')
        }
    }

    console.log('x', to.path, to.meta.role, userInfo!.role)
    if (to.meta?.role?.includes(userInfo!.role)) {
        next()
    } else {
        next('/noPermission')
    }
})

router.afterEach((to, from, next) => {
    NProgress.done()
})

export default router
