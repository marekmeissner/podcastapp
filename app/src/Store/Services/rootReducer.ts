import { combineReducers } from 'redux'

import { AuthInitialState, authReducer } from './Auth/authReducer'
import { AuthState, AuthActions } from './Auth/types'
import { AudioInitialState, audioReducer } from './Audio/audioReducer'
import { AudioState, AudioActions } from './Audio/types'

export interface RootState {
  readonly auth: AuthState
  readonly audio: AudioState
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
  audio: AudioInitialState}

export const rootReducer = (state = initialRootState, action: AuthActions | AudioActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
    audio: audioReducer
   })(state, action)
}
