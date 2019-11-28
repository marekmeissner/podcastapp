import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from '@screen/App/Home/Home'
import Trending from '@screen/App/Trending/Trending'
import Bookmarks from '@screen/App/Bookmarks/Bookmarks'
import Account from '@screen/App/Account/Account'
import Studio from '@screen/App/Studio/Studio'
import PlayerView from '@screen/App/PlayerView/PlayerView'

import FooterTabs from '@component/FooterTabs/FooterTabs'

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
    Player: {
      screen: PlayerView,
    },
  },
  {
    tabBarComponent: FooterTabs,
  },
)
