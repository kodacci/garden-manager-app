import { createContext } from 'react'
import { api, GardenManagerApi } from '@api/api'
import { FetchHttpClient } from '@api/FetchHttpClient'
import { AuthService } from '@services/AuthService'

const gmApi = api(new FetchHttpClient(new AuthService()))
export const ApiContext = createContext<GardenManagerApi>(gmApi)
