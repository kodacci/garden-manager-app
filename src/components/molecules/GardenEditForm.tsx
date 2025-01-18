import { FC, ReactNode, useCallback } from 'react'
import { Form, FormProps, Input } from 'antd'
import { FormButtons } from '@components/atoms/FormButtons'
import { CreateGardenRq, Garden } from '@api/model/gardens'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { useNotification } from '@hooks/useNotification'

export interface GardenEditFormProps {
  readonly garden?: Garden
  readonly isCreateForm?: boolean
  readonly onCancel?: () => void
}

export const GardenEditForm: FC<GardenEditFormProps> = ({
  garden,
  isCreateForm,
  onCancel,
}): ReactNode => {
  const create = useApiMutation(useApi().createGarden)
  const update = useApiMutation(useApi().updateGarden)
  const notification = useNotification()

  const isPending = create.isPending || update.isPending

  const onFinish: FormProps['onFinish'] = useCallback(
    (req: CreateGardenRq) => {
      if (isCreateForm) {
        create.mutate(req, {
          onSuccess: (createdGarden: Garden) =>
            notification.success({
              message: `Garden ${createdGarden.name} successfully created`,
              placement: 'bottomRight',
            }),
        })

        return
      }

      update.mutate(
        { ...req, id: garden?.id ?? 0 },
        {
          onSuccess: (garden: Garden) =>
            notification.success({
              message: `Garden ${garden.name} successfully updated`,
              placement: 'bottomRight',
            }),
        }
      )
    },
    [create, garden?.id, isCreateForm, notification, update]
  )

  return (
    <Form
      name={garden ? `edit-garden-${garden.id}` : 'create-garden'}
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      variant="outlined"
      onFinish={onFinish}
      initialValues={{ name: garden?.name, address: garden?.address }}
    >
      <Form.Item<string>
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Name is required' },
          { min: 3, max: 255, message: 'Length should be between 3 and 255' },
        ]}
      >
        <Input placeholder="Enter new garden name" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ max: 1000, message: 'Length should be less than 1000' }]}
      >
        <Input.TextArea placeholder="Enter garden address" />
      </Form.Item>
      <FormButtons
        name={isCreateForm ? 'Create' : 'Save'}
        isLoading={isPending}
        onCancel={isCreateForm ? undefined : onCancel}
      />
    </Form>
  )
}
