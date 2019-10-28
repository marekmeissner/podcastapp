import {combineReducers} from 'redux';
import {authReducer, AuthActions} from '../screens/Auth/authReducer';
import {initialRootState, RootState} from './rootState';

export const rootReducer = (state = initialRootState, action: AuthActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
  })(state, action);
};
