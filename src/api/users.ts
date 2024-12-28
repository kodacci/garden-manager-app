import { HttpClient } from '@api/HttpClient'
import { BASE_API_PATH } from '@api/constants'
import { CreateUserRq, User } from '@api/model/Users'
import { MutationApiMethod } from '@api/types'

const USERS_API_PATH = `${BASE_API_PATH}/users`

export interface UsersApi {
  createUser: MutationApiMethod<CreateUserRq, User>
}

export const usersApi = (httpClient: HttpClient): UsersApi => ({
  createUser: {
    mutationKey: ['users'],
    mutationFn: (data: CreateUserRq): Promise<User> =>
      httpClient.post<CreateUserRq, User>(USERS_API_PATH, data),
  },
})
