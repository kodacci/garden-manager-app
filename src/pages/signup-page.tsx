import { FC, ReactElement } from 'react'
import { Card, Form, Input } from 'antd'
import { BasicPageTemplate } from '@templates/basic-page-template'

export const SignupPage: FC = (): ReactElement => {
  return (
    <BasicPageTemplate>
      <Card title="Signup to Garden Manager">
        <Form
          name="signup"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item<string>
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Enter login' }]}
          >
            <Input placeholder="Enter login" />
          </Form.Item>
          <Form.Item<string>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Enter password' }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Card>
    </BasicPageTemplate>
  )
}
