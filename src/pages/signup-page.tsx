import { FC, ReactElement, useCallback, useState } from 'react'
import { Button, Card, Flex, Form, FormProps, Input } from 'antd'
import { BasicPageTemplate } from '@templates/basic-page-template'
import { CreateUserRq } from '@api/model/Users'
import { styled } from 'styled-components'
import { useApiMutation } from '@hooks/useApiMutation'
import { useApi } from '@hooks/useApi'
import { useUserLogin } from '@hooks/useUserLogin'

const StyledCard = styled(Card)`
  min-width: 450px;
`

export const SignupPage: FC = (): ReactElement => {
  const createMutation = useApiMutation(useApi().createUser)
  const [password, setPassword] = useState('')
  const { login, isPending: isLoginPending } = useUserLogin(password)
  const isPending = createMutation.isPending || isLoginPending

  const onFinish: FormProps<CreateUserRq>['onFinish'] = useCallback(
    (user: CreateUserRq) => {
      setPassword(user.password)
      createMutation.mutate(user, { onSuccess: login })
    },
    [setPassword, createMutation, login]
  )

  return (
    <BasicPageTemplate>
      <StyledCard title="Signup to Garden Manager">
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
          <Form.Item<string>
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Enter login' }]}
          >
            <Input placeholder="Your login" />
          </Form.Item>
          <Form.Item<string>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Strong password',
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

          <Form.Item label={null}>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit" loading={isPending}>
                Signup
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </StyledCard>
    </BasicPageTemplate>
  )
}
