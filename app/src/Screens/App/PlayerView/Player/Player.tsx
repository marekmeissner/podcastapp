import React from 'react'
import styles from './styles'
import { Image, View, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import Video from 'react-native-video'

interface Props {
  audio?: string
  thumbnail?: string
  playInBackground: boolean
  playWhenInactive: boolean
}

class Player extends React.Component<Props> {
  render() {
    const { audio, thumbnail } = this.props
    return (
      <View style={styles.player}>
        {audio && thumbnail && (
          <React.Fragment>
            <TouchableOpacity style={styles.imageOverlay} onPress={() => console.warn('pressed')}>
              <Image style={styles.image} source={{ uri: thumbnail }} />
            </TouchableOpacity>
            <Video source={{ uri: audio }} {...this.props} />
          </React.Fragment>
        )}
      </View>
    )
  }
}

export default Player
