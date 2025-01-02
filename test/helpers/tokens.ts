import { User } from '@api/model/users'
import sign from 'jwt-encode'
import { LoginRs } from '@api/model/auth'

const user: User = { id: 0, login: 'test', name: 'Tester' }
const exp = Math.floor(Date.now() / 1000) + 60 * 60

export const genTokens = (): LoginRs => {
  return {
    accessToken: sign({ ...user, type: 'ACCESS', exp }, 'secret'),
    refreshToken: sign({ ...user, type: 'REFRESH', exp }, 'secret'),
  }
}
