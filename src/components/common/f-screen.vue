<script setup lang="ts">
import { computed, ref } from 'vue'

const isFullScreen = ref(false)

function fullScreen() {
  document.documentElement.requestFullscreen()
  isFullScreen.value = true
}

function exitFullScreen() {
  document?.exitFullscreen()
  isFullScreen.value = false
}
</script>

<template>
  <span v-if="!isFullScreen" title="全屏">
    <icon-fullscreen @click="fullScreen" />
  </span>
  <span v-else title="退出全屏">
    <icon-fullscreen-exit @click="exitFullScreen" />
  </span>
</template>

<style scoped></style>
