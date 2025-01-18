import { useCallback, useContext } from 'react'
import { AuthContext } from '@context/AuthContext'
import { useQueryClient } from '@tanstack/react-query'

export const useSignOut: () => () => void = () => {
  const authService = useContext(AuthContext)
  const client = useQueryClient()

  return useCallback(() => {
    authService.signOut()
    client.clear()
  }, [authService, client])
}
