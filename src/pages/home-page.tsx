import { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'

export const HomePage: FC = (): ReactElement => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/signup')
  }, [navigate])

  return <></>
}