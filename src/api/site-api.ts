import { useAxios, type baseResponse } from './index.ts'

export interface SiteResponse {
    qiNiu: {
        enable: boolean
    }
    ai: {
        enable: boolean
    }
    siteInfo: {
        title: string
        logo: string
        beian: string
        mode: 1 | 2
    }
    project: {
        title: string
        icon: string
        webPath: string
    }
    seo: {
        keywords: string
        description: string
    }
    about: {
        version: string
        siteAbout: string
        qq: string
        wechat: string
        gitee: string
        bilibili: string
        github: string
    }
    login: {
        qqLogin: boolean
        usernamePwdLogin: boolean
        emailPwdLogin: boolean
        captcha: boolean
    }
    indexRight: {
        list: Array<{ title: string; enable: boolean }>
    }
    article: {
        noExamine: boolean
        commentLine: 2 | 3 | 4
    }
}

export interface EmailResponse {
    domain: string
    port: 587
    sendEmail: string
    authCode: string
    sendNickname: string
    ssl: boolean
    tls: boolean
}

export interface QQResponse {
    appID: string
    appKey: string
    redirect: string
}

export interface QiNiuResponse {
    enable: boolean
    accessKey: string
    secretKey: string
    bucket: string
    uri: string
    region: string
    prefix: string
    size: number // MB
    expiry: number // 秒
}

export interface AiResponse {
    enable: boolean
    secretKey: string
    nickname: string
    avatar: string
    abstract: string
}

export interface SiteBaseResponse {
    site: SiteResponse
    email: EmailResponse
    qq: QQResponse
    qiNiu: QiNiuResponse
    ai: AiResponse
}

export const siteApi = <T extends keyof SiteBaseResponse>(
    name: T,
): Promise<baseResponse<SiteBaseResponse[T]>> => {
    return useAxios({
        url: `/api/site/${name}`,
        method: 'get',
    })
}

export const siteUpdateApi = <T extends keyof SiteBaseResponse>(
    siteName: T,
    data: SiteBaseResponse[T],
): Promise<baseResponse<string>> => {
    return useAxios({
        url: `/api/site/${siteName}`,
        method: 'put',
        data,
    })
}
