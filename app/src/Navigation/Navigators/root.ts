import { createSwitchNavigator } from 'react-navigation'

import { AuthGate } from '@screen/Auth'
import Auth from './auth'
import App from './app'
import TabsNavigation from './tabs'

const RootNavigator = createSwitchNavigator({
  AuthGate: AuthGate,
  Auth: Auth,
  App: App,
  Tabs: TabsNavigation,
})

export default RootNavigator
