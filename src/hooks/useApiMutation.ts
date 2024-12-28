import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { HttpClientError } from '@api/HttpClient'

const onError = (error: HttpClientError): void => {
  console.log('Api mutation error', error)
}

export type UseApiMutationResult<T, R> = UseMutationResult<
  R,
  HttpClientError,
  T
>

export const useApiMutation = <T, R>(
  options: UseMutationOptions<R, HttpClientError, T>
): UseMutationResult<R, HttpClientError, T> => {
  options.onError = options.onError ?? onError

  return useMutation<R, HttpClientError, T>(options)
}
