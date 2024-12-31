import {
  HttpClient,
  HttpClientError,
  HttpMethod,
  QueryParams,
} from '@api/HttpClient'
import { v4 } from 'uuid'
import { isProblemDetail } from '@api/types'
import { HTTP_CLIENT_ERROR_NAME } from '@api/constants'
import { AuthService } from '@services/AuthService'

export class FetchHttpClient implements HttpClient {
  private readonly authService: AuthService

  private toQueryRecord(query: QueryParams): Record<string, string> {
    const record: Record<string, string> = {}
    for (const key in query) {
      record[key] = String(query[key])
    }

    return record
  }

  constructor(authService: AuthService) {
    this.authService = authService
  }

  private async makeRequest<T, R>(
    method: HttpMethod,
    url: string,
    data?: T,
    query?: QueryParams
  ): Promise<R> {
    const urlString = query
      ? `${url}?${new URLSearchParams(this.toQueryRecord(query)).toString()}`
      : url

    try {
      const response = await fetch(urlString, {
        method,
        headers: {
          'Content-Type': 'application/json',
          rqUid: v4(),
          rqTs: new Date().toISOString(),
          ...this.authService.getAuthHeader(),
        },
        body: data ? JSON.stringify(data) : null,
      })

      if (!response.ok) {
        return Promise.reject(await this.toHttpClientError(response))
      }

      return (await response.json()) as R
    } catch (error: unknown) {
      throw this.onError(error)
    }
  }

  private async toHttpClientError(
    response: Response
  ): Promise<HttpClientError> {
    const rawBody = await response.text()

    try {
      const body: unknown = JSON.parse(rawBody)
      if (isProblemDetail(body)) {
        return {
          name: HTTP_CLIENT_ERROR_NAME,
          message: `Http request failed with status ${body.status}: ${body.detail}`,
          isProblemDetail: true,
          problemDetail: body,
        }
      }

      return this.onError(body)
    } catch (error: unknown) {
      console.error(`Error parsing non ok response as json`, error)
      return this.onError(`status: ${response.status}, body: ${rawBody}`)
    }
  }

  private onError(error: unknown): HttpClientError {
    const ex =
      error instanceof Error
        ? error
        : new Error(`Unknown error: ${JSON.stringify(error)}`)

    return {
      name: HTTP_CLIENT_ERROR_NAME,
      message: `Http request failed: ${ex.message}`,
      isProblemDetail: false,
      error: ex,
    }
  }

  get<R>(url: string, query?: QueryParams): Promise<R> {
    return this.makeRequest(HttpMethod.GET, url, null, query)
  }

  post<T, R>(url: string, data?: T, query?: QueryParams): Promise<R> {
    return this.makeRequest(HttpMethod.POST, url, data, query)
  }

  put<T, R>(url: string, data: T, query?: QueryParams): Promise<R> {
    return this.makeRequest(HttpMethod.PUT, url, data, query)
  }

  delete<R>(url: string): Promise<R> {
    return this.makeRequest(HttpMethod.DELETE, url)
  }
}
