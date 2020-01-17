import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Text, Button } from 'native-base'
import { logout, selectUser, forgotPassword } from '@service/Auth/authReducer'
import { NavigationInjectedProps } from 'react-navigation'
import { SCREEN_NAMES } from '@navigation/constants'
import { RootState } from '@service/rootReducer'
import { User } from '@service/Auth/types'

interface Props extends NavigationInjectedProps {
  logout: () => void
  user?: User
  forgotPassword: (email: string) => void
}

const Settings: React.FC<Props> = ({ logout, navigation, forgotPassword, user }) => {
  const [resetLinkSent, setResetLinkSent] = useState(false)

  const userLogout = () => {
    logout()
    navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
  }

  const resetPassword = () => {
    user && forgotPassword(user.email) && setResetLinkSent(true)
  }

  return (
    <Container>
      <Content style={{ padding: 20, paddingTop: 100 }}>
        <Button onPress={resetPassword}>
          <Text>Change Password</Text>
        </Button>
        {resetLinkSent && <Text>Reset link has been sent!</Text>}
        <Button style={!resetLinkSent ? { marginTop: 20 } : { marginTop: 10 }} onPress={userLogout}>
          <Text>Logout</Text>
        </Button>
      </Content>
    </Container>
  )
}

export default connect((state: RootState) => ({ user: selectUser(state) }), { logout, forgotPassword })(Settings)
