import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { HttpClientError } from '@api/HttpClient'
import { ProblemDetailWidget } from '@components/atoms/ProblemDetailWidget'
import { useNotification } from '@hooks/useNotification'
import { useQueryClient } from '@tanstack/react-query'

export const useOnApiError = (): ((error: HttpClientError) => void) => {
  const navigate = useNavigate()
  const notification = useNotification()
  const location = useLocation()
  const client = useQueryClient()

  return useCallback(
    (error: HttpClientError) => {
      if (
        error.problemDetail?.status === 401 &&
        location.pathname !== '/signin'
      ) {
        client.clear()
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
        duration: 60,
      })
    },
    [client, location.pathname, navigate, notification]
  )
}
