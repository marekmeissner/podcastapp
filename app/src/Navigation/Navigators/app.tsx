import { createStackNavigator } from 'react-navigation-stack'

import { Dashboard } from '@screen/App'

import { SCREEN_NAMES } from '../constants'

const App = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: SCREEN_NAMES.APP_DASHBOARD,
  },
)

export default App
