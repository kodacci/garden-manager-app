import { render, waitFor } from '@testing-library/react'
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
import { userEvent } from '@testing-library/user-event'

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
    expect(queryByText(GardenRole.EXECUTOR)).not.toBeNull()
    expect(queryByText(GardenRole.ADMIN)).not.toBeNull()

    expect(container).toMatchSnapshot('list all gardens')
  })

  it('should be able to create new garden with create form', async (): Promise<void> => {
    const user = userEvent.setup()

    const { queryByText, findByText, findByPlaceholderText, container } =
      render(
        <AppContext>
          <MemoryRouter>
            <Routes>
              <Route index element={<GardensPage />} />
            </Routes>
          </MemoryRouter>
        </AppContext>
      )

    await findByText('New garden')
    await user.click(await findByPlaceholderText('Enter new garden name'))
    await user.keyboard('Test garden')
    await user.click(await findByPlaceholderText('Enter garden address'))
    await user.keyboard('Test garden address')

    await user.click(await findByText('Create'))

    await waitFor(() => expect(testGardens.length).toEqual(1))

    const garden = testGardens[0]
    expect(garden.name).toEqual('Test garden')
    expect(garden.address).toEqual('Test garden address')

    await waitFor(() => expect(queryByText('Owner')))
    expect(queryByText(testOwner.name)).not.toBeNull()
    expect(queryByText('New garden')).not.toBeNull()

    expect(container).toMatchSnapshot('create new garden')
  })

  it('should be able to edit garden data', async (): Promise<void> => {
    const user = userEvent.setup()
    testGardens.push({
      id: 1,
      name: 'Test garden',
      address: 'Test address',
      owner: testOwner,
      participants: [{ ...testParticipant, role: GardenRole.EXECUTOR }],
    })

    const {
      getByText,
      findByText,
      findAllByRole,
      getAllByPlaceholderText,
      container,
    } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<GardensPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    await findByText('Test garden')
    await user.click((await findAllByRole('button'))[0])
    await findByText('Save')

    expect(container).toMatchSnapshot('garden edit card in edit mode')

    await user.tripleClick(getAllByPlaceholderText('Enter new garden name')[0])
    await user.keyboard('Updated garden name')
    await user.tripleClick(getByText('Test address'))
    await user.keyboard('Updated garden address')
    await user.click(getByText('Save'))

    await waitFor(() =>
      expect(testGardens[0].name).toEqual('Updated garden name')
    )

    const garden = testGardens[0]
    expect(garden.address).toEqual('Updated garden address')
  })

  it('should be able to delete garden', async (): Promise<void> => {
    const user = userEvent.setup()
    testGardens.push({
      id: 1,
      name: 'Test garden',
      address: 'Test address',
      owner: testOwner,
      participants: [{ ...testParticipant, role: GardenRole.EXECUTOR }],
    })

    const { findByText, findAllByRole } = render(
      <AppContext>
        <MemoryRouter>
          <Routes>
            <Route index element={<GardensPage />} />
          </Routes>
        </MemoryRouter>
      </AppContext>
    )

    await findByText('Test garden')
    await user.click((await findAllByRole('button'))[1])

    await waitFor(() => expect(testGardens.length).toEqual(0))
  })
})
