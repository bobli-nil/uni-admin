<script setup lang="ts">
import FTheme from '@/components/common/f-theme.vue'
import FScreen from '@/components/common/f-screen.vue'
import FMenu from "@/components/admin/f-menu.vue";
import FBreadcrumb from "@/components/admin/f-breadcrumb.vue";
import FUserDropdown from "@/components/common/f-user-dropdown.vue";
import FTabs from "@/components/admin/f_tabs.vue"
import {collapsed} from "@/components/admin/f-menu.ts"
import { useRouter } from "vue-router"

const router = useRouter()

const goHome = () => {
  router.push("/admin")
}
</script>

<template>
  <div class="f_admin">
    <div class="f_aside" :class="{collapsed}">
      <div class="f_logo"></div>
      <f-menu />
    </div>
    <div class="f_main">
      <div class="f_head">
        <f-breadcrumb />
        <div class="f_actions">
          <span title="去首页" @click="goHome">
            <icon-home />
          </span>
          <f-theme />
          <f-screen />
          <f-user-dropdown />
        </div>
      </div>
      <f-tabs />
      <div class="f_container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.f_admin {
  display: flex;
  background-color: var(--color-bg-1);
  color: @color-text-1;

  .f_aside {
    width: 240px;
    height: 100vh;
    overflow: hidden;
    border-right: @f_border;
    transition: width 0.1s;

    &.collapsed {
      width: 48px;
      transition: width 0.1s;

      & + .f_main {
        width: calc(100% - 48px);
        transition: width 0.1s;
      }
    }

    .f_logo {
      height: 90px;
    }
  }

  .f_main {
    width: calc(100% - 240px);
    transition: width 0.1s;

    .f_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 20px;
      border-bottom: @f_border;
      .f_actions {
        display: flex;
        align-items: center;
        /deep/svg {
          margin-right: 10px;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }

    .f_tabs {
      height: 30px;
      border-bottom: @f_border;
    }

    .f_container {
      height: calc(100vh - 90px);
      overflow-y: auto;
      overflow-x: hidden;
      background-color: @color-fill-1;
    }
  }
}
</style>
