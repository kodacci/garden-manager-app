import { FC, PropsWithChildren, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Layout } from 'antd'

const StyledLayout = styled(Layout)`
  display: flex;
  min-height: calc(100vh - 16px);
`

export const AppLayout: FC<PropsWithChildren> = ({ children }): ReactNode => {
  return <StyledLayout>{children}</StyledLayout>
}
