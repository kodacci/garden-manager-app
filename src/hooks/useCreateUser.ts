import { useApi } from '@hooks/useApi'
import { CreateUserRq, User } from '@api/model/Users'
import { useApiMutation, UseApiMutationResult } from '@hooks/useApiMutation'

export const useCreateUser = (): UseApiMutationResult<CreateUserRq, User> => {
  const api = useApi().createUser

  return useApiMutation<CreateUserRq, User>({
    mutationKey: api.key,
    mutationFn: api.fn,
  })
}
