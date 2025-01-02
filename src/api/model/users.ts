export interface CreateUserRq {
  readonly login: string
  readonly password: string
  readonly name: string
  readonly email?: string
}

export interface User extends Omit<CreateUserRq, 'password'> {
  readonly id: number
}
