<script setup lang="ts">
import type { baseResponse, listResponse, paramsType } from '@/api'
import { reactive, ref } from 'vue'
import {
    Message,
    type TableColumnData,
    type TableData,
    type TableRowSelection,
} from '@arco-design/web-vue'
import { dateTemFormat, type dateTemType } from '@/utils/date.ts'
import { type optionsType, type optionsFunc } from '@/api/index.ts'
import type { OptionColorType } from '@/options/options.ts'
import FLabel from '@/components/common/f-label.vue'

export interface columnType extends TableColumnData {
    dateFormat?: dateTemType
    type?: 'date' | 'options' | 'switch'
    options?: OptionColorType[]
}

export interface actionGroupType {
    label: string
    value?: number
    callback: (keys: number[] | string[]) => void
}

export interface filterGroupType {
    label: string
    source: optionsType[] | optionsFunc
    options?: optionsType[]
    column: string
    params?: paramsType
    callback?: (value: number | string) => void
    width?: number
}

interface Props {
    url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
    columns: columnType[]
    rowKey?: string
    noAdd?: boolean
    noUpdate?: boolean
    noDelete?: boolean
    searchPlaceholder?: string
    addLabel?: string
    updateLabel?: string
    removeLabel?: string
    noActionGroup?: boolean
    noCheck?: boolean
    noBatchDelete?: boolean
    actionGroup?: actionGroupType[]
    filterGroup?: filterGroupType[]
    defaultParams?: Record<string, any>
}

const props = defineProps<Props>()
const {
    rowKey = 'id',
    searchPlaceholder = '搜索',
    addLabel = '创建',
    updateLabel = '编辑',
    removeLabel = '删除',
    actionGroup = [],
} = props

const emits = defineEmits<{
    (e: 'add'): void
    (e: 'delete', keyList: number[] | string[]): void
    (e: 'update', data: any): void
    (e: 'row-click', record: any): void
}>()

const loading = ref<boolean>(false)
const data = reactive<listResponse<any>>({
    count: 0,
    list: [],
})

const search = () => {
    getList()
}

const params = reactive<paramsType>({})
const getList = async (newParams?: Record<string, any>) => {
    loading.value = true
    if (props.defaultParams) {
        Object.assign(params, props.defaultParams)
    }
    if (newParams) {
        Object.assign(params, newParams)
    }
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

const add = () => {
    emits('add')
}
const remove = (keys: number[] | string[]): void => {
    emits('delete', keys)
}
const removeOne = (record: any) => {
    const list = [record[rowKey]]
    remove(list)
}
const update = (record: any) => {
    emits('update', record)
}
const pageChange = () => {
    getList()
}

const selectedKeys = ref([])
const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
})

const actionValue = ref()
const actionGroupOptions = ref<actionGroupType[]>([])
const initActionGroupOptions = () => {
    let index = 0
    if (!props.noBatchDelete) {
        actionGroupOptions.value.push({
            label: '批量删除',
            value: ++index,
            callback: (keys) => {
                remove(keys)
            },
        })
    }
    actionGroup.forEach((item) => {
        actionGroupOptions.value.push({
            label: item.label,
            value: ++index,
            callback: item.callback,
        })
    })
}
initActionGroupOptions()

// 点击执行
const actionGroupAction = () => {
    if (selectedKeys.value.length === 0) {
        Message.warning('请选择操作数据')
        return
    }
    const option = actionGroupOptions.value.find((item) => item.value === actionValue.value)
    option?.callback(selectedKeys.value)
}

// 过滤组
const filterGroupList = ref<filterGroupType[]>([])
const initFilterGroupList = async () => {
    filterGroupList.value = []
    for (const f of props.filterGroup || []) {
        if (typeof f.source === 'function') {
            const res = await f.source(f.params as paramsType)
            if (res.code) {
                Message.error(res.msg)
                continue
            }
            f.options = res.data
        } else {
            f.options = f.source
        }
        if (!f.callback) {
            f.callback = (value: number | string) => {
                console.log('子', value)
                getList({
                    [f.column]: value,
                })
            }
        }
        filterGroupList.value.push(f)
    }
}
initFilterGroupList()

const rowClick = (record: TableData) => {
    emits('row-click', record)
}

defineExpose({
    getList,
    data,
})
</script>

