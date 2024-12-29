import '@mocks/matchMedia.mock.test'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { SignupPage } from '@pages/signup-page'
import { setupServer } from 'msw/node'
import { users, usersHandlers } from '@test/msw/users'
import { authHandlers, tokens } from '@test/msw/auth'
import { AppContext } from '@app/AppContext'
import { MemoryRouter, Route, Routes } from 'react-router'
import { authService } from '@context/AuthContext'
import { pick } from 'lodash'

const TEST_LOGIN = 'tester'
const TEST_PASSWORD = 'abc12345'
const TEST_NAME = 'Tester'
const TEST_EMAIL = 'test@test.com'

const server = setupServer(...usersHandlers, ...authHandlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

const fillInput = (placeholder: string, value: string): boolean =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), {
    target: { value },
  })

test('Should be able to signup and to Garden Manager', async (): Promise<void> => {
  render(
    <AppContext>
      <MemoryRouter>
        <Routes>
          <Route index element={<SignupPage />} />
        </Routes>
      </MemoryRouter>
    </AppContext>
  )

  expect(() => screen.getByText('Signup to Garden Manager')).not.toThrow()

  act(() => {
    fillInput('Your login', TEST_LOGIN)
    fillInput('Enter password', TEST_PASSWORD)
    fillInput('Your name', TEST_NAME)
    fillInput('Your email', TEST_EMAIL)
    fireEvent.click(screen.getByText('Signup'))
  })

  await waitFor(() => expect(users.length).toEqual(1))

  const user = users[0]
  expect(user.login).toEqual(TEST_LOGIN)
  expect(user.password).toEqual(TEST_PASSWORD)
  expect(user.name).toEqual(TEST_NAME)
  expect(user.email).toEqual(TEST_EMAIL)

  expect(authService.authHeader()).toEqual({
    Authorization: `Bearer ${tokens.accessToken}`,
  })
  expect(authService.getUser()).toEqual(pick(user, 'id', 'login', 'name'))
})
