import '@mocks/matchMedia.mock.test'
import { render, screen } from '@testing-library/react'
import { SignupPage } from '@pages/signup-page'

test('shows signup page', () => {
  render(<SignupPage />)

  expect(() => screen.getByText('Signup to Garden Manager')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Your login')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Strong password')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Your name')).not.toThrow()
  expect(() => screen.getByPlaceholderText('Your email')).not.toThrow()
})
