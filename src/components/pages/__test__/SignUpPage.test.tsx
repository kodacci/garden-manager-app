import '@mocks/matchMedia.mock.test'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SignupPage } from '@components/pages/SignupPage'
import { setupServer } from 'msw/node'
import { users, usersErrorHandlers, usersHandlers } from '@test/msw/users'
import { authHandlers, tokens } from '@test/msw/auth'
import { AppContext } from '@app/AppContext'
import { MemoryRouter, Route, Routes } from 'react-router'
import { authService } from '@context/AuthContext'
import { pick } from 'lodash'

const TEST_LOGIN = 'tester'
const TEST_PASSWORD = 'abc12345'
const TEST_NAME = 'Tester'
const TEST_EMAIL = 'test@test.com'

const server = setupServer(...authHandlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

const fillInput = (placeholder: string, value: string): boolean =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), {
    target: { value },
  })

const fillInputs = (): void => {
  fillInput('Your login', TEST_LOGIN)
  fillInput('Enter password', TEST_PASSWORD)
  fillInput('Your name', TEST_NAME)
  fillInput('Your email', TEST_EMAIL)
}

describe('SignupPage', () => {
  beforeEach(() => {
    users.length = 0
    server.resetHandlers()
  })

  it('should show notification on sign up error', async (): Promise<void> => {
    server.use(...usersErrorHandlers)

    const user = userEvent.setup()
    const { findByText, queryByText } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<SignupPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    act(() => fillInputs())
    await user.click(await findByText('Sign up'))

    await findByText('Server error', undefined)

    expect(queryByText('Dummy error')).not.toBeNull()
  })

  it('should be able to sign up to Garden Manager', async (): Promise<void> => {
    server.use(...usersHandlers)
    const user = userEvent.setup()

    const { findByText, queryByText } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<SignupPage />} />
            <Route path="/" element={<span>Main page</span>} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    expect(queryByText('Sign up to Garden Manager')).not.toBeNull()

    act(() => fillInputs())
    await user.click(await findByText('Sign up'))

    await waitFor(() => expect(authService.getUser()).not.toBeNull())

    const tester = users[0]
    expect(tester.login).toEqual(TEST_LOGIN)
    expect(tester.password).toEqual(TEST_PASSWORD)
    expect(tester.name).toEqual(TEST_NAME)
    expect(tester.email).toEqual(TEST_EMAIL)

    expect(authService.getAuthHeader()).toEqual({
      Authorization: `Bearer ${tokens.accessToken}`,
    })
    expect(authService.getUser()).toEqual(pick(tester, 'id', 'login', 'name'))
  })
})
