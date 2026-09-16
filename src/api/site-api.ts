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

// 获取站点信息
export const siteInfoApi = (): Promise<baseResponse<SiteResponse>> => {
    return useAxios({
        url: '/api/site/site',
        method: 'get',
    })
}

// 更新站点信息
export const siteUpdateInfoApi = (
    data: SiteResponse,
): Promise<baseResponse<Record<string, unknown>>> => {
    return useAxios({
        url: '/api/site/site',
        method: 'put',
        data,
    })
}
