import { render, waitFor } from '@testing-library/react'
import { authService } from '@context/AuthContext'
import { genTokens } from '@test/helpers/tokens'
import { MemoryRouter, Route, Routes } from 'react-router'
import { AppContext } from '@app/AppContext'
import { SignOutPage } from '@components/pages/SignOutPage'
import { Redirect } from '@test/helpers/Redirect'
import { AuthService } from '@services/AuthService'

const { accessToken, refreshToken } = genTokens()

describe('SignOutPage', () => {
  beforeAll(() => authService.authenticate(accessToken, refreshToken))
  afterAll(() => authService.signOut())

  it('should sign out on entering sign out page', async (): Promise<void> => {
    expect(authService.getUser()).not.toBeUndefined()

    render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<Redirect path="/signout" />} />
            <Route path="/signout" element={<SignOutPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    await waitFor(() => expect(authService.getUser()).toBeUndefined(), {
      timeout: 1000,
    })
    expect(localStorage.getItem(AuthService.ACCESS_TOKEN_KEY)).toBeNull()
    expect(localStorage.getItem(AuthService.REFRESH_TOKEN_KEY)).toBeNull()
  })
})
