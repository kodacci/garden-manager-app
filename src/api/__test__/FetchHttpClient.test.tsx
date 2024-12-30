import { AuthService } from '@services/AuthService'
import { FetchHttpClient } from '@api/FetchHttpClient'
import { HttpClientError } from '@api/HttpClient'
import { HTTP_CLIENT_ERROR_NAME } from '@api/constants'
import { setupServer } from 'msw/node'
import { negativeHttpHandlers } from '@test/msw/httpClient'

const server = setupServer(...negativeHttpHandlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('FetchHttpClient', () => {
  it('should return Error on unexpected error', async () => {
    const client = new FetchHttpClient(new AuthService())

    try {
      await client.get<{ test: string }>('/unexpected-error', { status: 503 })
    } catch (error: unknown) {
      const ex = error as HttpClientError

      expect(ex).toHaveProperty('name')
      expect(ex.name).toEqual(HTTP_CLIENT_ERROR_NAME)
      expect(ex.message).toEqual(
        'Http request failed: Unknown error: "status: 503, body: Dummy error"'
      )
    }
  })
})
