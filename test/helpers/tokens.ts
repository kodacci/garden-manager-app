import { User } from '@api/model/users'
import sign from 'jwt-encode'
import { LoginRs } from '@api/model/auth'
import { TokenPayload, TokenUser } from '@services/AuthService'
import { jwtDecode } from 'jwt-decode'
import { pick } from 'lodash'

const DEFAULT_USER_ID = 0
const DEFAULT_USER_LOGIN = 'tester'
const DEFAULT_USER_NAME = 'Tester'
const DEFAULT_EXP = Math.floor(Date.now() / 1000) + 60 * 60

export interface Options {
  userId?: number
  userLogin?: string
  userName?: string
  exp?: number
}

export const genTokens = (options?: Options): LoginRs => {
  const user: User = {
    id: options?.userId ?? DEFAULT_USER_ID,
    login: options?.userLogin ?? DEFAULT_USER_LOGIN,
    name: options?.userName ?? DEFAULT_USER_NAME,
  }

  const exp = options?.exp ?? DEFAULT_EXP

  return {
    accessToken: sign(
      { ...user, type: 'ACCESS', exp: exp ?? DEFAULT_EXP },
      'secret'
    ),
    refreshToken: sign(
      { ...user, type: 'REFRESH', exp: exp ?? DEFAULT_EXP },
      'secret'
    ),
  }
}

export const extractUser = (authHeader: string): TokenUser => {
  const token = authHeader.substring('Bearer '.length)
  const payload = jwtDecode<TokenPayload>(token)

  return pick(payload, 'id', 'login', 'name')
}
