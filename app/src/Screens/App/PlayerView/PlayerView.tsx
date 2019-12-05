import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import Player from './Player/Player'
import PlayerToolkit from './PlayerToolkit/PlayerToolkit'
import { NavigationInjectedProps } from 'react-navigation'
import { Audio } from '@service/Audio/types'
import { SpinnerLoader } from '@component/index'
import { selectUsersAudios, incrementAudioViews } from '@service/Audio/audioReducer'
import AudioService from '@service/Audio/audioService'
import { RootState } from '@service/rootReducer'
import { selectCurrentAudio, setCurrentAudio, selectPlayerTrack } from '@service/Player/playerReducer'

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: Audio) => Promise<any>
  incrementAudioViews: (userId: string, audioId: string) => Promise<void>
  audios: { [uid: string]: Audio[] }
  currentAudio?: number
  setCurrentAudio: (currentAudio: number) => void
  playerTrack: Audio[]
}

interface State {
  audio?: Audio
  playerReload: boolean
  trackLength?: number
}
class PlayerView extends React.Component<Props> {
  readonly state: State = {
    audio: undefined,
    playerReload: false,
    trackLength: undefined,
  }

  async componentDidMount() {
    const { currentAudio } = this.props
    try {
      currentAudio !== undefined && (await this.getCurrentAudio(currentAudio))
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props) {
    const propsAudio = this.props.currentAudio
    const prevPropsAudio = prevProps.currentAudio
    try {
      if (propsAudio !== undefined && prevPropsAudio !== undefined && prevPropsAudio !== propsAudio) {
        await this.getCurrentAudio(propsAudio)
      } else if (propsAudio && this.props.playerTrack.length !== prevProps.playerTrack.length) {
        await this.getCurrentAudio(propsAudio)
      }
    } catch (e) {}
  }

  getCurrentAudio = async (selectedAudio: number) => {
    try {
      !this.state.playerReload && this.setState({ playerReload: true })
      const audiosTrack = this.props.playerTrack
      const selectedAudioSmall = audiosTrack[selectedAudio]

      const audio = this.props.audios[selectedAudioSmall.author.uid].find(audio => audio.id === selectedAudioSmall.id)
      if (audio) {
        this.props.incrementAudioViews(audio.author.uid, audio.id)

        const audioFullPath = await AudioService.getDownloadUrl(audio.details.audio)
        const thumbnailFullPath = await AudioService.getDownloadUrl(audio.thumbnail)

        this.setState({
          audio: { ...audio, details: { ...audio.details, audio: audioFullPath }, thumbnail: thumbnailFullPath },
          trackLength: audiosTrack.length,
        })
      }
      return audio
    } catch (e) {
    } finally {
      this.setState({
        playerReload: false,
      })
    }
  }

  onChangeAudio = (selectedAudio: number) => {
    this.props.setCurrentAudio(selectedAudio)
  }

  render() {
    const { audio, playerReload, trackLength } = this.state
    return (
      <Container style={{ flex: 1 }}>
        {audio && !playerReload ? (
          <React.Fragment>
            <Player
              audio={audio.details.audio}
              thumbnail={audio.thumbnail}
              selectedAudio={this.props.currentAudio}
              trackLength={trackLength}
              onChangeAudio={this.onChangeAudio}
              playInBackground
            />
            <PlayerToolkit navigation={this.props.navigation} audio={audio} />
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
    currentAudio: selectCurrentAudio(state),
    playerTrack: selectPlayerTrack(state),
  }),
  { incrementAudioViews, setCurrentAudio },
)(PlayerView)
