import { FC, ReactNode } from 'react'
import { styled } from 'styled-components'
import { Col, Layout, Row, Spin } from 'antd'
import { AppLayout } from '@components/atoms/AppLayout'
import { AppHeader } from '@components/molecules/AppHeader'

const StyledContent = styled(Layout.Content)`
  padding: 30px;
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
          <Spin size="large" />
        ) : (
          <Row align="stretch" justify="center" gutter={[16, 24]}>
            {items.map((item) => (
              <Col span={24 / cols} key={item.id}>
                {item.element}
              </Col>
            ))}
          </Row>
        )}
      </StyledContent>
    </AppLayout>
  )
}
