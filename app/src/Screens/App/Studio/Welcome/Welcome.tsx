import React from 'react'
import styles from './styles'
import { Container, Button, View, Text, Icon } from 'native-base'

const Welcome: React.FC = () => {
  const [selected, setSelected] = React.useState()
  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeText}>Welcome in studio!</Text>
      <View style={styles.grid}>
        <Button onPress={() => setSelected('audio')} style={styles.brick}>
          <Icon type="FontAwesome5" name="microphone-alt" style={styles.icon} />
          <Text>Record audio</Text>
        </Button>
        <Button onPress={() => setSelected('video')} style={styles.brick}>
          <Icon type="FontAwesome5" name="video" style={styles.icon} />
          <Text>Make video</Text>
        </Button>
      </View>
      <View style={styles.grid}>
        <Button onPress={() => setSelected('upload')} style={styles.largeBrick}>
          <Icon type="FontAwesome5" name="upload" style={styles.icon} />
          <Text>Upload video or audio</Text>
        </Button>
      </View>
    </Container>
  )
}

export default Welcome
