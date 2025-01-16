import { FC, ReactNode } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'

export interface CardModifyBlockProps {
  readonly onEdit: () => void
  readonly onDelete: () => void
  readonly isLoading?: boolean
  readonly isEditable?: boolean
}

export const CardModifyButtons: FC<CardModifyBlockProps> = ({
  onEdit,
  onDelete,
  isEditable,
  isLoading,
}): ReactNode => {
  return (
    <Space>
      <Button
        onClick={onEdit}
        icon={<EditOutlined />}
        loading={isLoading}
        disabled={isEditable}
      />
      <Button
        danger
        onClick={onDelete}
        icon={<DeleteOutlined />}
        loading={isLoading}
      />
    </Space>
  )
}
