import { createContext } from 'react'
import { FetchHttpClient } from '@api/FetchHttpClient'
import { api, GardenManagerApi } from '@api/api'

const httpClient = new FetchHttpClient()
export const gmApi = api(httpClient)

export const ApiContext = createContext<GardenManagerApi>(gmApi)
