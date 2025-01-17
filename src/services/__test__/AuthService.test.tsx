import { AuthService } from '@services/AuthService'
import sign from 'jwt-encode'
import { genTokens } from '@test/helpers/tokens'
import { waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { authHandlers } from '@test/msw/auth'

const server = setupServer(...authHandlers)

describe('AuthService', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY)
    localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY)
  })

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

  it('should make refresh on access token expiration', async () => {
    const tokens = genTokens({ exp: Math.floor(Date.now() / 1000) + 1 })
    localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, tokens.refreshToken)

    const auth = new AuthService(300)
    await waitFor(
      () =>
        expect(
          auth.getAuthHeader().Authorization?.substring('Bearer '.length)
        ).not.toEqual(tokens.accessToken),
      { timeout: 2000 }
    )

    const token = auth
      .getAuthHeader()
      .Authorization?.substring('Bearer '.length)

    expect(token).not.toBeNull()
  })
})
