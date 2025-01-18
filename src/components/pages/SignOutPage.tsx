import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSignOut } from '@hooks/useSignOut'

export const SignOutPage: FC = () => {
  const navigate = useNavigate()
  const signout = useSignOut()

  useEffect(() => {
    signout()
    void navigate('/signin')
  }, [navigate, signout])

  return null
}
