import { createContext } from 'react'
import { AuthService } from '@services/AuthService'

export const authService = new AuthService()
export const AuthContext = createContext<AuthService>(authService)
