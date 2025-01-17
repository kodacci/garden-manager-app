import { FC, ReactNode } from 'react'
import { Garden } from '@api/model/gardens'
import { Descriptions, Space, Tag, Typography } from 'antd'
import { useAuthUser } from '@hooks/useAuthUser'

export interface GardenViewProps {
  garden: Garden
}

export const GardenView: FC<GardenViewProps> = ({ garden }): ReactNode => {
  const user = useAuthUser()

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Address">{garden.address}</Descriptions.Item>
      <Descriptions.Item label="Owner">
        <Space>
          {user?.id === garden.owner.id ? (
            <Tag color="green">{garden.owner.name}</Tag>
          ) : (
            garden.owner.name
          )}
        </Space>
      </Descriptions.Item>
      <Descriptions.Item label="Participants">
        <Space size="large">
          {garden.participants.map((participant) => (
            <Space key={participant.id} size="small">
              <Typography.Text keyboard>{participant.name}</Typography.Text>
              <Tag color="purple">{participant.role}</Tag>
            </Space>
          ))}
        </Space>
      </Descriptions.Item>
    </Descriptions>
  )
}
