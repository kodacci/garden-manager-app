import { HttpClient } from '@api/HttpClient'
import { BASE_API_PATH } from '@api/constants'
import { LoginRq, LoginRs } from '@api/model/Login'
import { MutationApiMethod } from '@api/types'

const AUTH_API_PATH = `${BASE_API_PATH}/auth`

export interface AuthApi {
  login: MutationApiMethod<LoginRq, LoginRs>
}

export const authApi = (httpClient: HttpClient): AuthApi => ({
  login: {
    mutationKey: ['login'],
    mutationFn: (data: LoginRq): Promise<LoginRs> =>
      httpClient.post<LoginRq, LoginRs>(`${AUTH_API_PATH}/login`, data),
  },
})
