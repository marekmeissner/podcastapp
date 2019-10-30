import { combineReducers } from 'redux'

import { AuthInitialState, authReducer } from './Auth/authReducer'
import { AuthState, AuthActions } from './Auth/types'

export interface RootState {
  readonly auth: AuthState
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
}

export const rootReducer = (state = initialRootState, action: AuthActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
  })(state, action)
}
