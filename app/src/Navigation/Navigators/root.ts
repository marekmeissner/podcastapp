import { createSwitchNavigator } from 'react-navigation'

import { AuthGate } from '@screen/Auth'
import Auth from './auth'
import App from './app'

const RootNavigator = createSwitchNavigator({
  AuthGate: AuthGate,
  Auth: Auth,
  App: App,
})

export default RootNavigator
