import { FC, PropsWithChildren, ReactNode } from 'react'
import { Layout } from 'antd'
import { styled } from 'styled-components'
import { AppHeader } from '@components/molecules/AppHeader'
import { AppLayout } from '@components/atoms/AppLayout'

const StyledContent = styled(Layout.Content)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled('div')`
  max-width: 600px;
  min-width: 450px;
`

export const SingleFormPage: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): ReactNode => {
  return (
    <AppLayout>
      <AppHeader />
      <StyledContent>
        <Container>{children}</Container>
      </StyledContent>
    </AppLayout>
  )
}
