import { usersApi, UsersApi } from '@api/users'
import { HttpClient } from '@api/HttpClient'
import { authApi, AuthApi } from '@api/auth'
import { gardensApi, GardensApi } from '@api/gardens'

export interface GardenManagerApi extends UsersApi, AuthApi, GardensApi {}

export const api = (httpClient: HttpClient): GardenManagerApi => ({
  ...usersApi(httpClient),
  ...authApi(httpClient),
  ...gardensApi(httpClient),
})
