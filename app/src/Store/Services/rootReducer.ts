import { combineReducers } from 'redux'

import { AuthInitialState, authReducer } from './Auth/authReducer'
import { AuthState, AuthActions } from './Auth/types'
import { AudioInitialState, audioReducer } from './Audio/audioReducer'
import { AudioState, AudioActions } from './Audio/types'
import { PlayerInitialState, playerReducer } from './Player/playerReducer'
import { PlayerState, PlayerActions } from './Player/types'

export interface RootState {
  readonly auth: AuthState
  readonly audio: AudioState
  readonly player: PlayerState
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
  audio: AudioInitialState,
  player: PlayerInitialState,
}

export const rootReducer = (state = initialRootState, action: AuthActions | AudioActions | PlayerActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
    audio: audioReducer,
    player: playerReducer,
  })(state, action)
}
