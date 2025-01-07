import { FC, ReactNode, useCallback } from 'react'
import { Card, Form, FormProps, Input } from 'antd'
import { styled } from 'styled-components'
import { SubmitButton } from '@components/atoms/SubmitButton'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { CreateGardenRq, Garden } from '@api/model/gardens'
import { useNotification } from '@hooks/useNotification'

const StyledCard = styled(Card)`
  min-width: 400px;
`

export const GardenCreateForm: FC = (): ReactNode => {
  const { isPending, mutate } = useApiMutation(useApi().createGarden)
  const notification = useNotification()

  const onFinish: FormProps['onFinish'] = useCallback(
    (req: CreateGardenRq): void => {
      mutate(req, {
        onSuccess: (garden: Garden) =>
          notification.success({
            message: `Garden ${garden.name} successfully created`,
            placement: 'bottomRight',
          }),
      })
    },
    [mutate, notification]
  )

  return (
    <StyledCard title="New garden">
      <Form
        name="create-garden"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        variant="outlined"
        onFinish={onFinish}
      >
        <Form.Item<string>
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Name is required' },
            { min: 3, max: 255, message: 'Length should be between 3 and 255' },
          ]}
        >
          <Input placeholder="Enter new garde name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ max: 1000, message: 'Length should be less than 1000' }]}
        >
          <Input.TextArea placeholder="Enter garden address" />
        </Form.Item>
        <SubmitButton name="Create" isPending={isPending} />
      </Form>
    </StyledCard>
  )
}
