export interface LoginRq {
  readonly login: string
  readonly password: string
}

export interface LoginRs {
  readonly accessToken: string
  readonly refreshToken: string
}
