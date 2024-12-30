import { jwtDecode, JwtPayload } from 'jwt-decode'
import { pick } from 'lodash'

export interface TokenUser {
  id: number
  login: string
  name: string
}

interface Payload extends JwtPayload, TokenUser {}

interface AuthHeader {
  Authorization?: string
}

export class AuthService {
  private user?: TokenUser
  private accessToken?: string
  private refreshToken?: string

  public authenticate(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    const payload = jwtDecode<Payload>(accessToken)
    this.user = pick(payload, 'id', 'login', 'name')
  }

  public signOut(): void {
    this.user = undefined
    this.accessToken = undefined
    this.refreshToken = undefined
  }

  public getAuthHeader(): AuthHeader {
    return this.accessToken
      ? { Authorization: `Bearer ${this.accessToken}` }
      : {}
  }

  public getUser(): TokenUser | undefined {
    return this.user
  }
}
