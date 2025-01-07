import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { HttpClientError } from '@api/HttpClient'
import { useOnApiError } from '@hooks/useOnApiError'
import { useCallback } from 'react'

export type UseApiMutationResult<T, R> = UseMutationResult<
  R,
  HttpClientError,
  T
>

export const useApiMutation = <T, R>(
  options: UseMutationOptions<R, HttpClientError, T>
): UseApiMutationResult<T, R> => {
  const client = useQueryClient()

  const onError = useOnApiError()
  options.onError = options.onError ?? onError

  const onSuccess: (res: R, req: T, context?: unknown) => void = useCallback(
    (res, req, context) => {
      void client.invalidateQueries({ queryKey: options.mutationKey })
      if (options.onSuccess) {
        options.onSuccess(res, req, context)
      }
    },
    [client, options]
  )

  return useMutation<R, HttpClientError, T>({ ...options, onSuccess })
}
