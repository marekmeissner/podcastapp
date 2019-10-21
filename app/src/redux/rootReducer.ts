import {combineReducers} from 'redux';
import {authReducer} from './reducers/auth/authReducer';
import {AuthActions} from './reducers/auth/types';
import {initialRootState, RootState} from './rootState';


export const rootReducer = (state = initialRootState, action: AuthActions) => {
  return combineReducers<RootState>({
    auth: authReducer,
  })(state, action);
};
