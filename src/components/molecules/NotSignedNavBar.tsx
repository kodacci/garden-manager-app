import { FC, useCallback, useMemo } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd/lib'
import { useLocation, useNavigate } from 'react-router'
import { LoginOutlined } from '@ant-design/icons'

export const NotSignedNavBar: FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const items = useMemo<Required<MenuProps>['items'][number][]>(() => {
    return pathname === '/signin'
      ? [{ label: 'Sign up', key: 'signup', icon: <LoginOutlined /> }]
      : [{ label: 'Sign in', key: 'signin', icon: <LoginOutlined /> }]
  }, [pathname])

  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    (event) => {
      void navigate(`/${event.key}`)
    },
    [navigate]
  )

  return <Menu items={items} onClick={onClick} mode="horizontal" />
}
