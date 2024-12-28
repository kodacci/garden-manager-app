import { HttpClient } from '@api/HttpClient'
import { BASE_API_PATH } from '@api/constants'
import { MutationFunction, MutationKey } from '@tanstack/react-query'
import { CreateUserRq, User } from '@api/model/Users'

const USERS_API_PATH = `${BASE_API_PATH}/users`

export interface UsersApi {
  createUser: {
    key: MutationKey
    fn: MutationFunction<User, CreateUserRq>
  }
}

export const usersApi = (httpClient: HttpClient): UsersApi => ({
  createUser: {
    key: ['users'],
    fn: (data: CreateUserRq): Promise<User> =>
      httpClient.post<CreateUserRq, User>(USERS_API_PATH, data),
  },
})
