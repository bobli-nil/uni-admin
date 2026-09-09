<script setup lang="ts">
import type {baseResponse, listResponse, paramsType} from "@/api";
import {reactive} from "vue";
import {Message, type TableColumnData} from "@arco-design/web-vue";
import type {TableDataWithRaw} from "@arco-design/web-vue/es/table/interface";
import {dateTemFormat, type dateTemType } from "@/utils/date.ts";

export interface columnType extends TableColumnData {
    dateFormat?: dateTemType
}

interface Props {
    url: (params?: paramsType) => Promise<baseResponse<listResponse<any>>>
    columns: columnType[]
}

const props = defineProps<Props>()

const data = reactive<listResponse<any>>({
    count: 0,
    list: []
})

const params = reactive<paramsType>({})

const getList = async () => {
    const res = await props.url(params)
    if (res.code) {
        Message.error(res.msg || '操作错误')
        return
    }
    data.list = res.data.list || []
    data.count = res.data.count || 0
    console.log('data', data)
}

getList()

const remove = (data: TableDataWithRaw) => {
    console.log('remove', data)
}
const update = (data: TableDataWithRaw) => {
    console.log('update', data)
}

</script>

<template>
    <div class="f-list-com">
        <div class="f-list-head">
            <div class="action-create">
                <a-button type="primary">创建</a-button>
            </div>
            <div class="action-group">
                <a-select placeholder="操作"></a-select>
            </div>
            <div class="action-search">
                <a-input placeholder="搜索"></a-input>
            </div>
            <div class="action-search-slot"></div>
            <div class="action-flush">
                <icon-refresh></icon-refresh>
            </div>
        </div>
        <div class="f-list-body">
            <a-spin>
                <div class="f-list-table">
                    <a-table :data="data.list">
                        <template #columns>
                            <template v-for="col in props.columns">
                                <a-table-column v-if="col.dataIndex" v-bind="{...col, title: col.title as string}"></a-table-column>
                                <a-table-column v-else-if="col.slotName" :title="col.title as string">
                                    <template #cell="data">
                                        <div v-if="col.slotName === 'action'" class="col-actions">
                                            <slot v-bind="data" name="action-left"></slot>
                                            <a-button type="primary" @click="update(data)">编辑</a-button>
                                            <a-popconfirm content="确认删除该记录？" @ok="remove(data)">
                                                <a-button type="primary" status="danger">删除</a-button>
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
                    <a-pagination :total="100"></a-pagination>
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