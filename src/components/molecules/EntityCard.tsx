import { FC, ReactNode, useCallback, useState } from 'react'
import { CardModifyButtons } from '@components/atoms/CardModifyButtons'
import { styled } from 'styled-components'
import { Card } from 'antd'

enum Mode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
`

export interface EntityCardProps {
  readonly title: string
  readonly onDelete: () => void
  readonly isLoading?: boolean
  readonly isNonEditable?: boolean
  readonly EditForm: FC<{ onCancel: () => void }>
  readonly View?: ReactNode
  readonly CreateForm?: ReactNode
  readonly isCreateForm?: boolean
}

export const EntityCard: FC<EntityCardProps> = ({
  title,
  onDelete,
  isLoading,
  isNonEditable,
  EditForm,
  View,
  isCreateForm,
  CreateForm,
}): ReactNode => {
  const [mode, setMode] = useState(isCreateForm ? Mode.CREATE : Mode.VIEW)

  const onEdit = useCallback(
    () => (mode === Mode.EDIT ? setMode(Mode.VIEW) : setMode(Mode.EDIT)),
    [mode, setMode]
  )

  const onCancelEdit = useCallback(() => setMode(Mode.VIEW), [setMode])

  return (
    <StyledCard
      title={title}
      extra={
        !isCreateForm && !isNonEditable ? (
          <CardModifyButtons
            isLoading={isLoading}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ) : null
      }
    >
      {mode === Mode.CREATE && CreateForm ? (
        CreateForm
      ) : mode === Mode.VIEW ? (
        View
      ) : (
        <EditForm onCancel={onCancelEdit} />
      )}
    </StyledCard>
  )
}
