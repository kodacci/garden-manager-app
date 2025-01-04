import { FC } from 'react'
import { Form, Input } from 'antd'

export const PasswordFormItem: FC = () => {
  return (
    <Form.Item<string>
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Password is required',
        },
        {
          message: 'Length must be between 8 and 255 symbols',
          min: 8,
          max: 255,
        },
      ]}
    >
      <Input.Password placeholder="Enter password" />
    </Form.Item>
  )
}
