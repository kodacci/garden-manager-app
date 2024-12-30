import { FC, PropsWithChildren, ReactNode, StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContext, authService } from '@context/AuthContext'
import { ApiContext } from '@context/ApiContext'
import { FetchHttpClient } from '@api/FetchHttpClient'
import { api } from '@api/api'
import { App } from 'antd'

const queryClient = new QueryClient()
const httpClient = new FetchHttpClient(authService)
const gmApi = api(httpClient)

export const AppContext: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): ReactNode => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={authService}>
          <ApiContext.Provider value={gmApi}>
            <App>{children}</App>
          </ApiContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </StrictMode>
  )
}
