export interface LoginRq {
  readonly login: string
  readonly password: string
}

export interface LoginRs {
  readonly accessToken: string
  readonly refreshToken: string
}

export interface RefreshRq {
  refreshToken: string
}

export interface RefreshRs {
  accessToken: string
  refreshToken: string
}
