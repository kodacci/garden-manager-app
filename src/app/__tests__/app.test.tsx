import '@mocks/matchMedia.mock.test'
import { render, screen } from '@testing-library/react'
import { App } from '@app/App'

test('should render application (redirect to signup)', () => {
  render(<App />)

  // Should redirect
  expect(() => screen.getByText('Signup to Garden Manager')).not.toThrow()
})
