import React from 'react'
import styles from './styles'
import { Image, View, TouchableOpacity } from 'react-native'
import Video, { OnProgressData, OnLoadData } from 'react-native-video'
import PlayerSeekBar from '../PlayerSeekBar/PlayerSeekBar'
import PlayerControls from '../PlayerControls/PlayerControls'
import AudioService from '@service/Audio/audioService'

interface Props {
  audio: string
  thumbnail: string
  playInBackground: boolean
  selectedAudio?: number
  trackLength?: number
  onChangeAudio: (selectedAudioIndex: number) => void
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
      paused: false,
      displayControls: false,
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

  onSlidingStart = () => {
    this.setState({ paused: true })
  }

  onSeek = (time: number) => {
    time = Math.round(time)
    ;(this.refs.audioPlayer as Video).seek(time)
    this.setState({
      currentPosition: time,
      paused: false,
    })
  }

  onPressBackward = () => {
    const { selectedAudio, onChangeAudio } = this.props

    if (this.state.currentPosition < 10 && typeof selectedAudio !== 'undefined' && selectedAudio > 0) {
      onChangeAudio(selectedAudio - 1)
    } else {
      ;(this.refs.audioPlayer as Video).seek(0)
      this.setState({
        currentPosition: 0,
      })
    }
  }

  onPressForward = () => {
    const { selectedAudio, onChangeAudio, trackLength } = this.props

    if (selectedAudio !== undefined && trackLength !== undefined && selectedAudio < trackLength) {
      onChangeAudio(selectedAudio + 1)
    } else {
      ;(this.refs.audioPlayer as Video).seek(0)
      this.setState({
        currentPosition: 0,
      })
    }
  }

  render() {
    const { audio, thumbnail } = this.props
    const { displayControls, currentPosition, totalLength, paused } = this.state
    return (
      <View style={styles.player}>
        <TouchableOpacity style={styles.imageOverlay} onPress={this.onAudioImagePress}>
          <Image style={styles.image} source={{ uri: thumbnail }} />
          <PlayerControls
            display={displayControls}
            onPressPlay={this.onPressPlay}
            onPressPause={this.onPressPause}
            onPressBackward={this.onPressBackward}
            onPressForward={this.onPressForward}
            paused={paused}
          />
        </TouchableOpacity>
        <Video
          ref={'audioPlayer'}
          source={{ uri: audio }}
          onProgress={this.setTime}
          onLoad={this.onLoad}
          {...this.props}
          repeat={false}
          paused={paused}
          onEnd={this.onPressForward}
        />
        <PlayerSeekBar
          onSeek={this.onSeek}
          onSlidingStart={this.onSlidingStart}
          trackLength={totalLength}
          currentPosition={currentPosition}
        />
      </View>
    )
  }
}

export default Player
