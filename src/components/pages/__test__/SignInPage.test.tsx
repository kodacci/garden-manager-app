import '@mocks/matchMedia.mock.test'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { AppContext } from '@app/AppContext'
import { userEvent } from '@testing-library/user-event'
import { users } from '@test/msw/users'
import { authService } from '@context/AuthContext'
import { omit } from 'lodash'
import { authHandlers, tokens } from '@test/msw/auth'
import { SignInPage } from '@components/pages/SignInPage'
import { setupServer } from 'msw/node'
import { Redirect } from '@test/helpers/Redirect'

const server = setupServer(...authHandlers)

describe('SignInPage', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())
  afterEach(() => (users.length = 0))

  it('should be able to sign in to Garden Manager', async (): Promise<void> => {
    users.push({ id: 1, login: 'test', name: 'Tester', password: 'abc12345' })

    const user = userEvent.setup()
    const { queryByText, getByPlaceholderText, getByRole } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<Redirect path="/signin" />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    expect(queryByText('Sign in to Garden Manager')).not.toBeNull()
    expect(queryByText('Sign up')).not.toBeNull()

    await user.click(getByPlaceholderText('Your login'))
    await user.keyboard('test')
    await user.click(getByPlaceholderText('Enter password'))
    await user.keyboard('abc12345')
    await user.click(getByRole('button', { name: 'Sign in' }))

    await waitFor(() => expect(authService.getUser()).not.toBeUndefined(), {
      timeout: 1000,
    })

    const authUser = authService.getUser()
    expect(authUser).toEqual(omit(users[0], 'password'))
    expect(authService.getAuthHeader()).toEqual({
      Authorization: `Bearer ${tokens.accessToken}`,
    })
  }, 10000)
})
