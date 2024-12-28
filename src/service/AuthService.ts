import { jwtDecode, JwtPayload } from 'jwt-decode'
import { pick } from 'lodash'

export interface TokenUser {
  id: number
  login: string
  name: string
}

interface Payload extends JwtPayload, TokenUser {}

class AuthService {
  private user?: TokenUser
  private accessToken?: string
  private refreshToken?: string

  public authenticate(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    const payload = jwtDecode<Payload>(accessToken)
    this.user = pick(payload, 'id', 'login', 'name')
  }
}

export const authService = new AuthService()
