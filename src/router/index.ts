import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore, type userInfoType } from '@/stores/userStore'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'web',
      path: '/',
      redirect: '/admin',
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      name: 'admin',
      path: '/admin',
      meta: {
        title: "首页"
      },
      component: () => import('@/views/admin/index.vue'),
      children: [
        {
          name: "home",
          path: "",
          meta: {
            title: "首页"
          },
          component: () => import('@/views/admin/home/index.vue'),
        },
        {
          name: "userCenter",
          path: "user_center",
          meta: {
            title: "个人中心"
          },
          children: [
            {
              name: "userInfo",
              path: "user_info",
              meta: {
                title: "个人信息"
              },
              component: () => import("@/views/admin/user_center/index.vue"),
            }
          ]
        },
        {
          name: "userManage",
          path: "user_manage",
          meta: {
            title: "用户管理"
          },
          children: [
            {
              name: "userList",
              path: "user_list",
              meta: {
                title: "用户列表"
              },
              component: () => import('@/views/admin/user_manage/index.vue'),
            }
          ],
        },
        {
          name: "settingsManage",
          path: "settings_manage",
          meta: {
            title: "系统设置"
          },
          children: [
            {
              name: "settings",
              path: "settings",
              meta: {
                title: "系统信息"
              },
              component: () => import('@/views/admin/settings_manage/index.vue'),
            }
          ],
        },
      ]
    },
  ],
})

export const getToken = (): string | null => {
  const userStore = useUserStore()
  return localStorage.getItem('token') || userStore.token
}

export const getUserInfo = (): userInfoType | null => {
  const userStore = useUserStore()
  const str = localStorage.getItem('userInfo') as string
  let info: userInfoType | null = null
  try {
    info = JSON.parse(str)
  } catch(e) {
    console.log(e)
  }
  return info || userStore.userInfo
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  // 未登录
  if (!getToken() && to.path !== '/login') {
    next('/login')
  }
  if (getToken() && !getUserInfo()) {
    // 获取用户信息
    const userInfo = await userStore.getUserInfo()
    console.log('路由钩子里的userInfo', userInfo)
    if (userInfo) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
