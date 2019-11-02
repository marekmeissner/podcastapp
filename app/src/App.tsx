/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import configureStore from './Store'
import { StyleProvider } from 'native-base'
import getTheme from '../native-base-theme/components'
import platform from '../native-base-theme/variables/platform'
import NavigationService from '@util/navigationService/navigationService'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainerComponent } from 'react-navigation'
import AppNavigation from './Navigation'

import { COLORS } from '@util/styles/colors'

export const { store, persistor } = configureStore()

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  innerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 0,
    backgroundColor: COLORS.SPACE,
  },
})
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
  }

  onInitNavigatonService = (navigatorRef: NavigationContainerComponent | null) => {
    if (navigatorRef) {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <StatusBar barStyle="light-content" />
              <StyleProvider style={getTheme(platform)}>
                <SafeAreaView style={{ height: '100%' }}>
                  <AppNavigation ref={this.onInitNavigatonService} uriPrefix="https://" />
                </SafeAreaView>
              </StyleProvider>
            </View>
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
