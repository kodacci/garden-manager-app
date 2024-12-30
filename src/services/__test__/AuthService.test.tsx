import { AuthService } from '@services/AuthService'
import sign from 'jwt-encode'

describe('AuthService', () => {
  it('should remove tokens and user data on calling signOut', () => {
    const auth = new AuthService()
    const token = sign(
      { id: 1, login: 'test', name: 'test', type: 'ACCESS' },
      'secret'
    )
    auth.authenticate(token, token)
    auth.signOut()

    expect(auth.getUser()).toBeUndefined()
    expect(auth.getAuthHeader()).toEqual({})
  })
})
