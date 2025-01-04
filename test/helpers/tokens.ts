import { User } from '@api/model/users'
import sign from 'jwt-encode'
import { LoginRs } from '@api/model/auth'

const user: User = { id: 0, login: 'test', name: 'Tester' }
const defaultExp = Math.floor(Date.now() / 1000) + 60 * 60

export const genTokens = (exp?: number): LoginRs => {
  return {
    accessToken: sign(
      { ...user, type: 'ACCESS', exp: exp ?? defaultExp },
      'secret'
    ),
    refreshToken: sign(
      { ...user, type: 'REFRESH', exp: exp ?? defaultExp },
      'secret'
    ),
  }
}
