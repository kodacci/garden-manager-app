import { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthUser } from '@hooks/useAuthUser'
import { SingleFormPage } from '@components/templates/SingleFormPage'
import { Alert } from 'antd'

export const HomePage: FC = (): ReactElement => {
  const authUser = useAuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authUser) {
      void navigate('/signin')
    }
  }, [authUser, navigate])

  return (
    <SingleFormPage>
      <Alert message={`Hello, ${authUser?.name}! Welcome to Garden Manager`} />
    </SingleFormPage>
  )
}
