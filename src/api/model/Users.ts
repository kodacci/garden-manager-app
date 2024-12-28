export interface CreateUserRq {
  login: string
  password: string
  name: string
  email?: string
}

export interface User extends CreateUserRq {
  id: number
}
