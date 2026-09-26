<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
    articleAddApi,
    type ArticleAddType,
    articleCategoryOptionApi,
    articleDetailApi,
    articleTagOptionApi,
} from '@/api/article-api.ts'
import { Message } from '@arco-design/web-vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRouter } from 'vue-router'
import FCoverCutter from '@/components/web/f-cover-cutter.vue'
import type { optionsType } from '@/api'
import { getOptions } from '@/api'
import { onUploadImg } from '@/api/image-api.ts'

interface Props {
    articleId?: number
}

const props = defineProps<Props>()

const router = useRouter()

const form = reactive<ArticleAddType>({
    title: '',
    abstract: '',
    content: '',
    categoryID: 0,
    status: 1, // 1草稿 2发布到审核中
    cover: '',
    tagList: [],
    openComment: true,
})

const getData = async (articleId: number) => {
    const res = await articleDetailApi(articleId)
    if (res.code) {
        Message.error(res.msg)
        return
    }
    form.title = res.data.title
    form.content = res.data.content
    form.abstract = res.data.abstract
    form.categoryID = res.data.categoryId
    form.cover = res.data.cover
    form.tagList = res.data.tagList
    form.openComment = res.data.openComment
}

if (props.articleId) {
    getData(props.articleId)
}

const emits = defineEmits(['ok'])

const formRef = ref()

const confirm = async (status?: 1 | 2) => {
    const val = await formRef.value.validate()
    if (val) return

    if (status) {
        form.status = status
    }
    emits('ok', form)
}

const coverBack = (val: string) => {
    form.cover = val
}

const categoryOptions = ref<optionsType[]>([])
const tagOptions = ref<optionsType[]>([])

getOptions(categoryOptions, articleCategoryOptionApi)
getOptions(tagOptions, articleTagOptionApi)

const coverRemove = () => {
    form.cover = ''
}
</script>

<template>
    <a-form
        ref="formRef"
        class="f-article-form"
        :model="form"
        :label-col-props="{ span: 0 }"
        :wrapper-col-props="{ span: 24 }"
    >
        <a-form-item
            field="title"
            validate-trigger="blur"
            :rules="[{ required: true, message: '请输入文章标题' }]"
        >
            <a-input v-model="form.title" placeholder="请输入标题（建议20字以内）"></a-input>
        </a-form-item>
        <a-form-item>
            <a-textarea
                v-model="form.abstract"
                placeholder="请输入简介"
                :auto-size="{ minRows: 3, maxRows: 5 }"
            ></a-textarea>
        </a-form-item>
        <a-form-item
            field="content"
            validate-trigger="blur"
            :rules="[{ required: true, message: '请输入文章内容' }]"
        >
            <md-editor
                @onUploadImg="onUploadImg"
                v-model="form.content"
                placeholder="请输入文章内容"
            ></md-editor>
        </a-form-item>

        <a-collapse :default-active-key="[1]" :bordered="false">
            <a-collapse-item header="更多设置" :key="1">
                <a-form
                    class="form2"
                    label-align="left"
                    :model="form"
                    :label-col-props="{ span: 4 }"
                    :wrapper-col-props="{ span: 8 }"
                >
                    <a-form-item label="请选择文章分类">
                        <a-select
                            v-model="form.categoryID"
                            placeholder="文章分类"
                            :options="categoryOptions"
                        ></a-select>
                    </a-form-item>
                    <a-form-item label="设置文章封面" content-class="article-cover-col">
                        <div class="up">
                            <f-cover-cutter style="width: 100%" @ok="coverBack">
                                <div class="cover-mask">
                                    <icon-image></icon-image>
                                    点击上传封面（选填）
                                </div>
                            </f-cover-cutter>
                        </div>
                        <div v-if="form.cover" class="show">
                            <a-image :src="form.cover" :height="80">
                                <template #extra>
                                    <icon-delete @click="coverRemove"></icon-delete>
                                </template>
                            </a-image>
                        </div>
                    </a-form-item>
                    <a-form-item label="文章标签">
                        <a-select
                            v-model="form.tagList"
                            allow-create
                            allow-clear
                            multiple
                            :options="tagOptions"
                            placeholder="请选择文章标签"
                        ></a-select>
                    </a-form-item>
                    <a-form-item label="设置评论状态">
                        <a-checkbox v-model="form.openComment">开启评论</a-checkbox>
                    </a-form-item>
                </a-form>
            </a-collapse-item>
        </a-collapse>

        <div class="actions">
            <a-button type="primary" @click="confirm(2)">
                {{ articleId ? '更新文章' : '发布文章' }}
            </a-button>
            <a-button @click="confirm(1)">存为草稿</a-button>
        </div>
    </a-form>
</template>

<style scoped lang="less">
.f-article-form {
    :deep(.arco-collapse) {
        margin-bottom: 10px;
    }
    :deep(.arco-collapse-item) {
        .arco-collapse-item-header {
            padding: 0;
            border: none;
            .arco-collapse-item-icon-hover {
                left: 62px;
            }
        }
        .arco-collapse-item-content {
            background: transparent;
            padding-left: 0;
        }
    }
    .form2 {
        :deep(.arco-row) {
            display: flex;
            flex-direction: column;
        }
        .cover-mask {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 120px;
            border: @f_border;
            border-radius: 5px;
            color: var(--color-text-2);
            cursor: pointer;
            :deep(svg) {
                font-size: 24px;
            }
        }
        :deep(.article-cover-col) {
            flex-direction: column;
            > div {
                width: 100%;
            }
            .show {
                margin-top: 10px;
            }
        }
        .show {
            :deep(.arco-image-footer) {
                display: flex;
                justify-content: center;
                .arco-image-footer-extra {
                    padding-left: 0;
                    svg {
                        font-size: 20px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .actions {
        margin-top: 20px;
        .arco-btn {
            margin-right: 10px;
        }
    }
}
</style>
