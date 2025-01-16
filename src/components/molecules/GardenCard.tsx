import { FC, ReactNode, useCallback } from 'react'
import { Garden } from '@api/model/gardens'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { EntityCard } from '@components/molecules/EntityCard'
import { GardenView } from '@components/molecules/GardenView'
import {
  GardenEditForm,
  GardenEditFormProps,
} from '@components/molecules/GardenEditForm'

export interface GardenCardProps {
  readonly garden?: Garden
  readonly isCreateForm?: boolean
}

export const GardenCard: FC<GardenCardProps> = ({
  garden,
  isCreateForm,
}): ReactNode => {
  const delMutation = useApiMutation(useApi().deleteGarden)
  const isPending = delMutation.isPending

  const onDelete = useCallback(() => {
    if (garden?.id) {
      delMutation.mutate(garden.id)
    }
  }, [delMutation, garden])

  const EditForm = useCallback(
    ({ onCancel }: GardenEditFormProps): ReactNode => (
      <GardenEditForm
        garden={garden}
        isCreateForm={isCreateForm}
        onCancel={onCancel}
      />
    ),
    [garden, isCreateForm]
  )

  return (
    <EntityCard
      title={garden?.name ?? 'New garden'}
      onDelete={onDelete}
      EditForm={EditForm}
      View={garden ? <GardenView garden={garden} /> : <></>}
      isLoading={isPending}
      isCreateForm={isCreateForm}
    />
  )
}
