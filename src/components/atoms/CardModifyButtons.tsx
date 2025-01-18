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
        icon={<EditOutlined alt="Edit garden" />}
        loading={isLoading}
        disabled={isEditable}
        name="Edit"
      />
      <Button
        danger
        onClick={onDelete}
        icon={<DeleteOutlined alt="Delete garden" />}
        loading={isLoading}
        name="Delete"
      />
    </Space>
  )
}
