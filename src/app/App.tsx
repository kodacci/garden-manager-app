import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './AppRouter'
import { App as AntdApp } from 'antd'
import { AppContext } from '@app/AppContext'

export const App: FC = (): ReactNode => {
  return (
    <AppContext>
      <AntdApp>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AntdApp>
    </AppContext>
  )
}
