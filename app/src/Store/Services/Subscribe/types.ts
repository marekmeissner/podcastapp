import { Audio } from '@service/Audio/types'

export enum SUBSCRIBE_ACTIONS {
  GET_COLLECTION = 'SUBSCRIBE_GET_COLLECTION',
}

export interface SubscribeState {
  collection: Audio[]
}

export interface GetSubscribedAudios {
  type: SUBSCRIBE_ACTIONS.GET_COLLECTION
  collection: Audio[]
}

export type SubscribeActions = GetSubscribedAudios
