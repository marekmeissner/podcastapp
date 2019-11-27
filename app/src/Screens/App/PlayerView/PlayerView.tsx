import React from 'react'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import Player from './Player/Player'
import PlayerToolkit from './PlayerToolkit/PlayerToolkit'
import { NavigationInjectedProps } from 'react-navigation'
import { getAudioDetails } from '@service/Audio/audioReducer'
import { Audio, AudioSmall } from '@service/Audio/types'

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: AudioSmall) => Promise<any>
}

interface State {
  audio?: Audio
}
class PlayerView extends React.Component<Props> {
  readonly state: State = {
    audio: undefined,
  }

  async componentDidMount() {
    try {
      const audio = await this.props.getAudioDetails(this.props.navigation.getParam('audio'))

      this.setState({
        audio,
      })
    } catch (e) {}
  }
  render() {
    const { audio } = this.state
    return (
      <Container style={{ flex: 1 }}>
        <Player audio={audio && audio.details.audio} thumbnail={audio && audio.thumbnail} playInBackground />
        <PlayerToolkit />
      </Container>
    )
  }
}

export default connect(
  null,
  { getAudioDetails },
)(PlayerView)
