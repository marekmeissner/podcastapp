import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getSavedAudios, sortSavedAudiosByTimeOfAdd } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { AudioSmall } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { selectUser } from '@service/Auth/authReducer'
import { User, SavedAudio } from '@service/Auth/types'
import { setCurrentAudio } from '@service/Player/playerReducer'

interface Props extends NavigationInjectedProps {
  savedAudios: AudioSmall[]
  user?: User
  getSavedAudios: (saved: SavedAudio[]) => Promise<void>
  setCurrentAudio: (currentAudio: number) => void
}

class Bookmarks extends React.Component<Props> {
  async componentDidMount() {
    try {
      await this.loadSavedAudios()
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.user && this.props.user && prevProps.user.saved !== this.props.user.saved) {
      try {
        await this.loadSavedAudios()
      } catch (e) {}
    }
  }

  loadSavedAudios = () => {
    this.props.user && this.props.getSavedAudios(this.props.user.saved)
  }

  runPlayer = (currentAudio: number) => {
    const { navigation, setCurrentAudio, savedAudios } = this.props
    setCurrentAudio(currentAudio)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER, { audios: savedAudios })
  }

  render() {
    const { savedAudios } = this.props
    return (
      <Container>
        <Content style={styles.content}>
          {savedAudios.map(audio => {
            return (
              <AudioTile
                key={audio.id}
                onPress={() => this.runPlayer(savedAudios.indexOf(audio))}
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
    savedAudios: sortSavedAudiosByTimeOfAdd(state),
  }),
  { setCurrentAudio, getSavedAudios },
)(Bookmarks)
