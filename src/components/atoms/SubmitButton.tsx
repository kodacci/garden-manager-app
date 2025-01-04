import { FC } from 'react'
import { Button, Flex, Form } from 'antd'

export interface SubmitButtonProps {
  name: string
  isPending?: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({ name, isPending }) => {
  return (
    <Form.Item label={null}>
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit" loading={isPending}>
          {name}
        </Button>
      </Flex>
    </Form.Item>
  )
}
