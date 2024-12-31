import { usersApi, UsersApi } from '@api/users'
import { HttpClient } from '@api/HttpClient'
import { authApi, AuthApi } from '@api/auth'

export interface GardenManagerApi extends UsersApi, AuthApi {}

export const api = (httpClient: HttpClient): GardenManagerApi => ({
  ...usersApi(httpClient),
  ...authApi(httpClient),
})
