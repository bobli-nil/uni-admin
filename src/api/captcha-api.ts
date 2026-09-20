import { type baseResponse, useAxios } from '@/api/index.ts'

export interface CaptchaResponse {
    captchaId: string
    captcha: string
}

export const captchaApi = (): Promise<baseResponse<CaptchaResponse>> => {
    return useAxios.get('/api/captcha')
}
