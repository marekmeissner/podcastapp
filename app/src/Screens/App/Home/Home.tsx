import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getFollowingAudios, sortAudiosByTimeOfCreation } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { SCREEN_NAMES } from '@navigation/constants'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { setCurrentAudio, setPlayerTrack } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'

interface Props extends NavigationInjectedProps {
  followingAudios: Audio[]
  user?: User
  getFollowingAudios: (uids: string[]) => Promise<void>
  setCurrentAudio: (currentAudio: number) => void
  setPlayerTrack: (playerTrack: Audio[]) => void
  audios: { [key: string]: Audio[] }
}

class Home extends React.Component<Props> {
  async componentDidMount() {
    try {
      await this.loadFollowingAudios()
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.user && this.props.user && prevProps.user.following !== this.props.user.following) {
      try {
        await this.loadFollowingAudios()
      } catch (e) {}
    }
  }

  loadFollowingAudios = () => {
    this.props.user && this.props.getFollowingAudios(this.props.user.following)
  }

  runPlayer = (currentAudio: number) => {
    const { navigation, setCurrentAudio, followingAudios, setPlayerTrack } = this.props
    setCurrentAudio(currentAudio)
    setPlayerTrack(followingAudios)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER)
  }

  render() {
    const { followingAudios } = this.props
    return (
      <Container>
        <Content style={styles.content}>
          {followingAudios.map(audio => {
            return (
              audio && (
                <AudioTile
                  key={audio.id}
                  onPress={() => this.runPlayer(followingAudios.indexOf(audio))}
                  thumbnail={audio.thumbnail}
                  title={audio.title}
                  views={audio.views}
                  name={audio.name}
                  created={audio.created}
                />
              )
            )
          })}
        </Content>
      </Container>
    )
  }
}

export default connect(
  (state: RootState) => ({
    user: selectUser(state),
    followingAudios: sortAudiosByTimeOfCreation(state),
  }),
  { getFollowingAudios, setCurrentAudio, setPlayerTrack },
)(Home)
