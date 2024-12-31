import { render, screen } from '@testing-library/react'
import { User } from '@api/model/Users'
import sign from 'jwt-encode'
import { AuthContext } from '@context/AuthContext'
import { AuthService } from '@services/AuthService'
import { HomePage } from '@pages/HomePage'
import { MemoryRouter, Route, Routes } from 'react-router'

const user: User = { id: 0, login: 'test', name: 'Tester' }
const accessToken = sign({ ...user, type: 'ACCESS' }, 'secret')
const refreshToken = sign({ ...user, type: 'REFRESH' }, 'secret')

const authService = new AuthService()
authService.authenticate(accessToken, refreshToken)

describe('HomePage', () => {
  it('should render HomePage', async (): Promise<void> => {
    render(
      <AuthContext.Provider value={authService}>
        <MemoryRouter>
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(
      screen.queryByText('Hello, Tester! Welcome to Garden Manager')
    ).not.toBeNull()
  })
})
