import { User } from '@api/model/users'

export enum GardenRole {
  ADMIN = 'ADMIN',
  USER = 'CHIEF',
  EXECUTOR = 'EXECUTOR',
}

export interface GardenParticipant extends User {
  role: GardenRole
}

export interface Garden {
  id: number
  name: string
  address?: string
  owner: User
  participants: GardenParticipant[]
}

export type CreateGardenRq = Omit<Garden, 'id|owner|participants'>
export type UpdateGardenRq = CreateGardenRq
