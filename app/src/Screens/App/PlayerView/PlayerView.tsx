import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import { Player } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getAudioDetails } from '@service/Audio/audioReducer'
import { Audio, AudioSmall } from '@service/Audio/types'

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: AudioSmall) => Promise<Audio>
}

interface State {
  audio?: Audio
}
class PlayerView extends React.Component<Props> {
  readonly state: State = {
    audio: undefined,
  }

  async componentDidMount() {
    const audio = await this.props.getAudioDetails(this.props.navigation.getParam('audio'))

    this.setState({
      audio,
    })
  }
  render() {
    const { audio } = this.state
    return (
      <Container>
        <Player
          audio={audio && audio.details.audio}
          thumbnail={audio && audio.thumbnail}
          playInBackground
          playWhenInactive
        />
      </Container>
    )
  }
}

export default connect(
  null,
  { getAudioDetails },
)(PlayerView)
