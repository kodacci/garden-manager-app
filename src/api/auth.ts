import { HttpClient } from '@api/HttpClient'
import { AUTH_API_PATH } from '@api/constants'
import { MutationApiMethod } from '@api/types'
import { LoginRq, LoginRs, RefreshRq, RefreshRs } from '@api/model/auth'

export interface AuthApi {
  login: MutationApiMethod<LoginRq, LoginRs>
  refresh: MutationApiMethod<RefreshRq, RefreshRs>
}

export const authApi = (httpClient: HttpClient): AuthApi => ({
  login: {
    mutationKey: ['login'],
    mutationFn: (data: LoginRq): Promise<LoginRs> =>
      httpClient.post<LoginRq, LoginRs>(`${AUTH_API_PATH}/login`, data),
  },

  refresh: {
    mutationKey: ['refresh'],
    mutationFn: (data: RefreshRq): Promise<RefreshRs> =>
      httpClient.post<RefreshRq, RefreshRs>(`${AUTH_API_PATH}/refresh`, data),
  },
})