<template>
    <div class="f-list-com">
        <div class="f-list-head">
            <slot name="action-add">
                <div v-if="!noAdd" class="action-create">
                    <a-button type="primary" @click="add">{{ addLabel }}</a-button>
                </div>
            </slot>
            <div class="action-group" v-if="!noActionGroup">
                <a-select
                    v-model="actionValue"
                    allow-clear
                    placeholder="操作"
                    :options="actionGroupOptions"
                    style="width: 200px"
                ></a-select>
                <a-button
                    v-if="actionValue"
                    type="primary"
                    status="danger"
                    @click="actionGroupAction"
                    >执行</a-button
                >
            </div>
            <div class="action-search">
                <a-input-search
                    v-model="params.keyword"
                    :placeholder="searchPlaceholder"
                    @search="search"
                ></a-input-search>
            </div>
            <div class="action-filter">
                <a-select
                    :style="{ width: item.width ? item.width + 'px' : '200px' }"
                    allow-clear
                    v-for="item in filterGroupList"
                    :key="item.column"
                    :options="item.options"
                    :placeholder="item.label"
                    @change="item.callback as any"
                ></a-select>
            </div>
            <div class="action-flush" @click="refresh">
                <icon-refresh></icon-refresh>
            </div>
        </div>
        <div class="f-list-body">
            <a-spin :loading="loading" tip="加载中">
                <div class="f-list-table">
                    <a-table
                        v-model:selected-keys="selectedKeys"
                        :row-selection="noCheck ? undefined : rowSelection"
                        :data="data.list"
                        :row-key="rowKey"
                        :pagination="false"
                        @row-click="rowClick"
                    >
                        <template #columns>
                            <template v-for="col in props.columns">
                                <a-table-column
                                    v-if="col.type === 'date'"
                                    v-bind="{ ...col, title: col.title as string }"
                                >
                                    <template #cell="data">
                                        {{
                                            dateTemFormat(
                                                data.record[col.dataIndex as string],
                                                col.dateFormat,
                                            )
                                        }}
                                    </template>
                                </a-table-column>

                                <a-table-column
                                    v-else-if="col.type === 'options'"
                                    v-bind="{ ...col, title: col.title as string }"
                                >
                                    <template #cell="data">
                                        <f-label
                                            :options="col.options || []"
                                            :value="data.record[col.dataIndex as string]"
                                        ></f-label>
                                    </template>
                                </a-table-column>

                                <a-table-column
                                    v-else-if="col.type === 'switch'"
                                    v-bind="{ ...col, title: col.title as string }"
                                >
                                    <template #cell="data">
                                        <a-switch
                                            disabled
                                            :model-value="data.record[col.dataIndex as string]"
                                        ></a-switch>
                                    </template>
                                </a-table-column>

                                <a-table-column
                                    v-else-if="col.dataIndex"
                                    v-bind="{ ...col, title: col.title as string }"
                                ></a-table-column>
                                <a-table-column
                                    v-else-if="col.slotName"
                                    :title="col.title as string"
                                >
                                    <template #cell="data">
                                        <div v-if="col.slotName === 'action'" class="col-actions">
                                            <slot v-bind="data" name="action-left"></slot>
                                            <a-button
                                                v-if="!noUpdate"
                                                type="primary"
                                                @click="update(data.record)"
                                            >
                                                {{ updateLabel }}
                                            </a-button>
                                            <a-popconfirm
                                                v-if="!noDelete"
                                                content="确认删除该记录？"
                                                @ok="removeOne(data.record)"
                                            >
                                                <a-button type="primary" status="danger">
                                                    {{ removeLabel }}
                                                </a-button>
                                            </a-popconfirm>
                                            <slot v-bind="data" name="action-right"></slot>
                                        </div>
                                        <div v-if="col.slotName === 'createdAt'">
                                            {{
                                                dateTemFormat(data.record.createdAt, col.dateFormat)
                                            }}
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

        .action-create,
        .action-group,
        .action-search,
        .action-filter .action-search-slot {
            margin-right: 10px;
        }

        .action-group {
            display: flex;
            align-items: center;
            button {
                margin-left: 10px;
            }
        }

        .action-filter {
            /deep/.arco-select {
                margin-left: 10px;
                &:first-child {
                    margin-left: 0;
                }
            }
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
                &:first-child {
                    margin-left: 0;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
