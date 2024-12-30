import '@mocks/matchMedia.mock.test'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SignupPage } from '@pages/signup-page'
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
beforeEach(() => {
  users.length = 0
  server.resetHandlers()
})
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

const renderPage = (): void => {
  render(
    <AppContext>
      <MemoryRouter>
        <Routes>
          <Route index element={<SignupPage />} />
          <Route path="/" element={<span>Main page</span>} />
        </Routes>
      </MemoryRouter>
    </AppContext>
  )
}

describe('SignupPage', () => {
  it('should be able to signup to Garden Manager', async (): Promise<void> => {
    server.use(...usersHandlers)
    const user = userEvent.setup()

    renderPage()

    expect(() => screen.getByText('Signup to Garden Manager')).not.toThrow()

    act(() => fillInputs())
    await user.click(await screen.findByText('Signup'))

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

    await waitFor(() => expect(screen.findByText('Main page')))
  })

  it('should show notification on signup error', async (): Promise<void> => {
    server.use(...usersErrorHandlers)

    const user = userEvent.setup()
    renderPage()
    act(() => fillInputs())
    await user.click(await screen.findByText('Signup'))

    await waitFor(() =>
      expect(() => screen.findByText('Server error')).not.toThrow()
    )

    expect(() =>
      screen.findByText(/Http request failed with status 500/)
    ).not.toThrow()
  })
})
