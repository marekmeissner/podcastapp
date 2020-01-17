import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content, View, Text } from 'native-base'
import { NavigationInjectedProps } from 'react-navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@service/rootReducer'
import { filterAudiosByPhrasePresence } from '@service/Audio/audioReducer'
import { AudioTile } from '@component/index'
import { SCREEN_NAMES } from '@navigation/constants'
import { Audio } from '@service/Audio/types'
import { setCurrentAudio, setPlayerTrack } from '@service/Player/playerReducer'

interface Props extends NavigationInjectedProps {
  setCurrentAudio: (currentAudio: number) => void
  setPlayerTrack: (playerTrack: Audio[]) => void
}

const SearchView: React.FC<Props> = ({ navigation, setPlayerTrack, setCurrentAudio }) => {
  const audios = useSelector((state: RootState) =>
    filterAudiosByPhrasePresence(state.audio.audios, navigation.getParam('searchQuery')),
  )

  const runPlayer = (currentAudio: number) => {
    setCurrentAudio(currentAudio)
    setPlayerTrack(audios)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER)
  }
  console.warn(audios)
  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.queryContainer}>
          <Text style={styles.searchQuery}>Results for: {navigation.getParam('searchQuery')}</Text>
        </View>
        <View>
          {audios.length > 0 &&
            audios.map(audio => {
              ;<AudioTile
                key={audio.id}
                onPress={() => runPlayer(audios.indexOf(audio))}
                thumbnail={audio.thumbnail}
                title={audio.title}
                views={audio.views}
                name={audio.name}
                created={audio.created}
              />
            })}
        </View>
      </Content>
    </Container>
  )
}

export default connect(null, { setCurrentAudio, setPlayerTrack })(SearchView)
