import React from 'react'
import styles from './styles'
import { Container, Content } from 'native-base'
import DashboardFooter from './DashboardFooter/DashboardFooter'
import DashboardHeader from './DashboardHeader/DashboardHeader'
import { NavigationInjectedProps } from 'react-navigation'

const Dashboard: React.FC<NavigationInjectedProps> = () => {
  return (
    <Container style={styles.container}>
      <DashboardHeader />
      <Content />
      <DashboardFooter />
    </Container>
  )
}

export default Dashboard
