import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { HttpClientError } from '@api/HttpClient'
import { useCallback } from 'react'
import { useNotification } from '@hooks/useNotification'
import { ProblemDetailWidget } from '@components/atoms/ProblemDetailWidget'
import { useNavigate } from 'react-router'

export type UseApiMutationResult<T, R> = UseMutationResult<
  R,
  HttpClientError,
  T
>

export const useApiMutation = <T, R>(
  options: UseMutationOptions<R, HttpClientError, T>
): UseApiMutationResult<T, R> => {
  const navigate = useNavigate()
  const notification = useNotification()

  const onError = useCallback(
    (error: HttpClientError) => {
      if (error.problemDetail?.status === 403) {
        void navigate('/signout')
        return
      }

      notification.error({
        message: 'Server error',
        description: error.isProblemDetail ? (
          <ProblemDetailWidget problemDetail={error.problemDetail} />
        ) : (
          error.message
        ),
        placement: 'bottomRight',
        duration: 0,
      })
    },
    [navigate, notification]
  )

  options.onError = options.onError ?? onError

  return useMutation<R, HttpClientError, T>(options)
}
