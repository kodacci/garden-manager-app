import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Layout } from 'antd'
import { NavBar } from '@components/molecules/NavBar'

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

export const AppHeader: FC = (): ReactNode => {
  return (
    <StyledHeader>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>
    </StyledHeader>
  )
}
