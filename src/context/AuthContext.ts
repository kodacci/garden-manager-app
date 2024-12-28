import { createContext } from 'react'

export interface User {
  id: number
  login: string
  role: string
  name: string
  email?: string
}

export const AuthContext = createContext<User | null>(null)
