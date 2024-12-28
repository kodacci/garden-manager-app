import { FC, ReactElement, useCallback } from 'react'
import { Button, Card, Form, FormProps, Input } from 'antd'
import { BasicPageTemplate } from '@templates/basic-page-template'
import { useCreateUser } from '@hooks/useCreateUser'
import { CreateUserRq } from '@api/model/Users'

export const SignupPage: FC = (): ReactElement => {
  const mutation = useCreateUser()

  const onFinish: FormProps<CreateUserRq>['onFinish'] = useCallback(
    (user: CreateUserRq) => mutation.mutate(user),
    [mutation]
  )

  return (
    <BasicPageTemplate>
      <Card title="Signup to Garden Manager">
        <Form
          name="signup"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
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

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </BasicPageTemplate>
  )
}
