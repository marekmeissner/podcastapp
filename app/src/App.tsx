/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import configureStore from './Store'
import { StyleProvider } from 'native-base'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import NavigationService from '@util/navigationService/navigationService'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainerComponent } from 'react-navigation'
import AppNavigation from './Navigation'

export const { store, persistor } = configureStore()

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  onInitNavigatonService = (navigatorRef: NavigationContainerComponent | null) => {
    navigatorRef && NavigationService.setTopLevelNavigator(navigatorRef)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <StyleProvider style={getTheme(platform)}>
            <AppNavigation ref={this.onInitNavigatonService} uriPrefix="https://" />
          </StyleProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
