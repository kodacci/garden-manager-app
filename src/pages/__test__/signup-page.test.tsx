import '@mocks/matchMedia.mock.test'
import { render, screen } from '@testing-library/react'
import { SignupPage } from '@pages/signup-page'

test('shows signup page', () => {
  render(<SignupPage />)

  expect(() => screen.getByText('Signup to Garden Manager')).not.toThrow()
  expect(() => screen.getByText('Login')).not.toThrow()
  expect(() => screen.getByText('Password')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Enter login')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Enter password')).not.toThrow()
})
