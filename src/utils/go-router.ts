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
