import { AuthContext } from '@context/AuthContext'
import { useContext } from 'react'

export const useSignOut = (): void => {
  const authService = useContext(AuthContext)

  authService.signOut()
}
