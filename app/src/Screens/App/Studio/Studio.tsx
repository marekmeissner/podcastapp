import React from 'react'
import styles from './styles'
import { Container, Button, View, Text, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'
import { SCREEN_NAMES } from '@navigation/constants'

const Studio: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeText}>Welcome in studio!</Text>
      <View style={styles.grid}>
        <Button onPress={() => navigation.navigate(SCREEN_NAMES.STUDIO_AUDIO)} style={styles.largeBrick}>
          <Icon type="FontAwesome5" name="microphone-alt" style={styles.icon} />
          <Text>Record audio</Text>
        </Button>
      </View>
      <View style={styles.grid}>
        <Button onPress={() => navigation.navigate(SCREEN_NAMES.STUDIO_UPLOAD)} style={styles.largeBrick}>
          <Icon type="FontAwesome5" name="upload" style={styles.icon} />
          <Text>Upload audio</Text>
        </Button>
      </View>
    </Container>
  )
}

export default Studio
