<script setup lang="ts">
import { onMounted, watch, ref, reactive, nextTick } from 'vue'
import * as echarts from 'echarts'
import { theme } from '@/components/common/f-theme.ts'
import { type EChartsType } from 'echarts'
import { dataComputerApi, type DataComputerType } from '@/api/data-api.ts'
import { Message } from '@arco-design/web-vue'

type EchartsOptions = echarts.EChartsOption

let options: EchartsOptions

let myChart = ref<EChartsType | null>(null)

const data = reactive<DataComputerType>({
    cpuPercent: 0,
    memPercent: 0,
    diskPercent: 0,
})

const getData = async () => {
    const res = await dataComputerApi()
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)

    await nextTick()
    setOptions()
}
getData()

watch(
    () => theme.value,
    () => {
        setOptions()
    },
)

const setOptions = () => {
    const textColor = getComputedStyle(document.body).getPropertyValue('--color-text-1')
    const lineColor = getComputedStyle(document.body).getPropertyValue('--color-neutral-2')

    let themeColor = ['#1c5ae0', '#15c5be']
    if (theme.value === 'dark') {
        themeColor = ['#1c5ae0', '#15c5be']
    }

    options = {
        color: themeColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            formatter: (params: any) => {
                const data = params[0]
                return `
                    <div>
                        ${data.name}: ${data.seriesName} ${(data.data as number).toFixed(1)}%
                    </div>
                `
            },
        },
        xAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLabel: {
                formatter: '{value}%',
            },
        },

        yAxis: [
            {
                type: 'category',
                splitLine: {
                    lineStyle: {
                        color: lineColor,
                    },
                },
                data: ['CPU', '内存', '磁盘'],
            },
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
        },
        series: [
            {
                name: '使用率',
                type: 'bar',
                data: [data.cpuPercent, data.memPercent, data.diskPercent],
                label: {
                    show: true,
                    formatter: (params: any) => {
                        return (params.data as number).toFixed(1) + '%'
                    },
                },
            },
        ],
    }

    myChart.value?.setOption(options)
}

onMounted(() => {
    const dom = document.getElementById('resource') as HTMLElement
    myChart.value = echarts.init(dom)

    setOptions()
})
</script>

<template>
    <div id="resource"></div>
</template>

<style scoped>
#resource {
    height: 300px;
}
</style>
