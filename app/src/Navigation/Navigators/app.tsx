import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Tabs } from './tabs'
import Header from '@component/Header/Header'

import { SCREEN_NAMES } from '../constants'

const App = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: (navigation: NavigationScreenProps) => <Header {...navigation} />,
      },
    },
  },
  {
    initialRouteName: 'Tabs',
  },
)

export default App
