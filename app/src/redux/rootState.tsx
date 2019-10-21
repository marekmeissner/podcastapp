import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer, RootState} from './rootReducer';
import {AuthInitialState} from './reducers/auth/authReducer';
import {AuthState} from './reducers/auth/types';

export interface RootState {
  readonly auth: AuthState;
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
};
