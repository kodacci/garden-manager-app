import { useContext } from 'react'
import { TokenUser } from '@services/AuthService'
import { AuthContext } from '@context/AuthContext'

export const useAuthUser = (): TokenUser | undefined => {
  const auth = useContext(AuthContext)

  return auth.getUser()
}
