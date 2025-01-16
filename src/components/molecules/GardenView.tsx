import { FC, ReactNode } from 'react'
import { Garden } from '@api/model/gardens'
import { Descriptions } from 'antd'

export interface GardenViewProps {
  garden: Garden
}

export const GardenView: FC<GardenViewProps> = ({ garden }): ReactNode => {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Address">{garden.address}</Descriptions.Item>
      <Descriptions.Item label="Owner">{garden.owner.name}</Descriptions.Item>
      <Descriptions.Item label="Participants">
        {garden.participants.map((participant) => participant.name).join(', ')}
      </Descriptions.Item>
    </Descriptions>
  )
}
