import { http, HttpResponse, PathParams } from 'msw'
import sign from 'jwt-encode'
import { users } from './users'
import { AUTH_API_PATH } from '@api/constants'
import { LoginRq, LoginRs, RefreshRq, RefreshRs } from '@api/model/auth'
import { jwtDecode } from 'jwt-decode'
import { TokenPayload } from '@services/AuthService'
import { pick } from 'lodash'

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

  http.post<PathParams, RefreshRq, RefreshRs>(
    `${AUTH_API_PATH}/refresh`,
    async ({ request }) => {
      const req = await request.json()
      const payload = jwtDecode<TokenPayload>(req.refreshToken)

      const user = pick(payload, 'id', 'login', 'name')
      const res: RefreshRs = {
        accessToken: sign({ ...user, type: ACCESS_TOKEN_TYPE, exp }, SECRET),
        refreshToken: sign({ ...user, type: REFRESH_TOKEN_TYPE, exp }, SECRET),
      }

      return HttpResponse.json(res)
    }
  ),
]
