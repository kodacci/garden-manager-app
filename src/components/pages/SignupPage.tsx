import { FC, ReactNode, useCallback } from 'react'
import { Card, Form, FormProps, Input } from 'antd'
import { SingleFormPage } from '@components/templates/SingleFormPage'
import { CreateUserRq } from '@api/model/users'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { useUserLogin } from '@hooks/useUserLogin'
import { PasswordFormItem } from '@components/atoms/PasswordFormItem'
import { LoginFormItem } from '@components/atoms/LoginFormItem'
import { SubmitButton } from '@components/atoms/SubmitButton'

export const SignupPage: FC = (): ReactNode => {
  const createMutation = useApiMutation(useApi().createUser)
  const { login, isPending: isLoginPending } = useUserLogin()
  const isPending = createMutation.isPending || isLoginPending

  const onFinish: FormProps<CreateUserRq>['onFinish'] = useCallback(
    (user: CreateUserRq) => {
      createMutation.mutate(user, {
        onSuccess: () => login(user.login, user.password),
      })
    },
    [createMutation, login]
  )

  return (
    <SingleFormPage>
      <Card title="Sign up to Garden Manager">
        <Form
          name="signup"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          variant="outlined"
          disabled={isPending}
        >
          <LoginFormItem />
          <PasswordFormItem />
          <Form.Item<string>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Enter your name' }]}
          >
            <Input placeholder="Your name"></Input>
          </Form.Item>
          <Form.Item<string>
            label="Email"
            name="email"
            rules={[{ type: 'email', message: 'Enter valid email address' }]}
          >
            <Input placeholder="Your email" />
          </Form.Item>

          <SubmitButton name="Sign up" isPending={isPending} />
        </Form>
      </Card>
    </SingleFormPage>
  )
}
