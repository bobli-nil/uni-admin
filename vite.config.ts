import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import {loadEnv} from "vite"
import type { EnvMeta } from "./env.d.ts"

// https://vite.dev/config/
const envDir = "./"
export default defineConfig((config) => {
  const env = loadEnv(config.mode, envDir) as EnvMeta
  console.log("env", env.VITE_SERVER_URL)
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // "primary-6": "red"
          },
          additionalData: '@import "@/assets/var.less";'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {}
    }
  }
})
