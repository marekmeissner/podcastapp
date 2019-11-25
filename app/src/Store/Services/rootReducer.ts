import { combineReducers } from 'redux'

import { AuthInitialState, authReducer } from './Auth/authReducer'
import { AuthState, AuthActions } from './Auth/types'
import { SubscribeState, SubscribeActions } from './Subscribe/types'
import { subscribeReducer, SubscribeInitialState } from './Subscribe/subscribeReducer'

export interface RootState {
  readonly auth: AuthState
  readonly subscribe: SubscribeState
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
  subscribe: SubscribeInitialState,
}

export const rootReducer = (state = initialRootState, action: AuthActions | SubscribeActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
    subscribe: subscribeReducer,
  })(state, action)
}
