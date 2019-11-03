import { createStackNavigator } from 'react-navigation-stack'

import { Dashboard } from '@screen/App'
import Tabs from './tabs'

import { SCREEN_NAMES } from '../constants'

const App = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        header: null,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Tabs',
  },
)

export default App
