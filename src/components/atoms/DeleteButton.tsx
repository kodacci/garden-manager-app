import { FC, ReactNode } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export interface DeleteButtonProps {
  onClick: () => void
  isLoading?: boolean
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  onClick,
  isLoading,
}): ReactNode => {
  return (
    <Button
      danger
      onClick={onClick}
      icon={<DeleteOutlined />}
      loading={isLoading}
    />
  )
}
