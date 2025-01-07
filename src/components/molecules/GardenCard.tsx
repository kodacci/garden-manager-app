import { FC, ReactNode, useCallback } from 'react'
import { Card, Descriptions } from 'antd'
import { styled } from 'styled-components'
import { Garden } from '@api/model/gardens'
import { DeleteButton } from '@components/atoms/DeleteButton'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'

export interface GardenCardProps {
  garden: Garden
}

const StyledCard = styled(Card)`
  height: 100%;
`

export const GardenCard: FC<GardenCardProps> = ({ garden }): ReactNode => {
  const { isPending, mutate } = useApiMutation(useApi().deleteGarden)
  const onClick = useCallback(() => {
    mutate(garden.id)
  }, [garden.id, mutate])

  return (
    <StyledCard
      title={garden.name}
      extra={<DeleteButton isLoading={isPending} onClick={onClick} />}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Address">{garden.address}</Descriptions.Item>
        <Descriptions.Item label="Owner">{garden.owner.name}</Descriptions.Item>
        <Descriptions.Item label="Participants">
          {garden.participants
            .map((participant) => participant.name)
            .join(', ')}
        </Descriptions.Item>
      </Descriptions>
    </StyledCard>
  )
}
