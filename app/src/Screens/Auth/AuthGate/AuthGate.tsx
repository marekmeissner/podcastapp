import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavigationInjectedProps } from 'react-navigation'

import { selectIsLoggedIn } from '@service/Auth/authReducer'
import { SCREEN_NAMES } from '@navigation/constants'

const AuthGate: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('App')
    } else {
      navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
    }
  }, [])

  return null
}

export default AuthGate
