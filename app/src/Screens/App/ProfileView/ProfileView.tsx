import React from 'react'
import styles from './styles'
import { connect, useSelector } from 'react-redux'
import { Container, Content, View, Text, Thumbnail, Tabs, Tab, Button } from 'native-base'
import { DEFAULT_AUDIO_IMAGE } from '@util/constants/constants'
import { COLORS } from '@util/styles/colors'
import { AudioTile } from '@component/index'
import { NavigationInjectedProps } from 'react-navigation'
import { User } from '@service/Auth/types'
import { RootState } from '@service/rootReducer'
import { selectUserAudios, getUserAudios } from '@service/Audio/audioReducer'
import { setCurrentAudio, setPlayerTrack } from '@service/Player/playerReducer'
import { Audio } from '@service/Audio/types'
import { SCREEN_NAMES } from '@navigation/constants'
import { useAsyncEffect } from '@hook/useAsyncEffect'

interface Props extends NavigationInjectedProps {
  setCurrentAudio: (selectedAudio: number) => void
  setPlayerTrack: (playerTrack: Audio[]) => void
  getUserAudios: (uid: string) => Promise<void>
}

const ProfileView: React.FC<Props> = ({ navigation, setCurrentAudio, setPlayerTrack, getUserAudios }) => {
  const currentUser = navigation.getParam('currentUser') as User
  const user = navigation.getParam('user') as User
  const uid = currentUser ? currentUser.uid : user.uid

  useAsyncEffect(async () => {
    await getUserAudios(uid)
  }, [uid])

  const userAudios = useSelector((state: RootState) => selectUserAudios(state, uid))

  const runPlayer = (currentAudio: number) => {
    setCurrentAudio(currentAudio)
    setPlayerTrack(userAudios)
    navigation.navigate(SCREEN_NAMES.APP_PLAYER)
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
          <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.introCounter}>
                <Text style={styles.introCounterTitle}>Followers</Text>
                <Text>2</Text>
              </View>
              <View style={[styles.introCounter, { paddingLeft: 20 }]}>
                <Text style={styles.introCounterTitle}>Following</Text>
                <Text>{currentUser ? currentUser.following.length : user.following.length || 0}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button style={styles.button}>
                <Text style={styles.buttonText}>Follow</Text>
              </Button>
              <Button style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </Button>
            </View>
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
              {userAudios &&
                userAudios.map(audio => (
                  <AudioTile
                    key={audio.id}
                    onPress={() => runPlayer(userAudios.indexOf(audio))}
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

export default connect(null, { setCurrentAudio, setPlayerTrack, getUserAudios })(ProfileView)
