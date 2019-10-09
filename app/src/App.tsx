/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Login from './screens/Auth/Login/Login';

import {StyleProvider, Container} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {COLORS} from './utils/styles/colors.ts';

const styles = StyleSheet.create({
  app: {
    backgroundColor: COLORS.GREY_BG,
    height: '100%',
  },
});

const App: React.FC = () => {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.app}>
          <Login />
        </SafeAreaView>
      </Container>
    </StyleProvider>
  );
};

export default App;
