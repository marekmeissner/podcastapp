/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

import Login from './src/screens/Auth/Login/Login'

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.app}><Login /></SafeAreaView>
    </Fragment>
  );
};

export default App;

const styles = StyleSheet.create({  
  app: {
    backgroundColor: '#333333',
    height: '100%'
  }
})