import {mock, type MockjsRequestOptions} from 'mockjs'

export const userMock = () => {
    mock(/.*?\/api\/user\/pwd_login/, 'post', (options: MockjsRequestOptions) => {
        return {
            code: 0,
            data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJOYW1lIjoiemhhbmdzYW4iLCJyb2xlIjoxLCJpc3MiOiJsbXIiLCJleHAiOjE3ODkwMTU0MTMsIm5iZiI6MTc4ODkyOTAxMywiaWF0IjoxNzg4OTI5MDEzfQ.r5mSOhGjDw6qFW-m3lTwKKxzGblV6aptUB3jgdDHOk0',
            msg: '成功'
        }
    })

    mock(/.*?\/api\/user\/detail/, 'get', (options: MockjsRequestOptions) => {
        return {
            code: 0,
            data: {
                id: 1,
                createdAt: "2026-08-30T01:16:59.852+08:00",
                username: "zhangsan",
                nickname: "zhangsan",
                avatar: "",
                abstract: "",
                registerSource: 0,
                likeTags: null,
                codeAge: 1,
                role: 1,
                email: "",
                usePassword: true,
                userConf: {
                    userID: 1,
                    likeTags: null,
                    updateUsernameDate: null,
                    openCollect: true,
                    openFollow: true,
                    openFans: true,
                    homeStyleID: 1,
                    lookCount: 0
                },
            },
            msg: "成功"
        }
    })
}