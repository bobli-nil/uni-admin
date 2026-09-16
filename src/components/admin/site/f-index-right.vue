<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNodeData } from '@arco-design/web-vue'

type ModelValueType = Array<{ title: string; enable: boolean }>

interface Props {
    modelValue: ModelValueType
}
const props = defineProps<Props>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: ModelValueType): void
}>()

const treeData = ref<TreeNodeData[]>([])

interface DropParams {
    dragNode: TreeNodeData
    dropNode: TreeNodeData
    dropPosition: number
}

const onDrop = ({ dragNode, dropNode, dropPosition }: DropParams) => {
    const data = treeData.value
    const loop = (
        data: TreeNodeData[],
        key: string | number | undefined,
        callback: (item: TreeNodeData, index: number, arr: TreeNodeData[]) => void,
    ) => {
        data.some((item, index, arr) => {
            if (item.key === key) {
                callback(item, index, arr)
                return true
            }
            return false
        })
    }

    loop(data, dragNode.key, (_, index, arr) => {
        arr.splice(index, 1)
    })

    loop(data, dropNode.key, (_, index, arr) => {
        arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode)
    })
}

const allowDrop = ({ dropPosition }: { dropPosition: number }) => {
    return dropPosition !== 0
}

const selectKeys = ref<(string | number)[]>([])

const initSelectKeys = () => {
    for (const modelValueElement of props.modelValue) {
        if (modelValueElement.enable) {
            selectKeys.value.push(modelValueElement.title)
        }
        treeData.value.push({
            title: modelValueElement.title,
            key: modelValueElement.title,
        })
    }
}
initSelectKeys()

const update = () => {
    const list: ModelValueType = []
    for (const item of treeData.value) {
        list.push({
            title: item.title as string,
            enable: selectKeys.value.includes(item.key as number),
        })
    }
    console.log('list', list)
    emits('update:modelValue', list)
}

const dragEnd = () => {
    update()
}

const check = (keys: Array<string | number>) => {
    update()
}
</script>

<template>
    <div class="f-index-right">
        <a-tree
            class="index-right-tree"
            draggable
            blockNode
            checkable
            v-model:checked-keys="selectKeys"
            :allow-drop="allowDrop"
            :data="treeData"
            @check="check"
            @drop="onDrop"
            @drag-end="dragEnd"
        ></a-tree>
    </div>
</template>

<style scoped lang="less">
.f-index-right {
    margin-top: 20px;
    /deep/.arco-tree {
        .arco-tree-node {
            background: var(--color-fill-2);
            border-radius: 3px;
            margin-bottom: 3px;
        }
    }
}
</style>
