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

export interface DataGrowthType {
    growthRate: number
    growthNum: number
    countList: number[]
    dateList: string[]
}

export const dataGrowthApi = (type: 1 | 2 | 3): Promise<baseResponse<DataGrowthType>> => {
    return useAxios.get('/api/data/growth', { params: { type } })
}

export const dataArticleGrowthApi = (): Promise<baseResponse<DataGrowthType>> => {
    return useAxios.get('/api/data/article')
}

export interface DataComputerType {
    cpuPercent: number
    memPercent: number
    diskPercent: number
}

export const dataComputerApi = (): Promise<baseResponse<DataComputerType>> => {
    return useAxios('/api/data/computer')
}
