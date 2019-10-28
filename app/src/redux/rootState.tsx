import {rootReducer, RootState} from './rootReducer';
import {AuthInitialState} from '../screens/Auth/authReducer';
import {AuthState} from '../screens/Auth/types';

export interface RootState {
  readonly auth: AuthState;
}

export const initialRootState: RootState = {
  auth: AuthInitialState,
};
