import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import UploadAudioForm from '@screen/App/Studio/UploadAudioForm/UploadAudioForm'
import Settings from '@screen/Auth/Settings/Settings'

import { Tabs } from './tabs'
import Header from '@component/Header/Header'

import { COLORS } from '@util/styles/colors'

const App = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: (navigation: NavigationScreenProp) => <Header {...navigation} />,
      },
    },
    AudioUpload: {
      screen: UploadAudioForm,
      navigationOptions: {
        title: 'Upload form',
        headerTintColor: COLORS.WHITE,
        headerTransparent: true,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
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
