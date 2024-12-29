import { useCallback, useContext } from 'react'
import { User } from '@api/model/Users'
import { LoginRs } from '@api/model/Login'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { useNavigate } from 'react-router'
import { AuthContext } from '@context/AuthContext'

export interface UseUserLoginResult {
  login: (user: User) => void
  isPending: boolean
}

export const useUserLogin = (password: string): UseUserLoginResult => {
  const loginMutation = useApiMutation(useApi().login)
  const navigate = useNavigate()
  const authService = useContext(AuthContext)

  const login = useCallback(
    (user: User) =>
      loginMutation.mutate(
        {
          login: user.login,
          password: password,
        },
        {
          onSuccess: (auth: LoginRs) => {
            authService.authenticate(auth.accessToken, auth.refreshToken)
            void navigate('/')
          },
        }
      ),
    [loginMutation, password, authService, navigate]
  )

  return { login, isPending: loginMutation.isPending }
}
