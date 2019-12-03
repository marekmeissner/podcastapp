import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getFollowingAudios, sortAudiosByTimeOfCreation } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { AudioSmall } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { selectUser } from '@service/Auth/authReducer'
import { User } from '@service/Auth/types'
import { setCurrentAudio } from '@service/Player/playerReducer'

interface Props extends NavigationInjectedProps {
  followingAudios: AudioSmall[]
  user?: User
  getFollowingAudios: (uids: string[]) => Promise<void>
  setCurrentAudio: (currentAudio: number) => void
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
    const { navigation, setCurrentAudio, followingAudios } = this.props
    setCurrentAudio(currentAudio)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER, { audios: followingAudios })
  }

  render() {
    const { followingAudios } = this.props
    return (
      <Container>
        <Content style={styles.content}>
          {followingAudios.map(audio => {
            return (
              <AudioTile
                key={audio.id}
                onPress={() => this.runPlayer(followingAudios.indexOf(audio))}
                thumbnail={audio.thumbnail}
                title={audio.title}
                views={audio.views}
                author={audio.author}
                created={audio.created}
              />
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
  { getFollowingAudios, setCurrentAudio },
)(Home)
