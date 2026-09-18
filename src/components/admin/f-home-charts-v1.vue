<script setup lang="ts">
import EchartsV1 from '@/components/echarts/echarts-v1.vue'
import { reactive, computed } from 'vue'
import { dataGrowthApi, type DataGrowthType } from '@/api/data-api.ts'
import { Message } from '@arco-design/web-vue'
import { IconArrowDown, IconArrowRise } from '@arco-design/web-vue/es/icon'

interface Props {
    type: 1 | 2 | 3
}

const props = defineProps<Props>()

const data = reactive<DataGrowthType>({
    growthNum: 0,
    growthRate: 0,
    countList: [],
    dateList: [],
})

const status = computed(() => {
    return data.growthRate > 0 ? 'plus' : data.growthRate < 0 ? 'negative' : 'zero'
})

const getData = async () => {
    const res = await dataGrowthApi(props.type)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    Object.assign(data, res.data)
}

getData()
</script>

<template>
    <div class="f-charts-v1-com">
        <div class="left">
            <a-statistic
                :value="data.growthRate"
                show-group-separator
                :value-style="{ color: status !== 'plus' ? 'rgb(245,63,63)' : 'rgb(0,180,42)' }"
            >
                <template #prefix>
                    <icon-arrow-rise v-if="status === 'plus'" />
                    <icon-arrow-down v-if="status === 'negative'"></icon-arrow-down>
                </template>
                <template #suffix>%</template>
            </a-statistic>
        </div>
        <div class="right">
            <echarts-v1
                :class="`user-growth-${type}`"
                :count-list="data.countList"
                :date-list="data.dateList"
            ></echarts-v1>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-charts-v1-com {
    display: flex;
    height: 150px;
    .left {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40%;
    }
    .right {
        width: 60%;
    }
}
</style>
