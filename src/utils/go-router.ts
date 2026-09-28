import router from '@/router'

export const goArticleDetail = (id: number) => {
    router.push({
        name: 'articleDetail',
        params: { id },
    })
}

export const goUser = (id: number) => {
    router.push({
        name: 'userArticle',
        params: { id },
    })
}

export const goArticleEdit = (id: number) => {
    router.push({
        name: 'platformArticleEdit',
        params: { id },
    })
}
