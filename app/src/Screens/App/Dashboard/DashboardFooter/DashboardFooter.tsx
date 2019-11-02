import React from 'react'
import styles from './styles'
import { NavigationInjectedProps } from 'react-navigation'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base'

const DashboardFooter: React.FC<NavigationInjectedProps> = () => {
  return (
    <Footer style={styles.footer}>
      <FooterTab>
        <Button vertical>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical>
          <Icon name="analytics" />
          <Text>Trending</Text>
        </Button>
        <Button vertical active>
          <Icon active name="bookmarks" />
          <Text>Bookmark</Text>
        </Button>
        <Button vertical>
          <Icon name="person" />
          <Text>Account</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}

export default DashboardFooter
