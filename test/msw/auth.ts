import { http, HttpResponse, PathParams } from 'msw'
import sign from 'jwt-encode'
import { users } from './users'
import { AUTH_API_PATH } from '@api/constants'
import { LoginRq, LoginRs } from '@api/model/auth'

const SECRET = 'test'
const ACCESS_TOKEN_TYPE = 'ACCESS'
const REFRESH_TOKEN_TYPE = 'REFRESH'

export const tokens = {
  accessToken: '',
  refreshToken: '',
}

const exp = Math.floor(Date.now() / 1000) + 60 * 60

export const authHandlers = [
  http.post<PathParams, LoginRq, LoginRs>(
    `${AUTH_API_PATH}/login`,
    async ({ request }) => {
      const req = await request.json()
      const user = users.find((item) => item.login === req.login)
      tokens.accessToken = sign(
        { ...user, type: ACCESS_TOKEN_TYPE, exp },
        SECRET
      )
      tokens.refreshToken = sign(
        { ...user, type: REFRESH_TOKEN_TYPE, exp },
        SECRET
      )

      return HttpResponse.json(tokens)
    }
  ),
]
