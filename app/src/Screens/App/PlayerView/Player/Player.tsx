import React, { RefObject } from 'react'
import styles from './styles'
import { Image, View, TouchableOpacity } from 'react-native'
import Video, { VideoProperties, OnProgressData, OnLoadData } from 'react-native-video'
import PlayerSeekBar from '../PlayerSeekBar/PlayerSeekBar'
import { SpinnerLoader } from '@component/index'
import PlayerControls from '../PlayerControls/PlayerControls'

interface Props {
  audio?: string
  thumbnail?: string
  playInBackground: boolean
}

interface State {
  displayControls: boolean
  totalLength: number
  currentPosition: number
  paused: boolean
}

class Player extends React.Component<Props> {
  readonly state: State = {
    displayControls: false,
    totalLength: 1,
    currentPosition: 0,
    paused: false,
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

  onLoad = (data: OnLoadData) => {
    this.setState({
      currentPosition: Math.floor(data.currentTime),
      totalLength: Math.floor(data.duration),
    })
  }

  setTime = (data: OnProgressData) => {
    this.setState({
      currentPosition: Math.floor(data.currentTime),
    })
  }

  onPressPlay = () => {
    this.setState({ paused: false })
  }

  onPressPause = () => {
    this.setState({ paused: true })
  }

  render() {
    const { audio, thumbnail } = this.props
    const { displayControls, currentPosition, totalLength, paused } = this.state

    return (
      <View style={styles.player}>
        {audio && thumbnail ? (
          <React.Fragment>
            <TouchableOpacity style={styles.imageOverlay} onPress={this.onAudioImagePress}>
              <Image style={styles.image} source={{ uri: thumbnail }} />
              <PlayerControls
                display={displayControls}
                onPressPlay={this.onPressPlay}
                onPressPause={this.onPressPause}
                paused={paused}
              />
            </TouchableOpacity>
            <Video
              source={{ uri: audio }}
              onProgress={this.setTime}
              onLoad={this.onLoad}
              {...this.props}
              repeat={false}
              paused={paused}
            />
            <PlayerSeekBar
              onSeek={this.onSeek}
              onSlidingStart={this.onSlidingStart}
              trackLength={totalLength}
              currentPosition={currentPosition}
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
