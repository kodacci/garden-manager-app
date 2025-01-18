import { http, HttpResponse, PathParams } from 'msw'
import { CreateGardenRq, Garden, GardenRole } from '@api/model/gardens'
import { GARDENS_API_PATH } from '@api/constants'
import { User } from '@api/model/users'

export const testGardens: Garden[] = []

export const testOwner: User = { id: 1, login: 'testOwner', name: 'Test Owner' }
export const testParticipant: User = {
  id: 2,
  login: 'testParticipant',
  name: 'Test Participant',
}

export const gardensHandlers = [
  http.post<PathParams, CreateGardenRq, Garden>(
    GARDENS_API_PATH,
    async ({ request }) => {
      const req = await request.json()
      const garden: Garden = {
        ...req,
        id: testGardens.length,
        owner: testOwner,
        participants: [{ ...testParticipant, role: GardenRole.EXECUTOR }],
      }
      testGardens.push(garden)

      return HttpResponse.json(garden)
    }
  ),

  http.get<PathParams>(GARDENS_API_PATH, () => {
    return HttpResponse.json(testGardens)
  }),

  http.put<{ id: string }, CreateGardenRq, Garden>(
    `${GARDENS_API_PATH}/:id`,
    async ({ params, request }) => {
      const req = await request.json()
      const id = Number.parseInt(params.id)
      const garden: Garden = {
        ...req,
        id,
        owner: testOwner,
        participants: [{ ...testParticipant, role: GardenRole.EXECUTOR }],
      }
      const idx = testGardens.findIndex((item) => item.id === id)
      if (idx > -1) {
        testGardens.splice(idx, 1, garden)
      }

      return HttpResponse.json(garden)
    }
  ),

  http.delete<{ id: string }, undefined, Record<string, never>>(
    `${GARDENS_API_PATH}/:id`,
    ({ params }) => {
      const id = Number.parseInt(params.id)
      const idx = testGardens.findIndex((item) => item.id === id)
      testGardens.splice(idx, 1)

      return HttpResponse.json({})
    }
  ),
]
