import { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthUser } from '@hooks/useAuthUser'
import { BasicPageTemplate } from '@templates/basic-page-template'
import { Alert } from 'antd'

export const HomePage: FC = (): ReactElement => {
  const authUser = useAuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authUser) {
      void navigate('/signup')
    }
  }, [authUser, navigate])

  return (
    <BasicPageTemplate>
      <Alert message={`Hello, ${authUser?.name}! Welcome to Garden Manager`} />
    </BasicPageTemplate>
  )
}
