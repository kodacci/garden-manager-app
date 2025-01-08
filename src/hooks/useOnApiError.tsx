import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { HttpClientError } from '@api/HttpClient'
import { ProblemDetailWidget } from '@components/atoms/ProblemDetailWidget'
import { useNotification } from '@hooks/useNotification'

export const useOnApiError = (): ((error: HttpClientError) => void) => {
  const navigate = useNavigate()
  const notification = useNotification()
  const location = useLocation()

  return useCallback(
    (error: HttpClientError) => {
      if (
        error.problemDetail?.status === 401 &&
        location.pathname !== '/signin'
      ) {
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
    [location, navigate, notification]
  )
}
