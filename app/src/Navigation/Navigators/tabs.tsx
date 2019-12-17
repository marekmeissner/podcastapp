import { createBottomTabNavigator } from 'react-navigation-tabs'

import Home from '@screen/App/Home/Home'
import Trending from '@screen/App/Trending/Trending'
import Bookmarks from '@screen/App/Bookmarks/Bookmarks'
import Studio from '@screen/App/Studio/Studio'
import PlayerView from '@screen/App/PlayerView/PlayerView'
import ProfileView from '@screen/App/ProfileView/ProfileView'
import SearchView from '@screen/App/SearchView/SearchView'

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
    Studio: {
      screen: Studio,
    },
    ProfileView: {
      screen: ProfileView,
    },
    Player: {
      screen: PlayerView,
    },
    SearchView: {
      screen: SearchView,
    },
  },
  {
    tabBarComponent: FooterTabs,
  },
)
