export interface LoginRq {
  login: string
  password: string
}

export interface LoginRs {
  accessToken: string
  refreshToken: string
}
