import { MutationApiMethod, QueryApiMethod } from '@api/types'
import { CreateGardenRq, Garden, UpdateGardenRq } from '@api/model/gardens'
import { omit } from 'lodash'
import { HttpClient } from '@api/HttpClient'
import { GARDENS_API_PATH } from '@api/constants'

export interface GardensApi {
  listGardens: QueryApiMethod<Garden[]>
  createGarden: MutationApiMethod<CreateGardenRq, Garden>
  updateGarden: MutationApiMethod<UpdateGardenRq, Garden>
  deleteGarden: MutationApiMethod<number, void>
}

export const gardensApi = (httpClient: HttpClient): GardensApi => ({
  listGardens: {
    queryKey: ['gardens'],
    queryFn: (): Promise<Garden[]> =>
      httpClient.get<Garden[]>(GARDENS_API_PATH),
    initialData: [],
  },

  createGarden: {
    mutationKey: ['gardens'],
    mutationFn: (data: CreateGardenRq): Promise<Garden> =>
      httpClient.post<CreateGardenRq, Garden>(GARDENS_API_PATH, data),
  },

  updateGarden: {
    mutationKey: ['gardens'],
    mutationFn: (data: UpdateGardenRq & { id: number }): Promise<Garden> =>
      httpClient.put(`${GARDENS_API_PATH}/${data.id}`, omit(data, 'id')),
  },

  deleteGarden: {
    mutationKey: ['gardens'],
    mutationFn: (id: number): Promise<void> =>
      httpClient.delete(`${GARDENS_API_PATH}/${id}`),
  },
})
