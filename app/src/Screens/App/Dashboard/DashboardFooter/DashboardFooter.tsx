import React from 'react'
import styles from './styles'
import { NavigationInjectedProps, NavigationState } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { SCREEN_NAMES } from '@navigation/constants'

const DashboardFooter: React.FC<NavigationInjectedProps> = ({ navigation, navigationState }) => {
  const activeRoute = navigation.router.getPathAndParamsForState(navigation.state).path
  return (
    <Footer style={styles.footer}>
      <FooterTab>
        {navigation.state.routes.map((route, index) => {
          return (
            <Button
              key={route.routeName}
              vertical
              onPress={() => navigation.navigate(route.routeName)}
              active={activeRoute === route.routeName}
            >
              <Icon name="home" />
              <Text>{route.routeName}</Text>
            </Button>
          )
        })}
      </FooterTab>
    </Footer>
  )
}

export default DashboardFooter
