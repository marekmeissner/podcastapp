import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import AudioRecorder from '@screen/App/Studio/AudioRecorder/AudioRecorder'

import { Tabs } from './tabs'
import Header from '@component/Header/Header'

import { COLORS } from '@util/styles/colors'

const App = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: (navigation: NavigationScreenProps) => <Header {...navigation} />,
      },
    },
    Audio: {
      screen: AudioRecorder,
      navigationOptions: {
        headerTintColor: COLORS.WHITE,
        headerTransparent: true,
      },
    },
  },
  {
    initialRouteName: 'Tabs',
  },
)

export default App
