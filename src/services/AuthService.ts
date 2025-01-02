import { jwtDecode, JwtPayload } from 'jwt-decode'
import { pick } from 'lodash'
import { authApi, AuthApi } from '@api/auth'
import { FetchHttpClient } from '@api/FetchHttpClient'

import { RefreshRs } from '@api/model/auth'

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
  private static readonly ACCESS_TOKEN_KEY: string = 'gmAccessToken'
  private static readonly REFRESH_TOKEN_KEY: string = 'gmRefreshToken'
  private static readonly TIMEOUT_PREPEND: number = 10000

  private readonly api: AuthApi = authApi(new FetchHttpClient(this))
  private user?: TokenUser
  private accessToken?: string
  private refreshToken?: string
  private timer?: NodeJS.Timeout

  constructor() {
    this.accessToken =
      localStorage.getItem(AuthService.ACCESS_TOKEN_KEY) ?? undefined
    this.refreshToken =
      localStorage.getItem(AuthService.REFRESH_TOKEN_KEY) ?? undefined

    if (this.accessToken) {
      this.validateAndExtract()
    }
  }

  private clearTimeout(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }

  private onRefreshTimeout(): void {
    if (!this.refreshToken) {
      return
    }

    this.api.refresh
      .mutationFn({ refreshToken: this.refreshToken })
      .then(({ accessToken, refreshToken }: RefreshRs) => {
        this.authenticate(accessToken, refreshToken)
      })
      .catch((err: unknown) => {
        console.log('Error refreshing tokens', err)
        this.signOut()
      })
  }

  private validateAndExtract(): void {
    if (!this.accessToken || !this.refreshToken) {
      return
    }

    const accessPayload = jwtDecode<Payload>(this.accessToken)
    const refreshPayload = jwtDecode<Payload>(this.refreshToken)
    const now = Date.now()
    if (
      !accessPayload.exp ||
      accessPayload.exp * 1000 <= now + AuthService.TIMEOUT_PREPEND
    ) {
      if (
        !refreshPayload.exp ||
        refreshPayload.exp * 1000 <= now + AuthService.TIMEOUT_PREPEND
      ) {
        this.signOut()
        return
      }

      this.onRefreshTimeout()
      return
    }

    this.timer = setTimeout(
      () => this.onRefreshTimeout(),
      accessPayload.exp * 1000 - now - AuthService.TIMEOUT_PREPEND
    )

    this.user = pick(accessPayload, 'id', 'login', 'name')
  }

  public authenticate(accessToken: string, refreshToken: string): void {
    this.clearTimeout()

    this.accessToken = accessToken
    this.refreshToken = refreshToken

    localStorage.setItem('gmAccessToken', this.accessToken)
    localStorage.setItem('gmRefreshToken', this.refreshToken)

    this.validateAndExtract()
  }

  public signOut(): void {
    this.clearTimeout()

    this.user = undefined
    this.accessToken = undefined
    this.refreshToken = undefined

    localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY)
    localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY)
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
