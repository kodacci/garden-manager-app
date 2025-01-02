import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSignOut } from '@hooks/useSignOut'

export const SignOutPage: FC = () => {
  const navigate = useNavigate()
  useSignOut()

  useEffect(() => {
    void navigate('/signin')
  }, [navigate])

  return null
}
