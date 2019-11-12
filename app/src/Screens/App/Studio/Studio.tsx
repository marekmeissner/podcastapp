import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Button, Text, Icon } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'
import DocumentPicker from 'react-native-document-picker'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import UploadAudioForm from './UploadAudioForm/UploadAudioForm'

interface Props extends NavigationInjectedProps {
  user: User | null
}

const Studio: React.FC<Props> = ({ navigation, user }) => {
  const [audioFile, setAudioFile] = React.useState()
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      })
      setAudioFile(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  return (
    <Container style={styles.container}>
      {!audioFile ? (
        <Button onPress={() => pickFile()} style={styles.upload}>
          <Icon type="FontAwesome5" name="upload" style={styles.icon} />
          <Text>Upload audio</Text>
        </Button>
      ) : (
        <UploadAudioForm audio={audioFile} />
      )}
    </Container>
  )
}

export default connect((state: RootState) => ({
  user: selectUser(state),
}))(Studio)
