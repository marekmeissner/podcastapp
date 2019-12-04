import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getSavedAudios, selectSavedAudiosCollection } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { SCREEN_NAMES } from '@navigation/constants'
import { selectUser } from '@service/Auth/authReducer'
import { User, SavedAudio } from '@service/Auth/types'
import { setCurrentAudio } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'

interface Props extends NavigationInjectedProps {
  savedAudios: Audio[]
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
    if (prevProps.user && this.props.user && prevProps.user.saved.lenght !== this.props.user.saved.length) {
      try {
        await this.loadSavedAudios()
      } catch (e) {}
    }
  }

  loadSavedAudios = () => {
    const { user } = this.props
    user && user.saved && this.props.getSavedAudios(user.saved)
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
                key={'bookmarks' + audio.id}
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
    savedAudios: selectSavedAudiosCollection(state),
  }),
  { setCurrentAudio, getSavedAudios },
)(Bookmarks)
