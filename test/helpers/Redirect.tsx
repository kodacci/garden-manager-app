import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'

export const Redirect: FC<{ path: string }> = ({ path }): ReactNode => {
  const navigate = useNavigate()
  useEffect(() => {
    void navigate(path)
  }, [navigate, path])

  return null
}
