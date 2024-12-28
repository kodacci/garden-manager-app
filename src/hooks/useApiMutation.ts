import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { HttpClientError } from '@api/HttpClient'
import { useCallback } from 'react'
import { useNotification } from '@hooks/useNotification'

export type UseApiMutationResult<T, R> = UseMutationResult<
  R,
  HttpClientError,
  T
>

export const useApiMutation = <T, R>(
  options: UseMutationOptions<R, HttpClientError, T>
): UseApiMutationResult<T, R> => {
  const notification = useNotification()
  const onError = useCallback(
    (error: HttpClientError) =>
      notification.error({
        message: 'Server error',
        description: error?.message,
        placement: 'bottomRight',
      }),
    [notification]
  )

  options.onError = options.onError ?? onError

  return useMutation<R, HttpClientError, T>(options)
}
