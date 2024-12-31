import { http, HttpResponse, PathParams } from 'msw'
import sign from 'jwt-encode'
import { LoginRq, LoginRs } from '@api/model/Login'
import { users } from './users'
import { AUTH_API_PATH } from '@api/constants'

const SECRET = 'test'
const ACCESS_TOKEN_TYPE = 'ACCESS'
const REFRESH_TOKEN_TYPE = 'REFRESH'

export const tokens = {
  accessToken: '',
  refreshToken: '',
}

export const authHandlers = [
  http.post<PathParams, LoginRq, LoginRs>(
    `${AUTH_API_PATH}/login`,
    async ({ request }) => {
      const req = await request.json()
      const user = users.find((item) => item.login === req.login)
      tokens.accessToken = sign({ ...user, type: ACCESS_TOKEN_TYPE }, SECRET)
      tokens.refreshToken = sign({ ...user, type: REFRESH_TOKEN_TYPE }, SECRET)

      return HttpResponse.json(tokens)
    }
  ),
]
