import React from 'react'
import styles from './styles'
import { Image } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'

const DashboardHeader: React.FC<NavigationInjectedProps> = () => {
  return (
    <Header style={styles.header}>
      <Left style={styles.content}>
        <Button transparent>
          <Image style={styles.image} source={require('@asset/logo.png')} />
        </Button>
      </Left>
      <Right style={styles.content}>
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

export default DashboardHeader
