<script setup lang="ts">
import { type OptionColorType } from '@/options/options.ts'
import { computed } from 'vue'
interface Props {
    value: string | number
    options: OptionColorType[]
}
const props = defineProps<Props>()
const item = computed(() => {
    const obj = props.options.find((item) => item.value === props.value)
    if (!obj) {
        return { label: '-', color: '' }
    }
    return obj
})
</script>

<template>
    <a-tag :color="item.color">{{ item.label }}</a-tag>
</template>

<style scoped lang="less"></style>
