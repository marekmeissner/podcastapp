import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {Home} from '@screen/App';

import {SCREEN_NAMES} from '../constants';

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: SCREEN_NAMES.APP_HOME,
  },
);

export default App;
