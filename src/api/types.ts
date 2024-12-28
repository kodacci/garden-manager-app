import { MutationFunction, MutationKey } from '@tanstack/react-query'
import { ProblemDetail } from '@api/HttpClient'

export interface MutationApiMethod<T, R> {
  key: MutationKey
  fn: MutationFunction<R, T>
}

export const isProblemDetail = (problem: unknown): problem is ProblemDetail => {
  return (
    problem !== null &&
    typeof problem === 'object' &&
    'title' in problem &&
    typeof problem.title === 'string' &&
    'status' in problem &&
    typeof problem.status === 'number' &&
    'detail' in problem &&
    typeof problem.detail === 'string'
  )
}
