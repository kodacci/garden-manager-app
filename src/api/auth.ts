import { HttpClient } from '@api/HttpClient'
import { AUTH_API_PATH } from '@api/constants'
import { LoginRq, LoginRs } from '@api/model/Login'
import { MutationApiMethod } from '@api/types'

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
