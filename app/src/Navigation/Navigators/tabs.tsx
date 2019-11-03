import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'

import Home from '@screen/App/Home/Home'
import Trending from '@screen/App/Trending/Trending'
import Bookmarks from '@screen/App/Bookmarks/Bookmarks'

import Account from '@screen/App/Account/Account'
import Studio from '@screen/App/Studio/Studio'

import HeaderBar from '@component/Header/Header'
import FooterTabs from '@component/FooterTabs/FooterTabs'
import { COLORS } from '@util/styles/colors'

export const Tabs = createBottomTabNavigator(
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
    Account: {
      screen: Account,
    },
    Studio: {
      screen: Studio,
    },
  },
  {
    tabBarComponent: FooterTabs,
  },
)
