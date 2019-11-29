import { combineReducers } from 'redux'

import { AuthInitialState, authReducer } from './Auth/authReducer'
import { AuthState, AuthActions } from './Auth/types'
import { AudioInitialState, audioReducer } from './Audio/audioReducer'
import { AudioState, AudioActions } from './Audio/types'
import { SubscribeState, SubscribeActions } from './Subscribe/types'
import { subscribeReducer, SubscribeInitialState } from './Subscribe/subscribeReducer'

export interface RootState {
  readonly auth: AuthState
  readonly audio: AudioState
  readonly subscribe: SubscribeState
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
  audio: AudioInitialState,
  subscribe: SubscribeInitialState,
}

export const rootReducer = (state = initialRootState, action: AuthActions | SubscribeActions | AudioActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
    audio: audioReducer,
    subscribe: subscribeReducer,
  })(state, action)
}
