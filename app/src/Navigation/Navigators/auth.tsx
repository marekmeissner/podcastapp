import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import { Login, Register, ForgotPassword } from '@screen/Auth'

import { SCREEN_NAMES } from '../constants'

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
    initialRouteName: SCREEN_NAMES.AUTH_LOGIN,
  },
)

export default Auth
