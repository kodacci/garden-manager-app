import { render } from '@testing-library/react'
import { User } from '@api/model/users'
import sign from 'jwt-encode'
import { AuthContext, authService } from '@context/AuthContext'
import { HomePage } from '@components/pages/HomePage'
import { MemoryRouter, Route, Routes } from 'react-router'

const user: User = { id: 0, login: 'test', name: 'Tester' }
const exp = Math.floor(Date.now() / 1000) + 60 * 60

const accessToken = sign({ ...user, type: 'ACCESS', exp }, 'secret')
const refreshToken = sign({ ...user, type: 'REFRESH', exp }, 'secret')

describe('HomePage', () => {
  beforeAll(() => authService.authenticate(accessToken, refreshToken))
  afterAll(() => authService.signOut())

  it('should render HomePage', (): void => {
    const { queryByText } = render(
      <AuthContext.Provider value={authService}>
        <MemoryRouter>
          <Routes>
            <Route index element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(
      queryByText('Hello, Tester! Welcome to Garden Manager')
    ).not.toBeNull()
  })
})
