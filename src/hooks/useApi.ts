import { useContext } from 'react'
import { ApiContext } from '@context/ApiContext'
import { GardenManagerApi } from '@api/api'

export const useApi = (): GardenManagerApi =>
  useContext<GardenManagerApi>(ApiContext)
