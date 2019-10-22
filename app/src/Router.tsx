import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './screens/Auth/Login/Login';
import Register from './screens/Auth/Register/Register';
import ForgotPassword from './screens/Auth/ForgotPassword/ForgotPassword';

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

const Router = createAppContainer(
  createSwitchNavigator(
    {
      Auth: Auth,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default Router;
