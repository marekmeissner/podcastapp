import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './screens/Auth/Login/Login';
import Register from './screens/Auth/Register/Register';
import ForgotPassword from './screens/Auth/ForgotPassword/ForgotPassword';

import Home from './screens/Home/Home';

const Auth = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const Router = createAppContainer(
  createSwitchNavigator(
    {
      Auth: Auth,
      App: App,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default Router;
