import React from 'react'
import styles from './styles'
import { Image, View, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import Video from 'react-native-video'
import PlayerSeekBar from '../PlayerSeekBar/PlayerSeekBar'
import { SpinnerLoader } from '@component/index'
import PlayerControls from '../PlayerControls/PlayerControls'

interface Props {
  audio?: string
  thumbnail?: string
  playInBackground: boolean
  playWhenInactive: boolean
}

interface State {
  displayControls: boolean
}

class Player extends React.Component<Props> {
  readonly state: State = {
    displayControls: false,
  }

  onSeek = () => {
    console.warn('seek')
  }

  onSlidingStart = () => {
    console.warn('sliding start')
  }

  onAudioImagePress = () => {
    if (!this.state.displayControls) {
      this.setState({ displayControls: true })
      setTimeout(() => this.setState({ displayControls: false }), 5000)
    } else {
      return null
    }
  }

  render() {
    const { audio, thumbnail } = this.props
    const { displayControls } = this.state
    return (
      <View style={styles.player}>
        {audio && thumbnail ? (
          <React.Fragment>
            <TouchableOpacity style={styles.imageOverlay} onPress={this.onAudioImagePress}>
              <Image style={styles.image} source={{ uri: thumbnail }} />
              <PlayerControls display={displayControls} />
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
