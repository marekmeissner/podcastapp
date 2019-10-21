import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthInitialState} from './reducers/auth/authReducer';
import {initialRootState, RootState} from './rootState';

const store = createStore(
  rootReducer,
  initialRootState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
