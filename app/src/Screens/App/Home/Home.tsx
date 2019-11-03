import React from 'react'
import { Text, Container } from 'native-base'
import HeaderBar from '@component/Header/Header'
import { NavigationInjectedProps } from 'react-navigation'

const Home: React.FC<NavigationInjectedProps> = () => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  )
}

export default Home
