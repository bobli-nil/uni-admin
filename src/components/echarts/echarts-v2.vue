<script setup lang="ts">
import { onMounted, watch, ref, reactive } from 'vue'
import * as echarts from 'echarts'
import { theme } from '@/components/common/f-theme.ts'
import { type EChartsType } from 'echarts'
import { dataArticleGrowthApi, type DataGrowthType } from '@/api/data-api.ts'
import { Message } from '@arco-design/web-vue'

type EchartsOptions = echarts.EChartsOption

let options: EchartsOptions

let myChart = ref<EChartsType | null>(null)

const data = reactive<DataGrowthType>({
    growthRate: 0,
    growthNum: 0,
    countList: [],
    dateList: [],
})

const getData = async () => {
    const res = await dataArticleGrowthApi()
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}
getData()

watch(
    () => theme.value,
    () => {
        setOptions()
    },
)

watch(
    () => data.growthNum,
    () => {
        setOptions()
    },
)

const setOptions = () => {
    const textColor = getComputedStyle(document.body).getPropertyValue('--color-text-1')
    const lineColor = getComputedStyle(document.body).getPropertyValue('--color-neutral-2')

    // let themeColor = ['red', 'blue']
    // if (theme.value === 'dark') {
    //     themeColor = ['blue', 'green']
    // }

    options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: data.dateList,
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
                name: '文章数据',
                type: 'line',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                smooth: true,
                data: data.countList,
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
