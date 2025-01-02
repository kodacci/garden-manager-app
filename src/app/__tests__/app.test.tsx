import '@mocks/matchMedia.mock.test'
import { render, screen } from '@testing-library/react'
import { App } from '@app/App'

describe('App', () => {
  it('should render application (redirect to signup)', () => {
    render(<App />)

    // Should redirect to signup
    expect(screen.queryByText('Sign in to Garden Manager')).not.toBeNull()
  })
})
