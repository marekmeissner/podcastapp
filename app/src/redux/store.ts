import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer, RootState} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthInitialState} from './reducers/auth/authReducer';

export const initialRootState: RootState = {
  auth: AuthInitialState,
};

const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
