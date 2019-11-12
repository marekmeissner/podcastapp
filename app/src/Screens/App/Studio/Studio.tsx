import React from 'react'
import styles from './styles'
import { Container, Button, View, Text, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'

const Studio: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      console.log(res.uri, res.type, res.name, res.size)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  return (
    <Container style={styles.container}>
      <Text style={styles.welcomeText}>Welcome in studio!</Text>
      <View style={styles.grid}>
        <Button onPress={() => pickFile()} style={styles.largeBrick}>
          <Icon type="FontAwesome5" name="upload" style={styles.icon} />
          <Text>Upload audio</Text>
        </Button>
      </View>
    </Container>
  )
}

export default Studio
