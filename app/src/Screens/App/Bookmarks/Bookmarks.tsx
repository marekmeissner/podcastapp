import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content, Text } from 'native-base'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { getSavedAudios, selectSavedAudiosCollection } from '@service/Audio/audioReducer'
import { RootState } from '@service/rootReducer'
import { SCREEN_NAMES } from '@navigation/constants'
import { selectUser } from '@service/Auth/authReducer'
import { User, SavedAudio } from '@service/Auth/types'
import { setCurrentAudio, setPlayerTrack } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'

interface Props extends NavigationInjectedProps {
  savedAudios: Audio[]
  user?: User
  getSavedAudios: (saved: SavedAudio[]) => Promise<void>
  setCurrentAudio: (currentAudio: number) => void
  setPlayerTrack: (playerTrack: Audio[]) => void
}

class Bookmarks extends React.Component<Props> {
  async componentDidMount() {
    try {
      await this.loadSavedAudios()
    } catch (e) {}
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.user && this.props.user && prevProps.user.saved.length !== this.props.user.saved.length) {
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
    const { navigation, setCurrentAudio, setPlayerTrack, savedAudios } = this.props
    setCurrentAudio(currentAudio)
    setPlayerTrack(savedAudios)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER)
  }

  render() {
    const { savedAudios } = this.props
    return (
      <Container>
        <Content style={styles.content}>
          {savedAudios.length > 0 ? (
            savedAudios.map(audio => {
              return (
                <AudioTile
                  key={'bookmarks' + audio.id}
                  onPress={() => this.runPlayer(savedAudios.indexOf(audio))}
                  thumbnail={audio.thumbnail}
                  title={audio.title}
                  views={audio.views}
                  name={audio.name}
                  created={audio.created}
                />
              )
            })
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Lack of audios!</Text>
          )}
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
  { setCurrentAudio, setPlayerTrack, getSavedAudios },
)(Bookmarks)
