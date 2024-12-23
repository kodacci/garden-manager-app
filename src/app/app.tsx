import { FC, ReactElement, StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './app-router'

export const App: FC = (): ReactElement => {
  return (
    <StrictMode>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StrictMode>
  )
}
