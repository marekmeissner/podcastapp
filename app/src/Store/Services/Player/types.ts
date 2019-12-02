import { AudioSmall } from '@service/Audio/types'

export interface PlayerState {
  readonly currentAudio?: number
}

export enum PLAYER_ACTIONS {
  SET_CURRENT_AUDIO = 'SET_CURRENT_AUDIO_PLAYER',
}

export interface SetCurrentAudio {
  type: PLAYER_ACTIONS.SET_CURRENT_AUDIO
  currentAudio: number
}

export type PlayerActions = SetCurrentAudio
