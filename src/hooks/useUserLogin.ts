import { useCallback, useContext } from 'react'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { useNavigate } from 'react-router'
import { AuthContext } from '@context/AuthContext'
import { LoginRs } from '@api/model/auth'

export interface UseUserLoginResult {
  login: (login: string, password: string) => void
  isPending: boolean
}

export const useUserLogin = (): UseUserLoginResult => {
  const loginMutation = useApiMutation(useApi().login)
  const navigate = useNavigate()
  const authService = useContext(AuthContext)

  const login = useCallback(
    (login: string, password: string) =>
      loginMutation.mutate(
        {
          login,
          password,
        },
        {
          onSuccess: (auth: LoginRs) => {
            authService.authenticate(auth.accessToken, auth.refreshToken)
            void navigate('/')
          },
        }
      ),
    [loginMutation, authService, navigate]
  )

  return { login, isPending: loginMutation.isPending }
}
