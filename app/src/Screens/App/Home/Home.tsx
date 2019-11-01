import React from 'react'
import { InputError } from '@component'
import { NavigationInjectedProps } from 'react-navigation'

import { connect } from 'react-redux'
import { Button } from 'native-base'
import { logout } from '@service/Auth/authReducer'

interface Props extends NavigationInjectedProps {
  logout: () => void
}

const Home: React.FC<Props> = ({ logout }) => {
  return (
    <Button onPress={logout}>
      <InputError>Dashboard</InputError>
    </Button>
  )
}

export default connect(
  null,
  { logout },
)(Home)
