import {useAxios, type baseResponse} from "./index.ts"

export interface userLoginRequest {
  val: string
  password: string
}

export const userLoginApi = (data: userLoginRequest): Promise<baseResponse<string>> => {
  return useAxios({
    method: 'post',
    url: '/api/user/pwd_login',
    data
  })
}