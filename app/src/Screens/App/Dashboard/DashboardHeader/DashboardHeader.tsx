import React from 'react'
import styles from './styles'
import { Image } from 'react-native'
import { Header, Left, Right, Button, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'

import { connect } from 'react-redux'
import { logout } from '@service/Auth/authReducer'

interface Props extends NavigationInjectedProps {
  logout: () => Promise<void>
}

const DashboardHeader: React.FC<Props> = ({ logout }) => {
  return (
    <Header style={styles.header}>
      <Left style={styles.content}>
        <Button transparent onPress={logout}>
          <Image style={styles.image} source={require('@asset/logo.png')} />
        </Button>
      </Left>
      <Right style={styles.content}>
        <Button transparent>
          <Icon name="microphone" />
        </Button>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button transparent>
          <Icon name="settings" />
        </Button>
      </Right>
    </Header>
  )
}

export default connect(
  null,
  { logout },
)(DashboardHeader)
