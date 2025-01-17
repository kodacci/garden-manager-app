import { render } from '@testing-library/react'
import { authService } from '@context/AuthContext'
import { MemoryRouter, Route, Routes } from 'react-router'
import { genTokens } from '@test/helpers/tokens'
import { GardensPage } from '@components/pages/GardensPage'
import { setupServer } from 'msw/node'
import {
  gardensHandlers,
  testGardens,
  testOwner,
  testParticipant,
} from '@test/msw/gardens'
import { GardenRole } from '@api/model/gardens'
import { AppContext } from '@app/AppContext'

const { accessToken, refreshToken } = genTokens({
  userId: testOwner.id,
  userName: testOwner.name,
  userLogin: testOwner.login,
})
const server = setupServer(...gardensHandlers)

describe('GardensPage', () => {
  beforeAll(() => {
    authService.authenticate(accessToken, refreshToken)
    server.listen()
  })
  afterAll(() => {
    authService.signOut()
    server.close()
  })

  beforeEach(() => testGardens.splice(0))

  it('should list all user gardens', async (): Promise<void> => {
    testGardens.push(
      {
        id: 1,
        name: 'Test garden',
        address: 'Test address',
        owner: testOwner,
        participants: [{ ...testParticipant, role: GardenRole.EXECUTOR }],
      },
      {
        id: 2,
        name: 'Other user garden',
        address: 'Other address',
        owner: testParticipant,
        participants: [{ ...testOwner, role: GardenRole.ADMIN }],
      }
    )

    const { queryByText, queryAllByText, findByText, container } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<GardensPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    await findByText('Test garden')

    expect(queryByText('Test garden')).not.toBeNull()
    expect(queryByText('Test address')).not.toBeNull()
    expect(queryAllByText(testOwner.name).length).toEqual(2)
    expect(queryByText('Other user garden')).not.toBeNull()
    expect(queryByText('Other address')).not.toBeNull()
    expect(queryAllByText(testParticipant.name).length).toEqual(2)

    expect(container).toMatchSnapshot('list all gardens')
  })
})
