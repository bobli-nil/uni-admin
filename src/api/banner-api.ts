import { type baseResponse, type listResponse, type paramsType, useAxios } from '@/api/index.ts'

export interface BannerListItem {
    id: number
    createdAt: string
    updatedAt: string
    show: boolean
    cover: string
    href: string
}

export const bannerListApi = (
    params?: paramsType,
): Promise<baseResponse<listResponse<BannerListItem>>> => {
    return useAxios({
        url: '/api/banner',
        method: 'get',
        params,
    })
}

export interface BannerType {
    id?: number
    cover: string
    href: string
    show: boolean
    type: number
}

// 创建更新
export const bannerCreateUpdateApi = (
    data: BannerType,
): Promise<baseResponse<Record<string, unknown>>> => {
    if (data.id) {
        return useAxios.put(`/api/banner/${data.id}`, data)
    }
    return useAxios.post('/api/banner', data)
}

// 删除
export const bannerDeleteApi = (idList: Array<string | number>): Promise<baseResponse<any>> => {
    return useAxios({
        url: '/api/banner',
        method: 'delete',
        data: {
            idList,
        },
    })
}
