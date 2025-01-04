import { FC } from 'react'
import { Form, Input } from 'antd'

export const LoginFormItem: FC = () => {
  return (
    <Form.Item<string>
      label="Login"
      name="login"
      rules={[{ required: true, message: 'Login is required' }]}
    >
      <Input placeholder="Your login" />
    </Form.Item>
  )
}
