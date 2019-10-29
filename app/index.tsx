/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import SplashScreen from 'react-native-splash-screen';

import {RootState, initialRootState} from './src/redux/rootState';
import initStore from './src/redux/store';
import AuthService from './src/screens/Auth/authService';

const renderApp = (storeState?: RootState) =>
  AppRegistry.registerComponent(appName, () => () => (
    <App store={storeState ? initStore(storeState) : initStore()} />
  ));

AuthService.getUserToken()
  .then(token => {
    if (token) {
      const userId = AuthService.getUserId();
      renderApp({...initialRootState});
    } else {
      renderApp();
    }
  })
  .finally(() => SplashScreen.hide());
