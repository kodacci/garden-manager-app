import { useCallback, useContext } from 'react'
import { AuthContext } from '@context/AuthContext'

export const useSignOut: () => () => void = () => {
  const authService = useContext(AuthContext)

  return useCallback(() => authService.signOut(), [authService])
}
