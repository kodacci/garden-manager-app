import { FC, useCallback } from 'react'
import { SingleFormPage } from '@components/templates/SingleFormPage'
import { Card, Form, FormProps } from 'antd'
import { PasswordFormItem } from '@components/atoms/PasswordFormItem'
import { LoginFormItem } from '@components/atoms/LoginFormItem'
import { useUserLogin } from '@hooks/useUserLogin'
import { FormButtons } from '@components/atoms/FormButtons'
import { LoginRq } from '@api/model/auth'

export const SignInPage: FC = () => {
  const { login, isPending } = useUserLogin()

  const onFinish: FormProps<LoginRq>['onFinish'] = useCallback(
    (req: LoginRq): void => login(req.login, req.password),
    [login]
  )

  return (
    <SingleFormPage>
      <Card title="Sign in to Garden Manager">
        <Form
          name="signin"
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          variant="outlined"
          onFinish={onFinish}
        >
          <LoginFormItem />
          <PasswordFormItem />
          <FormButtons name="Sign in" isLoading={isPending} />
        </Form>
      </Card>
    </SingleFormPage>
  )
}
