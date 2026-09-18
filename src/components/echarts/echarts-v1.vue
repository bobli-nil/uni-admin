<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType, EChartsOption } from 'echarts'
import { onMounted, ref, watch } from 'vue'
import { theme } from '@/components/common/f-theme.ts'

interface Props {
    class: string
    countList: number[]
    dateList: string[]
}

const props = defineProps<Props>()

const myChart = ref<EChartsType>()
const option = ref<EChartsOption | null>(null)

watch(
    () => theme.value,
    () => {
        setOption()
    },
)

watch(
    () => props.countList,
    () => {
        setOption()
    },
)

const setOption = () => {
    const lineColor = getComputedStyle(document.body).getPropertyValue('--color-neutral-2')
    let themeColor = ['#1c5ae0', '#15c5be']
    if (theme.value === 'dark') {
        themeColor = ['#1c5ae0', '#15c5be']
    }
    option.value = {
        color: themeColor,
        xAxis: {
            type: 'category',
            data: props.dateList,
            show: false,
        },
        grid: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 20,
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: lineColor,
                },
            },
            axisLabel: {
                show: false,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        series: [
            {
                data: props.countList,
                type: 'line',
                smooth: true,
            },
        ],
    }

    option.value && myChart.value && myChart.value.setOption(option.value)
}

onMounted(() => {
    let chartDom = document.querySelector(`.${props.class}`)
    if (!chartDom) {
        return
    }
    myChart.value = echarts.init(chartDom as HTMLDivElement)

    setOption()
})
</script>

<template>
    <div class="echarts-v1" :class="props.class"></div>
</template>

<style scoped lang="less">
.echarts-v1 {
    width: 100%;
    height: 100%;
}
</style>
