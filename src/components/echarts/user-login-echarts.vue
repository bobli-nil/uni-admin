<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import * as echarts from 'echarts'
import { theme } from '@/components/common/f-theme.ts'
import { type EChartsType } from 'echarts'

type EchartsOptions = echarts.EChartsOption

let options: EchartsOptions

let myChart = ref<EChartsType | null>(null)

watch(
    () => theme.value,
    () => {
        setOptions()
    },
)

const setOptions = () => {
    const textColor = getComputedStyle(document.body).getPropertyValue('--color-text-1')
    const lineColor = getComputedStyle(document.body).getPropertyValue('--color-neutral-2')

    let themeColor = ['red', 'blue']
    if (theme.value === 'dark') {
        themeColor = ['blue', 'green']
    }

    options = {
        color: themeColor,
        title: {
            text: '用户登录数据',
            left: 0,
            top: 0,
            textStyle: {
                color: textColor,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        legend: {
            show: true,
            data: ['注册', '登录'],
            textStyle: {
                color: textColor,
            },
            top: 0,
            right: 20,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: lineColor,
                    },
                },
            },
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
        },
        series: [
            {
                name: '注册',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: '登录',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                smooth: true,
                data: [220, 182, 191, 234, 290, 330, 310],
            },
        ],
    }

    myChart.value?.setOption(options)
}

onMounted(() => {
    const dom = document.getElementById('dom') as HTMLElement
    myChart.value = echarts.init(dom)

    setOptions()
})
</script>

<template>
    <div id="dom"></div>
</template>

<style scoped>
#dom {
    height: 300px;
}
</style>
