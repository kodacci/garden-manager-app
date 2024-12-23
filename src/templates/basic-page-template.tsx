import { FC, PropsWithChildren, ReactElement } from 'react'
import { Layout, Flex } from 'antd'
import { styled } from 'styled-components'

const StyledLayout = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const StyledContent = styled(Layout.Content)`
  max-width: 600px;
`

export const BasicPageTemplate: FC<PropsWithChildren> = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <StyledLayout>
      <Flex align='center' justify='center'>
        <StyledContent>
          {children}
        </StyledContent>
      </Flex>
    </StyledLayout>
  )
}