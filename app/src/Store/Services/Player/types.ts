import { Audio } from '@service/Audio/types'

export interface PlayerState {
  readonly currentAudio?: number
  readonly playerTrack: Audio[]
}

export enum PLAYER_ACTIONS {
  SET_CURRENT_AUDIO = 'SET_CURRENT_AUDIO_PLAYER',
  SET_PLAYER_TRACK = 'SET_PLAYER_TRACK',
}

export interface SetCurrentAudio {
  type: PLAYER_ACTIONS.SET_CURRENT_AUDIO
  currentAudio: number
}

export interface SetPlayerTrack {
  type: PLAYER_ACTIONS.SET_PLAYER_TRACK
  playerTrack: Audio[]
}

export type PlayerActions = SetCurrentAudio | SetPlayerTrack
