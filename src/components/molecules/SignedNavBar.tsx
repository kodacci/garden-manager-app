import { FC, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { MenuProps } from 'antd/lib'
import { Menu } from 'antd'

const items: Required<MenuProps>['items'][number][] = [
  {
    label: 'Home',
    key: '',
  },
  {
    label: 'Gardens',
    key: 'gardens',
  },
  {
    label: 'Sign out',
    key: 'signout',
  },
]

export const SignedNavBar: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState([''])

  useEffect(() => {
    const key = location.pathname.substring(1)
    setSelected([key])
  }, [location])

  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    ({ key }) => {
      setSelected([key])
      void navigate(`/${key}`)
    },
    [navigate]
  )

  return (
    <Menu
      items={items}
      onClick={onClick}
      mode="horizontal"
      selectedKeys={selected}
    />
  )
}
