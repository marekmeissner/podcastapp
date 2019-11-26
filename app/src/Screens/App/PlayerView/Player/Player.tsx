import React from 'react'
import styles from './styles'
import { Image, View, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import Video from 'react-native-video'
import PlayerSeekBar from '../PlayerSeekBar/PlayerSeekBar'
import { SpinnerLoader } from '@component/index'

interface Props {
  audio?: string
  thumbnail?: string
  playInBackground: boolean
  playWhenInactive: boolean
}

class Player extends React.Component<Props> {
  onSeek = () => {
    console.warn('seek')
  }

  onSlidingStart = () => {
    console.warn('sliding start')
  }
  render() {
    const { audio, thumbnail } = this.props
    return (
      <View style={styles.player}>
        {audio && thumbnail ? (
          <React.Fragment>
            <TouchableOpacity style={styles.imageOverlay} onPress={() => console.warn('pressed')}>
              <Image style={styles.image} source={{ uri: thumbnail }} />
            </TouchableOpacity>
            <Video source={{ uri: audio }} {...this.props} />
            <PlayerSeekBar
              onSeek={this.onSeek}
              onSlidingStart={this.onSlidingStart}
              trackLength={1233}
              currentPosition={123}
            />
          </React.Fragment>
        ) : (
          <SpinnerLoader />
        )}
      </View>
    )
  }
}

export default Player
