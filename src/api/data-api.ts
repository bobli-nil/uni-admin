import { type baseResponse, useAxios } from '@/api/index.ts'

export interface DataSumType {
    flowCount: number
    userCount: number
    articleCount: number
    chatCount: number
    commentCount: number
    newLoginCount: number
    newSignCount: number
}

export const dataSumApi = (): Promise<baseResponse<DataSumType>> => {
    return useAxios('/api/data/sum')
}
