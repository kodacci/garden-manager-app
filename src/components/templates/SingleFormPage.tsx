import { FC, PropsWithChildren, ReactElement } from 'react'
import { Layout } from 'antd'
import { styled } from 'styled-components'
import { NavBar } from '@components/molecules/NavBar'

const StyledLayout = styled(Layout)`
  display: flex;
  min-height: calc(100vh - 16px);
`

const StyledHeader = styled(Layout.Header)`
  display: flex;
  padding: 0;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02);
  position: sticky;
  top: 0;
  background: #ffffff;
  width: 100%;
`

const NavBarContainer = styled('div')`
  width: 100%;
`

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
}: PropsWithChildren): ReactElement => {
  return (
    <StyledLayout>
      <StyledHeader>
        <NavBarContainer>
          <NavBar />
        </NavBarContainer>
      </StyledHeader>
      <StyledContent>
        <Container>{children}</Container>
      </StyledContent>
    </StyledLayout>
  )
}
