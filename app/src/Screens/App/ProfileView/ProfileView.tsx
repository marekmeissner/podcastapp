import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Container, Content, View, Text, Thumbnail, Tabs, Tab } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { COLORS } from '@util/styles/colors'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { selectAudiosCollection, getCurrentUserAudios, selectUserAudiosCollection } from '@service/Audio/audioReducer'
import { setCurrentAudio } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'

interface Props extends NavigationInjectedProps {
  audios: { [uid: string]: Audio[] }
  collection: Audio[]
  getCurrentUserAudios: () => Promise<void>
  setCurrentAudio: (selectedAudio: number) => void
}

const ProfileView: React.FC<Props> = ({ navigation, getCurrentUserAudios, collection, audios, setCurrentAudio }) => {
  const currentUser = navigation.getParam('currentUser') as User
  const user = navigation.getParam('user') as User

  currentUser && getCurrentUserAudios()

  const runPlayer = (currentAudio: number) => {
    setCurrentAudio(currentAudio)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER, { audios: currentUser ? collection : audios[user.uid] })
  }

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        <View style={styles.intro}>
          <Thumbnail
            source={{ uri: (currentUser ? currentUser.avatar : user.avatar) || DEFAULT_AUDIO_IMAGE.uri }}
            large
            circular
          />
          <View style={styles.introCounter}>
            <Text style={styles.introCounterTitle}>Followers</Text>
            <Text>2</Text>
          </View>
          <View style={styles.introCounter}>
            <Text style={styles.introCounterTitle}>Following</Text>
            <Text>{currentUser ? currentUser.following.length : user.following.length || 0}</Text>
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionUser}>{currentUser ? currentUser.accountName : user.accountName}</Text>
          <Text style={styles.description}>
            {currentUser ? currentUser.accountDescription : user.accountDescription}
          </Text>
        </View>
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: COLORS.PRIMARY, height: 1 }}
          tabBarActiveTextColor={COLORS.PRIMARY}
          tabContainerStyle={{ backgroundColor: COLORS.DARK_BLUE }}
        >
          <Tab
            heading="Audios"
            tabStyle={{ backgroundColor: COLORS.DARK_BLUE }}
            activeTabStyle={{ backgroundColor: COLORS.DARK_BLUE }}
          >
            <View style={{ backgroundColor: COLORS.DARK_BLUE }}>
              {currentUser &&
                collection.map(audio => (
                  <AudioTile
                    key={audio.id}
                    onPress={() => runPlayer(collection.indexOf(audio))}
                    thumbnail={audio.thumbnail || DEFAULT_AUDIO_IMAGE.uri}
                    title={audio.title}
                    views={audio.views}
                    author={audio.author}
                    created={audio.created}
                    style={{ width: '100%' }}
                  />
                ))}
            </View>
          </Tab>
        </Tabs>
      </Content>
    </Container>
  )
}

export default connect(
  (state: RootState) => ({
    audios: selectAudiosCollection(state),
    collection: selectUserAudiosCollection(state),
  }),
  { getCurrentUserAudios, setCurrentAudio },
)(ProfileView)
