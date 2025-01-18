import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Col, Flex, Layout, Row, Spin } from 'antd'
import { AppLayout } from '@components/atoms/AppLayout'
import { AppHeader } from '@components/molecules/AppHeader'

const StyledContent = styled(Layout.Content)`
  display: flex;
  padding: 30px;
`

const StyledRow = styled(Row)`
  flex-grow: 1;
`

export interface GridItem {
  id: number
  element: ReactNode
}

export interface GridPageProps {
  items: GridItem[]
  cols: number
  isLoading?: boolean
}

export const GridPage: FC<GridPageProps> = ({
  items,
  cols,
  isLoading,
}: GridPageProps): ReactNode => {
  return (
    <AppLayout>
      <AppHeader />
      <StyledContent>
        {isLoading ? (
          <Flex align="center" justify="center" flex="1">
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex align="start" justify="center" flex="1">
            <StyledRow align="stretch" justify="center" gutter={[16, 24]}>
              {items.map((item) => (
                <Col span={24 / cols} key={item.id}>
                  {item.element}
                </Col>
              ))}
            </StyledRow>
          </Flex>
        )}
      </StyledContent>
    </AppLayout>
  )
}
