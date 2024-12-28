import { FC, ReactElement, StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './app-router'
import { App as AntdApp } from 'antd'
import { AuthContext, authService } from '@context/AuthContext'
import { ApiContext } from '@context/ApiContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FetchHttpClient } from '@api/FetchHttpClient'
import { api } from '@api/api'

const queryClient = new QueryClient()
const httpClient = new FetchHttpClient(authService)
const gmApi = api(httpClient)

export const App: FC = (): ReactElement => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authService}>
          <ApiContext.Provider value={gmApi}>
            <AntdApp>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </AntdApp>
          </ApiContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </StrictMode>
  )
}
