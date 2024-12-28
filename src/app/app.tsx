import { FC, ReactElement, StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { AppRouter } from './app-router'
import { AuthContext } from '@context/AuthContext'
import { ApiContext, gmApi } from '@context/ApiContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App: FC = (): ReactElement => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApiContext.Provider value={gmApi}>
          <AuthContext.Provider value={null}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </AuthContext.Provider>
        </ApiContext.Provider>
      </QueryClientProvider>
    </StrictMode>
  )
}
