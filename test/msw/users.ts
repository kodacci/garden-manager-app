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

const error5xx = {
  type: 'about:blank',
  title: 'Server Error',
  status: 500,
  detail: 'Dummy error',
  instance: USERS_API_PATH,
}

export const usersErrorHandlers = [
  http.post(USERS_API_PATH, () => {
    return new HttpResponse(JSON.stringify(error5xx), {
      status: error5xx.status,
    })
  }),
]
