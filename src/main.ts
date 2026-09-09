import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/base.css'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import 'nprogress/nprogress.css'
import '@/assets/public.less'
import '@/assets/iconfont.css'
import { apiMock } from '@/mock/index.ts'

apiMock()

const app = createApp(App)

app.use(ArcoVue)
app.use(createPinia())
app.use(router)
app.use(ArcoVueIcon)

app.mount('#app')
