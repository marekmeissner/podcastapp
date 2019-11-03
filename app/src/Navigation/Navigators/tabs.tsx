import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from '@screen/App/Home/Home'
import Trending from '@screen/App/Trending/Trending'
import Bookmarks from '@screen/App/Bookmarks/Bookmarks'

import FooterTabs from '@component/FooterTabs/FooterTabs'
import { COLORS } from '@util/styles/colors'

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Trending: {
      screen: Trending,
      navigationOptions: {
        tabBarLabel: 'Trending',
      },
    },
    Bookmarks: {
      screen: Bookmarks,
      navigationOptions: {
        tabBarLabel: 'Bookmarks',
      },
    },
  },
  {
    tabBarComponent: FooterTabs,
  },
)

export default Tabs
