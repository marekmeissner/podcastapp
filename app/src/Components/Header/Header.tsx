import React from 'react'
import styles from './styles'
import { Image } from 'react-native'
import { Header, Left, Right, Button, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'

import { connect } from 'react-redux'
import { logout } from '@service/Auth/authReducer'

import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  logout: () => Promise<void>
}

const HeaderBar: React.FC<Props> = ({ logout, navigation }) => {
  const logoutPress = () => {
    logout()
    navigation.navigate(SCREEN_NAMES.AUTH_LOGIN)
  }
  const activeRoute = navigation.router!.getPathAndParamsForState(navigation.state).path
  return (
    <Header style={styles.header}>
      <Left>
        <Button transparent onPress={logoutPress}>
          <Image style={styles.image} source={require('@asset/logo.png')} />
        </Button>
      </Left>
      <Right>
        <Button
          transparent
          onPress={() => navigation.navigate(SCREEN_NAMES.APP_STUDIO)}
          active={activeRoute.includes(SCREEN_NAMES.APP_STUDIO)}
        >
          <Icon name="microphone" />
        </Button>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button
          transparent
          onPress={() => navigation.navigate(SCREEN_NAMES.APP_PROFILE_VIEW)}
          active={activeRoute.includes(SCREEN_NAMES.APP_PROFILE_VIEW)}
        >
          <Icon name="settings" />
        </Button>
      </Right>
    </Header>
  )
}

export default connect(null, { logout })(HeaderBar)
