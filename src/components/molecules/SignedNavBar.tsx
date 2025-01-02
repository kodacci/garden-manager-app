import { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { MenuProps } from 'antd/lib'
import { Menu } from 'antd'

const items: Required<MenuProps>['items'][number][] = [
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
  const [selected, setSelected] = useState('gardens')

  const onClick = useCallback<NonNullable<MenuProps['onClick']>>(
    ({ key }) => {
      setSelected(key)
      void navigate(`/${key}`)
    },
    [navigate]
  )

  return (
    <Menu
      items={items}
      onClick={onClick}
      mode="horizontal"
      selectedKeys={[selected]}
    />
  )
}
