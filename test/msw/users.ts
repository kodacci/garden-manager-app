import { http, HttpResponse, PathParams } from 'msw'
import { CreateUserRq, User } from '@api/model/Users'
import { omit } from 'lodash'
import { USERS_API_PATH } from '@api/constants'

interface TestUser extends User {
  password: string
}

export const users: TestUser[] = []

export const usersHandlers = [
  http.post<PathParams, CreateUserRq, User>(
    USERS_API_PATH,
    async ({ request }) => {
      const req = await request.json()
      const user = { id: users.length, ...omit(req, 'password') }
      users.push({ ...user, password: req.password })

      return HttpResponse.json(user)
    }
  ),
]
