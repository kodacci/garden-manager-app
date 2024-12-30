import { http, HttpResponse } from 'msw'

export const negativeHttpHandlers = [
  http.get('/unexpected-error', ({ request }) => {
    const url = new URL(request.url)
    const status = Number.parseInt(url.searchParams.get('status') ?? '500')

    return new HttpResponse('Dummy error', { status })
  }),
]
