import { useEffect } from 'react'
import { useSelector, connect } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { selectIsLoggedIn, getCurrentUser, selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { RootState } from '@service/rootReducer'

interface Props extends NavigationInjectedProps {
  user?: User
  getCurrentUser: (uid: string) => Promise<void>
}

const AuthGate: React.FC<Props> = ({ navigation, user, getCurrentUser }) => {
  useEffect(() => {
    if (user) {
      getCurrentUser(user.uid)
      navigation.navigate(SCREEN_NAMES.APP)
    } else {
      navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
    }
  }, [])

  return null
}

export default connect(
  (state: RootState) => ({
    user: selectUser(state),
  }),
  { getCurrentUser },
)(AuthGate)
