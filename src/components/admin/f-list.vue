<script setup lang="ts">
import type {baseResponse, listResponse, paramsType} from "@/api";
import {reactive, ref} from "vue";
import {Message, type TableColumnData} from "@arco-design/web-vue";
import {dateTemFormat, type dateTemType } from "@/utils/date.ts";

export interface columnType extends TableColumnData {
    dateFormat?: dateTemType
}

interface Props {
    url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
    columns: columnType[]
    noAdd?: boolean
    noUpdate?: boolean
    noDelete?: boolean
    searchPlaceholder?: string
    addLabel?: string
    updateLabel?: string
    removeLabel?: string
    noActionGroup?: boolean
}

const props = defineProps<Props>()
const loading = ref<boolean>(false);

const {
    searchPlaceholder = '搜索',
    addLabel = '创建',
    updateLabel = '编辑',
    removeLabel = '删除'
} = props

const data = reactive<listResponse<any>>({
    count: 0,
    list: []
})

const params = reactive<paramsType>({})

const search = (keyword: string) => {
    getList()
}

const getList = async () => {
    loading.value = true
    const res = await props.url(params)
    loading.value = false
    if (res.code) {
        Message.error(res.msg || '操作错误')
        return
    }
    data.list = res.data.list || []
    data.count = res.data.count || 0
    console.log('data', data)
}

getList()

const refresh = () => {
    getList()
    Message.success('刷新成功')
}

const emits = defineEmits<{
    (e: 'add'): void
    (e: 'delete', keyList: number[] | string[]): void
    (e: 'update', data: any): void
}>()

const add = () => {
    emits('add')
}

const remove = (record: any) => {
    emits('delete', [record.id])
}
const update = (record: any) => {
    emits('update', record)
}
const pageChange = (page: number) => {
    getList()
}

</script>

<template>
    <div class="f-list-com">
        <div class="f-list-head">
            <slot name="action-add">
                <div class="action-create">
                    <a-button type="primary" v-if="!noAdd" @click="add">{{ addLabel }}</a-button>
                </div>
            </slot>
            <div class="action-group" v-if="!noActionGroup">
                <a-select placeholder="操作"></a-select>
            </div>
            <div class="action-search">
                <a-input-search v-model="params.keyword" :placeholder="searchPlaceholder" @search="search"></a-input-search>
            </div>
            <div class="action-search-slot">
                <slot name="search-other"></slot>
            </div>
            <div class="action-flush" @click="refresh">
                <icon-refresh></icon-refresh>
            </div>
        </div>
        <div class="f-list-body">
            <a-spin :loading="loading" tip="加载中">
                <div class="f-list-table">
                    <a-table :data="data.list" :pagination="false">
                        <template #columns>
                            <template v-for="col in props.columns">
                                <a-table-column v-if="col.dataIndex" v-bind="{...col, title: col.title as string}"></a-table-column>
                                <a-table-column v-else-if="col.slotName" :title="col.title as string">
                                    <template #cell="data">
                                        <div v-if="col.slotName === 'action'" class="col-actions">
                                            <slot v-bind="data" name="action-left"></slot>
                                            <a-button v-if="!noUpdate" type="primary" @click="update(data.record)">{{ updateLabel }}</a-button>
                                            <a-popconfirm v-if="!noDelete" content="确认删除该记录？" @ok="remove(data.record)">
                                                <a-button type="primary" status="danger">{{ removeLabel }}</a-button>
                                            </a-popconfirm>
                                            <slot v-bind="data" name="action-right"></slot>
                                        </div>
                                        <div v-if="col.slotName === 'createdAt'">
                                            {{ dateTemFormat(data.record.createdAt, col.dateFormat) }}
                                        </div>
                                        <slot v-else :name="col.slotName" v-bind="data"></slot>
                                    </template>
                                </a-table-column>
                            </template>
                        </template>
                    </a-table>
                </div>
                <div class="f-list-page">
                    <a-pagination
                        v-model:current="params.page"
                        show-total
                        :total="data.count"
                        :page-size="params.limit"
                        @change="pageChange"
                    ></a-pagination>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<style scoped lang="less">
.f-list-com {
    .f-list-head {
        display: flex;
        align-items: center;
        position: relative;
        padding: 20px 20px 10px 20px;
        border-bottom: @f_border;

        .action-create, .action-group, .action-search, .action-search-slot {
            margin-right: 10px;
        }

        .action-flush {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 20px;
            width: 30px;
            height: 30px;
            background-color: var(--color-fill-2);
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .f-list-body {
        padding: 10px 20px 20px 20px;
        > .arco-spin {
            width: 100%;
        }
        .f-list-page {
            display: flex;
            justify-content: center;
            margin-top: 16px;
        }
        .col-actions {
            button {
                margin-left: 10px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>