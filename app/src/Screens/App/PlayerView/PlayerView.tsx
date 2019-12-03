import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import Player from './Player/Player'
import PlayerToolkit from './PlayerToolkit/PlayerToolkit'
import { NavigationInjectedProps } from 'react-navigation'
import { Audio, AudioSmall } from '@service/Audio/types'
import { SpinnerLoader } from '@component/index'
import { selectUsersAudios, getAudioDetails, incrementAudioViews } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { selectCurrentAudio, setCurrentAudio } from '@service/Player/playerReducer'

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: AudioSmall) => Promise<any>
  incrementAudioViews: (userId: string, audioId: string) => Promise<void>
  audios: { [uid: string]: Audio[] | AudioSmall[] }
  currentAudio?: number
  setCurrentAudio: (currentAudio: number) => void
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
      currentAudio !== undefined && (await this.getAudioDetails(currentAudio))
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props) {
    const propsAudio = this.props.currentAudio
    const prevPropsAudio = prevProps.currentAudio
    try {
      if (propsAudio !== undefined && prevPropsAudio !== undefined && prevPropsAudio !== propsAudio) {
        await this.getAudioDetails(propsAudio)
      }
    } catch (e) {}
  }

  getAudioDetails = async (selectedAudio: number) => {
    try {
      !this.state.playerReload && this.setState({ playerReload: true })
      const audiosTrack = this.props.navigation.getParam('audios') as AudioSmall[]

      const selectedAudioSmall = audiosTrack[selectedAudio]
      const audio = this.props.audios[selectedAudioSmall.author.uid].find(audio => audio.id === selectedAudioSmall.id)

      const fullAudio =
        audio && !audio.hasOwnProperty('details') ? await this.props.getAudioDetails(selectedAudioSmall) : audio

      audio && this.props.incrementAudioViews(audio.author.uid, audio.id)

      this.setState({
        audio: { ...fullAudio, views: fullAudio.views + 1 },
        trackLength: audiosTrack.length,
      })

      return audio
    } catch (e) {
    } finally {
      this.setState({
        playerReload: false,
      })
    }
  }

  onChangeAudio = async (selectedAudio: number) => {
    this.props.setCurrentAudio(selectedAudio)
    await this.getAudioDetails(selectedAudio)
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
    currentAudio: selectCurrentAudio(state),
  }),
  { getAudioDetails, incrementAudioViews, setCurrentAudio },
)(PlayerView)
