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
  <icon-fullscreen v-if="!isFullScreen" @click="fullScreen" />
  <icon-fullscreen-exit v-else @click="exitFullScreen" />
</template>

<style scoped></style>
