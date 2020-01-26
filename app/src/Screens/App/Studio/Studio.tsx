import React from 'react'
import styles from './styles'
import { Container, Button, Text, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'
import { SCREEN_NAMES } from '@navigation/constants'

export const Studio: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      })
      navigation.navigate(SCREEN_NAMES.AUDIO_UPLOAD, {
        audio: res,
      })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  return (
    <Container style={styles.container}>
      <Text style={{ fontSize: 25, paddingBottom: 30 }}>Welcome in Studio!</Text>
      <Button onPress={() => pickFile()} style={styles.upload}>
        <Icon type="FontAwesome5" name="upload" style={styles.icon} />
        <Text>Choose audio</Text>
      </Button>
    </Container>
  )
}

export default Studio
