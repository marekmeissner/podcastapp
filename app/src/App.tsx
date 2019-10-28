/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {RootState} from './redux/rootState';
import {StatusBar, StyleSheet, View, SafeAreaView} from 'react-native';

import {StyleProvider, Container, Content} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import Router from './Router';
import NavigatorService from './helpers/navigationService';
import AuthGate from './components/AuthGate/AuthGate';

import AuthService from './screens/Auth/authService';

import {COLORS} from './utils/styles/colors.ts';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  innerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 0,
    backgroundColor: COLORS.GREY_BG,
  },
});

function getActiveRouteName(navigationState: any): string | null {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
class App extends React.Component<{store: Store}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <AuthGate fallback={'Login'} authPath={'Home'}>
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <StatusBar barStyle="light-content" />
              <StyleProvider style={getTheme(platform)}>
                <SafeAreaView style={{height: '100%'}}>
                  <Router
                    ref={navigator => NavigatorService.setContainer(navigator)}
                  />
                </SafeAreaView>
              </StyleProvider>
            </View>
          </View>
        </AuthGate>
      </Provider>
    );
  }
}

export default App;
