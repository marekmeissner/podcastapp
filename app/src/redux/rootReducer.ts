import {combineReducers} from 'redux';
import {authReducer} from './reducers/auth/authReducer';
import {AUTH_ACTIONS, AuthActions, AuthState} from './reducers/auth/types';
import {initialRootState} from './store';

export interface RootState {
  readonly auth: AuthState;
}

export const rootReducer = (state = initialRootState, action: AuthActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
  })(state, action);
};
