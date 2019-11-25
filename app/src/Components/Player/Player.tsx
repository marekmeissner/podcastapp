import React from 'react'
import { Container } from 'native-base'
import Video from 'react-native-video'
import AudioService from '@service/Audio/audioService'

interface Props {
  audio?: string
  thumbnail?: string
  playInBackground: boolean
  playWhenInactive: boolean
}

interface State {
  audio?: string
  thumbnail?: string
}
class Player extends React.Component<Props> {
  render() {
    const { audio, thumbnail } = this.props
    return <Container>{audio && <Video source={{ uri: audio }} {...this.props} />}</Container>
  }
}

export default Player
