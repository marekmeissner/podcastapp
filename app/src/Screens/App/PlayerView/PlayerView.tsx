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

interface Props extends NavigationInjectedProps {
  getAudioDetails: (audioSmall: AudioSmall) => Promise<any>
  incrementAudioViews: (userId: string, audioId: string) => Promise<void>
  audios: { [uid: string]: Audio[] | AudioSmall[] }
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
    try {
      await this.getAudioDetails(this.props.navigation.getParam('audio'))
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    const propsAudio = this.props.navigation.getParam('audio')
    const prevPropsAudio = prevProps.navigation.getParam('audio')
    try {
      if (prevPropsAudio !== propsAudio) {
        await this.getAudioDetails(propsAudio)
        console.warn('1')
      }
    } catch (e) {}
  }

  getAudioDetails = async (selectedAudio: number) => {
    try {
      !this.state.playerReload && this.setState({ playerReload: true })
      const audios = this.props.navigation.getParam('audios') as AudioSmall[]

      const selectedAudioSmall = audios[selectedAudio]
      const audio = this.props.audios[selectedAudioSmall.author.uid].find(audio => audio.id === selectedAudioSmall.id)

      const fullAudio =
        audio && !audio.hasOwnProperty('details') ? await this.props.getAudioDetails(selectedAudioSmall) : audio

      this.setState({
        audio: fullAudio,
        selectedAudio,
        trackLength: audios.length,
      })

      audio && audios[selectedAudio].id !== audio.id && this.props.incrementAudioViews(audio.author.uid, audio.id)

      return audio
    } catch (e) {
    } finally {
      this.setState({
        playerReload: false,
      })
    }
  }

  onChangeAudio = async (selectedAudio: number) => {
    await this.getAudioDetails(selectedAudio)
    console.warn('2')
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
  { getAudioDetails, incrementAudioViews },
)(PlayerView)
