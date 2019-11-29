import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import Player from './Player/Player'
import PlayerToolkit from './PlayerToolkit/PlayerToolkit'
import { NavigationInjectedProps } from 'react-navigation'
import { getAudioDetails } from '@service/Audio/audioReducer'
import { Audio, AudioSmall } from '@service/Audio/types'
import { SpinnerLoader } from '@component/index'
import { selectUsersAudios } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: AudioSmall) => Promise<any>
  audios: { [uid: string]: Audio[] }
}

interface State {
  audio?: Audio
  playerReload: boolean
  selectedAudio?: number
  trackLength?: number
}
class PlayerView extends React.Component<Props> {
  readonly state: State = {
    audio: undefined,
    playerReload: false,
    selectedAudio: undefined,
    trackLength: undefined,
  }

  async componentDidMount() {
    console.warn(this.props.audios)
    try {
      await this.getAudioDetails(this.props.navigation.getParam('audio'))
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    console.warn(this.props.audios)
    const { selectedAudio } = this.state
    try {
      if (prevProps.navigation.getParam('audio') !== this.props.navigation.getParam('audio')) {
        await this.getAudioDetails(this.props.navigation.getParam('audio'))
      } else if (typeof selectedAudio !== 'undefined' && prevState.selectedAudio !== selectedAudio) {
        await this.getAudioDetails(selectedAudio)
      }
    } catch (e) {}
  }

  getAudioDetails = async (selectedAudio: number) => {
    try {
      !this.state.playerReload && this.setState({ playerReload: true })
      const audios = this.props.navigation.getParam('audios') as AudioSmall[]

      const selectedAudioSmall = audios[selectedAudio]
      const audio = await this.props.getAudioDetails(selectedAudioSmall)

      this.setState({
        audio,
        selectedAudio,
        trackLength: audios.length,
      })
    } catch (e) {
    } finally {
      this.setState({
        playerReload: false,
      })
    }
  }

  onChangeAudio = (selectedAudio: number) => {
    this.setState({
      selectedAudio,
    })
  }

  render() {
    const { audio, playerReload, selectedAudio, trackLength } = this.state
    return (
      <Container style={{ flex: 1 }}>
        {audio && !playerReload ? (
          <React.Fragment>
            <Player
              audio={audio.details.audio}
              thumbnail={audio.thumbnail}
              selectedAudio={selectedAudio}
              trackLength={trackLength}
              onChangeAudio={this.onChangeAudio}
              playInBackground
            />
            <PlayerToolkit audio={audio} />
          </React.Fragment>
        ) : (
          <SpinnerLoader />
        )}
      </Container>
    )
  }
}

export default connect(
  (state: RootState) => ({
    audios: selectUsersAudios(state),
  }),
  { getAudioDetails },
)(PlayerView)
