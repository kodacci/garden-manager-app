import { FC } from 'react'
import { Button, Flex, Form, Space } from 'antd'

export interface SubmitButtonProps {
  readonly name: string
  readonly isLoading?: boolean
  readonly onCancel?: () => void
}

export const FormButtons: FC<SubmitButtonProps> = ({
  name,
  isLoading,
  onCancel,
}) => {
  return (
    <Form.Item label={null}>
      <Flex justify="flex-end">
        <Space>
          {onCancel ? (
            <Button type="dashed" htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {name}
          </Button>
        </Space>
      </Flex>
    </Form.Item>
  )
}
