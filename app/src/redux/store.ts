import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AuthInitialState} from '../screens/Auth/authReducer';
import {initialRootState as rootState, RootState} from './rootState';

const initStore = (initialRootState: RootState = rootState) =>
  createStore(
    rootReducer,
    initialRootState,
    composeWithDevTools(applyMiddleware(thunk)),
  );

export default initStore;
