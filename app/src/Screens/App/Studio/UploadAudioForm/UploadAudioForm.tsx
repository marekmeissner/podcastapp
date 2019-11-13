import React from 'react'
import { Container, Text } from 'native-base'
import { connect } from 'react-redux'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { NavigationInjectedProps } from 'react-navigation'

interface Props extends NavigationInjectedProps {
  user: User | null
}

const UploadAudioForm: React.FC<Props> = ({ navigation }) => {
  console.warn(navigation.getParam('audio', undefined))
  return (
    <Container>
      <Text>upload</Text>
    </Container>
  )
}

export default connect((state: RootState) => ({
  user: selectUser(state),
}))(UploadAudioForm)
