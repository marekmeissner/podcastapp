import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text, Button } from 'native-base'
import { logout, selectUser, forgotPassword } from '@service/Auth/authReducer'
import { NavigationInjectedProps } from 'react-navigation'
import { SCREEN_NAMES } from '@navigation/constants'
import { RootState } from '@service/rootReducer'
import { User } from '@service/Auth/types'
import { COLORS } from '@util/styles/colors'

interface Props extends NavigationInjectedProps {
  logout: () => void
  user?: User
  forgotPassword: (email: string) => void
}

export const Settings: React.FC<Props> = ({ logout, navigation, forgotPassword, user }) => {
  const [resetLinkSent, setResetLinkSent] = useState(false)

  const userLogout = () => {
    logout()
    navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
  }

  const resetPassword = () => {
    user && forgotPassword(user.email) && setResetLinkSent(true)
    setTimeout(() => setResetLinkSent(false), 5000)
  }

  return (
    <Container>
      <Content style={{ padding: 20, paddingTop: 100 }}>
        <Button testID={'resetPassword'} onPress={resetPassword}>
          <Text>Change Password</Text>
        </Button>
        {resetLinkSent && (
          <Text testID={'resetSuccessMessage'} style={{ color: COLORS.SUCCESS, fontSize: 13, textAlign: 'center' }}>
            Reset link has been sent!
          </Text>
        )}
        <Button testID={'logout'} style={!resetLinkSent ? { marginTop: 20 } : { marginTop: 10 }} onPress={userLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default connect((state: RootState) => ({ user: selectUser(state) }), { logout, forgotPassword })(Settings)
