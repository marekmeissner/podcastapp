import React from 'react'
import styles from './styles'
import { NavigationInjectedProps } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'

const ICON_TAB = { Home: 'home', Bookmarks: 'bookmarks' }

const FooterTabs: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const activeRoute = navigation.router.getPathAndParamsForState(navigation.state).path
  return (
    <Footer style={styles.footer}>
      <FooterTab>
        {navigation.state.routes
          .filter((route, index) => route.routeName.includes(Object.keys(ICON_TAB)[index]))
          .map(({ routeName }) => {
            return (
              <Button
                key={routeName}
                vertical
                onPress={() => navigation.navigate(routeName)}
                active={activeRoute === routeName}
              >
                <Icon name={ICON_TAB[routeName]} />
                <Text>{routeName}</Text>
              </Button>
            )
          })}
      </FooterTab>
    </Footer>
  )
}

export default FooterTabs
