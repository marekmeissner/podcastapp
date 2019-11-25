import React from 'react'
import Video from 'react-native-video'

class Player extends React.Component {
  render() {
    return <Video source={{ uri: 'audio.mp3' }} />
  }
}

export default Player
